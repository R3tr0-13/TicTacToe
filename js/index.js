document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  const restartBtn = document.getElementById('restartBtn');
  
  const X_CLASS = 'X';
  const O_CLASS = 'O';
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let boardState;
  let currentPlayer;

  startGame();

  restartBtn.addEventListener('click', startGame);

  function startGame() {
    boardState = Array.from(Array(9).keys());
    currentPlayer = X_CLASS;
    message.innerText = '';
    clearBoard();
    placeMarks();
  }

  function clearBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleClick);
      board.appendChild(cell);
    }
  }

  function placeMarks() {
    boardState.forEach((mark, index) => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      cell.innerText = mark === X_CLASS ? 'X' : mark === O_CLASS ? 'O' : '';
    });
  }

  function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;
    if (typeof boardState[index] === 'number') {
      boardState[index] = currentPlayer;
      placeMarks();
      if (checkWin(currentPlayer)) {
        message.innerText = `${currentPlayer} wins!`;
      } else if (isDraw()) {
        message.innerText = 'It\'s a draw!';
      } else {
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        if (currentPlayer === O_CLASS) {
          setTimeout(() => computerTurn(), 500);
        }
      }
    }
  }

  function computerTurn() {
    const emptyCells = boardState.filter(cell => typeof cell === 'number');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const index = emptyCells[randomIndex];
    boardState[index] = currentPlayer;
    placeMarks();
    if (checkWin(currentPlayer)) {
      message.innerText = `${currentPlayer} wins!`;
    } else if (isDraw()) {
      message.innerText = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    }
  }

  function checkWin(player) {
    return WINNING_COMBOS.some(combo => {
      return combo.every(index => boardState[index] === player);
    });
  }

  function isDraw() {
    return boardState.every(cell => typeof cell !== 'number');
  }
});
