## Web Workers

来源：

[MDN-使用web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers#web_workers_api)

口述：
> 创建一个独立的worker线程，独立的作用域，不同于window的属性和方法，用户计算量大的操作，与主线程异步通信。

分类：专用worker（Worker）共享workder（SharedWorker）

### 专用worker:
```
    const myWorker = new Worker('worker.js');// worker.js为一个执行的脚本路径
```

通信方式：<code>postMessage</code> & <code>onmessage</code>

```
    myWorker.postMessage([value1,value2]); // 数据为任何可序列化对象
    myWorker.onmessage = (e) => {
        e.data
    } // 接受的消息放入e.data中
```

```
//worker.js
onmessage = function(e) {
    const workerResult = e.data[0] * e.data[1]; // 接受外部数据并计算
    postMessage(workerResult); // 抛出计算结果
}
```

值得注意的是：当一个消息在主线程和 worker 之间传递时，它被复制或者转移了，而不是共享

终止worker
```
// 主线程
myWorker.terminate();
// workder线程
close();
```
错误处理
```
// workder.js
onerror = function(e){
    const{message,filename,lineno} = e;
    console.log(`消息体：${message},文件名：${filename},行号：${lineno}`)
}
```



