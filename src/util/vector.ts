import { Vector2D } from "../interfaces";

export function Vec2(x = 0, y = 0): Vector2D {
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
        normalize: function () {
            return normalize();
        },
        add: function (vec: Vector2D) {
            return Vec2(x + vec.x, y + vec.y);
        },
    };
}
export function normalise(vec:Vector2D){
    const magnitude=vec.magnitude();
    if(magnitude===0){throw new Error('can not normalize with magnitude 0')}
    return Vec2(vec.x/magnitude,vec.y/magnitude);

}

export function add(vec1:Vector2D,vec2:Vector2D){
   return Vec2(vec1.x+vec2.x,vec1.y+vec2.y);
}
export function sub(vec1:Vector2D,vec2:Vector2D){
    return Vec2(vec1.x-vec2.x,vec1.y-vec2.y);
}