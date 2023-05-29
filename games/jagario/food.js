class Food extends Ball {
    constructor(x, y) {
        super(x, y, random(7, 15), color(random(255), random(255), random(255)));
    }

    display() {
        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}