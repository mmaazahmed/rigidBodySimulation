"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWorld = exports.drawCircle = exports.drawRectangle = void 0;
const interfaces_js_1 = require("./interfaces.js");
function drawRectangle(ctx, position, height, width = height) {
    const { x, y } = position; //center at x,y
    // ctx.fillStyle="grey";
    ctx.fillRect(x - length / 2, y - length / 2, length, length);
}
exports.drawRectangle = drawRectangle;
function drawCircle(ctx, position, radius) {
    const { x, y } = position;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    // ctx.fillStyle="grey";
    // ctx.fill();
}
exports.drawCircle = drawCircle;
// function drawCircularBoundary(ctx:CanvasRenderingContext2D,radius:number,pos:Vector2D){
//     const {x,y}= boundary.position;
//     ctx.beginPath();
//     ctx.arc(x,y, boundary.radius,0,2*Math.PI);
//     ctx.strokeStyle="yellow";
//     ctx.stroke();
// }
function clearCanvas(world, width, height) {
    world.ctx.clearRect(0, 0, width, height);
}
function drawObjects(world) {
    for (const body of world.bodies) {
        body.draw(world.ctx);
    }
}
function drawBoundaries(world) {
    // const {ctx}=world;
    for (const boundary of world.boundaries) {
        if (boundary.type === interfaces_js_1.BoundaryType.Rectangular) {
            if (!boundary.height || !boundary.width) {
                throw new Error(`${boundary.type} has dimensions:${boundary.height, boundary.width}`);
            }
            drawRectangle(world.ctx, boundary.position, boundary.height, boundary.width);
        }
        if (boundary.type === interfaces_js_1.BoundaryType.Square) {
            if (!boundary.length) {
                throw new Error(`${boundary.type} has dimensions:${boundary.length}`);
            }
            drawRectangle(world.ctx, boundary.position, boundary.length);
        }
        if (boundary.type === interfaces_js_1.BoundaryType.Circular) {
            if (!boundary.radius) {
                throw new Error(`boundary has radius:${boundary.radius}`);
            }
            drawCircle(world.ctx, boundary.position, boundary.radius);
        }
    }
}
function renderWorld(world, width, height) {
    clearCanvas(world, width, height);
    drawBoundaries(world);
    drawObjects(world);
}
exports.renderWorld = renderWorld;
