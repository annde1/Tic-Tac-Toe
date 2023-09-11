let activeUser;
// Class User represents a user with a username, email, and scores
class User {
  username;
  email;
  #password;
  constructor(email, password, username) {
    this.email = email;
    this.#password = password;
    this.username = username;
    this.scoreX = 0;
    this.scoreO = 0;
    this.isLoggedIn = false;
  }
  // Method login checks if the provided email and password match the user's credentials

  login(email, password) {
    if (this.email == email && this.#password == password) {
      this.isLoggedIn = true;
      return true;
    } else {
      return false;
    }
  }
  // Method displayMessage updates a message area with a welcome message

  displayMessage(username) {
    const messageArea = document.getElementById("message");
    messageArea.textContent = `Welcome, ${username}`;
    const scoreTitle = document.querySelector("#playerX");
    scoreTitle.innerText = `${username}:`;
  }
  // Method save stores the user's scores in local storage
  save() {
    let obj = {
      username: this.username,
      scoreO: this.scoreO,
      scoreX: this.scoreX,
    };
    const str = JSON.stringify(obj);
    localStorage.setItem(`${this.username}`, str);
  }
  // Method load retrieves the user's scores from local storage
  load() {
    let obj = JSON.parse(localStorage.getItem(`${this.username}`));
    if (!obj) {
      return;
    }
    this.scoreX = obj.scoreX;
    this.scoreO = obj.scoreO;
    updateScoresHtml(obj.username, this.scoreX, this.scoreO);
  }
  // Methods to increase scores for 'X' and 'O'
  icreaseScoreX() {
    this.scoreX = this.scoreX + 1;
  }
  increaseScoreO() {
    this.scoreO = this.scoreO + 1;
  }
}

class Computer {
  // Method computerMove makes a random move for the computer player ('O')
  computerMove() {
    let emptyCellsArray = [...document.querySelectorAll(".cell")].filter(
      (cell) => cell.innerHTML === ""
    );
    if (emptyCellsArray.length === 0) {
      return;
    }
    const randomIndex = Math.floor(
      Math.random() * (emptyCellsArray.length - 1 + 1)
    );
    emptyCellsArray[randomIndex].innerHTML = "o";
    activePlayer = activePlayer == "x" ? "o" : "x";
  }
}
// Initialize the computer player
let computerPlayer = new Computer();
// Create user objects with email, password, and username
let users = [
  new User("jamesbond@gmail.com", "5555", "jamesb"),
  new User("johnwick@gmail.com", "67676", "johnw"),
  new User("janedoe@gmail.com", "121212", "janed"),
  new User("michaeljackson@gmail.com", "0000", "michaelj"),
];
// Event listener for page load

window.addEventListener("load", () => {
  const form = document.querySelector("#formLogin");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("inputEmail").value;
    const passwordInput = document.getElementById("inputPassword").value;
    const messageArea = document.getElementById("message");
    if (!emailInput || !passwordInput) {
      messageArea.innerText = `You are missing password or username`;
      return;
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].login(emailInput, passwordInput)) {
        users[i].displayMessage(users[i].username);
        activeUser = users[i];
        users[i].load();
        startGame();
        return;
      }
    }

    messageArea.innerText = `Incorrect email or password`;
  });
});
