// 长轮询后台实现

const http = require('http');
const url = require('url');

const events = [];

let timers = new Set();

let subscribers = new Set();

const eventProducer = () => {
	const event = {
		id: Date.now(),
		timestamp: Date.now(),
	};
	events.push(event);

	subscribers.forEach((subscriber) => {
		subscriber.res.write(
			JSON.stringify(events.filter((event) => event.timestamp > subscriber.timestamp)),
		);
		subscriber.res.end();
	});

	subscribers.clear();

	timers.forEach((time) => clearTimeout(time));

	timers.clear();
};

setInterval(() => {
	eventProducer();
}, 10000);

const server = http.createServer((req, res) => {
	const urlParsed = url.parse(req.url, true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Origin', '*');

	if (urlParsed.pathname === '/list') {
		res.write(JSON.stringify(events));
		res.end();
	} else if (urlParsed.pathname === '/subscribe') {
		// console.log('subscribe');
		const timestamp = parseInt(urlParsed.query['timestamp']);
		const subscriber = {
			timestamp,
			res,
		};

		subscribers.add(subscriber);

		const timer = setTimeout(() => {
			// console.log('timeout');
			res.end();
			timers.delete(timer);
		}, 300000);

		req.on('close', () => {
			// console.log('close');
			subscribers.delete(subscriber);
			clearTimeout(timer);
		});

		timers.add(timer);
	}
});

server.listen(8080, () => {
	console.log('server is up');
});
