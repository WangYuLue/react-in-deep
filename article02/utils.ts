export function fibonacci(n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export const fibonacciWithTime = (n) => {
  console.time('计算斐波那契数列');
  const res = fibonacci(n);
  console.timeEnd('计算斐波那契数列');
  return res;
};