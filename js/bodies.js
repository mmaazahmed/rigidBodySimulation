import { Vec2 } from "./util/vector.js";

function createIdGenerator(){
    let value=0;
    return ()=>value++;
}

const getNextId=createIdGenerator();

function drawSquare(ctx,position,length){
    const {x,y}=position;//center at x,y
    ctx.fillStyle="grey";
    ctx.fillRect(x-length/2, y-length/2, length, length);
}

function drawCircle(ctx,position,radius){
    const {x,y}= position;
    ctx.beginPath();
    ctx.arc(x,y, radius,0,2*Math.PI);
    ctx.fillStyle="grey";
    ctx.fill();

}

function createCircle(radius,currentPosition,velocity=Vec2(),acceleration=Vec2(0,10),mass=1){
    const circle={
        id:getNextId(),
        currentPosition,
        prevPosition: Vec2(),
        size:radius ,
        velocity,
        acceleration,
        mass,
        draw(ctx){
            drawCircle(ctx,this.currentPosition,this.size);
        },
        updatePosition(newPosition){
            this.position=newPosition;
        }
    };
    return circle;
}

function createSquare(length,currentPosition,velocity=Vec2(),acceleration=Vec2(0,10),mass=1){
    const square={
        id :getNextId(),
        size:length,
        currentPosition,
        prevPosition: Vec2(),
        velocity,
        acceleration,
        mass,
        draw(ctx){
            drawSquare(ctx,this.currentPosition,this.size);
        },
        updatePosition(newPosition){
            this.position=newPosition;
        }
    };
    return square;

}


export function createShapeModule(){
    return {
        createCircle:(size,position,velocity,acceleration,mass)=>{
            return createCircle(size,position,velocity,acceleration,mass );
        },
        createSquare:(size,position,velocity,acceleration,mass)=>{
            return createSquare(size,position,velocity,acceleration,mass);
        }
    
    };
}

export function createShapeFromName(shapeName,size,position){
    switch(shapeName){
        case 'square':
            return createSquare(size,position);
        case 'circle':
            return createCircle(size,position)

    }

}