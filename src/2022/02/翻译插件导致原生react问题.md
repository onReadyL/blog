## 这是运营发现的问题

运营同事反映操作标签树（react+antd:tree）导致页面Oops!

开发组都没复现这个问题，无奈找到运营的位置现场看操作。

也复现了：

```
react_devtools_backend.js:4061 DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

一时找不到问题所在！

眼尖的测试同事发现树的root翻译成了根，随关闭翻译插件，恢复正常！

掘金搜到一篇文章：https://juejin.cn/post/6844904180428046343

采用了增加错误边界处理方法，相关代码：
ErrorBoundary.js
```js
class ErrorBoundary extends React.Component {
    static getDerivedStateFromError() {
        if (document.documentElement.classList.contains('translated-ltr')) {
            return { translateError: true };
        }
    }

    constructor(props) {
        super(props);
        this.state = { error: null, translateError: false };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
    }

    render() {
        const { translateError } = this.state;
        if (this.state.error) {
            return (
                <Suspense fallback={<div>loading</div>}>
                    <ErrorComp translateError={translateError} />
                </Suspense>
            );
        } else {
            return this.props.children;
        }
    }
}
```
ErrorComp.js
```
const Error = (props) => {
    const { translateError = false } = props;
    return (
        <div className="error">
            <div className="error_animation">
                <div className="error_animation-red" />
                <div className="error_animation-blue" />
            </div>
            <h1>
                opps
                <small>An error has occurred</small>
                {translateError && (
                    <small>translate error! you' d better to turn your translation-plugin off and reload</small>
                )}
                <small style={{ cursor: 'pointer' }} onClick={() => (window.location.href = '#/')}>
                    Go Home
                </small>
            </h1>
        </div>
    );
};
```

## 思考：各浏览器都适用？

测试发现竟然只有chrome适用（测试对象：firefox,edge,chrome）!

且我发现edge翻译处理和chrome并不一样（chrome是加font标签包裹叶子元素，edge是加_msthash），这样一来文章中另一种方案也没法处理！

退而求其次：

思来想去，错误边界处理是目前仅有的杜绝白屏处理方案（兼容主流浏览器）！！只不过无法检测是否启用了插件。

内心：Ooops!