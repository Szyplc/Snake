export var gameBoard = document.getElementById("game-board");
export var GAME_WIDTH = 21;
const CONST_SNAKE_SPEED = 8;
export var SNAKE_SPEED = CONST_SNAKE_SPEED;

//Toogle pause SNAKE_SPEED
export function Pause()
{ SNAKE_SPEED > 0 ? SNAKE_SPEED = 0 : SNAKE_SPEED = CONST_SNAKE_SPEED; }

//Create divs
for(let i=0;i<GAME_WIDTH * GAME_WIDTH;i++)    
{
    const block = document.createElement("div");
    block.classList.add("bg");
    gameBoard.appendChild(block);
}
//Number.prototype.between = (a, b) => { return a <= this && this <= b; }
Number.prototype.between = function(a, b) { return a <= this && this <= b; };