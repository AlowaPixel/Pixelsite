let World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Engine = Matter.Engine,
    Constraint = Matter.Constraint;

let player, ground, r;

function reset() {
    engine = Engine.create();
    world = engine.world;

    player = new Player(100, 100, 30, 30);
    ground = new Rectangle(width / 2, height - 20, width, 40, color(150), true);
    r = new Rectangle(width / 2, 200, 40, 40, color(0), true);

    Engine.run(engine);
}

function setup() {
    createCanvas(800, 600);
    rectMode(CENTER);
    
    reset();
}

function draw() {
    background(200);

    if (keyIsDown(65)) {
        player.xForce(-0.001);
    }
    if (keyIsDown(68)) {
        player.xForce(0.001);
    }

    player.display();
    player.displayGrapple();
    ground.display();
    r.display();
}

function keyPressed() {
    if (keyCode === 32) {
        player.jump()
    }
}

function mousePressed() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        if (player.grappleConstraint == null) {
            player.grapple(r);
        } else {
            player.ungrapple();
        }
    }
}