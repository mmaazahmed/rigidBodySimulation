import { createShapeModule } from "./bodies.js";
import { applyEulerIntegration } from "./integration.js";
import { applyVerletIntegration} from "./integration.js";
import { applySimpleCollision } from "./collision.js";
import { Vec2 } from "./util/vector.js";
import { World } from "./interfaces.js";

function getRandomRange(max:number,min:number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomPos(world:World){
    const x=getRandomRange(2000-10,0);
    const y=getRandomRange(2000-10,0);
    return Vec2(x,y);
}
export function populateWorld(world:World,nBodies:number){
    const ShapeModule=createShapeModule();
    for(let i=0;i<nBodies;i++){

        const random=Math.random();
        const randomPos=getRandomPos(world);

        const randomSize=getRandomRange(1,10);
        if (random<0.5){ 
            world.bodies.push(ShapeModule.createCircle(randomSize,randomPos,randomPos));
           
        }else{
            world.bodies.push(ShapeModule.createSquare(randomSize,randomPos,randomPos));

        }
        
    }
}

export function createWorld(ctx:CanvasRenderingContext2D,timeStep=0.1,updateInterval=60):World{
    return{
        ctx,
        timeStep,
        bodies : [],
        isPause:false,
        boundaries:[],
        updateInterval,
        displayDy:0,
        displayDx:0
    }
}

export function simulateWorld(world:World){
    if(world.isPause){return;}
    // applyVerletIntegration(world);
    applyEulerIntegration(world);
    applySimpleCollision(world);
}

// function animate(){
//     requestAnimationFrame(animate);
//     update(world);
//     renderWorld(world,canvas.width,canvas.height);

// }
// // circle.draw/(ctx);
// animate();
