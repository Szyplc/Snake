export var gameBoard = document.getElementById("game-board");
export var GAME_WIDTH = 21;
var CONST_SNAKE_SPEED = 8;
export var SNAKE_SPEED = CONST_SNAKE_SPEED;
var menu = document.getElementById("menu");
//Toogle pause SNAKE_SPEED
export function Pause()
{
    if(SNAKE_SPEED)
    {
        SNAKE_SPEED = 0;
        menu.style.visibility = "visible";
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
document.getElementById("snakesSpeed").addEventListener("change", e => {
    CONST_SNAKE_SPEED = e.target.value;
    if(SNAKE_SPEED) SNAKE_SPEED = e.target.value;
});

Number.prototype.between = function(a, b) { return a <= this && this <= b; };