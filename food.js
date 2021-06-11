import { gameBoard, GAME_WIDTH} from './start.js';
export var eated = false;
var random;
DrawFood();
export function DrawFood()
{
    //Set food position
    let i=0;
    do
        random = Math.floor(Math.random() * GAME_WIDTH * GAME_WIDTH);
    while(gameBoard.childNodes[random].classList.contains("snake0") ||
     gameBoard.childNodes[random].classList.contains("snake1"));

    gameBoard.childNodes[random].classList.add("food");
}