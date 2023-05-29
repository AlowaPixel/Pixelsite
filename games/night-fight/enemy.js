class Enemy extends Actor {
    constructor(x, y, w, h) {
        super(x, y, w, h, color(255, 60, 60));
    }

    kill() {
        World.remove(world, this.body);
    }
}