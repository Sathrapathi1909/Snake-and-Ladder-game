const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const diceResult = document.getElementById("diceResult");
const statusText = document.getElementById("status");
const winPopup = document.getElementById("winPopup");

let playerPosition = 1;

const snakes = {16:6,47:26,49:11,56:53,62:19,64:60,87:24,93:73,95:75,98:78};
const ladders = {2:38,7:14,8:31,15:26,21:42,28:84,36:44,51:67,71:91,78:98};

function createBoard() {
  board.innerHTML = "";
  for (let i = 100; i >= 1; i--) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = "cell-" + i;
    cell.textContent = i;

    if (snakes[i]) {
      cell.classList.add("snake");
      const s = document.createElement("span");
      s.textContent = "🐍";
      cell.appendChild(s);
    }

    if (ladders[i]) {
      cell.classList.add("ladder");
      const l = document.createElement("span");
      l.textContent = "🪜";
      cell.appendChild(l);
    }

    board.appendChild(cell);
  }
}

function updatePlayer() {
  document.querySelectorAll(".player").forEach(p => p.remove());
  const player = document.createElement("div");
  player.classList.add("player");
  document.getElementById("cell-" + playerPosition).appendChild(player);
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = "Dice: " + dice;

  let newPosition = playerPosition + dice;
  if (newPosition > 100) return;

  playerPosition = newPosition;

  if (snakes[playerPosition]) {
    statusText.textContent = "Oh no! Snake bite 🐍";
    playerPosition = snakes[playerPosition];
  } else if (ladders[playerPosition]) {
    statusText.textContent = "Yay! Ladder climb 🪜";
    playerPosition = ladders[playerPosition];
  } else {
    statusText.textContent = "Moved to " + playerPosition;
  }

  updatePlayer();

  if (playerPosition === 100) {
    setTimeout(() => winPopup.classList.remove("hidden"), 300);
  }
}

function restartGame() {
  playerPosition = 1;
  winPopup.classList.add("hidden");
  diceResult.textContent = "Dice: -";
  statusText.textContent = "New Game Started!";
  updatePlayer();
}

rollBtn.addEventListener("click", rollDice);

createBoard();
updatePlayer();
