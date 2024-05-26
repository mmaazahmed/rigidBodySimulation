import { BoundaryType } from "./interfaces.js";
import { Vec2 } from "./util/vector.js";
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
            console.log(`before top col${body.velocity.y}`)
            body.velocity.y *= -1;
            console.log(`after top col ${body.velocity.y}`)
        }
        
        else if (bodyBottom >= bottom) {
            console.log(`before bottom col${body.velocity.y}`)
            body.velocity.y *= -1;
            console.log(`after bottom col ${body.velocity.y}`)
        }
        else if (bodyLeft >= left) {
            console.log(`before left col ${body.velocity.y}`)
            body.velocity.x *= -1;
            console.log(`after  left col ${body.velocity.y}`)
        }
        else if (bodyRight >= right) {
            console.log(`before rright col ${body.velocity.y}`)
            body.velocity.x *= -1;
            console.log(`after  right col ${body.velocity.y}`)
            // console.log(body.velocity)
        }
    }
    // console.log(world.bodies[0].velocity)
}
export function applySimpleCollision(world) {
    for (const boundary of world.boundaries) {
        handleSimpleCollision(world, boundary);
    }
}
