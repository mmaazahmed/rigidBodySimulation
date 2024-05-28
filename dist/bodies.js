"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShapeModule = void 0;
const vector_1 = require("./util/vector");
const renderer_1 = require("./renderer");
function createIdGenerator() {
    let value = 0;
    return () => value++;
}
const getNextId = createIdGenerator();
// export function drawSquare(ctx,position,length){
//     const {x,y}=position;//center at x,y
//     ctx.fillStyle="grey";
//     ctx.fillRect(x-length/2, y-length/2, length, length);
// }
// export function drawCircle(ctx,position,radius){
//     const {x,y}= position;
//     ctx.beginPath();
//     ctx.arc(x,y, radius,0,2*Math.PI);
//     ctx.fillStyle="grey";
//     ctx.fill();
// }
function createCircle(radius, currentPosition, velocity, acceleration, mass) {
    const circle = {
        id: getNextId(),
        previousPosition: (0, vector_1.Vec2)(),
        currentPosition: currentPosition.copy(),
        size: radius,
        velocity: velocity.copy(),
        acceleration: acceleration.copy(),
        mass,
        draw(ctx) {
            (0, renderer_1.drawCircle)(ctx, this.currentPosition, this.size);
        },
        updatePosition(newPosition) {
            this.previousPosition = this.currentPosition.copy();
            this.currentPosition = newPosition.copy();
        }
    };
    return circle;
}
function createSquare(length, currentPosition, velocity, acceleration, mass) {
    const square = {
        id: getNextId(),
        size: length,
        previousPosition: (0, vector_1.Vec2)(),
        currentPosition: currentPosition.copy(),
        velocity: velocity.copy(),
        acceleration: acceleration.copy(),
        mass,
        draw(ctx) {
            (0, renderer_1.drawRectangle)(ctx, this.currentPosition, this.size);
        },
        updatePosition(newPosition) {
            this.previousPosition = this.currentPosition.copy();
            this.currentPosition = newPosition.copy();
        }
    };
    return square;
}
function createShapeModule() {
    return {
        createCircle: (size, position = (0, vector_1.Vec2)(), velocity = (0, vector_1.Vec2)(), acceleration = (0, vector_1.Vec2)(0, 10), mass = 1) => {
            return createCircle(size, position, velocity, acceleration, mass);
        },
        createSquare: (size, position = (0, vector_1.Vec2)(), velocity = (0, vector_1.Vec2)(), acceleration = (0, vector_1.Vec2)(0, 10), mass = 1) => {
            return createSquare(size, position, velocity, acceleration, mass);
        }
    };
}
exports.createShapeModule = createShapeModule;
// export function createShapeFromName(shapeName:string,size:number,position:Vector2D){
//     switch(shapeName){
//         case 'square':
//             return createSquare(size,position);
//         case 'circle':
//             return createCircle(size,position)
//     }
// }
//# sourceMappingURL=bodies.js.map