function Enemy(x, y, r, speed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;

    this.display = function() {
        noStroke();
        fill(180, 0, 0);
        circle(this.x, this.y, this.r * 2);
    }

    this.moveDown = function() {
        this.y += this.speed;
    }
}