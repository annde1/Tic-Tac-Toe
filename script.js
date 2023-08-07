let activePlayer;
let scoreX = 0;
let scoreO = 0;

const updateScoresHtml = (player1, player2) => {
  const playerXScore = document.getElementById("playerX");
  const playerYScore = document.getElementById("playerY");
  playerXScore.innerHTML = `player 1: ${player1}`;
  playerYScore.innerHTML = `player 2: ${player2}`;
};

const checkWinner = () => {
  const cells = document.querySelectorAll(".cell");
  let winner;

  //check vertical:
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML !== ""
    ) {
      winner = cells[i].innerHTML;
    }
  }

  //check horitzontal:
  for (let i = 0; i <= 6; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      winner = cells[i].innerHTML;
    }
  }

  //check diagonal \ :

  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    winner = cells[i].innerHTML;
  }

  //check diagonal / :

  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML !== ""
  ) {
    winner = cells[i].innerHTML;
  }
  //update scores
  if (winner == "x") {
    scoreX = scoreX + 1;
  } else if (winner == "o") {
    scoreO = scoreO + 1;
  }

  const winnerText = document.getElementById("winnerText");
  if (winner !== undefined) {
    //check if there is winner
    winnerText.innerHTML = `${winner} won the game !`;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
  } else {
    for (let cell of cells) {
      //if innerHTML of cell is emoty no need to check, continue playing
      if (cell.innerHTML == "") {
        return;
      }
    }
    winnerText.innerHTML = `no one won the game :(`;
  }

  updateScoresHtml(scoreX, scoreO);
};
const handleClick = (e) => {
  const target = e.target;
  if (target.innerHTML != "") {
    return;
  } else {
    target.innerHTML = activePlayer;
  }
  //switch active player
  activePlayer = activePlayer == "x" ? "o" : "x";
  checkWinner();
};

//When initializing page add event listeners to all cells:
const initPage = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

const newGame = (e) => {
  activePlayer = "x";
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.innerHTML = ""));
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

window.addEventListener("load", () => {
  //When pages loads we call two functions:
  initPage(); //adds event listeners to all the cells and the callback handles click
  newGame(); //this function decides who plays fist and cleans innerHTML of all cells
  const btnNewGame = document.getElementById("btnNewGame");
  btnNewGame.addEventListener("click", newGame);
});
