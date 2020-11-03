import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement(
  'div',
  { title: 'foo' },
  React.createElement(
    'span',
    { id: 'a' },
    'hello'
  ),
  React.createElement(
    'span',
    { id: 'b' },
    'world'
  )
);

console.log(element);

const container = document.getElementById('root');
ReactDOM.render(element, container);

