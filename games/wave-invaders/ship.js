function Ship() {
    this.width = 30;
    this.height = 45;
    this.x = width / 2;
    this.y = height - 15;

    this.shootCooldown = 180;
    this.canShoot = true;

    this.speed = 4;

    this.display = function() {
        noStroke();
        fill(255);
        triangle(this.x - this.width / 2, this.y, this.x + this.width / 2, this.y, this.x, this.y - this.height);
    }

    this.move = function(toTheLeft) {
        if (toTheLeft) {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }

        this.x = constrain(this.x, 0, width);
    }
}