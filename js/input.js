
function getMousePosOnBoard(world, event) {
    const canvasRect = world.ctx.canvas.getBoundingClientRect();
  
    const { clientX, clientY } = event;
    
    const { left: canvasX, top: canvasY } = canvasRect;
  
    const { worldX, worldY } = { relativeX: clientX - canvasX, relativeY: clientY - canvasY };
    // const { gridX, gridY } = { gridX: Math.floor(relativeX / cellSize), gridY: Math.floor(relativeY / cellSize) };
  
    return `${worldX-game.displayDx},${worldY-game.displayDy}`;
  }

export function initialiseInputListeners(world){
    document.addEventListener('keydown',(event)=>{
        if (event.key !== 'p'){return;}
        world.isPause=!world.isPause;
    });

    document.addEventListener('keydown',(event)=>{
        if(event.key!=='ArrowUp'){return;}
        world.timeStep*=1.1;
    })
    document.addEventListener('keydown',(event)=>{
        if(event.key!=='ArrowDown'){return;}
        world.timeStep*=0.9;
    })

}