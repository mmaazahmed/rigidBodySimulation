import { Vec2 } from "./util/vector.js";
import { drawCircle, drawRectangle } from "./renderer.js";
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
        previousPosition: currentPosition.copy(),
        currentPosition: currentPosition.copy(),
        size: radius,
        velocity: velocity.copy(),
        acceleration: acceleration.copy(),
        mass,
        draw(ctx) {
            drawCircle(ctx, this.currentPosition, this.size);
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
        previousPosition: Vec2(),
        currentPosition: currentPosition.copy(),
        velocity: velocity.copy(),
        acceleration: acceleration.copy(),
        mass,
        draw(ctx) {
            drawRectangle(ctx, this.currentPosition, this.size);
        },
        updatePosition(newPosition) {
            this.previousPosition = this.currentPosition.copy();
            this.currentPosition = newPosition.copy();
        }
    };
    return square;
}
export function createShapeModule() {
    return {
        createCircle: (size, position = Vec2(), velocity = Vec2(), acceleration = Vec2(0, 10), mass = 1) => {
            return createCircle(size, position, velocity, acceleration, mass);
        },
        createSquare: (size, position = Vec2(), velocity = Vec2(), acceleration = Vec2(0, 10), mass = 1) => {
            return createSquare(size, position, velocity, acceleration, mass);
        }
    };
}
// export function createShapeFromName(shapeName:string,size:number,position:Vector2D){
//     switch(shapeName){
//         case 'square':
//             return createSquare(size,position);
//         case 'circle':
//             return createCircle(size,position)
//     }
// }
