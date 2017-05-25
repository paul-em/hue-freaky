const WebSocket = require('ws');
const dashButton = require('node-dash-button');

const wss = new WebSocket.Server({ port: 80 });

const dashButtons = [
  {
    address: 'ac:63:be:8b:f2:32',
    brand: 'Somat',
  },
  {
    address: '50:f5:da:42:94:1e',
    brand: 'Oral-B',
  },
  {
    address: 'ac:63:be:60:be:c4',
    brand: 'Gillete',
  },
  {
    address: '0c:47:c9:1a:5d:6f',
    brand: 'Nerf',
  },
];


dashButton(dashButtons.map(button => button.address), null, null, 'all').on('detected', (address) => {
  const button = dashButtons.find(button => button.address === address);
  console.log(new Date(), 'press detected!', address, button.brand);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(button.brand);
    }
  })
});

wss.on('connection', (ws) => {
  console.log(new Date(), 'client connected');
  ws.on('close', () => {
    console.log(new Date(), 'client disconnected');
  });
});
