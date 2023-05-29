// Chrome dino game

// TODO: collision, score, and optimization


let player;
let cacti;

let spaceBetweenPipes;
let speed;
let groundy;
let cactusHeight;

let score;
let paused;

function reset() {
    let dinoHeight = 60;
    player = new Dino(50, groundy - dinoHeight, 40, dinoHeight);
    cacti = new Array();

    cactusHeight = 50;
    makeNewCactus();

    score = 0;
    paused = false;
}

function setup() {
    createCanvas(800, 450);
    groundy = height - 100;

    reset();
}

function draw() {
    speed = -constrain(score / 1500 + 5.5, 5.5, 9.5);
    background(0,0,255);
    noStroke();
    fill(255, 190, 0, 200)
    rect(0, groundy, width, height - groundy);


    if (cacti[cacti.length - 1].x < width - spaceBetweenPipes) {
        makeNewCactus();
    }

    for (let i = cacti.length - 1; i >= 0; i--) {
        if (!player.dead && !paused) {
            cacti[i].move(speed);
        }
        cacti[i].display();

        if (cacti[i].x + cacti[i].w < 0) {
            cacti.splice(i, 1);
        }
    }

    if (!paused) {
        player.update();
    }
    player.display();

    // Collision
    for (let i = 0; i < cacti.length; i++) {
        if (player.hits(cacti[i])) {
            gameOver();
        }
    }


    if (!player.dead && !paused) {
        score++;
    }

    textAlign(LEFT, TOP);
    textFont("Courier");
    textSize(69);
    noStroke();
    fill(0);
    text("Score: " + score, 0, 0);
}

function keyPressed() {
    if (key == ' ' && !paused) {
        player.jump();
    } else if (keyCode === ESCAPE) {
        paused = !paused;
    }
}

function makeNewCactus() {
    cacti.push(new Cactus(width, groundy - cactusHeight, random(20, 45), cactusHeight));
    spaceBetweenPipes = random(250, 400);
}

function gameOver() {
    player.kill();
}