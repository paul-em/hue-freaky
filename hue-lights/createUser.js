const hue = require('node-hue-api');

const host = '192.168.0.6';

hue.registerUser(host)
  .then(user => console.log('created user', user))
  .catch(err => console.log('Error creating user', err));