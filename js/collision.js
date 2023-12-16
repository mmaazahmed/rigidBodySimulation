function createBoundary(scale=5,length=1,height=1){
    return{
        scale,
        length: length * scale,
        height : height * scale
    };
}

function simpleCollision(world,boundary){
    const height=boundary.height;
    const width=boundary.width;
    console.log(height);
    for (const body of world.bodies){
        if(body.currentPosition.y+body.size + 5>= height){
            body.velocity.y*=-1;
        }
    }   
}

export function applySimpleCollision(world){
    for (const boundary of world.boundaries){
        simpleCollision(world,boundary);
    }
}

export function setBoundry(world,scale){
    const boundary= createBoundary(scale);
    console.log(boundary);
    world.boundaries.push(boundary);
    
}