export var lastDirections = [{x: 1, y: 0}, {x: -1, y: 0}];
import { inputDirections } from "./input.js";
import { gameBoard, GAME_WIDTH } from './start.js';
import { DrawFood } from './food.js';

export var snakes = [{
    body: [{x: 3, y: 5}, 
    {x: 2, y: 5},
    {x: 1, y: 5}],
    inputDirection: inputDirections[0],
    lastDirection: lastDirections[0],
    winCount: 0
},
{
    body: [{x: 17, y: 5}, 
        {x: 18, y: 5},
        {x: 19, y: 5}],
    inputDirection: inputDirections[1],
    lastDirection: lastDirections[1],
    winCount: 0
}
];

export function Update()
{
    snakes.forEach((snake, i) => {
        let snakeBody = snake.body;
        let inputDirection = snake.inputDirection;

        if(!((snakeBody[0].y + inputDirection.y).between(0, GAME_WIDTH - 1) && 
        (snakeBody[0].x + inputDirection.x).between(0, GAME_WIDTH - 1)))
            { End(i); return; }

        if(snakes[0].body[0].x == snakes[1].body[0].x && snakes[0].body[0].y == snakes[1].body[0].y) 
            { End("draw"); return; }

        if(gameBoard.childNodes[snakeBody[0].x + inputDirection.x + ((snakeBody[0].y + inputDirection.y) * GAME_WIDTH)].classList.contains("snake0") ||
         gameBoard.childNodes[snakeBody[0].x + inputDirection.x + ((snakeBody[0].y + inputDirection.y) * GAME_WIDTH)].classList.contains("snake1"))
            { End(i); return; }

        snakeBody.unshift( {x: snakeBody[0].x + inputDirection.x, y: snakeBody[0].y + inputDirection.y} );
    
        //Check snake position is correct
        if(!(snakeBody[0].x.between(0, GAME_WIDTH - 1) && snakeBody[0].y.between(0, GAME_WIDTH - 1)))
            { End(i); return; }
    
        if(!gameBoard.childNodes[snakeBody[0].y * GAME_WIDTH + snakeBody[0].x].classList.contains("food"))
        {
            let tail = snakeBody.pop();
            gameBoard.childNodes[tail.y * GAME_WIDTH + tail.x].classList.remove("snake0", "snake1");
        }
        else 
        {
            gameBoard.childNodes[snakeBody[0].y * GAME_WIDTH + snakeBody[0].x].classList.remove("food");
            DrawFood();
        }
    
        //Last direction
        snake.lastDirection = snake.inputDirection;
        
        //Snake dont go into himself
        for(let i=0;i<snakeBody.length;i++)
        {
            for(let k=0;k<snakeBody.length;k++)
            {
                if(k != i)
                    if(snakeBody[i].x == snakeBody[k].x && snakeBody[i].y == snakeBody[k].y)
                        { End(i); return; }
            }
        } 
    });
}
export function Draw()
{
    snakes.forEach((snake, i) => {
        let snakeBody = snake.body;
        snakeBody.forEach(segment => 
        {
            gameBoard.childNodes[segment.y * GAME_WIDTH + segment.x].classList.add("snake" + i);
        });
    });
}
function End(draw)
{
    /*
    //Remove old snake
    snakeBody.shift();
    snakeBody.forEach(segment => 
    {
        gameBoard.childNodes[segment.y * GAME_WIDTH + segment.x].classList.remove("snake");
    });
    gameBoard.childNodes[(snakeBody[snakeBody.length - 1].y + (-inputDirection.y)) * GAME_WIDTH + 
    (snakeBody[snakeBody.length - 1].x + (-inputDirection.x))].classList.remove("snake");*/
    for(let i=0;i<GAME_WIDTH * GAME_WIDTH;i++)
        gameBoard.childNodes[i].classList.remove("snake0", "snake1");
    //Set new snake
    /*snakeBody = [
        {x: 5, y: 5}, 
        {x: 4, y: 5},
        {x: 3, y: 5}
    ];
    //Set Right direction
    inputDirection.x = 1;
    inputDirection.y = 0;*/
    snakes = [{
        body: [{x: 3, y: 5}, 
        {x: 2, y: 5},
        {x: 1, y: 5}],
        inputDirection: inputDirections[0],
        lastDirection: lastDirections[0],
        winCount: snakes[0].winCount
    },
    {
        body: [{x: 17, y: 5}, 
            {x: 18, y: 5},
            {x: 19, y: 5}],
        inputDirection: inputDirections[1],
        lastDirection: lastDirections[1],
        winCount: snakes[1].winCount
    }
    ];

    if(draw == 'draw')
        alert("Remis")
    else
    {
        snakes[draw].winCount++;
        alert("Pszegrane licznik: " + snakes[0].winCount + " " + snakes[1].winCount);
    }
}