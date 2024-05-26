import { PhysicalBody, Boundary,BoundaryType, Vector2D, World } from "./interfaces";
import { Vec2 } from "./util/vector";

function createCircularBoundary(world:World,radius:number,position:Vector2D){
    const {x,y}=position;
    const boundary={
        position,
        type:BoundaryType.Circular,
        radius,
        top:y-radius,
        bottom:y+radius,
        left:x-radius,
        right:x+radius
    };
    world.boundaries.push(boundary);
}
function createRectangularBoundary(world:any,width:number,height:number,position:Vector2D):void{
    const {x,y}=position;
    const boundary:Boundary={
        position,
        type:BoundaryType.Rectangular,
        width,
        height,
        top:y,
        bottom:height+y,
        left:x,
        right:x+width
    };
    world.boundaries.push(boundary);
}


export function createBoundaryModule(){
    return {
        circular:(world:World,radius:number=500,position:Vector2D=Vec2(1,1))=>{
            return createCircularBoundary(world,radius,position);
        },
        rectangular:(world:World,width:number=300,height:number=400,position:Vector2D=Vec2(1,1))=>{
            return createRectangularBoundary(world,width,height,position);
        }
    };
}
function isInsideBoundary(body:PhysicalBody,boundary:Boundary){
    const {top,bottom,left,right}=boundary;
    const bodyBottom=body.currentPosition.y+body.size;
    const bodyTop=body.currentPosition.y-body.size
    const bodyLeft=body.currentPosition.x-body.size;
    const bodyRight=body.currentPosition.x+body.size;
    return  (bodyBottom >= top && bodyTop <= bottom && bodyLeft<=right && bodyRight >=left);

}
function handleSimpleCollision(world:World,boundary:Boundary){
    const {top,bottom,left,right}=boundary;
    
    for (const body of world.bodies){
        
        const bodyBottom=body.currentPosition.y+body.size;
        const bodyTop=body.currentPosition.y-body.size
        const bodyLeft=body.currentPosition.x-body.size;
        const bodyRight=body.currentPosition.x+body.size;
        if (!isInsideBoundary(body,boundary)){continue;}
        
        if(bodyTop<=top){
            body.velocity.y*=-1;
        }else if(bodyBottom >= bottom){
            body.velocity.y*=-1;
        }else if(bodyLeft >= left){
            body.velocity.x*=-1;
        }else if(bodyRight >= right){
            body.velocity.x*=-1;
        }
        
    
    }   
}

export function applySimpleCollision(world:World){
    for (const boundary of world.boundaries){
        handleSimpleCollision(world,boundary);
    }
}
