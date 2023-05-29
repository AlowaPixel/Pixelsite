class Player extends Circle {
    constructor(x, y, r) {
        super(x, y, r, false, color(255));
    }

    launch(x, y) {
        const target = createVector(x, y);
        target.sub(createVector(this.body.position.x, this.body.position.y));
        target.mult(0.0001);
        Body.applyForce(this.body, this.body.position, {x: target.x, y: target.y});
    }
}