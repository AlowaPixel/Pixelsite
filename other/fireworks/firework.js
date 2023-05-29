class Firework {
    constructor(x, y, psize, explodeCount) {
        this.particles = [];
        this.particles.push(new Particle(x, y, createVector(0, -20), psize, color(random(255), random(255), random(255))));

        this.explodeVel = random(-12, -2);
        this.explodeCount = explodeCount;
        this.exploded = false;
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];

            p.update();
            if (!this.exploded && p.vel.y > this.explodeVel) { // Only explode when the one particle has slowed down enough
                this.explode();
            } else if (this.exploded && random(1) < 0.08) { // We only want to remove particles if the firework has exploded
                this.particles.splice(i, 1);
            }
        }
    }

    display() {
        for (let p of this.particles) {
            p.display();
        }
    }

    explode() {
        this.exploded = true;
        
        let c = color(random(255), random(255), random(255));
        let currentParticle = this.particles[0];
        for (let i = this.explodeCount - 1; i >= 0; i--) { // Looping backwards so this.particles[0] remains accessable
            let vel = p5.Vector.random2D();
            vel.setMag(random(-15, 15));
            this.particles[i] = new Particle(currentParticle.pos.x, currentParticle.pos.y, vel, currentParticle.size, c);
        }
    }
}