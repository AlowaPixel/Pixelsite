let w = 20;

let grid, rows, cols;
let going;
let gen;

function reset() {
    grid = [];

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    going = false;
    frameRate(60)
    document.getElementById("startStopButton").innerHTML = "Start";
    document.getElementById("runningIndicator").innerHTML = "The simulation is not running";

    gen = 0;
}

function setup() {
    createCanvas(1000, 600);
    rows = floor(height / w);
    cols = floor(width / w);

    reset();

    setInterval(function() {
        frameRate(going ? float(document.getElementById("updateSpeedSlider").value): 60);
    }, 16.66666666);
}

function draw() {
    background(60);

    // Saving state in seperate loop to not mess stuff up later for calculating next state
    if (going) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].saveCurrentState();
            }
        }
        gen++;
    }

    // The actual loop
    let empty = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (going) {
                grid[i][j].advance();
            }

            grid[i][j].display();

            if (grid[i][j].alive) {
                empty = false;
            }
        }
    }
    if (empty && going) {
        reset();
    }
}

function mousePressed() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = grid[i][j]; // To make it all easier
            if (grid[i][j].containsPoint(mouseX, mouseY) && !going) {
                cell.alive = !cell.alive;
                return;
            }
        }
    }
}

function switchGoing() {
    going = !going;
    let button = document.getElementById("startStopButton");
    if (going) {
        button.innerHTML = "Stop";
        document.getElementById("runningIndicator").innerHTML = "The simulation is running...";
    } else {
        button.innerHTML = "Start";
        document.getElementById("runningIndicator").innerHTML = "The simulation is not running";
    }
}