export interface World{
    ctx:CanvasRenderingContext2D,
    timeStep:number,
    bodies:PhysicalBody[],
    isPause:boolean,
    boundaries:Boundary[],
    updateInterval:number,
    displayDy:number,
    displayDx:number
}
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
    }
export interface PhysicalBody{
    id:number,
    currentPosition:Vector2D,
    previousPosition:Vector2D,
    size:number,
    velocity:Vector2D,
    acceleration:Vector2D,
    mass:number,
    draw(ctx:CanvasRenderingContext2D):void,
    updatePosition(newPosition:Vector2D):void,

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