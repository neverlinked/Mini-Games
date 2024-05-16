const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
function handleClick(event) {
const cell = event.target;
const isCellFilled = cell.textContent.trim() !== '';
if (isCellFilled) return;
cell.textContent = currentPlayer;
if (checkWin(currentPlayer)) {
statusText.textContent = `${currentPlayer} wins!`;
return;
}
currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWin(player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    for (let condition of winConditions) {
      if (condition.every(index => cells[index].textContent.trim() === player)) {
        // Highlight winning cells
        condition.forEach(index => {
          const cell = cells[index];
          cell.classList.add('winning');
          cell.style.color = player === 'X' ? 'green' : 'red'; // Set color based on player
        });
        document.getElementById('win-gif').style.display = 'block';
        return true;
      }
    }
    return false;
  }
  function restartGame() {
    cells.forEach(cell => {
      cell.textContent = '';  // Clear cell content
      cell.style.removeProperty('color');  // Remove inline color style (if any)
      cell.classList.remove('winning');  // Remove "winning" class
      cell.classList.remove('normal');  // Remove "normal" class (if applicable)
    });
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";
    document.getElementById('win-gif').style.display = 'none';
  }
  
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

