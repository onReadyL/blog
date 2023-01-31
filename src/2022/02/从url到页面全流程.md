## 终于来记录这一知识点了（好记性不如烂笔头）

> 先贴一个链接：<https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work>

1. URL解析: 将url解析成IP

2. DNS 查找:浏览器通过服务器名称请求DNS进行查找，最终返回一个IP地址，第一次初始化请求之后，这个IP地址可能会被缓存一段时间，这样可以通过从缓存里面检索IP地址而不是再通过域名服务器进行查找来加速后续的请求

3. TCP握手

4. 建立连接，服务器返回

5. 构造dom树，css树

6. 构造render树

7. 构造layout树

8. GPU渲染

9. javascript导致回流