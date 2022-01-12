# ES2017

## Object.getOwnPropertyDescriptors()

> Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述

```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);
// 打印结果
{
  name: {
    value: 'jimmy', //@{value} 表示当前对象
    writable: true, //@{writable} 对象属性是否可修改
    enumerable: true, //@{enumerable} 这个对象是否可枚举
    configurable: true //@{configurable} 是否可删除
  },
  age: {
   value: 18,
   writable: true,
   enumerable: true,
   configurable: true
  }
}
```

---

## String.prototype.padStart

> 把指定字符串填充到字符串头部，返回指定长度字符串

```
str.padStart(targetLength [, padString])
```

- targetLengt

  当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

- padString(可选)

  填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

```js
'abc'.padStart(10); // "       abc"
'abc'.padStart(10, 'foo'); // "foofoofabc"
'abc'.padStart(6, '123465'); // "123abc"
'abc'.padStart(8, '0'); // "00000abc"
'abc'.padStart(1); // "abc"
```

### 应用场景

日期格式化：yyyy-mm-dd 的格式

```js
const now = new Date();
const year = now.getFullYear();
// 月份和日期 如果是一位前面给它填充一个0
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
console.log(year, month, day);
console.log(`${year}-${month}-${day}`); //输入今天的日期 2021-12-30
```

数字替换（手机号，银行卡号等）

```js
const tel = '18030994845';
const newTel = tel.slice(-4).padStart(tel.length, '*'); // *******8679
```

### padEnd

> 把指定字符串填充到字符串尾部，返回新字符串。

```
str.padEnd(targetLength [, padString])
```

- targetLengt

  当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

- padString(可选)

  填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

# ES2018

## for await of

异步迭代器(for-await-of)：循环等待每个 Promise 对象变为 resolved 状态才进入下一步

我们知道 for...of 是同步运行的，看如下代码:

```js
function TimeOut(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(time);
		}, time);
	});
}

async function test() {
	let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)];
	for (let item of arr) {
		console.log(item.then(console.log));
	}
}

test();
// 1000
// 2000
// 3000
```

上述代码证实了 for of 方法不能遍历异步迭代器，得到的结果并不是我们所期待的，于是就有了 for await of

```js
function TimeOut(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(time);
		}, time);
	});
}

async function test() {
	let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)];
	for await (let item of arr) {
		console.log(Date.now(), item);
	}
}
test();
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```

## Promise.prototype.finally()

Promise.prototype.finally() 方法返回一个 Promise，在 promise 执行结束时，无论结果是 fulfilled 或者是 rejected，在执行 then()和 catch()后，都会执行 finally 指定的回调函数。这为指定执行完 promise 后，无论结果是 fulfilled 还是 rejected 都需要执行的代码提供了一种方式，避免同样的语句需要在 then()和 catch()中各写一次的情况

```js
new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success');
		// reject('fail')
	}, 1000);
})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		console.log('finally');
	});
```

- 使用场景
  需要每次发送请求，都会有 loading 提示，请求发送完毕，就需要关闭 loading 提示框，不然界面就无法被点击。不管请求成功或是失败，这个 loading 都需要关闭掉，这时把关闭 loading 的代码写在 finally 里再合适不过了

# ES2019

## Object.fromEntries()

方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的

- Object 转换

```js
const obj = {
	name: 'jimmy',
	age: 18,
};
const entries = Object.entries(obj);
console.log(entries);
// [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries);
console.log(fromEntries);
// {name: "jimmy", age: 18}
```

- Map 转 Object

```js
const map = new Map();
map.set('name', 'jimmy');
map.set('age', 18);
console.log(map); // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map);
console.log(obj);
// {name: "jimmy", age: 18}
```

- url 的 search 参数转换

```js
const queryString = '?name=jimmy&age=18&height=1.88';
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```

## Array.prototype.flatMap()

flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为 1

```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

- callback

可以生成一个新数组中的元素的函数，可以传入三个参数：

currentValue：
当前正在数组中处理的元素

index(可选)：数组中正在处理的单签元素的索引

array(可选):被调用的 map 数组

- thisArg(可选)

执行 callback 函数时，使用的 this 的值

```js
let arr = ['今天天气不错', '', '早上好'];
arr.map((s) => s.split(''));
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap((s) => s.split(''));
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

## String.prototype.trimStart()

trimStart()方法从字符串开头删除空格，trimRight 是 trimEnd 的别名

```js
let str = '   foo  ';
console.log(str.length); // 8
str = str.trimEnd(); // 或str.trimRight()
console.log(str.length); // 6
```

## 可选的 Catch Binding

在 ES10 之前我们都是这样捕获异常：

```js
try {
    ...
} catch (err) {
    ....
}
```

在这里 err 是必须参数，在 ES10 我们可以省略这个参数：

```js
try {
    ...
} catch {
    ...
}
```

#### 应用

验证参数是否 json 格式

```js
const validJson = (json) => {
	try {
		JSON.parse(json);
		return true;
	} catch {
		return false;
	}
};
```

# ES2020

## 空值合并运算符

空值合并操作符（ ?? ）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数

```js
const foo = undefined ?? 'foo';
const bar = null ?? 'bar';
console.log(foo); // foo
console.log(bar); // bar
```

与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如'',0,NaN,false）时。见下面的例子。

```js
const foo = '' ?? 'default string';
const foo2 = '' || 'default string';
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42
```
