class Bird {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = 0;

        this.vel = 0;
        this.g = 0.5;

        this.jumpStrength = -9.6;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(radians(this.a));

        // Circle
        noStroke();
        fill(255, 255, 0);
        circle(0, 0, this.r * 2);

        // Beak
        fill(255,127,80);
        rect(0, -1, this.r + 6, 8, 5);

        // Eye
        stroke(0);
        strokeWeight(5);
        point(this.r / 2.5, -this.r / 2.5);

        pop();
    }

    update() {
        this.vel += this.g
        this.y += this.vel;

        if (this.y <= this.r) {
            this.y = this.r;
            this.vel = 0;
        }

        this.a = map(this.vel, this.jumpStrength, 20, -50, 50);
    }

    jump() {
        this.vel = this.jumpStrength;
    }

    hits(pipeLayer) {
        return collideRectCircle(pipeLayer.x, 0, pipeLayer.w, pipeLayer.gapY, this.x, this.y, this.r * 2) ||
        collideRectCircle(pipeLayer.x, pipeLayer.gapY + pipeLayer.spacing, pipeLayer.w, height, this.x, this.y, this.r * 2);
    }
}