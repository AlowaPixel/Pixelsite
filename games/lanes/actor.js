const LANE_COUNT = 3;

class Actor {
    constructor(x, y, size, col) {
        this.pos = createVector(x, y);
        this.targetY = y;
        this.size = size;
        this.angle = random(TWO_PI);
        this.color = col;
    }

    update() {
        this.pos.y = lerp(this.pos.y, this.targetY, 0.26);

        this.angle += 0.06;
    }

    display() {
        push();
        noStroke();
        fill(this.color);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        pop();
    }

    collidesWith(other) {
        // Convert pos and angle of this to lines
        let halfSize = this.size * 0.5;
        const myLines = [
            {
                a: createVector(-halfSize, -halfSize),
                b: createVector(halfSize, -halfSize)
            },
            {
                a: createVector(halfSize, -halfSize),
                b: createVector(halfSize, halfSize)
            },
            {
                a: createVector(halfSize, halfSize),
                b: createVector(-halfSize, halfSize)
            },
            {
                a: createVector(-halfSize, halfSize),
                b: createVector(-halfSize, -halfSize)
            }
        ];
        for (let line of myLines) {
            line.a.rotate(this.angle);
            line.a.add(this.pos);
            line.b.rotate(this.angle);
            line.b.add(this.pos);
        }

        // Convert pos and angle of other to lines
        halfSize = other.size * 0.5;
        const otherLines = [
            {
                a: createVector(-halfSize, -halfSize),
                b: createVector(halfSize, -halfSize)
            },
            {
                a: createVector(halfSize, -halfSize),
                b: createVector(halfSize, halfSize)
            },
            {
                a: createVector(halfSize, halfSize),
                b: createVector(-halfSize, halfSize)
            },
            {
                a: createVector(-halfSize, halfSize),
                b: createVector(-halfSize, -halfSize)
            }
        ];
        for (let line of otherLines) {
            line.a.rotate(other.angle);
            line.a.add(other.pos);
            line.b.rotate(other.angle);
            line.b.add(other.pos);
        }

        // Check if any of the lines are intersecting
        for (let myLine of myLines) {
            for (let otherLine of otherLines) {
                if (collideLineLine(myLine.a.x, myLine.a.y, myLine.b.x, myLine.b.y, otherLine.a.x, otherLine.a.y, otherLine.b.x, otherLine.b.y))
                {
                    return true;
                }
            }
        }
        return false;
    }
}

const laneToY = function(lane) {
    return height / LANE_COUNT * lane - height / (2 * LANE_COUNT);
}

const yToLane = function(y) {
    return (y + height / (2 * LANE_COUNT)) / (height / LANE_COUNT);
}