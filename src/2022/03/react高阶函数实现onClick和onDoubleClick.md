## 最近在处理一个组件，该组件同时实现单击、双击功能
> 原生标签本来支持onClick和onDoubleClick,但是onDoubleClick之前会触发两次onClick

```
const Element = ({ 
        onClick = () => { console.log('click')},
        onDoubleClick = () => { console.log('doubleClick')}
    }) => {
        return (
            <div 
                onClick={onClick} 
                onDoublcClick={onDoubleClick}
            >
                    click or doubleClick
                </div>
        )
};
// 双击
// 'click'
// 'click'
// 'doubleClick'
```

避免双击时造成无法估计的错误，所以换其他方式实现：

## 方法一：

```
let count = 0;
const Element = ({ 
        onClick = () => { console.log('click')},
        onDoubleClick = () => { console.log('doubleClick')}
    }) => {
        return (
            <div 
                onClick={() => {
                    count += 1;
                    setTimeout(() => {
                        if(count === 1){
                            onClick()
                        } else if (count === 2) {
                            onDoubleClick() 
                        }
                        count = 0;
                    }, 300)
                }} 
             >
                    click or doubleClick
                </div>
        )
};
// 双击
// 'doubleClick'
```

## 方法二：

高阶组件实现

```
// 实现一个可取消的promise（类似axios的cancelToken实现）
const cancelablePromise = promise => {
    let isCanceled = false;
    const wrappedPromise = new Promise((res, rej) => {
        promise.then(
            (value) => { isCancel ? rej({ isCanceled, value }) : res(value)},
            (error) => rej({ isCanceled, error }),
        );
    });

    return {
        promise: wrappedPromise,
        cancel: () => ( isCanceled = true )
    }
}

// 延迟函数
const delay = time => new Promise(resolve => setTimeout(resolve, time));

import React, { useRef } from 'react';
// 高阶函数
const HOC_handleClickDoubleClick = WrappedComponent => {
    return class extends React.Component {
        componentWillUnmount() {
            this.clearPendingPromises();
        }   
        constructor(props) {
            super(props);
            this.pendingPromise = [];
        }

        appendPendingPromise = promise => (this.pendingPromises = [...this.pendingPromises, promise]);

        removePendingPromise = promise => (this.pendingPromises = this.pendingPromises.filter(p => p !== promise));

        clearPendingPromises = () => this.pendingPromises.map(p => p.cancel());

        handleClick = (e) => {
            const waitForClick = cancelablePromise(dalay(300));
            this.appendPendingPromise(waitForClick);
            return waitForClick.promise.then(() => {
                this.removePendingPromise(waitForClick);
                this.props.onClick(e);
            }).catch((errorInfo) => {
                this.removePendingPromise(waitForClick);
                if (!errorInfo.isCanceled) {
                    throw errorInfo.error;
                }
            })
        }

        handleDoubleClick = (e) => {
            this.clearPendingPromises();
            this.props.onDoubleClick(e);
        };

        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                />
            )
        }
    }
}

// 基础组件
const ClickableBox = ({ 
    onClick = () => {}, 
    onDoubleClick = () => {} 
}) => (
    <button onClick={onClick} onDoubleClick={onDoubleClick}>
        Click or double click
    </button>
);

// 高阶组件包裹
const EnhancedClickableBox = HOC_handleClickDoubleClick(ClickableBox)

// 使用
const DoubleClickExample = () => {
    <EnhancedClickableBox 
        onClick={() => {console.log('click')}} 
        onDoubleClick={() => {console.log('doubleClick')}} 
    />
}

// 挂载
const App = () => {
    return (
        <DoubleClickExample />
    )
}
ReactDOM.render(<App />, document.getElementById('app'));
```