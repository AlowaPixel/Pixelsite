class Ball {
    constructor(x, y, r, c) {
        this.pos = createVector(x, y);

        this.targetR = r;
        this.r = r;

        this.color = c;
    }

    update(x, y) {
        this.r = lerp(this.r, this.targetR, 0.1);

        let m = createVector(x - width / 2, y - height / 2);
        m.mult(0.25);
        m.div(this.r * 0.23);
        this.pos.add(m);

        // Constraining the position withing the playfield
        this.pos.x = constrain(this.pos.x, 0, playWidth);
        this.pos.y = constrain(this.pos.y, 0, playHeight);
    }

    display() {
        let c = this.color.levels;
        stroke(c[0], c[1], c[2], 120);
        strokeWeight(this.r * 0.2);
        fill(this.color);
        beginShape();
        for (let a = 0; a < TWO_PI; a+= 0.1) {
            // Calculate cartesian coordinates and constrain against edge of playing field
            let x = constrain(this.r * cos(a) + this.pos.x, 0, playWidth);
            let y = constrain(this.r * sin(a) + this.pos.y, 0, playHeight);

            vertex(x, y);
        }
        endShape(CLOSE);
        //circle(this.pos.x, this.pos.y, this.r * 2);
    }

    eat(food) {
        // We want to add the area of the food to the area of the player
        let thisArea = PI * (this.targetR * this.targetR);
        let foodArea = PI * (food.targetR * food.targetR);
        thisArea += foodArea;
        // Then, we calculate it back into the radius
        this.targetR = sqrt(thisArea / PI);
    }

    overlaps(other) {
        return dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < this.r - other.r
    }
}