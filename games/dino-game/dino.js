class Dino {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.groundY = this.y + this.h;

        this.vel = 0;
        this.g = 1.6;

        this.dead = false;

        this.color = color(0);
    }

    display() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }

    jump() {
        if (this.y == this.groundY - this.h && !this.dead) {
            this.vel = -23.7;
        }
    }

    update() {
        this.vel += this.g;
        this.y += this.vel;

        if (this.y >= this.groundY - this.h) {
            this.y = this.groundY - this.h;
            this.vel = 0;
        }
    }

    hits(cactus) {
        return collideRectRect(this.x, this.y, this.w, this.h, cactus.x, cactus.y, cactus.w, cactus.h);
    }

    kill() {
        if (!this.dead) {
            this.dead = true;
            let w = this.w;
            this.w = this.h;
            this.h = w;
            this.color = color(255, 0, 0);
            if (this.vel < 0) {
                this.vel = 0;
            }
        }
    }
}