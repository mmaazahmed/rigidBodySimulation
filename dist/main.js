"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = require("./world");
const renderer_1 = require("./renderer");
// import { applyVerletIntegration } from "./integration";
const collision_1 = require("./collision");
// import { initialiseInputListeners } from "./input";
const vector_1 = require("./util/vector");
function getCanvasElement() {
    if (typeof document !== 'undefined') {
        return document.getElementById("mycanvas");
    }
    return null;
}
const canvas = getCanvasElement();
// const canvas:HTMLCanvasElement= document.getElementById("mycanvas")as HTMLCanvasElement ;
canvas.style.background = "pink";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
// const {width,height}=canvas;
const nBodies = 1000;
const world = (0, world_1.createWorld)(ctx, 0.01);
(0, world_1.populateWorld)(world, nBodies);
// initialiseInputListeners(world);
const BoundaryModule = (0, collision_1.createBoundaryModule)();
const pos = (0, vector_1.Vec2)(canvas.width / 4, canvas.height / 4);
// const pos2=Vec2(Math.floor(width),Math.floor(height))
// BoundaryModule.rectangular(world,3000,500,pos);
BoundaryModule.circular(world, 500, pos);
// BoundaryModule.rectangular(world,1,pos2);
function animate() {
    requestAnimationFrame(animate);
    (0, world_1.simulateWorld)(world);
    (0, renderer_1.renderWorld)(world, canvas.width, canvas.height);
}
animate();
//# sourceMappingURL=main.js.map