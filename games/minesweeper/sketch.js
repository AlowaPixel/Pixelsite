let w = 40;
let grid, rows, cols;
let playerLost, playerWon, gameHasStarted, startTime, endTime, time;

function reset() {
    grid = [];
    playerLost = false;
    playerWon = false;
    gameHasStarted = false;

    // Create a 2D array of Cells
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i].push(new Cell(i, j, w));
        }
    }
}

function setup() {
    createCanvas(600,600);

    rows = floor(height / w);
    cols = floor(width / w);

    reset();

    textFont("Courier");
}

function draw() {
    background(160);

    // Display all cells
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].display();
        }
    }

    // Display text at end of game
    textSize(100);
    noStroke();
    textAlign(CENTER, CENTER);
    if (playerLost) {
        fill(255, 0, 0);
        text("You died", width / 2, height / 2);
    } else if (playerWon) {
        fill(0, 255, 0);
        text("You won!", width / 2, height / 2);
    }


    // Timer
    if (!gameHasStarted) {
        document.getElementById("timer").innerHTML = "00:00:00";
    } else if (playerLost) {
        document.getElementById("timer").innerHTML = ":(";
    } else if (!playerWon) {
        endTime = new Date().getTime();
        time = endTime - startTime;
        let hours = floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = floor((time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = floor((time % (1000 * 60)) / 1000);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds;
    }
}

function mousePressed() {
    if (!playerLost && !playerWon) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    if (mouseButton == LEFT) {
                        // Picking mines randomly at beginning of game
                        // Doing this here so we can make sure first mine is safe
                        if (!gameHasStarted) {
                            // First we get the value from the textbox (and just make it 20 if player acts funny)
                            let mineCount;
                            let val = document.getElementById("mineNum").value;
                            if (val != "" && !val.includes("e")) {
                                mineCount = constrain(abs(int(val)), 1, rows * cols - 1);
                            } else {
                                mineCount = 20;
                            }
                            // Then we implement it
                            for (let i = 0; i < mineCount; i++) {
                                let choice;
                                do {
                                    choice = grid[floor(random(rows))][floor(random(cols))]
                                } while (choice.mine || choice.contains(mouseX, mouseY));
                                choice.mine = true;
                            }

                            gameHasStarted = true;
                            startTime = new Date().getTime();
                        }
                        
                        // Reveal clicked cell
                        grid[i][j].reveal();

                        let revealAllCellsAtEnd = document.getElementById("revealBool").checked;
                        // Checking if player lost
                        if (grid[i][j].mine) {
                            playerLost = true;

                            if (revealAllCellsAtEnd) {
                                // Reveal everything
                                for (let i = 0; i < rows; i++) {
                                    for (let j = 0; j < cols; j++) {
                                        grid[i][j].revealed = true;
                                    }
                                }
                            }
                        }

                        // Checking if the player has won the game
                        if (!playerLost) {
                            // Assume we won
                            let temp = true;
                            for (let i = 0; i < rows; i++) {
                                for (let j = 0; j < cols; j++) {
                                    // If there is an unrevealed cell that isn't a mine, we didn't win
                                    if (!grid[i][j].revealed && !grid[i][j].mine) {
                                        temp = false;
                                    }
                                }
                            }
                            playerWon = temp;
                            if (playerWon && revealAllCellsAtEnd) {
                                // Reveal everything
                                for (let i = 0; i < rows; i++) {
                                    for (let j = 0; j < cols; j++) {
                                        grid[i][j].revealed = true;
                                    }
                                }
                            }
                        }
                    } else if (mouseButton == RIGHT) {
                        grid[i][j].flag();
                    }
                    return;
                }
            }
        }
    }
}