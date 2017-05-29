const five = require('johnny-five');
const board = new five.Board({ port: 'COM4' });

let attitudeTimeout;
let servo;

function slowFake() {
  servo.to(0);
  attitudeTimeout = setTimeout(() => {
    servo.to(50, 1000);
    attitudeTimeout = setTimeout(() => {
      servo.to(0);
    }, 1500);
  }, 2000);
}

function showDominance(times) {
  if (!times) {
    attitudeTimeout = setTimeout(() => {
      servo.to(0);
    }, 200);
    return;
  }
  servo.to(0);
  attitudeTimeout = setTimeout(() => {
    servo.to(180);
    attitudeTimeout = setTimeout(() => {
      servo.to(160);
      showDominance(--times);
    }, 200);
  }, 200);
}

function annoyed() {
  servo.to(50, 1000);
  attitudeTimeout = setTimeout(() => {
    servo.to(150);
    attitudeTimeout = setTimeout(() => {
      servo.to(0);
    }, 200);
  }, 1000);
}

function slowBackoff() {
  servo.to(0, 2000);
}

function regular() {
  servo.to(0);
}

function attitude() {
  const rand = Math.random();
  if (rand < 0.2) {
    console.log('slowFake');
    slowFake();
  } else if (rand < 0.4) {
    console.log('showDominance');
    showDominance(Math.floor(Math.random() * 10));
  } else if (rand < 0.6) {
    console.log('annoyed');
    annoyed();
  } else if (rand < 0.8) {
    console.log('slowBackoff');
    slowBackoff();
  } else {
    console.log('regular');
    regular();
  }
}


board.on('ready', function ready() {
  let switchFlipped = true;
  this.analogRead(2, (data) => {
    if (switchFlipped !== data > 500) {
      switchFlipped = !switchFlipped;
      clearTimeout(attitudeTimeout);
      servo.stop();
      console.log('switch flipped!', switchFlipped ? 'On' : 'Off');
      if (switchFlipped) {
        servo.to(180);
      } else {
        attitude();
      }
    }
  });
  servo = new five.Servo({
    pin: 8,
    center: true
  });
});