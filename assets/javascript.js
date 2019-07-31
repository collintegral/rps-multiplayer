let p1name = "", p2name = "", p1score = 0, p2score = 0, p1move = "", p2move = "";

let hasOp = false;
let isReady = false;

const currentAction = $("#current-action");
const oneMove = $("#p1move");
const twoMove = $("#p2move");

const buttons = $("#btndiv");
const readyBtn = $("<button id=ready-btn>Ready?</button>").click(event => {
    isReady = true;
});
const rockBtn = $("<button id=rock-btn>Rock!</button>").click(event => {
    p1move = 'r';
    isReady = true;
});
const paperBtn = $("<button id=paper-btn>Paper!</button>").click(event => {
    p1move = 'p';
    isReady = true;
});
const scissorsBtn = $("<button id=scissors-btn>Scissors!</button>").click(event => {
    p1move = 's';
    isReady = true;
});

function updateNames() {
    $("#p1name").text("Player 1: " + p1name);
    $("#p2name").text("Player 2: " + p2name);
}

function updateWins() {
    $("#p1wins").text("Wins: " + p1score);
    $("#p2wins").text("Wins: " + p2score);
}

function opFound() {
    currentAction.text("Opponent found! Ready?");
    updateButtons("readyup");
}

function pReady() {
    currentAction.text("Waiting for opponent to ready up...");
    updateButtons("blank");
}

function playerMoves() {
    currentAction.text("Select your move!");
    updateButtons("rps");
}

function moveReady() {
    currentAction.text("Waiting for opponent to move...");
    updateButtons("blank");
}

function turnResult() {
    const winner = winLogic();
    switch (winner) {
        case 'p1':
            p1score++;
            currentAction.text("You won! Ready for the next round?");
            break;
        case 'p2':
            p2score++;
            currentAction.text("You lost... Ready for the next round?");
            break;
        case 'tie':
            currentAction.text("It was a tie! Ready for the next round?");
            break;
    }
    updateButtons("readyup");
}

function winLogic() {
    if (p1move === 'r') {
        if (p2move === 'r') {
            return 'tie';
        }
        if (p2move === 'p') {
            return 'p2';
        }
        if (p2move === 's') {
            return 'p1';
        }
    }
    if (p1move === 'p') {
        if (p2move === 'r') {
            return 'p1';
        }
        if (p2move === 'p') {
            return 'tie';
        }
        if (p2move === 's') {
            return 'p2';
        }
    }
    if (p1move === 's') {
        if (p2move === 'r') {
            return 'p2';
        }
        if (p2move === 'p') {
            return 'p1';
        }
        if (p2move === 's') {
            return 'tie';
        }
    }
}

function updateButtons(btnstage) {
    buttons.empty();
    isReady = false;
    switch (btnstage) {
        case "blank":
            break;
        case "readyup":
            buttons.append(readyBtn);
            break;
        case "rps":
            buttons.append(rockBtn + paperBtn + scissorsBtn);
            break;
    }
}

$("#newname").submit(event => {
    event.preventDefault();
    p1name = $("input:first").val();
    updateNames();
})

/*
Function needed to connect to Firebase
Function to check for an unmatched player:
if one is found, connect to their 'lobby'
if none, create a new 'lobby' pairing and wait for an opponent.
Function to listen for opponent's Ready variable. Game should not progress until both players are Ready after each step.
Function to grab opponent's name (and listen for its updates), as well as their moves: store these in the p2 slots.
Function to inform the player when opponent has left, and suggest refreshing the site to rejoin the queue.
*/