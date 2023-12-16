function createBoundary(type,world,scale,position){

    const [x,y]=position;
    
    const boundary={
        type,
        scale,
        length: (scale)*y,
        height: (scale)*x
    };
    // console.log(boundary.type,boundary.length,boundary.height);

    world.boundaries.push(boundary);
}

export function createBoundaryModule(){
    return {
        circular:(world,scale=5,position=[1,1])=>{
            return createBoundary('Circular',world,scale,position);
        },
        rectangular:(world,scale=5,position=[1,1])=>{
            return createBoundary('RECTANGULAR',world,scale,position);
        }
    };
}

function handleSimpleCollision(world,boundary){
    const height=boundary.height;
    const width=boundary.width;
    for (const body of world.bodies){
        if(body.currentPosition.y+body.size + 5>= height){
            body.velocity.y*=-1;
        }
    }   
}


export function applySimpleCollision(world){
    for (const boundary of world.boundaries){
        handleSimpleCollision(world,boundary);
    }
}

// function addBoundry(world,scale){
//     world.boundaries.push(boundary);
// }