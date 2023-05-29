// TODO: Win condition

const COLS = 7;
const ROWS = 6;
let w;
let h;
let board;
let redTurn; // true if red, false if yellow
// 0: empty
// 1: red
// 2: yellow

function reset() {
    board = [];
    for (let i = 0; i < ROWS; i++) {
        board[i] = [];
        for (let j = 0; j < COLS; j++) {
            board[i][j] = 0;
        }
    }

    redTurn = true;
    loop();
}

function setup() {
    createCanvas(800, 600);
    w = width / COLS;
    h = height / ROWS;

    textFont("Courier");
    textSize(69);
    textAlign(CENTER, CENTER);

    reset();
}

function draw() {
    background(120);

    const mouseCol = floor(mouseX / w);
    for (let j = 0; j < COLS; j++) {

        const ellipseFactor = .8; // Factor to alter the size of the ellipses

        for (let i = 0; i < ROWS; i++) {
            // Draw squares for board
            noFill();
            stroke(0);
            rect(j * w, i * h, w, h);

            // Draw red and yellow circles
            noStroke()
            if (board[i][j] == 1) fill(200, 0, 0);
            else if (board[i][j] == 2) fill(200, 200, 0);
            else fill(150);
            ellipse((j+.5) * w, (i+.5) * h, w * ellipseFactor, h * ellipseFactor);
        }

        // Draw translucent circle if mouse is over this column
        if (mouseCol == j && mouseY < height && mouseY >= 0 && isLooping()) {
            const i = calcLowestRow(j);
            noStroke();
            if (redTurn) fill(200, 0, 0, 120);
            else fill(200, 200, 0, 120);
            ellipse((j+.5) * w, (i+.5) * h, w * ellipseFactor, h * ellipseFactor);
        }
    }

    if (!isLooping()) {
        stroke(0);
        if (redTurn) fill(200, 0, 0);
        else fill (200, 200, 0);
        text(redTurn ? "Red Wins!": "Yellow Wins!", width * .5, height * .5);
    }
}

function mousePressed() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        const j = floor(mouseX / w);
        const i = calcLowestRow(j);
        if (i == -1) return;

        let clr;
        if (redTurn) clr = 1;
        else clr = 2;
        board[i][j] = clr;

        // Check if player has won
        // Horizontal
        let hitCount = 0;
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (board[y][x] == clr) hitCount++;
                else hitCount = 0;

                if (hitCount >= 4) {
                    noLoop();
                    return;
                }
            }
        }
        // Vertical
        hitCount = 0;
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                if (board[y][x] == clr) hitCount++;
                else hitCount = 0;

                if (hitCount >= 4) {
                    noLoop();
                    return;
                }
            }
        }
        // Diagonal top left to bottom right
        for (let x = 0; x < COLS-3; x++) {
            for (let y = 0; y < ROWS-3; y++) {
                if (board[y][x] == clr && board[y+1][x+1] == clr && board[y+2][x+2] == clr && board[y+3][x+3] == clr) {
                    noLoop();
                    return;
                }
            }
        }
        // Diagonal top left to bottom right
        for (let x = 3; x < COLS; x++) {
            for (let y = 0; y < ROWS-3; y++) {
                if (board[y][x] == clr && board[y+1][x-1] == clr && board[y+2][x-2] == clr && board[y+3][x-3] == clr) {
                    noLoop();
                    return;
                }
            }
        }

        redTurn = !redTurn;
    }
}

function calcLowestRow(j) { // Return lowest empty row in a column
    for (let i = ROWS - 1; i >= 0; i--) {
        if (board[i][j] == 0) {
            return(i);
        }
    }
    return -1
}