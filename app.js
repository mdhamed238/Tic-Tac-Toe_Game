const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const form = document.querySelector('form')  ;
const WINNING_COMBINATIONS = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],  
    [0 , 4 , 8],
    [2 , 4 , 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton')
const startButton = document.getElementById('start')
let circleTurn



startButton.addEventListener('click' , startGame)
restartButton.addEventListener('click' , startGame )
/*
function namePlayers() { 
    const X = form.elements.X.value;
    const O = form.elements.O.value;
    let players = []
    players.push[X , O]
    return players;
}
*/
function startGame () {
    circleTurn =false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click' , handleClick)
        cell.addEventListener('click' , handleClick , {once: true})
    })
    startButton.innerText = 'Restart Game' 
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick (e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell , currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass();  
    }
    // Check for Win
    // Check for Draw 
    // Switch Turns  
   /* swapTurns()
    setBoardHoverClass();*/
}
 

function endGame (draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw'  
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins`
    }
    winningMessageElement.classList.add('show')
}

function isDraw () {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    }) 
}

function placeMark(cell , currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns () {
    circleTurn = !circleTurn;
}

function setBoardHoverClass () {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin (currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

