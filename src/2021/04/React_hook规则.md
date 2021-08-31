## React Hook 规则：

> 不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确

## 原因：

> 源码 hook 是以依次访问到的 hooks 顺序访问，一旦在条件语句中新加入 hook，之前的顺序就错乱了，导致渲染出错
