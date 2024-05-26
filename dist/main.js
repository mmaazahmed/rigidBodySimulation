import { createWorld, simulateWorld, populateWorld } from "./world";
import { renderWorld } from "./renderer";
// import { applyVerletIntegration } from "./integration";
import { createBoundaryModule } from "./collision";
import { initialiseInputListeners } from "./input";
import { Vec2 } from "./util/vector";
const canvas = document.getElementById("mycanvas");
canvas.style.background = "pink";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
const { width, height } = canvas;
const nBodies = 10;
const world = createWorld(ctx);
populateWorld(world, nBodies);
initialiseInputListeners(world);
const BoundaryModule = createBoundaryModule();
const pos = Vec2(canvas.width / 4, canvas.height / 4);
const pos2 = Vec2(Math.floor(width), Math.floor(height));
BoundaryModule.rectangular(world, 3000, 500, pos);
BoundaryModule.circular(world, 500, pos);
// BoundaryModule.rectangular(world,1,pos2);
function animate() {
    requestAnimationFrame(animate);
    simulateWorld(world);
    renderWorld(world, canvas.width, canvas.height);
}
animate();
