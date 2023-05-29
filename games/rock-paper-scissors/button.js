class Button {
    constructor(x, y, w, h, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.label = label;

        this.clicked = false;
    }

    display() {
        fill(this.clicked ? 200: 150);
        stroke(10);
        strokeWeight(3);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);

        noStroke();
        textSize(18);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.label, this.x, this.y);
    }

    checkMouse() {
        return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
    }
}