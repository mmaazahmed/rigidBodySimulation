import { PhysicalBody, World } from "./interfaces";

// import { addVec2,subVec2 } from "./util/vector.js";
export function applyVerletIntegration(world:World){
    const dt=world.timeStep;
    for (const body of world.bodies){
        const dt=world.timeStep
        // const [currentX,currentY]=body.currentPosition;
        // const [prevX,prevY]=body.prevPosition;
        // const nextX=2*currentX - prevX+ ax*dt*dt;
        // const nextY=2*currentY - prevY+ ay*dt*dt;
        // body.prevPosition=body.currentPosition;
        // body.currentPosition=[nextX,nextY];
        
        // x+=vx * dt + 0.5 * ax * dt**2;
        // y+=vy * dt + 0.5 * ay * dt**2;
        updatePosition(body,dt);
        
    }
}
function applyGravity(body:PhysicalBody){
    // const [ax,ay]=body.acceleration;
   body.acceleration=addVec2(body.acceleration,body.acceleration);

}
function updatePosition(body:PhysicalBody,dt:number){
    body.prevPosition=body.currentPosition;
    body.currentPosition= addVec2(body.currentPosition,body);

    const [ax,ay]=body.acceleration;
    const [prevX,prevY]=body.prevPosition;
    let [currentX,currentY]=body.currentPosition;
    const [vx,vy]=[currentX-prevX,currentY-prevY];
    body.prevPosition=body.currentPosition;
    currentX+=vx+ax*dt*dt;
    currentY+=vy+ay*dt*dt;
    body.currentPosition=[currentX,currentY];
    applyGravity(body);

}
function updateXpostionEular(body,dt){
    body.velocity.x+=body.acceleration.x*dt;
    body.currentPosition.x+=body.velocity.x*dt;


}
function updateYpostionEular(body,dt){
    body.velocity.y+=body.acceleration.y*dt;
    body.currentPosition.y+=body.velocity.y*dt;

}
export function applyEularIntegration(world:World){
    for (const body of world.bodies){
        const dt=world.timeStep;
        updateXpostionEular(body,dt);
        updateYpostionEular(body,dt);
    }
}
