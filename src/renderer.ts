import { Boundary, BoundaryType, Vector2D, World } from "./interfaces.js";

export function drawRectangle(ctx:CanvasRenderingContext2D,position:Vector2D,height:number,width:number=height){
    const {x,y}=position;//center at x,y
    // ctx.fillStyle="grey";
    ctx.fillRect(x-length/2, y-length/2, length, length);
}

export function drawCircle(ctx:CanvasRenderingContext2D,position:Vector2D,radius:number){
    const {x,y}= position;
    ctx.beginPath();
    ctx.arc(x,y, radius,0,2*Math.PI);
    ctx.strokeStyle="black";
    ctx.stroke()
}

function drawCircularBoundary(ctx:CanvasRenderingContext2D,boundary:Boundary){
    const {x,y}= boundary.position;
    ctx.beginPath();
    if(!boundary.radius){throw Error('no radius')}
    ctx.arc(x,y, boundary.radius,0,2*Math.PI);
    ctx.strokeStyle="yellow";
    ctx.stroke();
}
function drawRectangularBoundary(ctx:CanvasRenderingContext2D,boundary:Boundary){
    const { x, y } = boundary.position;
    const { height, width } = boundary;
    
    if (!height || !width) {
        throw new Error('no length or width');
    }

    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(x , y , width, height);
    ctx.stroke();
}

function clearCanvas(world:World,width:number,height:number){
    world.ctx.clearRect(0, 0, width, height);
}   
function drawObjects(world:World){
    for (const body of world.bodies){
        body.draw(world.ctx);
    }
}

function drawBoundaries(world:World){
    // const {ctx}=world;
    for (const boundary of world.boundaries){
        if (boundary.type===BoundaryType.Rectangular){
            if(!boundary.height || ! boundary.width){throw new Error(`${boundary.type} has dimensions:${boundary.height,boundary.width}`)}
            drawRectangularBoundary(world.ctx,boundary)
            // drawRectangle(world.ctx,boundary.position,boundary.height,boundary.width);
        }
        if (boundary.type===BoundaryType.Square){
            if(!boundary.length){throw new Error(`${boundary.type} has dimensions:${boundary.length}`)}
            drawRectangle(world.ctx,boundary.position,boundary.length);
        }
        if (boundary.type===BoundaryType.Circular){
            if(!boundary.radius){throw new Error(`boundary has radius:${boundary.radius}`)}
            drawCircularBoundary(world.ctx,boundary);  
        }
    }
}

export function renderWorld(world:World,width:number,height:number){
    clearCanvas(world,width,height);
    drawBoundaries(world);
    drawObjects(world);
}