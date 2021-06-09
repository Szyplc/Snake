export var inputDirection = {x: 1, y: 0};
import { lastDirection } from './snake.js';
import { Pause } from './start.js';
window.addEventListener("keydown", e => 
{
    switch(e.keyCode)
    {
        case 38:
            inputDirection = lastDirection.y == 0 ? { x: 0, y: -1 } : inputDirection;
            break;
        case 40:
            inputDirection = lastDirection.y == 0 ? { x: 0, y: 1 } : inputDirection;
            break;
        case 37:
            inputDirection = lastDirection.x == 0 ? { x: -1, y: 0 } : inputDirection;
            break;
        case 39:
            inputDirection = lastDirection.x == 0 ? { x: 1, y: 0 } : inputDirection;
            break;
        case 32:
            Pause();
            break;
    }
});