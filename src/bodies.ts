import { Vec2 } from "./util/vector.js";
import { drawCircle,drawRectangle, getRandomColor } from "./renderer.js";
import {  CircularBody, PhysicalBody, Vector2D } from "./interfaces.js";
function createIdGenerator(){
    let value=0;
    return ()=>value++;
}

const getNextId=createIdGenerator();

function createBody(currentPosition:Vector2D,velocity:Vector2D,acceleration:Vector2D,mass:number,isHollow=false,isFixed=false):PhysicalBody{
    const body={
        id:getNextId(),
        previousPosition: currentPosition.copy(),
        currentPosition:currentPosition.copy(),
        velocity:velocity.copy(),
        acceleration:acceleration.copy(),
        isFixed,
        isHollow,
        mass,
        color:getRandomColor(),
        draw(ctx: CanvasRenderingContext2D) {
            throw new Error("Draw method must be implemented by the specific shape");
        },
        updatePosition(newPosition:Vector2D){
            if(isFixed){
                return;
            }
            this.previousPosition=this.currentPosition.copy();
            this.currentPosition=newPosition.copy();
        }
    };
    return body;
}
function createCircle(radius:number,currentPosition:Vector2D,velocity:Vector2D,acceleration:Vector2D,mass:number,isHollow?:boolean):CircularBody{
    const body=createBody(currentPosition,velocity,acceleration,mass,isHollow)
    return {
       ...body,
        radius,
        draw(ctx:CanvasRenderingContext2D){
            drawCircle(ctx,this.currentPosition,this.radius,this.color,this.isHollow);
        },
    };

}

function createSquare(
    length:number,
    currentPosition:Vector2D,
    velocity:Vector2D,
    acceleration:Vector2D,
    mass:number
){
    const body=createBody(currentPosition,velocity,acceleration,mass)
    return {
        ...body,
        width:length,
        height:length,
        draw(ctx:CanvasRenderingContext2D){
            drawRectangle(ctx,this.currentPosition,this.color,this.width,undefined,this.isHollow);
        },
    };
}


export function createShapeModule(){
    return {
        createCircle:(size:number,position=Vec2(),velocity=Vec2(),acceleration=Vec2(0,10),mass=1,isHollow=false)=>{
            return createCircle(size,position,velocity,acceleration,mass,isHollow);
        },
        createSquare:(size:number,position:Vector2D=Vec2(),velocity:Vector2D=Vec2(),acceleration:Vector2D=Vec2(0,10),mass=1)=>{
            return createSquare(size,position,velocity,acceleration,mass);
        }
    
    };
}

