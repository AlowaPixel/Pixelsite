class Rectangle {
    constructor(x, y, w, h, col, options) {
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);

        this.w = w;
        this.h = h;

        this.color = col;
    }

    display() {
        push();
        noStroke();
        fill(this.color);
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rect(0, 0, this.w, this.h);
        pop();
    }
}