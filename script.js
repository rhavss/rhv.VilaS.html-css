const buttons = document.querySelectorAll(".playgame button");
const playerDisplay = document.querySelector(".current-player");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

playerDisplay.innerText = `Jogador atual: ${currentPlayer}`;

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => handleMove(btn, index));
});

function handleMove(button, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  button.innerText = currentPlayer;

  checkResult();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.innerText = `Jogador atual: ${currentPlayer}`;
}

function checkResult() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(`O jogador ${currentPlayer} venceu!`);
      return;
    }
  }

  if (!board.includes("")) {
    endGame("Empate! Ninguém venceu.");
  }
}

function endGame(message) {
  gameActive = false;
  gameActive = false;
  playerDisplay.innerText = message;

  // botão reiniciar
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Reiniciar Jogo";
  restartBtn.classList.add("btn-end");
  document.querySelector(".game-container").appendChild(restartBtn);

  restartBtn.addEventListener("click", restartGame);
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  playerDisplay.innerText = `Jogador atual: ${currentPlayer}`;

  buttons.forEach(btn => (btn.innerText = ""));
  document.querySelector(".btn-game").remove();
}