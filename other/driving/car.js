class Car {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.angle = 0;
        this.width = 20;
        this.height = 40;
        this.turnSpeed = radians(4);
    }

    display() {
        push();
        noStroke();
        fill(0);
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, this.width, this.height);
        fill(255);
        rect(0, this.height * -0.25, this.width * 0.8, this.height * 0.1);
        pop();
    }

    update() {
        this.vel.mult(0.9)
        this.pos.add(this.vel);

        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    drive(back) {
        this.vel.add(p5.Vector.fromAngle(this.angle + radians(back ? 90: -90)));
    }

    turn(a) {
        this.angle += a;
    }
}