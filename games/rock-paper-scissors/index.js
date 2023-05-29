const options = ["rock", "paper", "scissors"]

let choice;
let opponentChoice = "just giving this a value so they aren't equal";

let winner;
let playerWins = 0;
let opponentWins = 0;

let buttons = []

let rockImg, paperImg, scissorsImg;

function preload() {
    rockImg = loadImage("rock.png");
    paperImg = loadImage("paper.png");
    scissorsImg = loadImage("scissors.png");
}

function setup() {
    createCanvas(800, 500);
    imageMode(CENTER);
    textFont("Courier");

    buttons.push(new Button(width * 0.25, height - 100, 100, 50, "Rock"))
    buttons.push(new Button(width * 0.50, height - 100, 100, 50, "Paper"))
    buttons.push(new Button(width * 0.75, height - 100, 100, 50, "Scissors"))

    textFont("Courier")
}

function draw() {
    background(220);

    // Display image for player
    if (choice == "rock") {
        image(rockImg, width - 200, 200, 200, 200);
    } else if (choice == "paper") {
        image(paperImg, width - 200, 200, 250, 200);
    } else if (choice == "scissors") {
        image(scissorsImg, width - 200, 200, 300, 100);
    }

    // Display image for opponent
    if (opponentChoice == "rock") {
        image(rockImg, 200, 200, 200, 200);
    } else if (opponentChoice == "paper") {
        image(paperImg, 200, 200, 250, 200);
    } else if (opponentChoice == "scissors") {
        image(scissorsImg, 200, 200, 300, 100);
    }

    // Display text based on who won
    fill(0)
    textAlign(CENTER, BOTTOM);
    textSize(64);
    if (winner == "player") {
        text("You won!", width / 2, height);
    } else if (winner == "opponent") {
        text("You lost...", width / 2, height);
    } else if (winner == "tie") {
        text("Tie", width / 2, height);
    }

    // Make stuff clear
    textSize(32);
    noStroke();

    fill(255, 0, 0);
    textAlign(LEFT, TOP);
    text("Opponent (wins: " + opponentWins + ")", 0, 0);

    fill(0, 0, 255);
    textAlign(RIGHT, TOP);
    text("You (wins: " + playerWins + ")", width, 0);



    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].display();
    }
}

function mousePressed() {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].checkMouse()) {
            buttons[i].clicked = true;

            choice = buttons[i].label.toLowerCase();
            opponentChoice = options[floor(random(options.length))];

            // Determine outcome
            if ((choice == "rock" && opponentChoice == "scissors") || (choice == "paper" && opponentChoice == "rock") || (choice == "scissors" && opponentChoice == "paper")) {
                winner = "player";
                playerWins++;
            } else if ((choice == "scissors" && opponentChoice == "rock") || (choice == "rock" && opponentChoice == "paper") || (choice == "paper" && opponentChoice == "scissors")) {
                winner = "opponent";
                opponentWins++;
            } else if (choice == opponentChoice) {
                winner = "tie";
            }

            break;
        }
    }
}

function mouseReleased() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].clicked = false;
    }
}