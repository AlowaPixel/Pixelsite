function Apple(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.display = function() {
        noStroke();
        fill(255, 0, 0);
        square(this.x, this.y, this.w);
    }
}