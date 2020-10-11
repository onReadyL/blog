// 手写常用工具函数

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
