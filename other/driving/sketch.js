// Some driving thing by @De_Pixelaar

let car;

let w,a,s,d;

function reset() {
    car = new Car();

    w = false;
    a = false;
    s = false;
    d = false;
}

function setup() {
    createCanvas(800,600);

    reset();
}

function draw() {
    background(100);

    car.update();
    car.display();

    //  Controls
    if (a) {
        car.turn(-car.turnSpeed);
    }
    if (d) {
        car.turn(car.turnSpeed);
    }
    if (w) {
        car.drive(false);
    }
    if (s) {
        car.drive(true);
    }
}

function keyPressed() {
    if (key == 'a') {
        a = true;
    } else if (key == 'd') {
        d = true;
    } else if (key == 'w') {
        w = true;
    } else if (key == 's') {
        s = true;
    }
}

function keyReleased() {
    if (key == 'a') {
        a = false;
    } else if (key == 'd') {
        d = false;
    } else if (key == 'w') {
        w = false;
    } else if (key == 's') {
        s = false;
    }
}