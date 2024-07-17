import { Vector2D } from "../interfaces.js";

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
        normalize,
        copy:()=> Vec2(x,y),
        add:(vec2: Vector2D)=> Vec2(x+ vec2.x, y+ vec2.y),
        sub:(vec2: Vector2D)=> Vec2(x- vec2.x, y- vec2.y),
        distanceTo:(vec2:Vector2D)=>vec2.sub(Vec2(x,y)).magnitude(),
        scale:(mult:number)=>Vec2(x*mult,y*mult)
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
