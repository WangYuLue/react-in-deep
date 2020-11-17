const element = {
  name: 'a1',
  children: [
    {
      name: 'b1',
      children: []
    },
    {
      name: 'b2',
      children: [
        {
          name: 'c1',
          children: [
            {
              name: 'd1',
              children: []
            },
            {
              name: 'd2',
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'b3',
      children: [
        {
          name: 'c2',
          children: []
        }
      ]
    }
  ]
};

function link(element) {
  if (element) {
    let previous;
    element.children.forEach((item, index) => {
      item.return = element;
      if (index === 0) {
        element.child = item;
      } else {
        previous.sibling = item;
      }
      previous = item;
      link(item);
    });
  }
}

function walk(fiber) {
  let root = fiber;
  let node = fiber;
  while (true) {
    console.log(node.name);
    // Do something with node
    if (node.child) {
      node = node.child;
      continue;
    }
    if (node === root) {
      return;
    }
    while (!node.sibling) {
      if (!node.return || node.return === root) {
        return;
      }
      node = node.return;
    }
    node = node.sibling;
  }
}

link(element);
walk(element);