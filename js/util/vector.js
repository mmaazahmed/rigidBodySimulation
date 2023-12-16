
export function Vec2(x=0,y=0){
    return {
        x,
        y,
        magnitude:()=>{
            return Math.sqrt( this.x*this.x + this.y*this.y).toFixed(2);
        }
    };
}

export function normalise(vec){
    const magnitude=vec.magnitude;
    return Vec2(vec.x/magnitude,vec.y/magnitude);

}

export function add(vec1,vec2){
   return Vec2(vec1.x+vec2.x,vec1.y+vec2.y);
}
export function sub(vec1,vec2){
    return Vec2(vec1.x-vec2.x,vec1.y-vec2.y);
}
