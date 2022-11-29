// 手写常用工具函数

const someType = {
	type: Object.prototype.toString.call,
	isObject: function () {
		return this.type(arguments) === '[object Object]';
	},
	isArray: function () {
		return this.type(arguments) === '[object Array]';
	},
};

// 防抖函数
export function debounce(func, ms = 1000) {
	let timer;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			func.apply(this, args);
		}, ms);
	};
}

// 节流
export function throttle(func, ms = 1000) {
	let canRun = true;
	return function (...args) {
		if (!canRun) {
			return;
		}

		canRun = false;
		setTimeout(() => {
			func.apply(this, args);
			canRun = true;
		}, ms);
	};
}

/** new */
export function myNew(func, ...args) {
	const instance = {};
	if (func.prototype) {
		Object.setPrototypeOf(instance, func.prototype);
	}

	const res = func.apply(instance, args);
	if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
		return res;
	}

	return instance;
}

/** bind */
Function.prototype.myBind = function (context) {
	const fn = this;
	const args = Array.from(arguments).slice(1);
	const newFunc = function () {
		const newArgs = args.concat(...arguments);
		if (this instanceof newFunc) {
			fn.apply(this, newArgs);
		} else {
			fn.apply(context, newArgs);
		}
	};
	newFunc.prototype = Object.create(fn.prototype);
	return newFunc;
};

/** call */
Function.prototype.myCall = function (context) {
	const key = Symbol('key');
	context[key] = this;
	const args = [...arguments].slice(1);
	const res = context[key](...args);
	delete context[key];
	return res;
};

/** apply */
Function.prototype.myApply = function (context) {
	const key = Symbol('key');
	context[key] = this;
	let res;
	if (arguments[1]) {
		res = context[key](...arguments);
	} else {
		res = context[key];
	}

	delete context[key];
	return res;
};

// /** deepCopy */
// function deepCopy(obj, cache = new WeakMap()) {
// 	if (!obj instanceof Object) {
// 		return obj;
// 	}
// }

/** 冒泡排序 */
const sort = (arr = []) => {
	if (!someType.isArray(arr)) return arr;
	const len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		let done = true;
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				done = false;
			}
		}
		if (done) {
			break;
		}
	}
	return arr;
};
