const MAX_TURNS = 9;
//Counter to keep track of times played, so that it switches from x, and o
let counter = 0;
//Array that contains the position of each square 
let pos = [];
//FLag to check if game has ended; 
let isOver = false;
let stats = document.querySelector('#status');
let squares = document.getElementsByClassName('square');
for (let i = 1; i <= MAX_TURNS; i++) {
    pos[i] = document.querySelector('#s' + i)
}
let diag1 = [];
diag1[0] = pos[3];
diag1[1] = pos[5];
diag1[2] = pos[7];

function play(e) {
    let play = document.querySelector('#' + this.id);
    //Check if the position has already been played first
    if (play.innerHTML === '' && counter !== MAX_TURNS && !checkWin()) {
        if (counter % 2 === 0) {
            play.innerHTML = 'X';
            stats.innerHTML = "Player O's turn";
            if (checkWin()) {
                stats.innerHTML = 'Congratulations!, Player X wins';
                counter = 0;
            }
            else if (counter === 8) {
                stats.innerHTML = "It's a tie!";
                counter = 0;
            }
            counter++;
        }
        else if (!(counter % 2 === 0)) {
            play.innerHTML = 'O';
            stats.innerHTML = "Player X's turn";
            if (checkWin()) {
                stats.innerHTML = 'Congratulations!, Player O wins';
                counter = 0;
            }
            else if (counter === 8) {
                stats.innerHTML = "It's a tie!";
                counter = 0;

            }
            counter++;

        }

    }
}

//This is for playing with the AI
function playAi(e) {
    let play = document.querySelector('#' + this.id);
    //Check if the position has already been played first
    if (play.innerHTML === '' && counter !== MAX_TURNS && !checkWin()) {
        if (counter % 2 === 0) {
            play.innerHTML = 'X';
            stats.innerHTML = "Player O's turn";
            if (checkWin()) {
                stats.innerHTML = 'Congratulations!, Player X wins';
                isOver = true;
                counter = 0;
                if (checker(diag1[0].innerHTML,diag1[1].innerHTML,diag1[2].innerHTML)){
                    diag1[0].classList.add('strikediag');
                    diag1[1].classList.add('strikediag');
                    diag1[2].classList.add('strikediag');
                }
            }
            else if (counter === 8) {
                stats.innerHTML = "It's a tie!";
                isOver = true;
                counter = 0;
            }
            counter++;
        }
        //Check if game is over before AI plays 
        if (!isOver){
        setTimeout(AiTurn,500);

        }
    }
}
//This function will make the AI play. The AI always goes second. 
function AiTurn() {
    if (counter % 2 !== 0) {
        for (let i = 1; i < MAX_TURNS; i++) {
            if (pos[i].innerHTML == '') {
                pos[i].innerHTML = 'O';
                stats.innerHTML = "Player X's turn";
                if (checkWin()) {
                    stats.innerHTML = 'Congratulations!, Player O wins';
                    isOver = true;
                    counter = 0;
                }
                else if (counter === 8) {
                    stats.innerHTML = "It's a tie!";
                    isOver = true;
                    counter = 0;
                }
                counter++;

                break;
            }
        }
    }
}
// */


//Function that resets the board 
function clearBoard() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = '';
    }
    //Reset counter 
    counter = 0;
    //Set status back to empty
    stats.innerHTML = 'Play First';
    diag1[0].classList.remove('strikediag');
    diag1[1].classList.remove('strikediag');
    diag1[2].classList.remove('strikediag');
    //Reset isOver back to false
    isOver = false;
}
function checkWin() {
    return (checkHorizontal() || checkVertical() || checkDiagonal());
}
function checker(a, b, c) {
    return (a !== '') && (a === b) && (b === c);

}
function checkHorizontal() {
    return (checker(pos[1].innerHTML, pos[2].innerHTML, pos[3].innerHTML) ||
        checker(pos[4].innerHTML, pos[5].innerHTML, pos[6].innerHTML) ||
        checker(pos[7].innerHTML, pos[8].innerHTML, pos[9].innerHTML)
    )
}

function checkVertical() {
    return (checker(pos[1].innerHTML, pos[4].innerHTML, pos[7].innerHTML) ||
        checker(pos[2].innerHTML, pos[5].innerHTML, pos[8].innerHTML) ||
        checker(pos[3].innerHTML, pos[6].innerHTML, pos[9].innerHTML)
    )
}
function checkDiagonal() {
    return (checker(pos[1].innerHTML, pos[5].innerHTML, pos[9].innerHTML) ||
        checker(pos[3].innerHTML, pos[5].innerHTML, pos[7].innerHTML)
    )
}

//Add event listener to each of the squares
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', playAi);

}