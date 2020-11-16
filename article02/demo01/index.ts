import { fibonacciWithTime } from './utils';

let count = 0;

const $root = document.getElementById('root');

function render(times) {
  while (count < times) {
    fibonacciWithTime(25);
    count++;
    $root.innerText = '当前计算个数：' + count;
  }
}

render(10000);
