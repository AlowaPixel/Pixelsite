// An attempt at making Space Invaders

let ship;
let lasers;
let enemies;

let a,d;
let paused;

let currentWave;
let gameHasEnded;

function reset() {
    ship = new Ship();
    lasers = new Array();
    enemies = new Array();

    currentWave = 1;
    newWave(currentWave);

    a = false;
    d = false;

    paused = false;

    gameHasEnded = false;
}


let canvas;
function setup() {
    canvas = createCanvas(560,640);
    textFont('Courier');

    reset();
}

function draw() {
    //canvas.center('horizontal');
    background(0);

    for (let i = enemies.length - 1; i >= 0 && !gameHasEnded; i--) {
        if (!paused) {
            enemies[i].moveDown();
        }
        enemies[i].display();
        
        if (enemies[i].y > height + enemies[i].r) {
            gameHasEnded = true;
            break;
        }
    }
    if (enemies.length == 0) {
        currentWave += 1;
        newWave(currentWave);
    }

    for (let i = lasers.length - 1; i >= 0 && !gameHasEnded; i--) {
        if (!paused) {
            lasers[i].move();
        }
        lasers[i].display();

        let hasHit = false;
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (lasers[i].hits(enemies[j])) {
                enemies.splice(j, 1);
                lasers.splice(i, 1);
                hasHit = true;
                break;
            }
        }

        if (!hasHit && lasers[i].y < 0) {
            lasers.splice(i, 1);
        }

        hasHit = false;
    }

    if (!gameHasEnded) {
        ship.display();
    }

    // Controls
    if (a && !gameHasEnded && !paused) {
        ship.move(true);
    }
    if (d && !gameHasEnded && !paused) {
        ship.move(false);
    }

    if (gameHasEnded) {
        gameOver();
    }

    // Display wave
    textAlign(gameHasEnded ? CENTER: LEFT, TOP);
    textSize(gameHasEnded ? 80: 40);
    noStroke();
    fill(255);
    text("Wave " + currentWave, gameHasEnded ? width / 2: 5, 0);
}


function keyPressed() {
    if (key == 'a') {
        a = true;
    } else if (key == 'd') {
        d = true;
    } else if (key == ' ' && ship.canShoot) {
        lasers.push(new Laser(ship.x, ship.y));
        ship.canShoot = false;
        setTimeout(function() {ship.canShoot = true}, ship.shootCooldown);
    } else if (keyCode === ESCAPE) {
        paused = !paused;
    }
}

function keyReleased() {
    if (key == 'a') {
        a = false;
    } else if (key == 'd') {
        d = false;
    }
}

function newWave(wave) {
    let enemyAmount = 7;
    let speed = constrain(0.16 * wave, 0, 1.75);
    for (let i = 0; i < enemyAmount; i++) {
        enemies[i] = new Enemy(width / enemyAmount * (i + 0.5), 100, 20, speed);
    }
}

function gameOver() {
    textAlign(CENTER, CENTER);
    textSize(100);
    noStroke();
    fill(255);
    text("GAME OVER", width / 2, height / 2);
}