"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySimpleCollision = exports.createBoundaryModule = void 0;
const interfaces_1 = require("./interfaces");
const vector_1 = require("./util/vector");
function createCircularBoundary(world, radius, position) {
    const { x, y } = position;
    const boundary = {
        position,
        type: interfaces_1.BoundaryType.Circular,
        radius,
        top: y - radius,
        bottom: y + radius,
        left: x - radius,
        right: x + radius
    };
    world.boundaries.push(boundary);
}
function createRectangularBoundary(world, width, height, position) {
    const { x, y } = position;
    const boundary = {
        position,
        type: interfaces_1.BoundaryType.Rectangular,
        width,
        height,
        top: y,
        bottom: height + y,
        left: x,
        right: x + width
    };
    world.boundaries.push(boundary);
}
function createBoundaryModule() {
    return {
        circular: (world, radius = 500, position = (0, vector_1.Vec2)(1, 1)) => {
            return createCircularBoundary(world, radius, position);
        },
        rectangular: (world, width = 300, height = 400, position = (0, vector_1.Vec2)(1, 1)) => {
            return createRectangularBoundary(world, width, height, position);
        }
    };
}
exports.createBoundaryModule = createBoundaryModule;
function isInsideBoundary(body, boundary) {
    const { top, bottom, left, right } = boundary;
    const bodyBottom = body.currentPosition.y + body.size;
    const bodyTop = body.currentPosition.y - body.size;
    const bodyLeft = body.currentPosition.x - body.size;
    const bodyRight = body.currentPosition.x + body.size;
    return (bodyBottom >= top && bodyTop <= bottom && bodyLeft <= right && bodyRight >= left);
}
function handleSimpleCollision(world, boundary) {
    const { top, bottom, left, right } = boundary;
    for (const body of world.bodies) {
        const bodyBottom = body.currentPosition.y + body.size;
        const bodyTop = body.currentPosition.y - body.size;
        const bodyLeft = body.currentPosition.x - body.size;
        const bodyRight = body.currentPosition.x + body.size;
        if (!isInsideBoundary(body, boundary)) {
            continue;
        }
        if (bodyTop <= top) {
            console.log('here');
            body.velocity.y *= -1;
        }
        else if (bodyBottom >= bottom) {
            body.velocity.y *= -1;
        }
        else if (bodyLeft >= left) {
            body.velocity.x *= -1;
        }
        else if (bodyRight >= right) {
            body.velocity.x *= -1;
        }
    }
}
function applySimpleCollision(world) {
    for (const boundary of world.boundaries) {
        handleSimpleCollision(world, boundary);
    }
}
exports.applySimpleCollision = applySimpleCollision;
//# sourceMappingURL=collision.js.map