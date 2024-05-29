"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sub = exports.add = exports.normalise = exports.Vec2 = void 0;
function Vec2(x = 0, y = 0) {
    const magnitude = () => Math.sqrt(x * x + y * y);
    const normalize = () => {
        const magnitudeValue = magnitude();
        if (magnitudeValue === 0) {
            throw new Error('Cannot normalize with magnitude 0');
        }
        return Vec2(x / magnitudeValue, y / magnitudeValue);
    };
    return {
        x,
        y,
        magnitude,
        normalize,
        copy: () => Vec2(x, y),
        add: (vec2) => Vec2(x += vec2.x, y += vec2.y),
        sub: (vec2) => Vec2(x -= vec2.x, y -= vec2.y),
        scalerMult: (mult) => Vec2(x * mult, y * mult)
    };
}
exports.Vec2 = Vec2;
function normalise(vec) {
    const magnitude = vec.magnitude();
    if (magnitude === 0) {
        throw new Error('can not normalize with magnitude 0');
    }
    return Vec2(vec.x / magnitude, vec.y / magnitude);
}
exports.normalise = normalise;
function add(vec1, vec2) {
    return Vec2(vec1.x + vec2.x, vec1.y + vec2.y);
}
exports.add = add;
function sub(vec1, vec2) {
    return Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
}
exports.sub = sub;
