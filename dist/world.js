"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateWorld = exports.createWorld = exports.populateWorld = void 0;
const bodies_1 = require("./bodies");
const integration_1 = require("./integration");
// import { applyVerletIntegration,applyEulerIntegration } from "./integration";
const collision_1 = require("./collision");
const vector_1 = require("./util/vector");
function getRandomRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomPos(world) {
    const x = getRandomRange(2000 - 10, 0);
    const y = getRandomRange(2000 - 10, 0);
    return (0, vector_1.Vec2)(x, y);
}
function populateWorld(world, nBodies) {
    const ShapeModule = (0, bodies_1.createShapeModule)();
    for (let i = 0; i < nBodies; i++) {
        const random = Math.random();
        const randomPos = getRandomPos(world);
        const randomSize = getRandomRange(1, 10);
        if (random < 0.5) {
            world.bodies.push(ShapeModule.createCircle(randomSize, randomPos, randomPos));
        }
        else {
            world.bodies.push(ShapeModule.createSquare(randomSize, randomPos, randomPos));
        }
    }
}
exports.populateWorld = populateWorld;
function createWorld(ctx, timeStep = 0.1, updateInterval = 60) {
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
exports.createWorld = createWorld;
function simulateWorld(world) {
    if (world.isPause) {
        return;
    }
    // applyVerletIntegration(world);
    (0, integration_1.applyEulerIntegration)(world);
    (0, collision_1.applySimpleCollision)(world);
}
exports.simulateWorld = simulateWorld;
// function animate(){
//     requestAnimationFrame(animate);
//     update(world);
//     renderWorld(world,canvas.width,canvas.height);
// }
// // circle.draw/(ctx);
// animate();
//# sourceMappingURL=world.js.map