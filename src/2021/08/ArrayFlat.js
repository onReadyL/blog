// 数组扁平化处理

const arr1 = [1, 2, 3, [4, 5, [6, 7, [8, 9]]]];
const arr2 = [1, 2, , 3];

// Array.prototype.flat() 不兼容IE,移除空
arr1.flat(); // [1,2,3,4,5,[6,7,[8,9]]]
arr1.flat(2); // [1,2,3,4,5,6,7,[8,9]]
arr1.flat(Infinity); // [1,2,3,4,5,6,7,8,9]

arr2.flat(); // [1,2,3]

// 替代方案

// 展开一层
arr1.reduce((cur, pre) => cur.concat(pre), []); // [1,2,3,4,5,[6,7,[8,9]]]
[].concat(...arr1); // [1,2,3,4,5,[6,7,[8,9]]]

// 递归实现
const arrayFlat = (arr = []) => {
	if (!arr || !arr.length) return arr;
	let result = [];
	arr.forEach((item) => {
		if (Array.isArray(item)) {
			result = result.concat(arrayFlat(item));
		} else {
			result.push(item);
		}
	});
	return result;
};

// reduce实现
const arrayFlatByReduce = (arr = []) => {
	if (!arr || !arr.length) return arr;
	return arr.reduce((prev, cur) => {
		return prev.concat(Array.isArray(cur) ? arrayFlatByReduce(item) : cur);
	}, []);
};

// reduce + 递归
function flat(arr = [], num = 1) {
	return num > 0
		? arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur), [])
		: arr.slice();
}
