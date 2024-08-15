import { Boundary, BoundaryType, Vector2D, World } from "./interfaces.js";

export function getRandomColor(): string {
    // Generate a random integer between 0 and 255 for each RGB component
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Convert each component to a 2-digit hexadecimal string and concatenate them
    const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    return hexColor;
}
export function drawRectangle(ctx:CanvasRenderingContext2D,position:Vector2D,color:string,height:number,width:number=height,isHollow?:boolean){
    const {x,y}=position;//center at x,y
    ctx.fillStyle=color;
    // console.log('here')
    ctx.fillRect(x, y, width, height);
}

export function drawCircle(ctx:CanvasRenderingContext2D,position:Vector2D,radius:number,color:string,isHollow?:boolean){
    const {x,y}= position;
    ctx.beginPath();
    ctx.arc(x,y, radius,0,2*Math.PI);
    if (isHollow) {
        ctx.strokeStyle = color;
        ctx.stroke();
    } else {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.closePath()
}

function drawCircularBoundary(ctx:CanvasRenderingContext2D,boundary:Boundary){
    const {x,y}= boundary.position;
    ctx.beginPath();
    if(!boundary.radius){throw Error('no radius')}
    ctx.arc(x,y, boundary.radius,0,2*Math.PI);
    ctx.strokeStyle=boundary.color;
    ctx.stroke();
}
function drawRectangularBoundary(ctx:CanvasRenderingContext2D,boundary:Boundary){
    console.log('here')
    const { x, y } = boundary.position;
    const { height, width } = boundary;
    
    if (!height || !width) {
        throw new Error('no length or width');
    }

    ctx.beginPath();
    ctx.strokeStyle = boundary.color;
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
            drawRectangle(world.ctx,boundary.position,'12',boundary.length);
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