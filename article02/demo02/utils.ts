export function fibonacci(n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export const fibonacciWithTime = (n) => {
  console.time('time');
  const res = fibonacci(n);
  console.timeEnd('time');
  return res;
};