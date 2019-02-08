const MAX_TURNS = 9;
//Counter to keep track of times played, so that it switches from x, and o
let counter = 0;
//Array that contains the position of each square 
let pos = [];
let empty_space = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//This are the different strikethroughs available with the css styling. 
const sp = ["bottom", "right", "left top", "right top"];
//Map each possible win cell positions to a strikethrough type, 
const strikesMap = { 123: sp[0], 456: sp[0], 789: sp[0], 147: sp[1], 258: sp[1], 369: sp[1], 357: sp[2], 159: sp[3] };
//FLag to check if game has ended; 
let isOver = false;
let btns = document.querySelectorAll(".start");
let stats = document.querySelector('#status');
let squares = document.getElementsByClassName('square');
let mode;
for (let i = 1; i <= MAX_TURNS; i++) {
    pos[i] = document.querySelector('#s' + i)
}
let diag1 = [];
diag1[0] = pos[3];
diag1[1] = pos[5];
diag1[2] = pos[7];

function vsAi() {
    addEvent(playWithAi);
    mode = playWithAi;
    btns[0].style.display = 'none';
    btns[1].style.display = 'none';


}
function vsPlayer() {
    addEvent(playWithPlayer);
    mode = playWithPlayer;
    let btns = document.querySelectorAll(".start");
    btns[0].style.display = 'none';
    btns[1].style.display = 'none';
}
function playWithPlayer(e) {
    let play = document.querySelector('#' + this.id);
    //Check if the position has already been played first
    if (play.innerHTML === '' && counter !== MAX_TURNS && !checkWin()) {
        if (counter % 2 === 0) {
            play.innerHTML = 'X';
            stats.innerHTML = "Player O's turn";
            let win = checkWin();
            if (win) {
                stats.innerHTML = 'Congratulations!, Player X wins';
                counter = 0;
                strikeIt(win);
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
            let win = checkWin();
            if (win) {
                stats.innerHTML = 'Congratulations!, Player O wins';
                counter = 0;
                strikeIt(win);
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
function playWithAi(e) {
    let play = document.querySelector('#' + this.id);
    //Check if the position has already been played first
    if (play.innerHTML === '' && counter !== MAX_TURNS && !checkWin()) {
        if (counter % 2 === 0) {
            play.innerHTML = 'X';
            console.log("Empty space after player plays: " + empty_space);
            var ind = parseInt(this.id[1],10);
            console.log("Id of square: " + this.id[1])
            empty_space.splice(empty_space.indexOf(ind), 1);
            console.log("Empty space after removed played position: " + empty_space);
            stats.innerHTML = "Player O's turn";
            let win = checkWin();
            if (win) {
                stats.innerHTML = 'Congratulations!, Player X wins';
                isOver = true;
                counter = 0;
                strikeIt(win);
            }
            else if (counter === 8) {
                stats.innerHTML = "It's a tie!";
                isOver = true;
                counter = 0;
            }
            counter++;
        }
        //Check if game is over before AI plays 
        if (!isOver) {
            // setTimeout(AiTurn, 500);
            setTimeout(AiTurnRand,500);

        }
    }
}
//This function will make the AI play. The AI always goes second. 
function AiTurnRand() {
    var randPosition = empty_space[Math.floor(Math.random() * empty_space.length)];
    console.log("Position for random position" + randPosition);
    if (counter % 2 !== 0) {
        pos[randPosition].innerHTML = 'O';
        console.log("Position of Random position to play for ai: " + randPosition);
        console.log("Element removed from empty space: " + empty_space.splice(empty_space.indexOf(randPosition),1));
        console.log("Empty space after random element removed: " + empty_space);
        stats.innerHTML = "Player X's turn";
        let win = checkWin();
        if (win) {
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


    }

    return true;
}
function AiTurn() {
    if (counter % 2 !== 0) {
        for (let i = 1; i < MAX_TURNS; i++) {
            if (pos[i].innerHTML == '') {
                pos[i].innerHTML = 'O';
                stats.innerHTML = "Player X's turn";
                let win = checkWin();
                if (win) {
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
        //Remove the strikethroughs
        squares[i].style.background = "";
    }
    //Reset counter 
    counter = 0;
    //Set status back to empty
    stats.innerHTML = 'Play First';
    diag1[0].classList.remove('strikediag');
    diag1[1].classList.remove('strikediag');
    diag1[2].classList.remove('strikediag');
    removeEvent(mode);
    btns[0].style.display = 'block';
    btns[1].style.display = 'block';
    //Reset isOver back to false
    isOver = false;
    empty_space = [1,2,3,4,5,6,7,8,9];
}
function checkWin() {
    return (checkHorizontal() || checkVertical() || checkDiagonal());
}
function checker(a, b, c) {
    return (a !== '') && (a === b) && (b === c);

}
//If result is empty, it will evaluate as false, if not empty it will return the index of the winning positions to use later
//This help retrieve index of positions
function checkHorizontal() {
    let result = "";
    if (checker(pos[1].innerHTML, pos[2].innerHTML, pos[3].innerHTML))
        result = "123";
    if (checker(pos[4].innerHTML, pos[5].innerHTML, pos[6].innerHTML))
        result = "456";
    if (checker(pos[7].innerHTML, pos[8].innerHTML, pos[9].innerHTML))
        result = "789";
    return result;
}

function checkVertical() {
    let result = "";
    if (checker(pos[1].innerHTML, pos[4].innerHTML, pos[7].innerHTML))
        result = "147";
    if (checker(pos[2].innerHTML, pos[5].innerHTML, pos[8].innerHTML))
        result = "258";
    if (checker(pos[3].innerHTML, pos[6].innerHTML, pos[9].innerHTML))
        result = "369";
    return result;
    // return (checker(pos[1].innerHTML, pos[4].innerHTML, pos[7].innerHTML) || //     checker(pos[2].innerHTML, pos[5].innerHTML, pos[8].innerHTML) ||
    //     checker(pos[3].innerHTML, pos[6].innerHTML, pos[9].innerHTML)
    // )
}
function checkDiagonal() {
    let result = "";
    if (checker(pos[1].innerHTML, pos[5].innerHTML, pos[9].innerHTML))
        result = "159";
    if (checker(pos[3].innerHTML, pos[5].innerHTML, pos[7].innerHTML))
        result = "357";
    return result;
}
//This helps to set the strike based on the string given, 
function getStrike(str) {
    return "linear-gradient(to " + str + ", transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%)"
}
//This function strikes the board based on the positions, i.e 123, would strike horizontally
function strikeIt(cellsPos) {
    //Get the strike value and set it based on the Map 
    let strike = strikesMap[cellsPos];
    for (let i = 0; i < 3; i++) {
        document.querySelector("#s" + cellsPos[i]).style.background = getStrike(strike);
    }
}

//Add event listeners to the squares 
function addEvent(evnt) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', evnt);

    }
}
//Removes the event listeners on the squares 
function removeEvent(evnt) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', evnt);

    }
}