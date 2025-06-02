const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.setAttribute("data-index", index);
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", handleClick);
    board.appendChild(cellDiv);
  });
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winInfo = checkWinner();
  if (winInfo) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinningCells(winInfo);
  } else if (cells.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return pattern; // Return winning combination
    }
  }
  return null;
}

function highlightWinningCells(indices) {
  indices.forEach(i => {
    board.children[i].classList.add("win");
  });
}

restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  cells = Array(9).fill("");
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
});

createBoard();
