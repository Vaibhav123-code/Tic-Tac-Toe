let boxes = document.querySelectorAll('.box');
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')
let newGameBtn = document.querySelector('#new-btn')
let resetBtn = document.querySelector('#reset-btn')

let turnO = true;
let count = 0;
const winnerPattern = [
    [0,1,2],// 
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
boxes.forEach((box)=> {
   box.addEventListener('click',()=>{
      if(turnO){
        box.innerText = 'O';
        turnO = false;
      }else {
        box.innerText ='X';
        turnO = true;
      }
      box.disabled = true;
      count++;
      let isWinner = checkWinner();

      if( count === 9 && !isWinner){
        gameDraw();
      }
   })
})

const gameDraw = () => {
    msg.innerText = `Game was a draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
 
const disableBoxes = ()=>{
  for( let box of boxes){
    box.disabled = true;
  }
}

const reset = ()=> {
    turnO = true;
    enableBoxes();
    count= 0;
    msgContainer.classList.add("hide");
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
  msg.innerText = `congratulations , Winner is ${winner}`
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function checkWinner() {
     for(let pattern of winnerPattern){
       let pos1Val = boxes[pattern[0]].innerText  //0  [0,1,2] => boxes[0]
       let pos2Val = boxes[pattern[1]].innerText  //1  boxes[1]
       let pos3Val = boxes[pattern[2]].innerText 
       
       if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
         if( pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
         }
       }
     }
}
newGameBtn.addEventListener('click',reset);
resetBtn.addEventListener('click',reset)