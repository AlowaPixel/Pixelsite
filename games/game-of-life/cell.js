class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = j * w;
        this.y = i * w;
        this.w = w;

        this.alive = false;
        this.tempAliveState;
    }

    display() {
        stroke(0);
        strokeWeight(1);
        if (this.alive) {
            fill(230);
        } else {
            noFill();
        }
        square(this.x, this.y, this.w);
    }

    saveCurrentState() {
        this.tempAliveState = this.alive;
    }

    advance() {
        // Count amount of alive neighbors
        let neighborCount = this.countNeighbors();
        

        this.alive = (this.alive && (neighborCount == 2 || neighborCount == 3)) || (!this.alive && neighborCount == 3);
    }

    countNeighbors() {
        let neighborCount = 0;
        for (let i = constrain(this.i - 1, 0, rows - 1); i <= constrain(this.i + 1, 0, rows - 1); i++) {
            for (let j = constrain(this.j - 1, 0, cols - 1); j <= constrain(this.j + 1, 0, cols - 1); j++) {
                if (grid[i][j].tempAliveState && (i != this.i || j != this.j)) {
                    neighborCount++;
                }
            }
        }
        return neighborCount;
    }

    containsPoint(x, y) {
        return x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.w
    }
}