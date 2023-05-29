class Enemy {
    constructor(x, y, r, v) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = v;
    }

    update() {
        this.x += this.v;

        if (this.x + this.r < 0) {
            this.x = width + this.r;
        } else if (this.x - this.r > width) {
            this.x = -this.r;
        }
    }

    display() {
        noStroke();
        fill(255, 0, 0);
        circle(this.x, this.y, this.r * 2);
    }
}