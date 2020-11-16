/// <reference path = "../index.d.ts" />

import { fibonacciWithTime } from '../utils';

let count = 1;

const $root = document.getElementById('root');

function render(times) {
  const run = (deadline) => {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && count < times) {
      fibonacciWithTime(25);
      count++;
      $root.innerText = '当前计算个数：' + count;
    }
    if (count < times) {
      requestIdleCallback(run);
    }
  };
  requestIdleCallback(run);
}

render(10000);