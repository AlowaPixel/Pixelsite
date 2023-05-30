class Circle {
    constructor(x, y, r, colour) {
        this.x = x;
        this.y = y;

        // Laat de cirkel naar linksboven, linksonder, rechtsboven of rechtsonder bewegen.
        let vel = random(0.2, 0.8);
        this.xvel = random(100) < 50 ? vel: -vel;
        this.yvel = random(100) < 50 ? vel: -vel;

        // Dit wordt gebruikt bij het vergroten van de cirkels
        this.minR = r;
        this.maxR = 60;

        this.r = this.minR;
        this.rChangeSpeed = 3; // De snelheid waarmee de cirkel vergroot en verkleint

        this.color = colour;
    }

    update() {
        // Beweeg de cirkel
        this.x += this.xvel;
        this.y += this.yvel;

        // Botsing met linker- en rechterkant van het scherm
        if (this.x + this.r > width) {
            this.xvel *= -1;
            this.x = width - this.r;
        } else if (this.x < this.r) {
            this.xvel *= -1;
            this.x = this.r;
        }

        // Botsing met onder- en bovenkant van het scherm
        if (this.y + this.r > height) {
            this.yvel *= -1;
            this.y = height - this.r;
        } else if (this.y < this.r) {
            this.yvel *= -1;
            this.y = this.r;
        }
    }

    display() {
        noStroke(); // Zorgt dat de cirkel geen omlijning heeft
        fill(this.color);
        circle(this.x, this.y, this.r * 2); // r * 2 omdat p5 cirkels tekent op basis van de diameter in plaats van de radius.
    }

    expand() {
        if (this.r < this.maxR) {
            this.r += this.rChangeSpeed; // Vergroot de cirkel als deze kleiner is dan de maximale radius
        } else {
            this.r = this.maxR; // Of stel de radius gelijk aan de maximale radius
        }
    }

    shrink() {
        if (this.r > this.minR) {
            this.r -= this.rChangeSpeed; // Verklein de cirkel als deze groter is dan de minimale radius
        } else {
            this.r = this.minR; // Of stel de radius gelijk aan de maximale radius.
        }
    }
}