const five = require('johnny-five');
const board = new five.Board({ port: 'COM4' });

let attitudeTimeout;
let servo;

function slowFake() {
  attitudeTimeout = setTimeout(() => {
    servo.to(50, 1000);
    attitudeTimeout = setTimeout(() => {
      servo.to(0);
    }, 1500);
  }, 500);
}

function showDominance(times) {
  if (!times) {
    attitudeTimeout = setTimeout(() => {
      servo.to(0);
    }, 200);
    return;
  }
  attitudeTimeout = setTimeout(() => {
    servo.to(180);
    attitudeTimeout = setTimeout(() => {
      servo.to(160);
      showDominance(--times);
    }, 200);
  }, 200);
}

function attitude() {
  if (Math.random() > 0.8) {
    slowFake();
  } else if (Math.random() > 0.5) {
    showDominance(Math.floor(Math.random() * 10));
  }
}


board.on('ready', function ready() {
  let switchFlipped = true;
  this.analogRead(2, (data) => {
    if (switchFlipped !== data > 500) {
      switchFlipped = !switchFlipped;
      clearTimeout(attitudeTimeout);
      console.log('switch flipped!', switchFlipped ? 'On' : 'Off');
      if (switchFlipped) {
        servo.to(180);
      } else {
        servo.to(0);
        attitude();
      }
    }
  });
  servo = new five.Servo({
    pin: 8,
    center: true
  });
});