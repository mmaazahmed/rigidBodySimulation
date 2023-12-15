export function applySimpleCollision(world){
    for (const body of world.bodies){

        if(body.currentPosition.y+body.size + 5>= world.height){
            body.velocity.y*=-1;
        }

    }
}