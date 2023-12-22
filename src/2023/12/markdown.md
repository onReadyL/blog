>最近公司任务轻了，想着继续记录些内容。
>
> 但是好久没写了，markdown语法记不真切了，看markdown文档属实不方便。
>
> 那就单独拿一页来写markdown的语法吧。

- ## 标题语法

# 一级标题(自带下划线)
一级标题另一种实现方式
=====
## 二级标题(自带下划线)
二级标题另一种实现方式
----
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

- ## 强调语法

1. 粗体

- 这是一个强调 **内容** 的语句（最佳实践）

- 这是又是一个强调 __内容__ 的语句

2. 斜体

- *斜体效果*（最佳实践）
- _也是斜体效果_

3. 粗体加斜体

- ***粗体加斜体效果***(最佳实践)
- ___也是粗体加斜体的效果___

### 引用语法

1. > 引用模块

2. > 多个引用模块
   >
   > 多个引用模块(段落之间加个空的 > )

3. > 嵌套引用
   >> 嵌套引用
   >>> 继续嵌套

4. >带其他元素
   >
   > - 列表
   > - 列表
   >
   > ***斜体加粗***

### 列表语法
 1. first item
 2. second item
 3. third item
    1. Indented item
    1. Indented item
 3. fourth item

 - first
 - secend
 - thired
 * fourth
    * indented
    * indented
 * fifth
 + sixth
 + seventh
    > 嵌套其他内容
    <html>
        dom节点
    </html>

    ![图片](../../static/ergou.jpg)
 + eighth

### 代码语法

语句中插入`coding`,``插入转义`coding`代码,``

`
    <html>
        代码块
    </html>
`

### 分割线

要创建分隔线，请在单独一行上使用三个或多个星号 (***)、破折号 (---) 或下划线 (___) ，并且不能包含其他内容

1. ***

1. ---

1. __________

### 链接语法

链接文本放在中括号内，链接地址放在后面的括号中，链接title可选

1. 超链接Markdown语法代码：[超链接显示名](超链接地址 "超链接title")

1. 网址[Github](https://www.github.com "github")&&<https://www.github.com>

1. 邮箱：<example@foxmail.com>

### 图片语法

![这是一直文鸟](../../static/xiaosan.jpg)

### 转义字符语法

\* 

\[]

\ <>

```jsx
    // 代码块
    function name(){
        return false;
    }
```