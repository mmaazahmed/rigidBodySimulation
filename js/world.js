import { createShapeModule } from "./bodies.js";
import { Vec2 } from "./util/vector.js";
// import { createShapeFromName } from "./bodies.js";

function getRandomRange(max,min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomPos(world){
    const x=getRandomRange(world.width-10,0);
    const y=getRandomRange(world.height-10,0);
    return Vec2(x,y);
}
export function populateWorld(world,nBodies){
    const ShapeModule=createShapeModule();
    for(let i=0;i<nBodies;i++){

        const random=Math.random();
        const randomPos=getRandomPos(world);

        const randomSize=getRandomRange(10,50);
        if (random<0.5){ 
            world.bodies.push(ShapeModule.createCircle(randomSize,randomPos));
           
        }else{
            world.bodies.push(ShapeModule.createSquare(randomSize,randomPos));

        }
        
    }
}

export function createWorld(ctx,width,height,timeStep){
    return{
        ctx,
        width,
        height,
        timeStep,
        bodies : []
    }
}


