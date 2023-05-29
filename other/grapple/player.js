class Player extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h, color(0, 0, 200), false);

        this.grappleConstraint = null;
    }

    jump() {
        // Only jump if not grappling and not on ground
        if (this.grappleConstraint == null && (Matter.SAT.collides(this.body, ground.body).collided || Matter.SAT.collides(this.body, r.body).collided)) {
            Body.applyForce(this.body, this.body.position, {x: 0, y: -0.03});
        }
    }

    xForce(amount) {
        Body.applyForce(this.body, this.body.position, {x: amount, y: 0})
    }

    displayGrapple() {
        let c = this.grappleConstraint;
        if (c != null) {
            stroke(0);
            strokeWeight(2);
            line(c.bodyA.position.x, c.bodyA.position.y, c.bodyB.position.x, c.bodyB.position.y);
        }
    }

    grapple(obj) {
        this.grappleConstraint = Constraint.create({
            bodyA: this.body,
            bodyB: obj.body,
            stiffness: 0.02
        });
        World.add(world, this.grappleConstraint);
    }

    ungrapple() {
        World.remove(world, this.grappleConstraint);
        this.grappleConstraint = null;
        
    }
}