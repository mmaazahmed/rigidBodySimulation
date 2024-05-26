import { BoundaryType, Vector2D, World } from "./interfaces.js";

export function drawRectangle(ctx:CanvasRenderingContext2D,position:Vector2D,height:number,width:number=height){
    const {x,y}=position;//center at x,y
    // ctx.fillStyle="grey";
    ctx.fillRect(x-length/2, y-length/2, length, length);
}

export function drawCircle(ctx:CanvasRenderingContext2D,position:Vector2D,radius:number){
    const {x,y}= position;
    ctx.beginPath();
    ctx.arc(x,y, radius,0,2*Math.PI);
    ctx.stroke()
    // ctx.fillStyle="grey";
    // ctx.fill();

}
// function drawCircularBoundary(ctx:CanvasRenderingContext2D,radius:number,pos:Vector2D){
//     const {x,y}= boundary.position;
//     ctx.beginPath();
//     ctx.arc(x,y, boundary.radius,0,2*Math.PI);
//     ctx.strokeStyle="yellow";
//     ctx.stroke();
// }

function clearCanvas(world:World,width:number,height:number){
    world.ctx.clearRect(0, 0, width, height);
}
function drawObjects(world:World){
    for (const body of world.bodies){
        body.draw(world.ctx);
    }
}

function drawBoundaries(world:World){
    const {ctx}=world;
    for (const boundary of world.boundaries){
        if (boundary.type===BoundaryType.Rectangular){
            if(!boundary.height || ! boundary.width){throw new Error(`${boundary.type} has dimensions:${boundary.height,boundary.width}`)}
            drawRectangle(world.ctx,boundary.position,boundary.height,boundary.width);
        }
        if (boundary.type===BoundaryType.Square){
            if(!boundary.length){throw new Error(`${boundary.type} has dimensions:${boundary.length}`)}
            drawRectangle(world.ctx,boundary.position,boundary.length);
        }
        if (boundary.type===BoundaryType.Circular){
            if(!boundary.radius){throw new Error(`boundary has radius:${boundary.radius}`)}
            drawCircle(world.ctx,boundary.position,boundary.radius);  
        }
    }
}

export function renderWorld(world:World,width:number,height:number){
    clearCanvas(world,width,height);
    drawBoundaries(world);
    drawObjects(world);
}