const { Engine, World, Bodies, Body, SAT } = Matter;

let engine, world;

let bounds;
let player;

const reset = function () {
    engine = Engine.create();
    world = engine.world;

    bounds = [];
    const boundThicc = 60;
    const boundColor = color(100);
    // Ground
    bounds[0] = new Rectangle(width * 0.5, height, width, boundThicc, true, boundColor);
    // Left wall
    bounds[1] = new Rectangle(0, height * 0.5, boundThicc, height, true, boundColor);
    // Right wall
    bounds[2] = new Rectangle(width, height * 0.5, boundThicc, height, true, boundColor);

    player = new Player(width * 0.5, height * 0.5, 15);
}

function setup() {
    createCanvas(800, 700);
    frameRate(60);
    rectMode(CENTER);

    reset();
}

function draw() {
    Engine.update(engine, [delta = 16.66666666]);
    background(200, 200, 255);

    for (let b of bounds) {
        b.display();
    }

    //player.launch(mouseX, mouseY);
    player.display();
}

function mousePressed() {
    //if (touchingGround(player.body)) {
        player.launch(mouseX, mouseY);
    //}
}

function touchingGround(body) {
    return SAT.collides(body, bounds[0].body).collided;
}