let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "🎭";
let gameActive = true;
let players = ["🎭", "🎲"];

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            document.getElementById("status").innerText = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").innerText = `🎉 Player ${board[a]} Wins!`;
            gameActive = false;
            setTimeout(() => alert(`🎉 Player ${board[a]} Wins!`), 200);
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a Draw! 🤝";
        gameActive = false;
        setTimeout(() => alert("It's a Draw! 🤝"), 200);
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = players[0];
    document.getElementById("status").innerText = "Player 🎭's Turn";
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
    }
}
