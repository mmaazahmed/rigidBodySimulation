import { Vec2 } from "./util/vector.js";
import { drawCircle,drawRectangle } from "./renderer.js";
import {  PhysicalBody, Vector2D } from "./interfaces.js";
function createIdGenerator(){
    let value=0;
    return ()=>value++;
}

const getNextId=createIdGenerator();

// export function drawSquare(ctx,position,length){
//     const {x,y}=position;//center at x,y
//     ctx.fillStyle="grey";
//     ctx.fillRect(x-length/2, y-length/2, length, length);
// }

// export function drawCircle(ctx,position,radius){
//     const {x,y}= position;
//     ctx.beginPath();
//     ctx.arc(x,y, radius,0,2*Math.PI);
//     ctx.fillStyle="grey";
//     ctx.fill();

// }

function createCircle(radius:number,currentPosition:Vector2D,velocity:Vector2D,acceleration:Vector2D,mass:number):PhysicalBody{
    const circle={
        id:getNextId(),
        prevPosition: Vec2(),
        currentPosition,
        size:radius ,
        velocity,
        acceleration,
        mass,
        draw(ctx:CanvasRenderingContext2D){
            drawCircle(ctx,this.currentPosition,this.size);
        },
        updatePosition(newPosition:Vector2D){
            this.prevPosition=this.currentPosition;
            this.currentPosition=newPosition;
        }
    };
    // console.log(test)
    return circle;
}

function createSquare(
    length:number,
    currentPosition:Vector2D,
    velocity:Vector2D,
    acceleration:Vector2D,
    mass:number
):PhysicalBody{
    const square={
        id :getNextId(),
        size:length,
        currentPosition,
        prevPosition: Vec2(),
        velocity,
        acceleration,
        mass,
        draw(ctx:CanvasRenderingContext2D){
            drawRectangle(ctx,this.currentPosition,this.size);
        },
        updatePosition(newPosition:Vector2D){
            this.prevPosition=this.currentPosition;
            this.currentPosition=newPosition;
        }
    };
    return square;

}


export function createShapeModule(){
    return {
        createCircle:(
            size:number,
            position:Vector2D=Vec2(),
            velocity:Vector2D=Vec2(),
            acceleration:Vector2D=Vec2(0,10),
            mass=1
        )=>{
            return createCircle(size,position,velocity,acceleration,mass );
        },
        createSquare:(size:number,
            position:Vector2D=Vec2(),
            velocity:Vector2D=Vec2(),
            acceleration:Vector2D=Vec2(0,10),
            mass=1)=>{
            return createSquare(size,position,velocity,acceleration,mass);
        }
    
    };
}

// export function createShapeFromName(shapeName:string,size:number,position:Vector2D){
//     switch(shapeName){
//         case 'square':
//             return createSquare(size,position);
//         case 'circle':
//             return createCircle(size,position)

//     }

// }