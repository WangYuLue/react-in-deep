interface IDeadline {
  timeRemaining: () => number;
}
// 浏览器原生 requestIdleCallback 方法
declare function requestIdleCallback(cb: (deadline: IDeadline) => void): void; 