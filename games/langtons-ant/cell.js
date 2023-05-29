class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = j * w;
        this.y = i * w;
        this.w = w;

        this.alive = false;
    }

    display() {
        if (this.alive) {
            fill(255);
        } else {
            noFill();
        }

        stroke(0)
        rect(this.x, this.y, this.w);
    }

    contains(x, y) {
        return x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.w;
    }
}