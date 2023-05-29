class Rectangle {
    constructor(x, y, w, h, c, fixed) {
        this.body = Bodies.rectangle(x, y, w, h, {
            isStatic: fixed
        });
        World.add(world, this.body);

        this.w = w;
        this.h = h;

        this.color = c;
    }

    display() {
        push();
        translate(this.body.position.x, this.body.position.y)
        rotate(this.body.angle);
        noStroke();
        fill(this.color);
        rect(0, 0, this.w, this.h)
        pop();
    }
}