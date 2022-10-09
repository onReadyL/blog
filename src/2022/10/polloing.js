// 短轮询后台实现

const http = require('http');
const url = require('url');

// 事件列表
const events = [];
// 最新生成的事件时间
let latestTimestamp = 0;

const eventProducer = () => {
	const event = {
		id: Date.now(),
		timestamp: Date.now(),
	};
	events.push(event);
	latestTimestamp = event.timestamp;
};

setInterval(() => {
	eventProducer();
}, 5 * (1 + Math.random()) * 1000);

const server = http.createServer((req, res) => {
	const urlParsed = url.parse(req.url, true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Origin', '*');

	if (urlParsed.pathname === '/events') {
		const timestamp = parseInt(urlParsed.query['timestamp']);
		if (timestamp < latestTimestamp) {
			res.write(JSON.stringify(events.filter((event) => event.timestamp > timestamp)));
		}
		res.end();
	}
	req.on('close', () => {
		console.log('客户端断开');
	});
});

server.listen(8080, () => {
	console.log('server is up!');
});
