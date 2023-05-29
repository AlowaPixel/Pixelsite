// Pong by @De_Pixelaar in JavaScript using p5.js

class ComPlayer extends Player {
  constructor() {
    super();
    this.dir = 1;
    this.x = 0 + this.paddleWidth;
    this.y = random(height);
  }

  display = function() {
    rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
  }

  move = function(maxVel) {
    this.y += random(maxVel) * this.dir;

    // checking if paddle collides with top or bottom
    if ((this.y <= 0 && this.dir == -1) || (this.y + this.paddleHeight >= height && this.dir == 1)) {
      this.dir *= -1;
    }
  }
}
