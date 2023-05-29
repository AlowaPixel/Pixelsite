class Particle {
    constructor(x, y, v, size, col) {
        this.pos = createVector(x, y);
        this.prevPos = this.pos.copy();
        this.vel = v;
        this.size = size;
        this.color = col;
    }

    update() {
        this.prevPos = this.pos.copy();

        this.vel.y += G;
        this.pos.add(this.vel);
    }

    display() {
        stroke(this.color);
        strokeWeight(this.size);
        line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }
}