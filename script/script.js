//Global variables (game state):
let activePlayer;

//Function updateScoresHtml will update scores of player 1 and player 2 in the html!
const updateScoresHtml = (username, player1, player2) => {
  const playerXScore = document.getElementById("playerX");
  const playerYScore = document.getElementById("playerY");
  playerXScore.innerHTML = `${username}: ${player1}`;
  playerYScore.innerHTML = `player 2: ${player2}`;
};

// checkWhoWon will check who won the game board and return the sign
// of the winner. if no one won, we return null.
const checkWhoWon = () => {
  const cells = document.querySelectorAll(".cell");
  let winner;

  //check vertical:
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML
    ) {
      winner = cells[i].innerHTML;
    }
  }

  //check horitzontal:
  for (let i = 0; i <= 6; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML
    ) {
      winner = cells[i].innerHTML;
    }
  }

  //check diagonal \ :

  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML
  ) {
    winner = cells[i].innerHTML;
  }

  //check diagonal / :

  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML
  ) {
    winner = cells[i].innerHTML;
  }

  return winner;
};

const terminateGame = (winner) => {
  if (winner == "x") {
    activeUser.scoreX = activeUser.scoreX + 1;
  } else if (winner == "o") {
    activeUser.scoreO = activeUser.scoreO + 1;
  }

  // Updates the user interface according to game results
  const winnerText = document.getElementById("winnerText");
  //Check if there is winner
  if (winner) {
    winnerText.innerHTML = `${winner} won the game !`;
  } else {
    winnerText.innerHTML = `no one won the game :(`;
  }
  //and the end of game update scores of both players
  updateScoresHtml(activeUser.username, activeUser.scoreX, activeUser.scoreO);

  // Removing event listeners from the cells because there is winner and we don't want to to continue playing
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
};

// checkEmptyCells will return true if there are no empty cells
const checkEmptyCells = () => {
  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    if (!cell.innerHTML) {
      return false;
    }
  }
  return true;
};

// handleTurn will return true to terminate the game or false to continue
const handleTurn = () => {
  // Gets the winner
  let winner = checkWhoWon();
  let noEmptyCells = checkEmptyCells();

  if (winner || noEmptyCells) {
    terminateGame(winner);
    activeUser.save();
    return true;
  }

  return false;
};

// handleTurn will return true if the game ended, otherwise it will return false
const handleRound = () => {
  // Human played....
  if (handleTurn()) {
    return;
  }

  computerPlayer.computerMove();
  handleTurn();
};

const handleClick = (e) => {
  const target = e.target;
  if (target.innerHTML) {
    return;
  } else {
    target.innerHTML = activePlayer;
  }
  //switch active player
  activePlayer = activePlayer == "x" ? "o" : "x";
  handleRound();
};

//When initializing page add event listeners to all cells:
const initPage = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

//Function new game declares "x" as the active player. All the cells must be empty when we start new game
const newGame = (e) => {
  activePlayer = "x";
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.innerHTML = ""));
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

const startGame = () => {
  const gameArea = document.querySelector(".game-container");
  gameArea.classList.remove("hide-game");
  initPage();
  newGame();
  const btnNewGame = document.getElementById("btnNewGame");
  btnNewGame.addEventListener("click", newGame);
};
