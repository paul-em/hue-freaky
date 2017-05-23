const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const leftServo = new five.Servo({
    pin: 9,
    center: true
  });
  const rightServo = new five.Servo({
    pin: 10,
    center: true
  });

  leftServo.to(0);
  rightServo.to(180);
  leftServo.to(85, 500);
  rightServo.to(85, 500);
});