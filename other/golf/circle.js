class Circle {
    constructor(x, y, r, fixed, col) {
        this.body = Bodies.circle(x, y, r, {
            isStatic: fixed,
            restitution: 0.7
        });
        World.add(world, this.body);

        this.r = r;
        this.color = col;
    }

    display() {
        stroke(0);
        fill(this.color);
        circle(this.body.position.x, this.body.position.y, this.r * 2);
    }
}