class Rectangle {
    constructor(x, y, w, h, fixed, col) {
        this.body = Bodies.rectangle(x, y, w, h, {isStatic: fixed});
        World.add(world, this.body);

        this.w = w;
        this.h = h;
        this.color = col;
    }

    display() {
        noStroke();
        fill(this.color);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rect(0, 0, this.w, this.h);
        pop();
    }
}