class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    move(amount) {
        this.y += amount;
    }

    display() {
        noStroke();
        fill(150, 150, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }

    collidesWith(enemy) {
        let x1 = this.x - this.w * 0.5;
        let y1 = this.y - this.h * 0.5;
        return collideRectCircle(x1, y1, this.w, this.h, enemy.x, enemy.y, enemy.r * 2);
    }
}