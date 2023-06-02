// Snake by @De_Pixelaar

let w = 30;
let rows, cols;

let gameHasEnded;

let bodySegments;
let apple;

let dir, nextDir;

function reset() {
    bodySegments = new Array();
    bodySegments[0] = new BodySegment(floor(cols * 0.75) * w, floor(rows * 0.5) * w, w);
    apple = new Apple(floor(cols * 0.25) * w, bodySegments[0].y, w);

    dir = null;
    nextDir = null;

    gameHasEnded = false;
}

function setup() {
    createCanvas(600,600);
    frameRate(7);

    rows = floor(height / w);
    cols = floor(width / w);

    reset();
}

function draw() {
    background(0);

    if (!gameHasEnded) {
        // Move snake
        for (let i = bodySegments.length - 1; i >= 1; i--) {
            bodySegments[i].x = bodySegments[i - 1].x;
            bodySegments[i].y = bodySegments[i - 1].y;
        }

        // Move head
        dir = nextDir;
        switch (dir) {
            case "left":
                bodySegments[0].x = (bodySegments[0].x + width - w) % width;
                break;
            case "right":
                bodySegments[0].x = (bodySegments[0].x + width + w) % width;
                break;
            case "up":
                bodySegments[0].y = (bodySegments[0].y + width - w) % width;
                break;
            case "down":
                bodySegments[0].y = (bodySegments[0].y + width + w) % width;
        }
    }

    // Check collision with own body
    for (let i = 1; i < bodySegments.length; i++) {
        if (bodySegments[i].x == bodySegments[0].x && bodySegments[i].y == bodySegments[0].y) {
            gameOver();
        }
    }

    // Check collision with sides
    // if (bodySegments[0].x < 0 || bodySegments[0].x >= width || bodySegments[0].y < 0 || bodySegments[0].y >= height) {
    //     gameOver();
    // }

    // Check collision with apple
    if (bodySegments[0].x == apple.x && bodySegments[0].y == apple.y) {
        bodySegments[bodySegments.length] = new BodySegment(-w,-w,w);
        apple = new Apple(floor(random(cols)) * w, floor(random(rows)) * w, w);
    }

    // Display apple
    apple.display();

    // Display snake
    for (let i = bodySegments.length - 1; i >= 0; i--) {
        bodySegments[i].display();
    }


    if (document.getElementById('showGrid').checked) {
        stroke(150);
        noFill();
        for (let i = 0; i < width; i += w) {
            for(let j = 0; j < height; j += w) {
                rect(i,j,w);
            }
        }
    }

    document.getElementById('score').innerHTML = bodySegments.length - 1;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW && dir !== "right") {
        nextDir = "left";
    } else if (keyCode === RIGHT_ARROW && dir !== "left") {
        nextDir = "right";
    } else if (keyCode === UP_ARROW && dir !== "down") {
        nextDir = "up";
    } else if (keyCode === DOWN_ARROW && dir !== "up") {
        nextDir = "down";
    }
}

function gameOver() {
    if (!gameHasEnded) {
        gameHasEnded = true;
        setTimeout(reset, 1000);
    }
}