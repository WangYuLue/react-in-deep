## 深入了解 React

这个仓库的大部分代码来自于 [didact](https://github.com/pomber/didact)，[didact](https://github.com/pomber/didact) 是个非常优秀的库，阅读完它，读者将对 react 有更深刻的认识。

但是它也有 bug 和 缺陷，比如无法解析 `jsx` 中的 `style` 属性。另外，它的可读性也不是很好。

出于以上的原因，也为了更深入的了解 React，笔者将基于 `didact` 的代码带领读者手把手写一个简单 TypeScript 版的 React。

这个 React 会修复 `didact` 中存在的一些 bug 和 缺陷，并且由于它是 TypeScript 写的，可读性也会友好不少。

另外，这个仓库还会结合 `didact` 和 `react` 源码详细分析 react 的核心架构。

总结以下，这个仓库将会做如下的事情：

- [x] 将 `didact` 改造成 `TS` 代码
- [ ] 修复 `didact` 中存在的一些 bug 和 缺陷
- [ ] 结合 `didact` 和 `react` 源码详细分析 react 的核心架构

### 适合人群

在平时开发过程中如果你有以下的疑问，并且有兴趣想弄明白它，那这个仓库将非常适合你：

- `react` 底层的运行原理
- `fiber` 是怎么？怎么做到异步可中断更新的？
- 为什么 `hooks` 不能写在条件判断里?
- 列表中的 `key` 有什么用？

阅读完这个仓库的文章，上面的疑问都会烟消云散。

### 相关链接

[Build your own React](https://pomb.us/build-your-own-react/)
[react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
[React docs](https://zh-hans.reactjs.org/docs/reconciliation.html)
[烤透 React Hook](https://juejin.im/post/6867745889184972814)
[让我们手动实现 React Hooks](https://zhuanlan.zhihu.com/p/50358654)