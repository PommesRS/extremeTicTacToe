let gameText = document.getElementById('gameText')
let restartBtn = document.getElementById('restartBtn')
let main_gameboard = document.getElementById('maingameboard')
restartBtn => restartBtn.addEventListener('click', restartGame)
let mainboxes = Array.from(document.getElementsByClassName('main_box'))
let subgameboards = Array.from(document.getElementsByClassName('subgameboard'))
let subboxes = Array(0)

console.log(mainboxes[1].innerHTML)

subgameboards.forEach(subgameboard => {
    subboxes.push(Array.from(subgameboard.children))
});

console.log(subgameboards)

let bgcolor = getComputedStyle(document.body).getPropertyValue('--background')
let winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces =[   
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null]
            ]

let mainspaces = Array(9).fill(null)

const startGame = () => {
    subboxes.forEach(subboard => {
        subboard.forEach(subbox => {
            subbox.addEventListener('click', boxClick)
        });

    });
}

function boxClick(e){
    const id_param = e.target.id
    const board = id_param.toString().slice(0, -2)
    const box = id_param.toString().slice(2)

    if(!spaces[board][box]){
        spaces[board][box] = currentPlayer
        e.target.innerText = currentPlayer
        console.log(mainspaces)

        subgameboards.forEach(subgameboard => {
            subgameboard.style.pointerEvents = "none"//
        });
    
        mainboxes.forEach(box => {
            if (box.classList.contains('glow')) {
                box.classList.remove('glow')
            } 
        });
    
        subgameboards[box].style.pointerEvents = "all"

        
        //mainboxes[box].style.backgroundColor = winningIndicator
        mainboxes[box].classList.add('glow')
        
    
        if(mainspaces[box]){
            subgameboards.forEach(subgameboard => {
                subgameboard.style.pointerEvents = "all"
            });
        }

        if(playerHasSubWon(board) !==false){
            subgameboards[board].style.pointerEvents = 'none'//
            subgameboards[board].style.display = 'none'
            mainboxes[board].innerHTML += currentPlayer
            mainspaces[board] = currentPlayer
            mainboxes[board].classList.add('innerShadow')

            subgameboards.forEach(subgameboard => {
                subgameboard.style.pointerEvents = "all"
            });

            mainboxes.forEach(box => {
                if (box.classList.contains('glow')) {
                    box.classList.remove('glow')
                }
                
            });

            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

            if(playerHasWon() !== false) {
                let winning_blocks = playerHasWon()
                winning_blocks.map(box => mainboxes[box].style.backgroundColor = winningIndicator)
                gameText.innerText = `${currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT} has won the match!`
                main_gameboard.style.pointerEvents = "none"
                subgameboards.forEach(subgameboard => {
                    subgameboard.style.pointerEvents = "none"
                });
            } 

            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasSubWon(board){
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[board][a] && (spaces[board][a] == spaces[board][b] && spaces[board][a] == spaces[board][c])) {
            return [a,b,c]
        }
    }

    return false

}

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(mainspaces[a] && (mainspaces[a] == mainspaces[b] && mainspaces[a] == mainspaces[c])) {
            console.log("arsch")
            return [a,b,c]
        }
    }

    return false

}

function restartGame(){
    // let spaces =[   
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null, null]
    // ]

    // let mainspaces = Array(9).fill(null)

    // winning_blocks = null
    // currentPlayer = X_TEXT
    // gameText.innerText = 'extreme Tic Tac Toe'
    // main_gameboard.style.pointerEvents = 'all'
    // subgameboards.forEach(board => {
    //     board.style.display = 'flex'
    //     board.style.pointerEvents = 'all'
    //     subboxes.forEach(subboard => {
    //         subboard.forEach(subbox => {
    //             subbox.innerText = ''
    //         });
    //     });
    // });

    location.reload();
}

startGame()