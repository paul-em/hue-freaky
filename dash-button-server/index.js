const dashButton = require('node-dash-button');
const config = require('../config');

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


dashButton(dashButtons.map(button => button.address)).on('detected', (address) => {
  const button = dashButtons.find(button => button.address === address);
  console.log('press detected!', address, button.brand);
});
