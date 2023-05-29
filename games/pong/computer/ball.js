// Pong by @De_Pixelaar in JavaScript using p5.js

class Ball {
  constructor() {
    this.xvel = 0;
    this.yvel = 0;
    this.xdir = 1;
    this.ydir = 1;
    this.size = 20;
    this.x = width / 2 - this.size / 2;
    this.y = height / 2 - this.size / 2;
  }

  display = function() {
    square(this.x, this.y, this.size)
  }

  move = function() {
    this.x += this.xvel * this.xdir;
    this.y += this.yvel * this.ydir;

    // checking if ball collides with top or bottom
    if (this.y <= 0 || this.y + this.size >= height) {
      this.ydir *= -1;
    }
  }
}
