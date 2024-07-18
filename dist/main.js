import { createWorld, simulateWorld, populateWorld } from "./world.js";
import { renderWorld } from "./renderer.js";
// import { applyVerletIntegration } from "./integration";
import { createBoundaryModule } from "./collision.js";
// import { initialiseInputListeners } from "./input";
import { Vec2 } from "./util/vector.js";
function getCanvasElement() {
    if (typeof document !== 'undefined') {
        return document.getElementById("mycanvas");
    }
    return null;
}
const canvas = getCanvasElement();
if (!canvas) {
    throw new Error('w');
}
// const canvas:HTMLCanvasElement= document.getElementById("mycanvas")as HTMLCanvasElement ;
canvas.style.background = "pink";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
// const {width,height}=canvas;
const nBodies = 1000;
const world = createWorld(ctx, 0.001);
populateWorld(world, nBodies);
// initialiseInputListeners(world);
const BoundaryModule = createBoundaryModule();
const pos = Vec2(500, 500);
// const pos2=Vec2(Math.floor(width),Math.floor(height))
BoundaryModule.rectangular(world, canvas.width / 4, canvas.height / 4, pos);
BoundaryModule.circular(world, 300, pos);
// BoundaryModule.rectangular(world,1,pos2);
function animate() {
    requestAnimationFrame(animate);
    simulateWorld(world);
    if (!canvas) {
        throw new Error('w');
    }
    renderWorld(world, canvas.width, canvas.height);
}
animate();
