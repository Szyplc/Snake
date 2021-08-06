export var gameBoard = document.getElementById("game-board");
export var GAME_WIDTH = 21;
var CONST_SNAKE_SPEED = 8;
export var SNAKE_SPEED = CONST_SNAKE_SPEED;
var menu = document.getElementById("menu");
var speedInput = document.getElementById("snakesSpeed");
var winTable = [document.getElementById("0"), document.getElementById("1")];
speedInput.value = CONST_SNAKE_SPEED;//Toogle pause SNAKE_SPEED
export function Pause()
{
    
    if(SNAKE_SPEED)
    {
        SNAKE_SPEED = 0;
        menu.style.visibility = "visible";
        winTable[0].textContent = window.snakes[0].winCount;
        winTable[1].textContent = window.snakes[1].winCount;
    }
    else
    {
        SNAKE_SPEED = CONST_SNAKE_SPEED;
        menu.style.visibility = "hidden";
    }
}

//Create divs
for(let i=0;i<GAME_WIDTH * GAME_WIDTH;i++)    
{
    const block = document.createElement("div");
    block.classList.add("bg");
    gameBoard.appendChild(block);
}
//Menu speed
speedInput.addEventListener("change", e => {
    CONST_SNAKE_SPEED = e.target.value;
    if(SNAKE_SPEED) SNAKE_SPEED = e.target.value;
});
//Reset Button
document.getElementById("reset").addEventListener("click", () => {
    window.snakes[0].winCount = 0;
    window.snakes[1].winCount = 0;
    winTable[0].textContent = window.snakes[0].winCount;
    winTable[1].textContent = window.snakes[1].winCount;
});

Number.prototype.between = function(a, b) { return a <= this && this <= b; };