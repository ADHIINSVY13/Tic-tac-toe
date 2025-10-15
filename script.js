const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const resetBtn = document.getElementById("reset");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

// Custom symbols that fit square cells
const symbols = ["❤️","🧠"]; // Player 1 = heart, Player 2 = brain;

let currentPlayer = 0;
let board = Array(9).fill("");

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function showPopup(message) {
    winnerText.textContent = message;
    popup.classList.remove("hidden");
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      combo.forEach(i => {
        cells[i].classList.add("bg-green-500", "shadow-[0_0_20px_rgba(0,255,0,0.7)]", "animate-pulse");
      });
      showPopup(`🏆 Player ${symbols[currentPlayer]} Wins!`);
      cells.forEach(cell => cell.style.pointerEvents = "none");
      return true;
    }
  }
  if (!board.includes("")) {
    showPopup("🤝 It's a Draw!");
  }
  return false;
}

function handleClick(e, index) {
  if (board[index] !== "") return;
  board[index] = symbols[currentPlayer];
  e.target.textContent = symbols[currentPlayer];

  if (!checkWinner()) {
    currentPlayer = 1 - currentPlayer;
    turnText.textContent = `Player ${symbols[currentPlayer]}'s Turn`;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => handleClick(e, index));
});

// Reset Functions
function resetGame() {
  board.fill("");
  currentPlayer = 0;
  turnText.textContent = `Player ${symbols[currentPlayer]}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell bg-white/10 backdrop-blur-md w-full aspect-square flex items-center justify-center text-5xl md:text-6xl font-bold text-white rounded-2xl cursor-pointer hover:scale-105 transition transform duration-200";
    cell.style.pointerEvents = "auto";
  });
  popup.classList.add("hidden");
}

resetBtn.addEventListener("click", resetGame);
document.getElementById("popupReset").addEventListener("click", resetGame);
