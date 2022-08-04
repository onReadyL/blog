class eventEmitter {
	list = [];

	/** 订阅 */
	on(event, fn) {
		(this.list[event] || (this.list[event] = [])).push(fn);
		return this;
	}

	/** 订阅一次 */
	once(event, fn) {
		const temp = function () {
			this.off(event, temp);
			fn.apply(this, arguments);
		};
		temp.fn = fn; // 目的在于还未发布事件时，可以取消订阅
		this.on(event, temp);
		return this;
	}

	/** 发布订阅 */
	emit() {
		const arr = Array.from(arguments);
		const event = arr[0];
		const param = arr[1];

		const fns = this.list[event];
		if (!fns || fns.length === 0) {
			return false;
		}
		fns.forEach((fn) => {
			fn.apply(this, [param]);
		});
		return this;
	}

	/** 取消订阅 */
	off(event, fn) {
		const fns = this.list[event];
		if (!fns || !fns.length) return false;
		if (!fn) {
			fns = [];
		} else {
			this.list[event] = fns.filter((curFn) => curFn !== fn || curFn.fn !== fn);
		}
		return this;
	}
}

function user1(content) {
	console.log('用户1订阅了:', content);
}

function user2(content) {
	console.log('用户2订阅了:', content);
}

function uesr3(content) {
	console.log('用户3订阅了一次：', content);
}

function user4(content) {
	console.log('用户4订阅了：', content);
}

const lisenter = new eventEmitter();

lisenter.on('article', user1);
lisenter.on('article', user2);
lisenter.once('article', uesr3);

lisenter.off('article', user2);

lisenter.on('article1', user2);

lisenter.emit('article', 'Javascript 发布-订阅模式');
lisenter.emit('article', '观察者模式');
lisenter.emit('article1', '策略模式');
