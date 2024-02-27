const rows = 10
const cols = 10
const totalBombs = 15

let board = []
let bombs = []

function startGame() {
  initializeBoard()
  createBoard()
  plantBombs()
  calculateNetighborBombs()
}

function initializeBoard() {
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < cols; j++) {
            board[i][j] = {
                isBomb: false,
                isOpened: false,
                neighbors: 0
            }
        }
    }
}

function createBoard() {
    const container = document.querySelector('.container')
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.id = `cell-${i}-${j}` 
            cell.addEventListener('click', () => revealCell(i, j))
            container.appendChild(cell)
        }
    }
}

function plantBombs() {
    let bombsPlanted = 0;
    while (bombsPlanted < totalBombs) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!board[row][col].isBomb) {
        board[row][col].isBomb = true;
        bombs.push([row, col]);
        bombsPlanted++;
      }
    }
  }

  function calculateNeighborBombs() {
    for (const [row, col] of bombs) {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < rows && j >= 0 && j < cols && !board[i][j].isBomb) {
            board[i][j].neighbors++;
          }
        }
      }
    }
  }

startGame()
