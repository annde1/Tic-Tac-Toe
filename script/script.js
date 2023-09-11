//Global variables (game state):
let activePlayer;

//Function updateScoresHtml will update scores of player 1 and player 2 in the html
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
// Function terminateGame will handle the end of the game and update scores.
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

// Function checkEmptyCells will return true if there are no empty cells left on the board
const checkEmptyCells = () => {
  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    if (!cell.innerHTML) {
      return false;
    }
  }
  return true;
};

// Function handleTurn will return true to terminate the game or false to continue
const handleTurn = () => {
  // Check if there is a winner or if the board is full
  let winner = checkWhoWon();
  let noEmptyCells = checkEmptyCells();

  if (winner || noEmptyCells) {
    // If the game ended, call terminateGame to update scores and display results
    terminateGame(winner);
    activeUser.save(); //Save user data
    return true; // Return true to indicate the game has ended
  }
  return false; // Return false to continue the game
};

// Function handleRound will handle a round of the game (human and computer moves)
const handleRound = () => {
  // Check if the game ended after the human player's move
  if (handleTurn()) {
    return; // Return early if the game ended
  }
  // Make a move for the computer player
  computerPlayer.computerMove();
  // Check if the game ended after the computer player's move
  handleTurn();
};
// Function handleClick handles the human player's move when clicking a cell
const handleClick = (e) => {
  const target = e.target;
  // Check if the cell is already occupied
  if (target.innerHTML) {
    return;
  } else {
    // Place the active player's mark in the clicked cell
    target.innerHTML = activePlayer;
  }
  // Switch the active player ('X' to 'O' or vice versa)
  activePlayer = activePlayer == "x" ? "o" : "x";
  // Handle the next round of the game
  handleRound();
};

//When initializing page add event listeners to all cells:
const initPage = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

// Function newGame starts a new game by resetting the board and scores
const newGame = (e) => {
  activePlayer = "x";
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.innerHTML = ""));
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};
/// Function startGame initiates the game and sets up event listeners
const startGame = () => {
  const gameArea = document.querySelector(".game-container");
  gameArea.classList.remove("hide-game");
  initPage();
  newGame();
  const btnNewGame = document.getElementById("btnNewGame");
  btnNewGame.addEventListener("click", newGame);
};
