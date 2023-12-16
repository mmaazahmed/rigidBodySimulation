
import { createWorld,simulateWorld,populateWorld } from "./world.js";
import { renderWorld } from "./renderer.js";
import { applyVerletIntegration,applyEularIntegration } from "./integration.js";
import { applySimpleCollision,createBoundaryModule} from "./collision.js";
import { initialiseInputListeners } from "./input.js";


const canvas=document.getElementById("mycanvas");
canvas.style.background="pink";
canvas.height=window.innerHeight; canvas.width=window.innerWidth;
const ctx=canvas.getContext("2d");


const nBodies=10;
const world =createWorld(ctx);
populateWorld(world,nBodies);
initialiseInputListeners(world);

const BoundaryModule=createBoundaryModule();
BoundaryModule.rectangular(world,canvas.height);

function animate(){
    requestAnimationFrame(animate);
    simulateWorld(world);
    renderWorld(world,canvas.width,canvas.height);
}
animate();

