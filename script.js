const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn"); 

let currentPlayer;
let gamegrid;

const winningPositions = [[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function initGame(){
    currentPlayer = "X";
    gamegrid = ["","","","","","","","",""];
    boxes.forEach((box , index)=>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;


    winningPositions.forEach((positon)=>{

            boxes[positon[0]].classList.remove("win");
            boxes[positon[1]].classList.remove("win");
            boxes[positon[2]].classList.remove("win");

    });


}

initGame();

function swapTurn() {
    if(currentPlayer==="X") currentPlayer = "O";
    else currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){
    let ans = "";
    winningPositions.forEach((positon)=>{
        if((gamegrid[positon[0]]!=="" || gamegrid[positon[1]]!=="" || gamegrid[positon[2]]!=="")
        && (gamegrid[positon[0]]=== gamegrid[positon[1]])&& gamegrid[positon[1]]===gamegrid[positon[2]]){
            
            if(gamegrid[positon[0]]==="X")
                ans = "X";
            else
                ans = "O";

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[positon[0]].classList.add("win");
            boxes[positon[1]].classList.add("win");
            boxes[positon[2]].classList.add("win");
        }
    });


    if(ans!==""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillcount = 0;
    gamegrid.forEach((box)=>{
        if(box!=="") fillcount++;
    });

    if(fillcount===9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
    
}

function handleClick(index){
    if(gamegrid[index]=== ""){
        boxes[index].innerHTML = currentPlayer;
        gamegrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);