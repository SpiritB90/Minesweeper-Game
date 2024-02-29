//Variable Declarations

const rows = 10
const cols = 10
const totalBombs = 20

let board = []
let bombs = []
let gameOver = false

//Functions

function initializeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = []
    for (let c = 0; c < cols; c++) {
      board[r][c] = {
        isBomb: false,
        isCellOpened: false,
        neighborBombs: 0
      }
    }
  }
}

function presentBombs() {
  let bombsPlanted = 0
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

function numOfNeighborBombs() {
  for (let i = 0; i < bombs.length; i++) {
    let bomb = bombs[i]
    for (let row = bomb[0] - 1; row <= bomb[0] + 1; row++) {
      for (let col = bomb[1] - 1; col <= bomb[1] + 1; col++) {
        if (row >= 0 && row < rows && col >= 0 && col < cols && !board[row][col].isBomb) {
          board[row][col].neighborBombs++
        }
      }
    }
  }
}

function createBoard() {
  const container = document.querySelector('.container')
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell'
      cell.id = `cell-${r}-${c}`
      cell.addEventListener('click', function () {
        showCell(r, c)
      })

      cell.addEventListener('contextmenu', function (event) {
        event.preventDefault()
        redCell(r, c)
      })

      cell.style.fontSize = '25px'
      cell.style.textAlign = 'center'

      container.appendChild(cell)
    }
  }
}

function redCell(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`)
  cell.classList.toggle('red-cell')
}

function showCell(row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col].isCellOpened) return
  const cell = document.getElementById(`cell-${row}-${col}`)
  if (board[row][col].isBomb) {
    cell.innerText = '💣'
    showAllBombs()
    const gameOverEl = document.getElementById('game-over')
    gameOverEl.innerText = 'Game Over! You clicked on a bomb!'
    disableBoard()
    return
  } else {
    board[row][col].isCellOpened = true
    cell.innerText = board[row][col].neighborBombs || ''
    if (board[row][col].neighborBombs === 0) {
      showNeighbors(row, col)
    }
  }
}


function showAllBombs() {
  bombs.forEach(bomb => {
    const [row, col] = bomb
    const cell = document.getElementById(`cell-${row}-${col}`)
    cell.innerText = '💣'
  })
}

function disableBoard() {
  const cells = document.querySelectorAll('.cell')
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none'
  })
}

function cellClickListener(event) {
  if (!gameOver) {
    const [row, col] = event.target.id.split('-').slice(1).map(Number)
    showCell(row, col)
  }
}

function closeMessageBox() {
  const gameOverEl = document.getElementById('game-over')
  gameOverEl.innerText = ''
}



function showNeighbors(row, col) {
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      showCell(r, c)
      const cell = document.getElementById(`cell-${r}-${c}`)
      if (cell) {
        cell.classList.add('gray-neighbors')
      }
    }
  }
}

function startGame() {
  initializeBoard()
  presentBombs()
  numOfNeighborBombs()
  createBoard()
}

function restartGame() {
  board = []
  bombs = []
  gameOver = false
  const container = document.querySelector('.container')
  container.innerHTML = ''
  closeMessageBox()
  startGame()
}

//Event Listener

document.addEventListener('DOMContentLoaded', function () {
  const refreshBtn = document.getElementById('refreshBtn')
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function () {
      restartGame()
    })
  }
})


startGame()
