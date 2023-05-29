class Actor extends Rectangle {
    constructor(x, y, w, h, col) {
        super(x, y, w, h, col, {});

        // Making sure the body doesn't rotate
        Body.setInertia(this.body, Infinity);
    }

    flap() {
        Body.applyForce(this.body, this.body.position, {x: 0, y: -0.0085});
    }

    xForce(force) {
        Body.applyForce(this.body, this.body.position, {x: force, y: 0});
    }

    edges() {
        // Making the actor wrap around the screen
        if (this.body.position.x <= 0) Body.translate(this.body, {x: width, y: 0});
        if (this.body.position.x >= width) Body.translate(this.body, {x: -width, y: 0});
    }

    collidesWith(other) {
        let temp = Matter.Collision.collides(this.body, other.body);
        if (temp != null) {
            return temp.collided;
        }
    }
}