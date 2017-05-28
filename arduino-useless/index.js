const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function ready() {
  let switchFlipped = true;
  this.analogRead(2, (data) => {
    if (switchFlipped !== data > 500) {
      switchFlipped = !switchFlipped;
      console.log('switch flipped!', switchFlipped ? 'On' : 'Off');
    }
  });
  const servo = new five.Servo({
    pin: 8,
    center: true
  });
  servo.to(180);
});