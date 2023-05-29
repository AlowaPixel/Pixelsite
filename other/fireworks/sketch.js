const G = 0.3;

//let f;
let fireworks = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight).position(0, 0);
    //f = new Firework(width * .5, height, 2, 20);

    background(51);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
    background(32, 170);

    if (random(1) < 0.08) {
        fireworks.push(new Firework(random(width), height, 2, floor(random(10, 40))));
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        let f = fireworks[i];
        
        f.update();
        f.display();

        if (f.particles.length == 0) {
            fireworks.splice(i, 1);
        }
    }

    //f.update();
    //f.display();
}