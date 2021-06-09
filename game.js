let lastRenderTime = 0;
import { SNAKE_SPEED } from './start.js';
import { Update as UpdateSnake, Draw as DrawSnake } from './snake.js';
function main(currentTime)
{
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED)    return;
    
    lastRenderTime = currentTime;
    UpdateSnake();
    DrawSnake();
}
window.requestAnimationFrame(main);