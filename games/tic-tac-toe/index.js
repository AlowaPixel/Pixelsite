// Tic Tac Toe by @De_Pixelaar

const rows = 3;
const cols = 3;

let place;
let turn;
let winner;

let colSize, rowSize;

let board = new Array(rows);

function reset() {
    for (let y = 0; y < rows; y++) {
        board[y] = new Array(cols);
        for (let x = 0; x < cols; x++) {
            board[y][x] = '';
        }
    }

    place = false;
    turn = "X";
    winner = "";
}

function setup() {
    createCanvas(600,600);

    colSize = floor(width / cols);
    rowSize = floor(height / rows);

    reset();

    textFont("Courier");
}

function draw() {
    background(250);

    let tie = true;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            stroke(0);
            strokeWeight(1);
            noFill();
            rect(x * colSize, y * rowSize, colSize, rowSize);

            textAlign(CENTER, CENTER);
            textSize(256);
            fill(board[y][x] == 'X' ? 255: 0, 0, board[y][x] == 'O' ? 255: 0);
            noStroke();

            text(board[y][x], x * colSize + colSize / 2, y * rowSize + rowSize / 2);

            // Interactivity
            if (mouseX < x * colSize + rowSize && mouseX > (x * colSize) - 1 && mouseY < y * rowSize + rowSize && mouseY > y * rowSize) {
                if (board[y][x] == '' && winner == '') {
                    fill(170);
                    text(turn, x * colSize + colSize / 2, y * rowSize + rowSize / 2);
                    if (place) {
                        board[y][x] = turn;
                        if (turn == 'X') {
                            turn = 'O';
                        } else {
                            turn = 'X';
                        }
                    }
                } 
                place = false;
            }

            if (board[y][x] == '') {
                tie = false;
            }

            // Checking if someone won
            stroke(255, 255, 0, 180);
            strokeWeight(10);
            // Horizontal
            if (x >= 2 && board[y][x] == board[y][x - 1] && board[y][x - 1] == board[y][x - 2] && !board[y][x] == '') {
                tie = false;
                line(x * colSize + colSize / 2, y * rowSize + rowSize / 2, (x - 2) * colSize + colSize / 2, y * rowSize + rowSize / 2);
                winner = board[y][x];
            }
            // Vertical
            if (y >= 2 && board[y][x] == board[y - 1][x] && board[y - 1][x] == board[y - 2][x] && !board[y][x] == '') {
                tie = false;
                line(x * colSize + colSize / 2, y * rowSize + rowSize / 2, x * colSize + colSize / 2, (y - 2) * rowSize + rowSize / 2);
                winner = board[y][x];
            }
            // Diagonal left
            if (x >= 2 && y >= 2 && board[y][x] == board[y - 1][x - 1] && board[y - 1][x - 1] == board[y - 2][x - 2] && !board[y][x] == '') {
                tie = false;
                line(x * colSize + colSize / 2, y * rowSize + rowSize / 2, (x - 2) * colSize + colSize / 2, (y - 2) * rowSize + rowSize / 2);
                winner = board[y][x];
            }
            // Diagonal right
            if (x <= cols - 3 && y >= 2 && board[y][x] == board[y - 1][x + 1] && board[y - 1][x + 1] == board[y - 2][x + 2] && !board[y][x] == '') {
                tie = false;
                line(x * colSize + colSize / 2, y * rowSize + rowSize / 2, (x + 2) * colSize + colSize / 2, (y - 2) * rowSize + rowSize / 2);
                winner = board[y][x];
            }
            
        }
    }

    if (tie) {
        winner = "tie";
    }
    win(winner);
}

function mousePressed() {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
        place = true;
    }
}

function win(player) {
    let message = document.getElementById('winMessage');
    if (!player == "") {
        if (player == "tie") {
            message.innerHTML = "Tie"
        } else {
            message.innerHTML = player + " wins!";
        }
    } else {
        message.innerHTML = "";
    }
}