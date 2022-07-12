## 最近在用puppeteer和node:child)process都看到有EventEmitter的身影，于是就来学习学习

<code>EventEmitter</code>类是<code>Node.js</code>的内置类，位于<code>events</code>模块。根据文档中的描述：

> Node.js 的大部分核心 API 都是围绕惯用的异步事件驱动架构构建的，在该架构中，某些类型的对象（称为"触发器"）触发命名事件，使 Function 对象（"监听器"）被调用

这个类在某种程度上可以描述为 <i>发布-订阅模型</i> 的辅助工具的实现，因为它可以用简单的方法帮助事件发送器（发布者）发布事件（消息）给监听器（订阅者）。

### Talk is cheap. Show me the code.

```Node
const { EventEmitter } = require('events');

const timerEventEmitter = new EventEmitter();

let currentTime = 0;

setInterval(() => {
    currentTime++;
    timerEventEmitter.emit('update', currentTime); // 发布事件
}, 1000);

timerEventEmitter.on('update', (time) => {
    console.log('从发布者接受到消息');
    console.log(time);
});

```
结果

```console
从发布者接受到消息
1
从发布者接受到消息
2
从发布者接受到消息
3
...
```

通过<code>emit(eventName[, ...args])</code>方法触发发射器，第一个参数作为事件名称，第二个及后面的参数作为接收器的参数，node文档：

> 按注册顺序同步地调用为名为 eventName 的事件注册的每个监听器，并将提供的参数传给每个监听器。  
如果事件有监听器，则返回 true，否则返回 false。

通过<code>on(eventName, listener)</code>方法作为侦听器。on() 函数的第二个参数是一个回调，可以接受事件发出的附加数据。

如果只在事件首次触发时才需要执行某些操作，也可以用 once() 方法进行订阅：

```
timerEventEmitter.once('update', (time) => {
  console.log('从发布者收到的消息：');
  console.log(time);
});
```

这段代码将会打印：

```
从发布者接受到消息
1
```

### I Got It!!

附node:events文档：<a>http://nodejs.cn/api/events.html</a>

### 错误处理
如果要在 <code>EventEmitter</code> 发出错误，必须用 <code>'error'</code> 事件名来完成。这是 Node.js 中所有 EventEmitter 对象的标准配置。这个事件必须还要有一个 Error 对象。例如可以像这样发出错误事件:
```
myEventEmitter.emit('error', new Error('出现了一些错误'));
```

error 事件的侦听器都应该有一个带有一个参数的回调，用来捕获 Error 对象并处理。如果 EventEmitter 发出了 error 事件，但是没有订阅者订阅 error 事件，那么 Node.js 程序将会抛出这个 Error。这会导致 Node.js 进程停止运行并退出程序，同时在控制台中显示这个错误的跟踪栈。

始终对 error 事件进行监听是一种很专业的做法