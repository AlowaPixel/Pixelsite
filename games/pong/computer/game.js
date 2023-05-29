// Pong by @De_Pixelaar in JavaScript using p5.js

let cnv;
let paused = false;
let gameEnded = false;

let ball;
let player;
let paddle2;

let gameEnds;
let comDifficulty;

function setup() {
  cnv = createCanvas(1050,600);
  frameRate(60);
  stroke(255);
  fill(255);

  ball = new Ball();
  player = new Player();
  paddle2 = new ComPlayer();

  textFont("Courier")
}

function draw() {
  gameEnds = document.getElementById('gameEnds').checked;
  background(0);
  strokeWeight(10);
  line(width / 2, -1, width / 2, height + 1);
  strokeWeight(0);

  // Set opponent difficulty if box is not empty
  let comDifficultyBox = document.getElementById('comDifficulty');
  if (!comDifficultyBox.value == '') {
    comDifficulty = abs(parseFloat(comDifficultyBox.value));
  }

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

  let opponentSpeed = 15 + player.score * comDifficulty;
  if (!paused) {
    paddle2.move(opponentSpeed);
  }
  paddle2.display();

  player.display();

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
  if (((ball.x + ball.size >= player.x) && (ball.y + ball.size >= player.y) && (ball.y <= player.y + player.paddleHeight) && (ball.xdir > 0)) || ((ball.x <= paddle2.x + paddle2.paddleWidth) && (ball.y + ball.size >= paddle2.y) && (ball.y <= paddle2.y + player.paddleHeight) && (ball.xdir < 0))) {

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
  document.getElementById('opponentSpeed').innerHTML = opponentSpeed;
}

function win(playerWon) {
  background(0);
  textAlign(CENTER);
  text("-", width / 2, 40);

  textSize(128)

  if (playerWon) {
    text("You win!", width / 2, height / 2);
  } else {
    text("You lose...", width / 2, height / 2)
  }

  paused = true;
  gameEnded = true;
}

function keyPressed() {
  if (keyCode == ESCAPE) {
    paused = !paused;
  }
}
