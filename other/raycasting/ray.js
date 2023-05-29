class Ray {
    constructor(dir) {
        this.pointA = createVector(0, 0);
        this.dir = dir;
        this.pointB = dir.copy();
        this.pointB.setMag(width * height);
    }

    setPos(x, y) {
        this.pointA.x = x;
        this.pointA.y = y;

        // Reset pointB
        this.pointB = this.dir.copy();
        this.pointB.setMag(width * height);
    }

    cast(wall) {
        let testPointB = this.dir.copy();
        testPointB.setMag(width * height);

        let collision = collideLineLine(this.pointA.x, this.pointA.y, testPointB.x, testPointB.y, wall.pointA.x, wall.pointA.y, wall.pointB.x, wall.pointB.y, true);
        
        if (!collision.x) { // Return if not colliding
            return;
        }

        let nextRelPointB = createVector(collision.x, collision.y);
        nextRelPointB.sub(this.pointA);
        let currentRelPointB = this.pointB.copy();
        currentRelPointB.sub(this.pointA);
        
        if (nextRelPointB.mag() < currentRelPointB.mag()) {
            nextRelPointB.add(this.pointA);
            this.pointB = nextRelPointB;
        }
    }

    display() {
        stroke(255, 255, 200);
        line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
    }
}