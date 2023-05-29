const MOVE_SPEED = 3;
let start;
let players;
let enemies;

let p0wins = 0;
let p1wins = 0;

function reset() {
    players = [];
    // for (let i = 0; i < 2; i++) {
    //     players.push(new Player(width * 0.25 * (i+1) + width * 0.125, start, 30, 60));
    // }
    players[0] = new Player(width * 0.3, start, 30, 60);
    players[1] = new Player(width * 0.7, start, 30, 60);

    enemies = [];
    let radius = 10;
    let maxHeight = start - players[0].h * 0.5 - radius;
    let speed = 2.5;
    for (let i = 0; i < 25; i++) {
        enemies.push(new Enemy(random(width), random(maxHeight), radius, random(1) < 0.5 ? speed: -speed))
    }
}

function setup() {
    createCanvas(750, 750).parent("canvasContainer");
    textFont("Courier");

    start = height - 100;
    reset();
    //player = new Player(width * 0.25, height - 100, 30, 60);
}

function draw() {
    background(16);

    // A finish line or something
    stroke(255);
    strokeWeight(12);
    line(0, 0, width, 0);

    // Controls
    if (keyIsDown(87)) { // W key
        players[0].move(-MOVE_SPEED);
    }
    if (keyIsDown(83)) { // S key
        players[0].move(MOVE_SPEED)
    }
    if (keyIsDown(UP_ARROW)) {
        players[1].move(-MOVE_SPEED);
    }
    if (keyIsDown(DOWN_ARROW)) {
        players[1].move(MOVE_SPEED)
    }


    // Enemies
    for (let e of enemies) {
        e.update();
        e.display();

        // Check collision with players
        for (let p of players) {
            if (p.collidesWith(e)) {
                p.y = start;
            }
        }
    }

    for (let i = 0; i < players.length; i++) {
        const p = players[i];

        p.display();

        // Check if the player got to the end
        if (p.y + p.h * 0.5 < 0) {
            if (i == 0) {
                p0wins++;
            } else if (i == 1) {
                p1wins++;
            }
            reset();
        }
    }

    // Display scores
    textSize(128);
    noStroke();
    fill(0, 0, 255);
    textAlign(LEFT, BOTTOM);
    text(p0wins, 0, height);
    fill(0, 255, 0);
    textAlign(RIGHT, BOTTOM);
    text(p1wins, width, height);
}