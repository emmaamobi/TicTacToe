const MAX_TURNS = 9;
//Counter to keep track of times played, so that it switches from x, and o
let counter = 0;
var pos = [];
let squares = document.getElementsByClassName('square');
for (let i = 1; i <= MAX_TURNS; i++){
    pos[i] = document.querySelector('#s' + i )
}

function playTurn(e){
    let play = document.querySelector('#' + this.id);
    if (counter % 2 === 0){
        play.innerHTML = 'X';
        counter++;
        console.log(checkWin());

    }
    else if (counter % 2 !== 0){
        play.innerHTML = 'O';
        counter++;
        console.log(checkWin());
    }
}
//Function that resets the board 
function clearBoard(){
    for (let i = 0; i < squares.length; i++){
        squares[i].innerHTML = '';
    }
}
function checkWin(){
    return (checkHorizontal() || checkVertical() || checkDiagonal());
}
function checker(a,b,c){
    return (a === b) && (b === c);

}
function checkHorizontal(){
    return (checker(pos[1].innerHTML,pos[2].innerHTML,pos[3].innerHTML) ||
            checker(pos[4].innerHTML,pos[5].innerHTML,pos[6].innerHTML)||
            checker(pos[7].innerHTML,pos[8].innerHTML,pos[9].innerHTML)
    )
}

function checkVertical(){
    return (checker(pos[1].innerHTML,pos[4].innerHTML,pos[7].innerHTML) ||
            checker(pos[2].innerHTML,pos[5].innerHTML,pos[8].innerHTML)||
            checker(pos[3].innerHTML,pos[6].innerHTML,pos[9].innerHTML)
    )
}
function checkDiagonal(){
    return (checker(pos[1].innerHTML,pos[5].innerHTML,pos[9].innerHTML) ||
            checker(pos[3].innerHTML,pos[5].innerHTML,pos[7].innerHTML)
    )
}

//Add event listener to each of the squares
for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', playTurn);
    
}