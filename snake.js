var snakeBody = [
    {x: 5, y: 5}, 
    {x: 4, y: 5},
    {x: 3, y: 5}
];
export var lastDirection = {x: 1, y: 0};
import { inputDirection } from "./input.js";
import { gameBoard, GAME_WIDTH } from './start.js';
import { DrawFood } from './food.js';

export function Update()
{
    snakeBody.unshift( {x: snakeBody[0].x + inputDirection.x, y: snakeBody[0].y + inputDirection.y} );
    
    //Check snake position is correct
    if(!(snakeBody[0].x.between(0, GAME_WIDTH - 1) && snakeBody[0].y.between(0, GAME_WIDTH - 1)))
        { End(); return; }

    if(!gameBoard.childNodes[snakeBody[0].y * GAME_WIDTH + snakeBody[0].x].classList.contains("food"))
    {
        let tail = snakeBody.pop();
        gameBoard.childNodes[tail.y * GAME_WIDTH + tail.x].classList.remove("snake");
    }
    else 
    {
        gameBoard.childNodes[snakeBody[0].y * GAME_WIDTH + snakeBody[0].x].classList.remove("food");
        DrawFood();
    }

    //Last direction
    lastDirection = inputDirection;
    
    //Snake dont go into himself
    for(let i=0;i<snakeBody.length;i++)
    {
        for(let k=0;k<snakeBody.length;k++)
        {
            if(k != i)
                if(snakeBody[i].x == snakeBody[k].x && snakeBody[i].y == snakeBody[k].y)
                    { End(); return; }
        }
    }
}
export function Draw()
{
    snakeBody.forEach(segment => 
    {
        gameBoard.childNodes[segment.y * GAME_WIDTH + segment.x].classList.add("snake");
    });
}
function End()
{
    //Remove old snake
    snakeBody.shift();
    snakeBody.forEach(segment => 
    {
        gameBoard.childNodes[segment.y * GAME_WIDTH + segment.x].classList.remove("snake");
    });
    gameBoard.childNodes[(snakeBody[snakeBody.length - 1].y + (-inputDirection.y)) * GAME_WIDTH + 
    (snakeBody[snakeBody.length - 1].x + (-inputDirection.x))].classList.remove("snake");
    //Set new snake
    snakeBody = [
        {x: 5, y: 5}, 
        {x: 4, y: 5},
        {x: 3, y: 5}
    ];
    //Set Right direction
    inputDirection.x = 1;
    inputDirection.y = 0;

    alert("Pszegrales");
}