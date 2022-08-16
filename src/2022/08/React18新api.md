看到react文档[hooks索引](https://zh-hans.reactjs.org/docs/hooks-reference.html)这一篇，发现两个有意思的hook api:<code>useDeferredValue</code>和<code>useTransition</code>

> <code>useDeferredValue</code>: useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。如果当前渲染是一个紧急更新的结果，比如用户输入，React 将返回之前的值，然后在紧急渲染完成后渲染新的值

> <code>useTransition</code>：返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数

[使用指南-link](https://blog.shabby.in/how-to-use-useTransition/useDerferredValue/)

写了[例子-link](https://github.com/onReadyL/test-react/blob/master/src/tests/useDeferredValue/index.jsx)来理解这两个api

总结：这两个api用来做非紧急任务的优化还不错