let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector(".startGameBtn");
let continueGameBtn = document.querySelector("#continue_btn");
let player1Display = document.querySelector("#player1");
let player2Display = document.querySelector("#player2");
let player1NameDisplay = document.querySelector("player1NameInput");
let player2NameDisplay = document.querySelector("player2NameInput");
let player1Name = document.querySelector("player1Name");
let player2Name = document.querySelector("player2Name");
let score1Display = document.querySelector("#score1");
let score2Display = document.querySelector("#score2");
let player1NameInput = document.querySelector("#player1Name");
let player2NameInput = document.querySelector("#player2Name");
let errorMsg = document.querySelector("#errorMsg");
let currentTurnDisplay = document.querySelector("#currentTurn");

let turnO = true;
let scores = { player1: 0, player2: 0 };
let players = { player1: "", player2: "" };

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;
    currentTurnDisplay.classList.remove("hide");
    msgContainer.classList.add("hide");
    
};

const continueGame = () => {
    turnO = true;
    enableBoxes();
    currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;
    currentTurnDisplay.classList.remove("hide");
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
};

const newGame = () => {
    window.location.reload();
};

function remove(){
    document.querySelector(".playerForm").style.display = "none";
}

const startGame = () => {

    players.player1 = player1NameInput.value.trim();
    players.player2 = player2NameInput.value.trim();

    if (!players.player1 || !players.player2) {
        errorMsg.classList.remove("hide");
        return;
    }

    player1Display.textContent = players.player1;
    player2Display.textContent = players.player2;

    document.querySelector(".playerForm").classList.add("hide");
    resetBtn.classList.remove("hide");
    startGameBtn.classList.add("hide");
    newGameBtn.classList.add("hide");
    document.querySelector(".container").classList.remove("hide");
    score1Display.classList.remove("hide");
    score2Display.classList.remove("hide");
    currentTurnDisplay.classList.remove("hide");
    enableBoxes();

    currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;

    // Remove player name input columns and player names display after starting the game
    player1NameInput.remove();
    player2NameInput.remove();
};

startGameBtn.addEventListener("click", startGame);
continueGameBtn.addEventListener("click", continueGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#FF5733"; // Orange color for player O
            turnO = false;
            currentTurnDisplay.textContent = `${players.player2}'s turn (X)`;
        } else {
            box.innerText = "X";
            box.style.color = "#C70039"; // Red color for player X
            turnO = true;
            currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;

        }
        box.disabled = true;
        checkWinner();
    });
});
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    continueGameBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    currentTurnDisplay.classList.add("hide");
    continueGameBtn.classList.remove("hide");
    newGameBtn.classList.remove("hide")
    resetBtn.classList.add("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    let winnerName = winner === "O" ? players.player1 : players.player2;
    msg.innerText = `Congratulations, winner is ${winnerName}`;
    msgContainer.classList.remove("hide");
    currentTurnDisplay.classList.add("hide");

    if (winner === "O") {
        scores.player1 += 1;
        score1Display.textContent = `Score: ${scores.player1}`;
    } else if(winner === "X"){
        scores.player2 += 1;
        score2Display.textContent = `Score: ${scores.player2}`;
    }

    continueGameBtn.classList.remove("hide");
    newGameBtn.classList.remove("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isDraw = true;

    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }

    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);