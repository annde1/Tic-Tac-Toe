let activeUser;
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

  login(email, password) {
    if (this.email == email && this.#password == password) {
      this.isLoggedIn = true;
      return true;
    } else {
      return false;
    }
  }
  displayMessage(username) {
    const messageArea = document.getElementById("message");
    messageArea.textContent = `Welcome, ${username}`;
    const scoreTitle = document.querySelector("#playerX");
    scoreTitle.innerText = `${username}:`;
  }

  save() {
    let obj = {
      username: this.username,
      scoreO: this.scoreO,
      scoreX: this.scoreX,
    };
    const str = JSON.stringify(obj);
    localStorage.setItem(`${this.username}`, str);
  }
  load() {
    let obj = JSON.parse(localStorage.getItem(`${this.username}`));
    if (!obj) {
      return;
    }
    this.scoreX = obj.scoreX;
    this.scoreO = obj.scoreO;
    updateScoresHtml(obj.username, this.scoreX, this.scoreO);
  }
  icreaseScoreX() {
    this.scoreX = this.scoreX + 1;
  }
  increaseScoreO() {
    this.scoreO = this.scoreO + 1;
  }
}

class Computer {
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

let computerPlayer = new Computer();
let users = [
  new User("annadepta61@gmail.com", "1234", "annde"),
  new User("jamesbond@gmail.com", "5555", "jamesb"),
  new User("johnwick@gmail.com", "67676", "johnw"),
  new User("shlomo@hackeru.gmail.com", "191919", "shlomoU"),
  new User("janedoe@gmail.com", "121212", "janed"),
  new User("michaeljackson@gmail.com", "0000", "michaelj"),
];

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
