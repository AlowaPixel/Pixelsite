let t = 0;

function setup() {
    let cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.position(0,0);
    textFont("Courier");
    textAlign(LEFT);
    textSize(32);
}

function draw() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(0);

    stroke(255);
    noFill();
    beginShape();
    let off = t;
    for (let x = 0; x < width / 2; x++) {
        y = map(noise(off), 0, 1, 0, height);
        vertex(x, y);
        off += 0.002;
    }
    endShape();

    t += 0.005;

    fill(255);
    text("Generated line with perlin noise", 0, textSize());
}