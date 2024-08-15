import { Vec2 } from "./util/vector.js";
import { drawCircle, drawRectangle, getRandomColor } from "./renderer.js";
function createIdGenerator() {
    let value = 0;
    return () => value++;
}
const getNextId = createIdGenerator();
function createBody(currentPosition, velocity, acceleration, mass, isHollow = false, isFixed = false) {
    const body = {
        id: getNextId(),
        previousPosition: currentPosition.copy(),
        currentPosition: currentPosition.copy(),
        velocity: velocity.copy(),
        acceleration: acceleration.copy(),
        isFixed,
        isHollow,
        mass,
        color: getRandomColor(),
        draw(ctx) {
            throw new Error("Draw method must be implemented by the specific shape");
        },
        updatePosition(newPosition) {
            if (isFixed) {
                return;
            }
            this.previousPosition = this.currentPosition.copy();
            this.currentPosition = newPosition.copy();
        }
    };
    return body;
}
function createCircle(radius, currentPosition, velocity, acceleration, mass, isHollow) {
    const body = createBody(currentPosition, velocity, acceleration, mass, isHollow);
    return Object.assign(Object.assign({}, body), { radius,
        draw(ctx) {
            drawCircle(ctx, this.currentPosition, this.radius, this.color, this.isHollow);
        } });
}
function createSquare(length, currentPosition, velocity, acceleration, mass) {
    const body = createBody(currentPosition, velocity, acceleration, mass);
    return Object.assign(Object.assign({}, body), { width: length, height: length, draw(ctx) {
            drawRectangle(ctx, this.currentPosition, this.color, this.width, undefined, this.isHollow);
        } });
}
export function createShapeModule() {
    return {
        createCircle: (size, position = Vec2(), velocity = Vec2(), acceleration = Vec2(0, 10), mass = 1, isHollow = false) => {
            return createCircle(size, position, velocity, acceleration, mass, isHollow);
        },
        createSquare: (size, position = Vec2(), velocity = Vec2(), acceleration = Vec2(0, 10), mass = 1) => {
            return createSquare(size, position, velocity, acceleration, mass);
        }
    };
}
