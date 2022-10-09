// node/websocket.js

const WebSocket = require('ws');

const events = [];
let latestTimestamp = Date.now();

const clients = new Set();

const EventProducer = () => {
	const event = {
		id: Date.now(),
		timestamp: Date.now(),
	};
	events.push(event);
	latestTimestamp = event.timestamp;

	// 推送给所有连接着的socket
	clients.forEach((client) => {
		client.ws.send(JSON.stringify(events.filter((event) => event.timestamp > client.timestamp)));
		client.timestamp = latestTimestamp;
	});
};

// 每5秒生成一个新的事件
setInterval(() => {
	EventProducer();
}, 5000);

// 启动socket服务器
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
	console.log('client connected');

	// 首次连接，推送现存事件
	ws.send(JSON.stringify(events));

	const client = {
		timestamp: latestTimestamp,
		ws,
	};
	clients.add(client);

	ws.on('close', (_) => {
		clients.delete(client);
	});
});
