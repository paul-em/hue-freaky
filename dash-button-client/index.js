const WebSocket = require('ws');

const ws = new WebSocket('ws://192.168.1.4');

ws.on('open', () => {
  console.log('connection open');
});

ws.on('message', (data) => {
  console.log('MESSAGE!', data);
});