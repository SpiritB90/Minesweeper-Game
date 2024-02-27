const rows = 10
const cols = 10
const totalBombs = 15

let board = []
let bombs = []

function startGame() {
  initializeBoard()
  createBoard()
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


startGame()
