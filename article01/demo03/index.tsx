function createElement(type: string, props, ...children) {
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

function createTextElement(text: string) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

/** @jsx createElement */
const element = (<div title='foo'>
  <span id='a'>hello</span>
  <span id='b'>world</span>
</div>);

function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = key => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

render(element, document.getElementById('root'));

export { };