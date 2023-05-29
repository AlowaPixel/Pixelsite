// Pong by @De_Pixelaar in JavaScript using p5.js

class Player {
  constructor() {
    this.paddleWidth = 20;
    this.paddleHeight = 100;
    this.y = height / 2 - this.paddleHeight / 2;
    this.x = width - this.paddleWidth * 2;
    this.score = 0;
    this.speed;
  }

  display = function() {
    rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
  }

  setSpeed = function() {
    // Set speed if box is not empty
    let speedBox = document.getElementById('playerSpeed');
    if (!speedBox.value == '') {
      this.speed = abs(parseFloat(speedBox.value));
    }
  }
}
