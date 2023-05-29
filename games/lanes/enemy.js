class Enemy extends Actor {
    constructor(x, lane, size, speed) {
        super(x, laneToY(lane), size, color(255, 60, 0));

        this.speed = speed;
    }

    update() {
        super.update();
        this.pos.x += this.speed;
    }
}