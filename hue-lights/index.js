const hue = require('node-hue-api');

const host = '192.168.0.6';
const user = '08a902b95915cdd9b75547cb50892dc4';
const light = 2;

const api = new hue.HueApi(host, user);

const stateOn = hue.lightState.create().on();
const stateBrightOn = hue.lightState.create().on().brightness(100);
const stateDimmedOn = hue.lightState.create().on().brightness(5);
const stateOff = hue.lightState.create().off();
const stateLongAlert = hue.lightState.create().longAlert();
const red = hue.lightState.create().on().rgb([255, 0, 0]);
const green = hue.lightState.create().on().rgb([0, 255, 0]);
const blue = hue.lightState.create().on().rgb([0, 0, 255]);

function wait() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

api.setLightState(light, red)
  .then(() => wait())
  .then(() => api.setLightState(light, green))
  .then(() => wait())
  .then(() => api.setLightState(light, blue))
  .then(() => wait())
  .then(() => api.setLightState(light, red))
  .then(() => api.setLightState(light, stateLongAlert))
  .then(() => wait())
  .then(() => api.setLightState(light, stateOff))
  .catch(err => console.log('error', err));
