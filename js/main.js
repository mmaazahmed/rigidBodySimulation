
import { createWorld,simulateWorld,populateWorld } from "./world.js";
import { renderWorld } from "./renderer.js";
import { applyVerletIntegration,applyEularIntegration } from "./integration.js";
import { applySimpleCollision,setBoundry } from "./collision.js";
import { initialiseInputListeners } from "./input.js";


const canvas=document.getElementById("mycanvas");
canvas.style.background="pink";
canvas.height=window.innerHeight; canvas.width=window.innerWidth;
const ctx=canvas.getContext("2d");


const timeStep=0.1;
const nBodies=10;
const world =createWorld(ctx);
populateWorld(world,nBodies); 
initialiseInputListeners(world);

setBoundry(world,canvas.height/2);

function animate(){
    console.log(world.isPause);
    requestAnimationFrame(animate);
    simulateWorld(world);
    renderWorld(world,canvas.width,canvas.height);

}
animate();

