// Night Fight by @De_Pixelaar
/* 
 * Thanks to:
 * The Processing Foundation for making JavaScript good :P
 * sfxr/bfxr for the amazing sound effect utility :D
 */

let canvas;

let World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Engine = Matter.Engine,
    Events = Matter.Events;

let player;

let grounds, topBoundary, enemies;

let score;
let gotNewHighScore;

let flapSound, hurtSound, killSound, pauseSound, unpauseSound, highScoreSound;

let stars = [];

let paused, unpausedFramecount;

function preload() {
    soundFormats('wav');
    flapSound = loadSound("sound/flap.wav");
    flapSound.setVolume(0.2);
    hurtSound = loadSound("sound/hurt.wav");
    hurtSound.setVolume(0.6);
    killSound = loadSound("sound/kill.wav");
    killSound.setVolume(0.6);
    pauseSound = loadSound("sound/pause.wav");
    pauseSound.setVolume(0.4);
    unpauseSound = loadSound("sound/unpause.wav");
    unpauseSound.setVolume(0.4);
    highScoreSound = loadSound("sound/high_score.wav");
    highScoreSound.setVolume(0.6);

    // p5.sound.js throws an error when playing a sound, but it seems to be a problem with the library itself and it does play the sound so yeah
}

function reset() {
    engine = Engine.create();
    world = engine.world;
    world.gravity.scale *= 0.5;

    score = 0;
    gotNewHighScore = false;
    unpausedFramecount = 1;
    paused = false;

    player = new Player(width / 2, 100, 20, 30);

    // Setting the 4 pieces of ground and the boundary at the top
    grounds = [];
    let groundWidth = 250;
    let groundHeight = 20;
    let groundColor = color(160);
    grounds[0] = new Rectangle(groundWidth / 2, height / 2, groundWidth, groundHeight, groundColor, {
        isStatic: true
    });
    grounds[1] = new Rectangle(width / 2, height / 4, groundWidth, groundHeight, groundColor, {
        isStatic: true
    });
    grounds[2] = new Rectangle(width - groundWidth / 2, height / 2, groundWidth, groundHeight, groundColor, {
        isStatic: true
    });
    grounds[3] = new Rectangle(width / 2, height * 0.75, groundWidth, groundHeight, groundColor, {
        isStatic: true
    });
    topBoundary = new Rectangle(width / 2, -groundHeight / 2, width, groundHeight, groundColor, {
        isStatic: true
    });

    // Creating an enemy at the start
    enemies = [];
    enemies[0] = new Enemy(random(width), random(height / 4, height), 20, 30);

    Events.on(engine, 'collisionStart', checkCollision);
}

function setup() {
    // Making sure the cookie is set
    if (getCookie("nfhighScore") == "") {
        document.cookie = "nfhighScore=0; expires=Tue, 01 Jan 2030 00:00:00 UTC; path=/;"
    }

    canvas = createCanvas(900, 650);
    canvas.center('horizontal');
    rectMode(CENTER);
    textFont("Courier");

    // Creating a bunch of stars with random locations
    for (let i = 0; i < 100; i++) {
        stars[i] = createVector(random(width), random(height));
    }

    reset();
}

function windowResized() {
    canvas.center('horizontal');
}

function draw() {
    if (!paused) {
        Engine.update(engine, [delta = 16.666]);
        unpausedFramecount++;
    }

    background(0);

    // Displaying stars
    stroke(255);
    for (star of stars) {
        point(star.x, star.y);
    }

    // Moving player
    if (!paused) {
        if (keyIsDown(65) /* A key */ ) {
            player.xForce(-0.0002);
        }
        if (keyIsDown(68) /* D key */ ) {
            player.xForce(0.0002);
        }
    }

    player.edges();
    player.updateInvincibility(unpausedFramecount);
    player.display();

    // Killing player at bottom of screen or 0 health
    if (player.body.position.y > height || player.health <= 0) {
        reset();
        hurtSound.play(); // It's totally intentional that this sound plays twice at the same time if the player is killed. That's totally, like, a feature.
    }

    // Updating highscore if the current score is higher than it
    if (int(getCookie("nfhighScore")) < score) {
        document.cookie = "nfhighScore=" + score + "; expires=Tue, 01 Jan 2030 00:00:00 UTC; path=/;";
        if (!gotNewHighScore) {
            highScoreSound.play();
            gotNewHighScore = true;
        }
    }

    for (ground of grounds) {
        ground.display();
    }

    // Spawning a new enemy around every 5 seconds
    if (unpausedFramecount % 300 == 0) {
        enemies.push(new Enemy(random(width), random(height), 20, 30));
    }

    for (enemy of enemies) {
        if (!paused) {
            if (random(100) < 3) {
                enemy.flap();
            }
            if (enemy.body.position.y > height) {
                enemy.flap();
            }
            enemy.xForce(random(-0.001, 0.001));
        }

        enemy.edges();
        enemy.display();
    }

    noStroke();
    colorMode(HSB)
    let h = map(sin(frameCount / 50), -1, 1, 0, 255);
    fill(h, 255, 255);
    textSize(32);
    textAlign(LEFT, TOP);
    text("Score: " + score + "\n" +
        "Health: " + player.health + "/3",
        0, 0);

    textAlign(RIGHT, TOP);
    let newHighScoreText = gotNewHighScore ? "New High Score!" : "";
    text("High Score: " + getCookie("nfhighScore") + "\n" + newHighScoreText, width, 0);
    colorMode(RGB);
}

function keyPressed() {
    if (keyCode === 32 && !paused) {
        player.flap();
        flapSound.play();
    } else if (keyCode === ESCAPE) {
        paused = !paused;

        if (paused) pauseSound.play();
        else unpauseSound.play();
    }
}

function checkCollision() {
    // Checking if the player collides with any of the enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        if (player.collidesWith(enemy)) {
            if (player.body.position.y <= enemy.body.position.y && !player.invincible) {
                // Kill the enemy if the player is higher than it
                removeEnemy(i);
                score++;
                killSound.play();
            } else {
                // Hurt the player if they're lower than the enemy
                if (!player.invincible) {
                    hurtSound.play();
                }
                player.hurt(unpausedFramecount);
            }
            return;
        }
    }
}

function removeEnemy(index) {
    // Removing the body from the world and removing the enemy from the array
    enemies[index].kill();
    enemies.splice(index, 1);
}

// A function that I totally created and understand
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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