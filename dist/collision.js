import { BoundaryType } from "./interfaces";
import { Vec2 } from "./util/vector";
function createCircularBoundary(world, radius, position) {
    const { x, y } = position;
    const boundary = {
        position,
        type: BoundaryType.Circular,
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
        type: BoundaryType.Rectangular,
        width,
        height,
        top: y,
        bottom: height + y,
        left: x,
        right: x + width
    };
    world.boundaries.push(boundary);
}
export function createBoundaryModule() {
    return {
        circular: (world, radius = 500, position = Vec2(1, 1)) => {
            return createCircularBoundary(world, radius, position);
        },
        rectangular: (world, width = 300, height = 400, position = Vec2(1, 1)) => {
            return createRectangularBoundary(world, width, height, position);
        }
    };
}
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
export function applySimpleCollision(world) {
    for (const boundary of world.boundaries) {
        handleSimpleCollision(world, boundary);
    }
}
