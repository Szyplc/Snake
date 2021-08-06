export var lastDirections = [{x: 1, y: 0}, {x: -1, y: 0}];
import { inputDirections } from "./input.js";
import { gameBoard, GAME_WIDTH, Pause, SNAKE_SPEED } from './start.js';
import { DrawFood } from './food.js';
var whoWin = document.getElementById("whoWin");
/*export var snakes = [{
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
];*/

window.snakes =  [{
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

        //Check head position of snake will be on board
        if(!((snakeBody[0].y + inputDirection.y).between(0, GAME_WIDTH - 1) && 
        (snakeBody[0].x + inputDirection.x).between(0, GAME_WIDTH - 1)))
            { End(i); return; }

        //Checking 2 snake go into themself
        if(snakes[0].body[0].x == snakes[1].body[0].x && snakes[0].body[0].y == snakes[1].body[0].y) 
            { End("draw"); return; }

        //Checking if forward is body or enemy snake
        if(gameBoard.childNodes[snakeBody[0].x + inputDirection.x + ((snakeBody[0].y + inputDirection.y) * GAME_WIDTH)].classList.contains("snake0") ||
         gameBoard.childNodes[snakeBody[0].x + inputDirection.x + ((snakeBody[0].y + inputDirection.y) * GAME_WIDTH)].classList.contains("snake1"))
            { End(i); return; }

        //Moving snake forward
        snakeBody.unshift( {x: snakeBody[0].x + inputDirection.x, y: snakeBody[0].y + inputDirection.y} );
    
        //Check snake position is correct
        if(!(snakeBody[0].x.between(0, GAME_WIDTH - 1) && snakeBody[0].y.between(0, GAME_WIDTH - 1)))
            { End(i); return; }
        
        //Eating food 
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
    
        //Setting last direction
        snake.lastDirection = snake.inputDirection;
        
        //Snake dont go into himself ---- Can improve
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
    //Drawing snakes
    snakes.forEach((snake, i) => {
        let snakeBody = snake.body;
        snakeBody.forEach(segment => 
        {
            gameBoard.childNodes[segment.y * GAME_WIDTH + segment.x].classList.add("snake" + i);
        });
    });
    //Head
    snakes.forEach((snake, i) => {
        let lastPositionHead = snake.body[1].x + (snake.body[1].y * GAME_WIDTH);
        gameBoard.childNodes[lastPositionHead].classList.remove("head");
        //Clear Rotate Style
        gameBoard.childNodes[lastPositionHead].style.transform = "";

        let postionHead = snake.body[0].x + (snake.body[0].y * GAME_WIDTH);
        gameBoard.childNodes[postionHead].classList.add("head");

        //Rotate Head
        gameBoard.childNodes[postionHead].style.transform = `rotate(${DirectionToRotate(snake.inputDirection)}deg)`;
    });
}
function End(draw)
{
    //Clearing board
    for(let i=0;i<GAME_WIDTH * GAME_WIDTH;i++)
        gameBoard.childNodes[i].classList.remove("snake0", "snake1", "food", "head");
    //Set snakes initial settings
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

    //Checking is there a draw
    if(draw == 'draw')
    {
        Pause();
        whoWin.textContent = "Draw";
    }
    else
    {
        //if 2 snakes go into wall in the same time
        if(SNAKE_SPEED == 0)
        {
            snakes[draw].winCount--;
            whoWin.textContent = "Draw";
            Pause();
            Pause();
        }
        else
        {
            //When will be more than 2 snakes check last is alive
            if(draw == 0)   draw = 1;
            else    draw = 0;
            snakes[draw].winCount++;
            whoWin.textContent = "Win player " + draw;
            Pause();
        }
    }
    //Adding food
    DrawFood();
}
function DirectionToRotate(dir)
{
    if(dir.x == 1) return 90;
    if(dir.x == -1) return 270;
    if(dir.y == -1) return 0;
    if(dir.y == 1) return 180;
}