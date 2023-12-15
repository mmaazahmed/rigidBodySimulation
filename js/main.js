
import { createWorld } from "./world.js";
import {populateWorld } from "./world.js";
import { renderWorld } from "./renderer.js";
import { applyVerletIntegration,applyEularIntegration } from "./integration.js";
import { applySimpleCollision } from "./collision.js";
const canvas=document.getElementById("mycanvas");
canvas.style.background="pink";
canvas.height=window.innerHeight; canvas.width=window.innerWidth;
const ctx=canvas.getContext("2d");


const timeStep=0.1;
const nBodies=10;

const world =createWorld(ctx,canvas.width,canvas.height,timeStep);
populateWorld(world,nBodies); 

function update(world){
    applyEularIntegration(world);
    applySimpleCollision(world);
}

function animate(){
requestAnimationFrame(animate);
update(world);
renderWorld(world);


}
// circle.draw/(ctx);
animate();

