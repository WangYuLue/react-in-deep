/// <reference path = "./index.d.ts" />

import {
  isEvent,
  isProperty,
  isNew,
  isGone
} from './utils';

import {
  IFiber,
  IHostFiber,
  IFnFiber,
  IFnType,
  IFiberProps,
  IElement,
  EEffectTag,
  IDispatch
} from './models';

// TODO： 为什么有时候更新不及时？

let nextUnitOfWork: IFiber = null;
let currentRoot: IFiber = null;
let wipRoot: IFiber = null;
let deletions: IFiber[] = [];

let wipFiber: IFiber = null;
let hookIndex: number = 0;

function createElement(type: string, props: any, ...children: IFiber[]): IFiber {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object'
          ? child
          : createTextElement(child)
      )
    }
  };
}

function createTextElement(text: string): IFiber {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createDom(fiber: IFiber): IElement {
  const dom = fiber.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type as string);

  updateDom(dom, {}, fiber.props);

  return dom;
}

function updateDom(dom: IElement, prevProps: IFiberProps, nextProps: IFiberProps): void {
  //移除 旧的的或者改变的监听事件
  Object.keys(prevProps)
    .filter(isEvent)                 // 过滤出当前是事件的 props
    .filter(key =>                   // 过滤 被移除或者改变的监听事件
      isGone(nextProps)(key) ||
      isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 移除 旧的或者改变的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach(name => {
      dom[name] = '';
    });
  // TODO： 适配 style 和 class
  // 设置 新的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  // 设置 新的监听事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(
        eventType,
        nextProps[name]
      );
    });
}

function commitRoot(): void {
  deletions.forEach(fiber => commitDeletion(fiber, getParentDom(fiber)));
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function getParentDom(fiber: IFiber): IElement {
  let domParentFiber = fiber.parent;

  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  return domParentFiber.dom;
}

function commitWork(fiber?: IFiber) {
  if (!fiber) {
    return;
  }

  const { effectTag, dom, alternate, props, child, sibling } = fiber;

  if (dom) {
    if (effectTag === EEffectTag.PLACEMENT) {
      getParentDom(fiber).appendChild(dom);
    } else if (effectTag === EEffectTag.UPDATE) {
      updateDom(dom, alternate.props, props);
    }
  }

  commitWork(child);
  commitWork(sibling);
}

const commitDeletion = (fiber: IFiber, domParent: IElement) => {
  // TODO: 为什么这边要递归寻找
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
};

function render(element: IFiber, container: HTMLElement) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function workLoop(deadline: IDeadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber: IFiber) {
  const isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber as IFnFiber);
  } else {
    updateHostComponent(fiber as IHostFiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function updateFunctionComponent(fiber: IFnFiber): void {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [(fiber.type as IFnType)(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState<T>(initial: T): [T, IDispatch<T>] {
  const oldHook = (wipFiber.alternate as IFnFiber)?.hooks?.[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };

  const actions = oldHook ? oldHook.queue : [];

  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  const setState: IDispatch<T> = action => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  (wipFiber as IFnFiber).hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

function updateHostComponent(fiber: IFiber): void {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(fiber: IFiber, elements: IFiber[]): void {
  let index = 0;
  let oldFiber = fiber.alternate && fiber.alternate.child;
  let prevSibling = null;
  // TODO: 这边条件判断的原因
  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: fiber,
        alternate: oldFiber,
        effectTag: EEffectTag.UPDATE
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: fiber,
        alternate: null,
        effectTag: EEffectTag.PLACEMENT
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = EEffectTag.DELETION;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

export {
  createElement,
  render,
  useState
};