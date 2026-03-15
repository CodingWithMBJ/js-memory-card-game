// Define Game Data

const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

const icons = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥑", "🍓", "🍉"];
let cards = [...icons, ...icons]; //duplicates icons for pairs

// Shuffles the cards function

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//  Render the board

function createBoard() {
  gameBoard.innerHTML = "";

  shuffle(cards).forEach((icon) => {
    const card = document.createElement("div"); // dynamically creates each <div> card
    card.classList.add("card");
    card.textContent = icon;
    card.dataset.icon = icon; // store the icon value for comparison data-icon = '🍎'
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

createBoard();

// Flip logic & Board locking

let flippedCards = []; // Store the two selected cards temporarily
let lockBoard = false;

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Matching Logic & Score

let attempts = 0;
const scoreDisplay = document.createElement("p");
document.body.insertBefore(scoreDisplay, gameBoard);

function updateScore() {
  scoreDisplay.textContent = `Attempts: ${attempts}`;
}

updateScore();

function checkMatch() {
  const [card1, card2] = flippedCards;
  attempts++;
  updateScore();

  if (card1.dataset.icon === card2.dataset.icon) {
    flippedCards = [];
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

// Restart Button Functionality

restartBtn.addEventListener("click", () => {
  attempts = 0;
  updateScore();
  flippedCards = [];
  lockBoard = false;
  createBoard();
});

// Win Detection

function checkWin() {
  const allFlipped = [...document.querySelectorAll(".card")].every((card) =>
    card.classList.contains("flipped"),
  );

  if (allFlipped) {
    setTimeout(() => {
      alert(`You won in ${attempts}`);
    }, 1000);
  }
}
