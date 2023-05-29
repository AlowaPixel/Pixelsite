let enemySpawnX;
let player;
let enemies;
let score, gotHighScore;

const reset = function() {
    player = new Player(width * 0.2, 50);
    enemies = [];
    score = 0;
    gotHighScore = false;
}

function setup() {
    if (getItem("highScore") == null) {
        storeItem("highScore", 0);
    }

    createCanvas(900, 600);
    textFont("Courier");
    enemySpawnX = width + 100;

    reset();

    // dev
    // setInterval(() => console.log(floor(frameRate())), 500);
}

function draw() {
    background(200, 200, 255);

    // Draw lines at lanes
    stroke(51, 100);
    strokeWeight(10);
    for (let i = 1; i <= LANE_COUNT; i++) {
        const y = laneToY(i);
        line(0, y, width, y);
    }

    const canSpawn = enemies.length === 0 || abs(enemySpawnX - enemies[enemies.length - 1].pos.x) > player.size * 2.5; // Space the enemies out a bit
    if (canSpawn && random(1) < 0.05) {
        enemies.push(new Enemy(enemySpawnX, floor(random(1, LANE_COUNT + 1)), random(player.size - 10, player.size + 10), -5));
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        enemies[i].display();

        if (player.collidesWith(enemies[i])) {
            reset();
            break;
        }

        if (enemies[i].pos.x < -100) {
            enemies.splice(i, 1);
        }
    }

    player.update();
    player.display();
    score++;

    if (getItem("highScore") < score) {
        storeItem("highScore", score);
        gotHighScore = true;
    }

    textSize(48);
    textAlign(LEFT, TOP);
    noStroke();
    fill(0);
    text("Score: " + score, 0, 0);
    textAlign(RIGHT, TOP);
    text("High Score: " + getItem("highScore"), width, 0);
    if (gotHighScore) {
        text("New High Score!", width, textSize());
    }
}

function keyPressed() {
    if (isLooping()) {
        let nextLane = player.getLane();
        if (keyCode === 87 || keyCode === UP_ARROW) {
            nextLane -= 1;
        } else if (keyCode === 83 || keyCode === DOWN_ARROW) {
            nextLane += 1;
        }

        if (nextLane < 1) {
            nextLane = LANE_COUNT;
        } else if (nextLane > LANE_COUNT) {
            nextLane = 1;
        }
        player.setLane(nextLane);
    }

    if (keyCode === ESCAPE) {
        if (isLooping()) {
            noLoop();
        } else {
            loop();
        }
    }
}