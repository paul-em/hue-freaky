const hue = require('node-hue-api');

const api = new hue.HueApi();
const host = '192.168.1.6';

api.registerUser(host, 'Paul')
  .then(user => console.log('created user', user))
  .catch(err => console.log('Error creating user', err));