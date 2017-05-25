const five = require('johnny-five');
const board = new five.Board();

const motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

board.on('ready', function ready() {
  console.log('board ready');
  const leftMotor = new five.Motor(motorConfigs.M1);
  const rightMotor = new five.Motor(motorConfigs.M3);
  const pingLeft = new five.Proximity({
    controller: "HCSR04",
    pin: 30,
    freq: 500
  });
  const pingMiddle = new five.Proximity({
    controller: "HCSR04",
    pin: 32,
    freq: 500
  });
  const pingRight = new five.Proximity({
    controller: "HCSR04",
    pin: 34,
    freq: 500
  });


  pingLeft.on('data', (data) => {
    // console.log('LEFT', data.cm);
  });
  pingMiddle.on('data', (data) => {
    // console.log('MIDDLE', data.cm);
  });
  pingRight.on('data', (data) => {
    // console.log('RIGHT', data.cm);
  });
  this.analogRead(1, function (data) {
    // console.log('analogRead', data);
  });
  leftMotor.forward(255);
  rightMotor.reverse(255);
  console.log('spinning!');


  setTimeout(() => {
    console.log('stopping');
    leftMotor.stop();
    rightMotor.stop();
  }, 2000)

});