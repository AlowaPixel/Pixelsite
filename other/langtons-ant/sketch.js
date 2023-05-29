// TODO: Fix ant going off screen and improve overall presentation and features

let w = 10;
let grid, rows, cols;

let ant;

let going, gen;

function reset() {
    grid = [];

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    ant = undefined;

    gen = 0;

    going = false;
    setInterval(function(){
        frameRate(going ? float(document.getElementById('updateSpeedSlider').value): 60);
    }, 16.66666666);
}

function setup() {
    createCanvas(1000, 600);
    frameRate(20);

    rows = floor(height / w);
    cols = floor(width / w);

    reset();
}

function draw() {
    advance();
    display();
}

function mousePressed() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                if (mouseButton === RIGHT) {
                    going = true;
                    ant = {
                        i: i,
                        j: j,
                        dir: 3, // 0 = up, 1 = right, 2 = down, 3 = left

                        advance: function() {
                            let cell = grid[this.i][this.j];
                            let temp = cell.alive;
                    
                            cell.alive = !cell.alive;
                            
                            // Turning the ant
                            if (!temp) {
                                this.dir++;
                            } else {
                                this.dir--;
                            }
                            this.dir = (this.dir + 4) % 4;

                            // Moving the ant
                            if (this.dir == 0) {
                                this.i--;
                            } else if (this.dir == 1) {
                                this.j++;
                            } else if (this.dir == 2) {
                                this.i++;
                            } else {
                                this.j--;
                            }

                            // Wrapping around the screen
                            this.i = (this.i + rows) % rows;
                            this.j = (this.j + cols) % cols;
                        },

                        display: function() {
                            noStroke();
                            fill(0);
                            let cell = grid[this.i][this.j];

                            push();
                            translate(cell.x + cell.w / 2, cell.y + cell.w / 2);
                            rotate(HALF_PI * this.dir);
                            ellipse(0, 0, floor(cell.w * 0.4), floor(cell.w * 0.7));
                            pop();
                        }
                    }
                } else if (mouseButton === LEFT) {
                    grid[i][j].alive = !grid[i][j].alive;
                }

                // So that changes are displayed, even if the framerate is low and we won't be drawing a frame for some time.
                if (going) {
                    display();
                }
                return;
            }
        }
    }
}

function keyPressed() {
    if (keyCode === ESCAPE) {
        ant = undefined;
        going = false;
    }
}


function advance() {
    if (ant != undefined) {
        ant.advance();
        gen++;
    }
    document.getElementById('gen').innerHTML = gen;
}

function display() {
    background(100);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].display();
        }
    }

    if (ant != undefined) {
        ant.display();
    }
}