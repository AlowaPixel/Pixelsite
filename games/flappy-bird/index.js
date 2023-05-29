let player;
let pipeLayers;

let gameHasStarted;
let gameHasEnded;

let prevScore = null;
let prevHighScore;

function reset() {
    player = new Bird(width / 2, height / 2, 20);

    pipeLayers = [];

    gameHasStarted = false;
    gameHasEnded = false;
}

function setup() {
    // Making sure the cookie is set
    if (getCookie("highScore") == "") {
        document.cookie = "highScore=0; expires=Tue, 01 Jan 2030 00:00:00 UTC; path=/;"
    }

    createCanvas(800, 600);
    textFont("Courier");

    reset();
}

function draw() {
    background(200, 200, 255);

    // Only update player position if the game has started
    if (gameHasStarted) {
        player.update();
    }
    player.display();

    let score = 0;
    for (let i = 0; i < pipeLayers.length; i++) {
        // Don't move pipes during time between death and reset
        if (!gameHasEnded) {
            pipeLayers[i].move(-3);
        }
        pipeLayers[i].display();

        // Calculating score by looking how many pipeLayers the player has passed
        if (pipeLayers[i].x + pipeLayers[i].w < player.x - player.r) {
            score++;
        }
    }

    // Updating highscore if the current score is higher than it
    if (int(getCookie("highScore")) < score) {
        document.cookie = "highScore=" + score + "; expires=Tue, 01 Jan 2030 00:00:00 UTC; path=/;";
    }

    // Collision
    for (let i = 0; i < pipeLayers.length; i++) {
        if (player.hits(pipeLayers[i]) || player.y > height - player.r) {
            endGame(score);
            break;
        }
    }

    // Add new pipe
    if (gameHasStarted && width - pipeLayers[pipeLayers.length - 1].x > 400) {
        pipeLayers.push(new PipeLayer(width))
    }

    // Displaying score differently for each state of the game
    noStroke();
    fill(0);
    if (gameHasStarted) {
        // During the game
        textSize(64);
        textAlign(LEFT, TOP);
        text("Score: " + score, 0, 0);

        textSize(20);
        text("Your high score: " + getCookie("highScore"), 0, 64);
    } else {
        textSize(40);
        textAlign(CENTER, TOP);
        text("Press the spacebar to begin", width / 2, height * 0.6);

        textAlign(CENTER, TOP);
        if (prevScore != null) {
            // When there has already been played a game
            textSize(60);
            text("Score: " + prevScore, width / 2, 0);

            textSize(50);
            if (prevScore > prevHighScore) {
                // When a high score has been reached
                text("New high score!", width / 2, 60);
            } else {
                // When there hasn't
                text("Your high score: " + getCookie("highScore"), width / 2, 60);
            }
        } else {
            // When there isn't
            textSize(50);
            text("Your high score: " + getCookie("highScore"), width / 2, 0);
        }
    }
}

function keyPressed() {
    if (keyCode === 32 && !gameHasEnded) {
        startGame();
        player.jump();
    }
}

function startGame() {
    if (!gameHasStarted) {
        gameHasStarted = true;
        player.x = 200;
        prevHighScore = int(getCookie("highScore"));
        pipeLayers.push(new PipeLayer(width))
    }
}

function endGame(score) {
    if (!gameHasEnded) {
        if (player.vel < 0) {
            player.vel = 0;
        }
        gameHasEnded = true;
        prevScore = score;
        setTimeout(reset, 1000);
    }
}







// Not completely sure how this works lmao but it does
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}