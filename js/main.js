const rows = 10
const cols = 10
const totalBombs = 20

let board = []
let bombs = []

function initializeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = []
    for (let c = 0; c < cols; c++) {
      board[r][c] = {
        isBomb: false,
        isCellOpened: false,
        neighborBombs: 0
      };
    }
  }
}

function presentBombs() {
  let bombsPlanted = 0;
  while (bombsPlanted < totalBombs) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)
    
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true
      bombs.push([row, col])
      bombsPlanted++
    }
  }
}

function numOfNeighborbombs() {
  for (let i = 0; i < bombs.length; i++) {
    let bomb = bombs[1]
    for (let row = bomb.row -1; row <= bomb.row + 1; row++) {
      for (let col = bomb.col -1; col <= bomb.col + 1; col++) {
        if (row >= 0 && row < rows && col >= 0 && col < cols && !board[row][col].isBomb) {
          board[row][col].neighborBombs++
        }
      }
    }
  }
}



function startGame () {
    initializeBoard()
    presentBombs()
    createNeighborbombs()
}

startGame()