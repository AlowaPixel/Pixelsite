class PipeLayer {
    constructor(x) {
        this.x = x;
        this.w = 65;

        this.spacing = 150;

        this.gapY = random(10, height * 0.55);
    }

    display() {
        fill(0, 255, 0);
        noStroke();
        rect(this.x, 0, this.w, this.gapY);
        rect(this.x, this.gapY + this.spacing, this.w, height);
    }

    move(speed) {
        this.x += speed;
    }
}