function Laser(x, y) {
    this.x = x;
    this.y = y;
    this.length = 30;
    this.speed = 20;

    this.display = function() {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(this.x, this.y, this.x, this.y - this.length);
    }

    this.move = function() {
        this.y -= this.speed;
    }

    this.hits = function(enemy) {
        let d = dist(this.x, this.y - this.length, enemy.x, enemy.y);
        return (d < enemy.r);
    }
}