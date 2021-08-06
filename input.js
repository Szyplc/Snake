export var inputDirections = [{x: 1, y: 0}, {x: -1, y: 0}];
import { Pause } from './start.js';
//import { snakes } from './snake.js';
window.addEventListener("keydown", e => 
{
    switch(e.keyCode)
    {
        case 87:
            snakes[0].inputDirection = snakes[0].lastDirection.y == 0 ? { x: 0, y: -1 } : snakes[0].inputDirection;
            break;
        case 83:
            snakes[0].inputDirection = snakes[0].lastDirection.y == 0 ? { x: 0, y: 1 } : snakes[0].inputDirection;
            break;
        case 65:
            snakes[0].inputDirection = snakes[0].lastDirection.x == 0 ? { x: -1, y: 0 } : snakes[0].inputDirection;
            break;
        case 68:
            snakes[0].inputDirection = snakes[0].lastDirection.x == 0 ? { x: 1, y: 0 } : snakes[0].inputDirection;
            break;

        case 38:
            snakes[1].inputDirection = snakes[1].lastDirection.y == 0 ? { x: 0, y: -1 } : snakes[1].inputDirection;
            break;
        case 40:
            snakes[1].inputDirection = snakes[1].lastDirection.y == 0 ? { x: 0, y: 1 } : snakes[1].inputDirection;
            break;
        case 37:
            snakes[1].inputDirection = snakes[1].lastDirection.x == 0 ? { x: -1, y: 0 } : snakes[1].inputDirection;
            break;
        case 39:
            snakes[1].inputDirection = snakes[1].lastDirection.x == 0 ? { x: 1, y: 0 } : snakes[1].inputDirection;
            break;

        case 32:
            Pause();
            break;
    }
});