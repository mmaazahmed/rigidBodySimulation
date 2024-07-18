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
        position: position.sub(Vec2(width / 2, height / 2)),
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
function isInsideCircularBoundary(body, boundary) {
    if (!boundary.radius) {
        throw new Error('no radius');
    }
    const dist = body.currentPosition.distanceTo(boundary.position);
    return dist + body.size <= boundary.radius;
}
function handleSimpleCollision(world, boundary) {
    const { top, bottom, left, right } = boundary;
    // console.log(boundary)
    for (const body of world.bodies) {
        if (boundary.type === BoundaryType.Circular) {
            handleCircleOnCircleCollision(body, boundary);
        }
        if (boundary.type === BoundaryType.Rectangular) {
            handleCircleOnRectangleCollision(body, boundary);
        }
    }
}
function handleCircleOnCircleCollision(circle, boundary) {
    if (!boundary.radius) {
        throw new Error('no radius');
    }
    // const dist=(boundary.position.sub(circle.currentPosition)).magnitude()
    const dist = boundary.position.distanceTo(circle.currentPosition);
    if (isInsideCircularBoundary(circle, boundary)) {
        if (dist >= boundary.radius + circle.size) {
            // console.log(circle.velocity)
            circle.velocity = circle.velocity.scale(-1);
        }
    }
    else {
        if (dist <= boundary.radius + circle.size) {
            // console.log(circle.velocity)
            circle.velocity = circle.velocity.scale(-1);
        }
    }
}
function handleCircleOnRectangleCollision(circle, boundary) {
    if (!boundary.width || !boundary.height) {
        throw new Error('no width or height');
    }
    // Calculate the closest point on the rectangle to the circle's center
    const closestX = Math.max(boundary.position.x, Math.min(circle.currentPosition.x, boundary.position.x + boundary.width));
    const closestY = Math.max(boundary.position.y, Math.min(circle.currentPosition.y, boundary.position.y + boundary.height));
    // Calculate the distance from the circle's center to this closest point
    const distanceX = circle.currentPosition.x - closestX;
    const distanceY = circle.currentPosition.y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    // Check if the distance is less than the circle's radius squared (collision detection)
    if (distanceSquared < circle.size * circle.size) {
        // Handle collision
        const distance = Math.sqrt(distanceSquared);
        const overlap = circle.size - distance;
        // Calculate the collision response (simple resolution)
        const normalX = distanceX / distance;
        const normalY = distanceY / distance;
        // Move the circle out of collision
        const newPosition = circle.currentPosition.add(Vec2(normalX * overlap, normalY * overlap));
        circle.updatePosition(newPosition);
        // circle.currentPosition.x += normalX * overlap;
        // circle.currentPosition.y += normalY * overlap;
        // Reflect the velocity (simple collision response)
        const dotProduct = (circle.velocity.x * normalX + circle.velocity.y * normalY);
        circle.velocity = circle.velocity.sub(Vec2((2 * dotProduct * normalX), (2 * dotProduct * normalX)));
        // circle.velocity.x -= circle.velocity.x -(2 * dotProduct * normalX);
        // circle.velocity.y -= 2 * dotProduct * normalY;
    }
}
export function applySimpleCollision(world) {
    for (const boundary of world.boundaries) {
        handleSimpleCollision(world, boundary);
    }
}
