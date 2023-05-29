const startR = 50;
let player;
let foods;
let enemies;
let playWidth;
let playHeight;

let scl = 1;

function reset() {
    player = new Ball(playWidth * 0.5, playHeight * 0.5, startR, color(20, 30, 255));

    foods = [];
    for (let i = 0; i < 569; i++) {
        foods.push(new Food(random(0, playWidth), random(0, playHeight)));
    }

    enemies = [];
    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy(random(playWidth), random(playHeight), random(startR, 250)));
    }
}

function setup() {
    let cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.position(0, 0);
    playWidth = 6000;
    playHeight = 5500;

    reset();
    setInterval(function() {
        if (enemies.length < 12) {
            let choice;
            let zekerheid = 0;
            do {
                choice = new Enemy(random(playWidth), random(playHeight), random(startR, 250));
                zekerheid++;
            } while(player.overlaps(choice) && zekerheid < 100);
            enemies.push(choice);
        }
    }, 30000);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    if (frameCount % 60 === 0) {
        foods.push(new Food(random(0, playWidth), random(0, playHeight)));
    }

    // Make game move around player and scale according to size
    translate(width/2, height/2)
    scl = lerp(scl, startR / player.r, 0.1);
    scale(scl);
    translate(-player.pos.x, -player.pos.y);

    // Background will be displayed beyond edges of playing field
    background(175);

    // Draw rectangle over the playfield
    noStroke();
    fill(230);
    rect(0, 0, playWidth, playHeight);

    // Drawing a grid to make movement more apparent
    let w = 100;
    noFill();
    stroke(211);
    strokeWeight(2);
    for (let x = 0; x < playWidth; x += w) {
        for (let y = 0; y < playHeight; y += w) {
            // Check if square would be on screen for optimization
            if (isOnScreen(x, y) || isOnScreen(x + w, y + w)) {
                rect(x, y, w, w);
            }
        }
    }

    // Foods
    for (let i = foods.length - 1; i >= 0; i--) {
        // Only handle the player if the food is on the screen for optimization
        if (isOnScreen(foods[i].pos.x - foods[i].r, foods[i].pos.y - foods[i].r) || isOnScreen(foods[i].pos.x + foods[i].r, foods[i].pos.y + foods[i].r)) {
            foods[i].display();
            // Only eat the food if it is fully withing the player's circle
            if (player.overlaps(foods[i])) {
                player.eat(foods[i]);
                foods.splice(i, 1);
                continue;
            }
        }

        for (let enemy of enemies) {
            if (enemy.overlaps(foods[i])) {
                enemy.eat(foods[i]);
                foods.splice(i, 1);
                break;
            }
        }
    }

    // Enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        // Not doing the optimization thing here, because they're too big lol
        enemies[i].display();
        enemies[i].update(noise(enemies[i].perlinAngle) * width, noise(enemies[i].perlinAngle - 10000) * height);
        enemies[i].perlinAngle += 0.005;

        // Check collision with player
        if (player.overlaps(enemies[i])) {
            player.eat(enemies[i]);
            enemies.splice(i, 1);
            continue;
        } else if (enemies[i].overlaps(player)) {
            reset();
            return;
        }

        // Check collision with other enemies
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (i != j && enemies[i].overlaps(enemies[j]) && enemies[i].r > enemies[j].r) {
                enemies[i].eat(enemies[j]);
                enemies.splice(j, 1);
                break;
            }
        }
    }

    // Player
    player.update(mouseX, mouseY);
    player.display();
}

function isOnScreen(x, y) {
    return x > player.pos.x - width / scl && x < player.pos.x + width / scl && y > player.pos.y - height / scl && y < player.pos.y + height / scl;
}