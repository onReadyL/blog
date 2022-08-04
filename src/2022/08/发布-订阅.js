/** 发布者构造器 */
class Publish {
	constructor(name = 'publisher') {
		this.name = name;
		this.messageMap = {}; // 消息事件订阅者集合对象
		this.id = Date.now() + Math.ceil(Math.random() * 10000);
	}

	addListener(subscriber, message) {
		if (!subscriber || !message) return false;
		if (!this.messageMap[message]) {
			this.messageMap[message] = [];
		}
		const existIndex = this.messageMap[message].findIndex(
			(exitSubscriber) => exitSubscriber.id === subscriber.id,
		);
		if (existIndex === -1) {
			this.messageMap[message].push(subscriber);
		} else {
			this.messageMap[message][existIndex] = subscriber;
		}
	}

	removeListener(subscriber, message) {
		if (!subscriber) return false;
		const messages = message ? [message] : Object.keys(this.messageMap);
		messages.forEach((_message) => {
			const subscribers = this.messageMap[_message];
			const exitSubscriberIndex = subscribers.findIndex(
				(_subscriber) => _subscriber.id === subscriber.id,
			);
			if (exitSubscriberIndex !== -1) {
				subscribers.splice(exitSubscriberIndex, 1);
			}
			if (!subscribers.length) {
				delete this.messageMap[_message];
			}
		});
	}

	publish(message, info) {
		const subscribers = this.messageMap[message] || [];

		subscribers.forEach((subscriber) => {
			subscriber[`${message}_${this.id}_handler`](subscriber, info);
		});
		return this;
	}
}

/** 订阅者构造器 */
class Subscribe {
	constructor(name = 'subscriber') {
		this.name = name;
		this.id = Date.now() + Math.ceil(Math.random() * 10000);
	}

	/** 订阅
	 * @param {object} option
	 * @param {Publish} option.publisher 发布者
	 * @param {string} option.message 订阅事件名
	 * @param {function} option.handler 订阅处理函数
	 * @return {Subscribe} Subscribe 订阅者
	 */
	listen({ publisher, message, handler }) {
		if (publisher instanceof Publish) {
			this[`${message}_${publisher.id}_handler`] = handler;
			publisher.addListener(this, message);
		}
		return this;
	}

	/** 订阅一次 */
	onceListen({ publisher, message, handler }) {
		if (publisher instanceof Publish) {
			this[`${message}_${publisher.id}_handler`] = (subscriber, info) => {
				handler(subscriber, info);
				this.unlisten({ publisher, message });
			};
			publisher.addListener(this, message);
		}
		return this;
	}

	/** 取消订阅 */
	unlisten({ publisher, message }) {
		if (publisher instanceof Publish) {
			publisher.removeListener(this, message);
			delete this[`${message}_${publisher.id}_handler`]; // 删除订阅者里面的函数
		}
		return this;
	}
}

const juejin = new Publish('juejin');
const sifou = new Publish('sifou');
const github = new Publish('github');

const programmerA = new Subscribe('programmerA');
const programmerB = new Subscribe('programmerB');

programmerA
	.listen({
		publisher: juejin,
		message: 'javascript',
		handler: (self, info) => {
			console.log('A: juejin发布了javascript的消息');
			console.log(info);
		},
	})
	.onceListen({
		publisher: sifou,
		message: 'java',
		handler: (self, info) => {
			console.log('A: sifou发布了javascript的消息');
			console.log(info);
		},
	})
	.onceListen({
		publisher: sifou,
		message: 'java',
		handler: (self, info) => {
			console.log('A: sifou发布了java的消息');
			console.log(info);
		},
	});

programmerB.listen({
	publisher: juejin,
	message: 'javascript',
	handler: (self, info) => {
		console.log('B: juejin发布了javascript的消息');
		console.log(info);
	},
});

juejin.publish('javascript', { key: 1 });
sifou.publish('java', { key: 2 });
sifou.publish('java', { key: 3 });

console.log(juejin);
