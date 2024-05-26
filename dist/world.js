import { createShapeModule } from "./bodies.js";
import { applyVerletIntegration,applyEulerIntegration } from "./integration.js";
import { applySimpleCollision } from "./collision.js";
import { Vec2 } from "./util/vector.js";
function getRandomRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomPos(world,pos) {
    const x = getRandomRange(pos.x-500, pos.x+500);
    const y = getRandomRange(pos.x-500, pos.x+500);
    return Vec2(x, y);
}
export function populateWorld(world, nBodies,pos) {
    const ShapeModule = createShapeModule();
    for (let i = 0; i < nBodies; i++) {
        const random = Math.random();
        const randomPos = getRandomPos(world,pos);
        const randomSize = getRandomRange(1, 10);
        if (random < 0.5) {
            world.bodies.push(ShapeModule.createCircle(randomSize, randomPos, randomPos));
        }
        else {
            world.bodies.push(ShapeModule.createSquare(randomSize, randomPos, randomPos));
        }
    }
}
export function createWorld(ctx, timeStep = 0.1, updateInterval = 60) {
    return {
        ctx,
        timeStep,
        bodies: [],
        isPause: false,
        boundaries: [],
        updateInterval,
        displayDy: 0,
        displayDx: 0
    };
}
export function simulateWorld(world) {
    if (world.isPause) {
        return;
    }
    // applyVerletIntegration(world);
    applyEulerIntegration(world);
    applySimpleCollision(world);
}
// function animate(){
//     requestAnimationFrame(animate);
//     update(world);
//     renderWorld(world,canvas.width,canvas.height);
// }
// // circle.draw/(ctx);
// animate();
