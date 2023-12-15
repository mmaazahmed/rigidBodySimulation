

function clearCanvas(world){
world.ctx.clearRect(0, 0, world.width, world.height);
}
function drawObjects(world){
for (const body of world.bodies){
    body.draw(world.ctx);
}
}
export function renderWorld(world){
    clearCanvas(world);
    drawObjects(world);


}