const dashButton = require('node-dash-button');
const config = require('../config');

dashButton(config.dashButtonAddresses).on('detected', (id) => {
  console.log('press detected!', id, config.dashButtonBrands[config.dashButtonAddresses.indexOf(id)]);
});