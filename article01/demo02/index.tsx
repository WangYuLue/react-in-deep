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

const Didact = {
  createElement
};

/** @jsx Didact.createElement */
const element = (<div title='foo'>
  <span id='a'>hello</span>
  <span id='b'>world</span>
</div>);

document.getElementById('root').innerText = JSON.stringify(element, null, 2);

console.log(element);


export { };