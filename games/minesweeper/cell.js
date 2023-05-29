class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = j * w;
        this.y = i * w;
        this.w = w;

        this.mine = false;
        this.revealed = false;
        this.flagged = false;
    }

    display() {
        stroke(0);
        if (this.revealed) {
            fill(240);
            rect(this.x, this.y, this.w);

            let neighborCount = this.countNeighbors();
            if (this.mine) {
                // Display mine
                fill(50);
                circle(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.67);
            } else if (neighborCount != 0) {
                // Display amount of neighboring mines
                textSize(this.w * 0.8);
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                text(neighborCount, this.x + this.w / 2, this.y + this.w / 2);
            }
        } else {
            noFill();
            rect(this.x, this.y, this.w);

            if (this.flagged) {
                // Display flag
                fill(180, 0, 0);
                circle(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.67);
            }
        }

    }

    reveal() {
        this.revealed = true;

        let neighborCount = this.countNeighbors();
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols && neighborCount == 0 && !grid[i][j].revealed) {
                    grid[i][j].reveal();
                }
            }
        }

        this.flagged = false;
    }

    countNeighbors() {
        let count = 0;
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j].mine) { // First 4 checks so we don't check beyond the edge of the grid
                    count++;
                }
            }
        }
        return count;
    }

    flag() {
        if (!this.revealed) {
            this.flagged = !this.flagged;
        }
    }



    contains(x, y) {
        return x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.w;
    }
}