const walls = [];
let rays;
let slider;
let mouseCheckbox;
let t = 0;

function setup() {
    createCanvas(800, 600);

    slider = createSlider(10, 2000);
    mouseCheckbox = createCheckbox("Controlled by mouse", true);

    for (let i = 0; i < 5; i++) {
        walls.push(new Wall(random(width), random(height), random(width), random(height)));
    }

    setRayCount(slider.value());
}

function draw() {
    background(15);

    if (slider.value() != rays.length) {
        setRayCount(slider.value());
    }

    for (let wall of walls) {
        wall.display();
    }

    for (let ray of rays) {
        if (mouseCheckbox.checked()) {
            ray.setPos(mouseX, mouseY);
        } else {
            ray.setPos(noise(t) * width, noise(t + 10000) * height);
        }

        for (let wall of walls) {
            ray.cast(wall);
        }

        ray.display();
    }

    t += 0.0075;
}

function setRayCount(count) {
    rays = [];
    for (let i = 0; i < count; i++) {
        rays.push(new Ray(p5.Vector.fromAngle(TWO_PI / count * i)));
    }
}