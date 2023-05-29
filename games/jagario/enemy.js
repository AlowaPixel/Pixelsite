class Enemy extends Ball {
    constructor(x, y, r) {
        super(x, y, r, color(random(255), random(255), random(255)));
        this.perlinAngle = random(10000);
    };
}