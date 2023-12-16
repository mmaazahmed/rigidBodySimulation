

function clearCanvas(world,width,height){
world.ctx.clearRect(0, 0, width, height);
}
function drawObjects(world){
for (const body of world.bodies){
    // body.
    body.draw(world.ctx);
}
}
export function renderWorld(world,width,height){
    clearCanvas(world,width,height);
    drawObjects(world,width,height);


}