import { gameBoard, GAME_WIDTH} from './start.js';
export var eated = false;
var random;
DrawFood();
export function DrawFood()
{
    let i=0;
    do
        random = Math.floor(Math.random() * GAME_WIDTH * GAME_WIDTH);
    while(gameBoard.childNodes[random].classList.contains("snake"));
    
    gameBoard.childNodes[random].classList.add("food");
}