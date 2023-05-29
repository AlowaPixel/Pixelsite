class Player extends Actor {
    constructor(x, y, w, h) {
        super(x, y, w, h, color(60, 60, 255));
        this.body.id = 'player';

        this.health = 3;
        this.invincible = false;
        this.hurtTime = null;
    }

    hurt(time) {
        if (!this.invincible) {
            this.health--;

            // Making the player invincible and saving at what frame that was for disabling it later
            this.invincible = true;
            this.hurtTime = time;
        }
    }

    updateInvincibility(time) {
        this.color = this.invincible ? color(60, 60, 255, 100): color(60, 60, 255);

        // Turning off invincibility after 120 unpaused frames of it
        if ((time - this.hurtTime) % 120 == 0) {
            this.invincible = false;
            checkCollision();

            this.hurtTime = null;
        }
    }
}