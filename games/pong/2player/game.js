// Pong by @De_Pixelaar in JavaScript using p5.js

let cnv;
let paused = false;
let gameEnded = false;

let ball;
let player;
let paddle2;

let gameEnds;

let w = false;
let s = false;
let up = false;
let down = false;

function setup() {
  cnv = createCanvas(1050,600);
  frameRate(60);
  stroke(255);
  fill(255);

  ball = new Ball();
  player = new Player();
  paddle2 = new Player2();

  textFont("Courier")
}

function draw() {
  gameEnds = document.getElementById('gameEnds').checked;
  background(0);
  strokeWeight(10);
  line(width / 2, -1, width / 2, height + 1);
  strokeWeight(0);

  // Set ball speed if box is not empty
  let ballSpeedBox = document.getElementById('ballSpeed');
  if (!ballSpeedBox.value == '') {
    ball.xvel = abs(parseFloat(ballSpeedBox.value));
    ball.yvel = abs(parseFloat(ballSpeedBox.value));
  }

  if (!paused) {
    ball.move();
  }
  ball.display();

  paddle2.setSpeed();
  paddle2.display();

  player.setSpeed();
  player.display();

  //Move paddles
  if (!paused) {
    if (w) {
      paddle2.y -= paddle2.speed;
    }
    if (s) {
      paddle2.y += paddle2.speed;
    }
    if (up) {
      player.y -= player.speed;
    }
    if (down) {
      player.y += player.speed;
    }

    //Making paddles stop at top and bottom
    //player paddle
    if (player.y < 0) {
      player.y = 0;
    }
    if (player.y + player.paddleHeight > height) {
      player.y = height - player.paddleHeight;
    }
    //player2 paddle
    if (paddle2.y < 0) {
      paddle2.y = 0;
    }
    if (paddle2.y + paddle2.paddleHeight > height) {
      paddle2.y = height - paddle2.paddleHeight;
    }
  }

  //Checking for collision with left and right edge
  if (ball.x + ball.size >= width || ball.x <= 0) {
    ball.x = width / 2 - ball.size / 2;
    ball.y = height / 2 - ball.size / 2;

    if (ball.xdir < 0 && !gameEnded) {
      player.score++;
    } else if (!gameEnded){
      paddle2.score++;
    }

    ball.xdir *= -1;
  }

  //Checking for collision with paddle (last condition to make sure ball doesn't get stuck inside or behind paddle)
  if (((ball.x + ball.size >= player.x) && (ball.y + ball.size >= player.y) && (ball.y <= player.y + player.paddleHeight) && (ball.xdir > 0)) || ((ball.x <= paddle2.x + paddle2.paddleWidth) && (ball.y + ball.size >= paddle2.y) && (ball.y <= paddle2.y + paddle2.paddleHeight) && (ball.xdir < 0))) {

    ball.xdir *= -1;
  }

  if (gameEnds) {
    if (player.score >= 11 && player.score > paddle2.score) {
      win(true);
    } else if (paddle2.score >= 11 && paddle2.score > player.score) {
      win(false);
    }
  } else {
    if (gameEnded) {
      paused = false;
    }
    gameEnded = false
  }

  textSize(45);
  textAlign(RIGHT);
  text(paddle2.score, width / 2 - 40, 40);
  text(player.score, width / 2 + 40 + textSize() / 2 * player.score.toString().length, 40);

  document.getElementById('framerate').innerHTML = round(frameRate());
}

function win(player1Won) {
  background(0);
  textAlign(CENTER);
  text("-", width / 2, 40);

  textSize(69); //Nice

  if (player1Won) {
    text("Right player wins!", width / 2, height / 2);
  } else {
    text("Left player wins!", width / 2, height / 2)
  }

  paused = true;
  gameEnded = true;
}

function keyPressed() {
  if (keyCode == ESCAPE) {
    paused = !paused;
  } else if (key == "w") {
    w = true;
  } else if (key == "s") {
    s = true;
  } else if (keyCode == UP_ARROW) {
    up = true;
  } else if (keyCode == DOWN_ARROW) {
    down = true;
  }
}

function keyReleased() {
  if (key == "w") {
    w = false;
  } else if (key == "s") {
    s = false;
  } else if (keyCode == UP_ARROW) {
    up = false;
  } else if (keyCode == DOWN_ARROW) {
    down = false;
  }
}
