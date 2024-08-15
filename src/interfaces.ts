export enum BoundaryType {
    Rectangular,
    Circular,
    Square
}
export interface Boundary{
    position:Vector2D,
    type:BoundaryType,
    width?:number,
    height?:number,
    radius?:number
    length?:number
    top:number,
    bottom:number,
    left:number,
    right:number,
    color:string,
}
export interface PhysicalBody{
    id:number,
    isFixed:boolean,
    isHollow:boolean,
    currentPosition:Vector2D,
    previousPosition:Vector2D,
    velocity:Vector2D,
    acceleration:Vector2D,
    mass:number,
    color:string,
    draw(ctx:CanvasRenderingContext2D):void,
    updatePosition(newPosition:Vector2D):void,
}
export interface CircularBody extends PhysicalBody{
    radius:number,
}
export interface RectangularBody extends PhysicalBody{
    width:number,
    height:number,
}
type BodyType = CircularBody | RectangularBody;
export interface World{
    ctx:CanvasRenderingContext2D,
    timeStep:number,
    bodies:BodyType[],
    isPause:boolean,
    boundaries:Boundary[],
    updateInterval:number,
    gravity:Vector2D,
    displayDy:number,
    displayDx:number
}
export interface Vector2D{
    x:number,
    y:number,
    magnitude():number
    copy():Vector2D
    normalize():Vector2D,
    add(vec2:Vector2D):Vector2D,
    sub(vec2:Vector2D):Vector2D,
    scale(mult:number):Vector2D,
    distanceTo(vec2:Vector2D):number,
}