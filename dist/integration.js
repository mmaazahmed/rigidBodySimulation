// import { PhysicalBody, World } from "./interfaces";
// import { Vec2 } from "./util/vector";
export function applyVerletIntegration(world) {
    const dtSquared = world.timeStep * world.timeStep; // Square the time step
    for (const body of world.bodies) {
        const velocity = body.currentPosition.sub(body.previousPosition);
        console.log(velocity);
        const newPosition = body.currentPosition.add(velocity);
        body.updatePosition(newPosition.add(body.acceleration.scalerMult(dtSquared)));
    }
}
export function applyEulerIntegration(world) {
    const dt = world.timeStep; // Get the time step from the world
    for (const body of world.bodies) {
        // Update velocity using acceleration
        body.velocity = body.velocity.add(body.acceleration.scalerMult(dt));
        // Update position using velocity
        const newPosition = body.currentPosition.add(body.velocity.scalerMult(dt));
        body.updatePosition(newPosition);
    }
}
// function applyGravity(body:PhysicalBody){
//     // const [ax,ay]=body.acceleration;
//    body.acceleration=addVec2(body.acceleration,body.acceleration);
// }
// function updatePosition(body:PhysicalBody,dt:number){
//     body.prevPosition=body.currentPosition;
//     body.currentPosition= addVec2(body.currentPosition,body);
//     const [ax,ay]=body.acceleration;
//     const [prevX,prevY]=body.prevPosition;
//     let [currentX,currentY]=body.currentPosition;
//     const [vx,vy]=[currentX-prevX,currentY-prevY];
//     body.prevPosition=body.currentPosition;
//     currentX+=vx+ax*dt*dt;
//     currentY+=vy+ay*dt*dt;
//     body.currentPosition=[currentX,currentY];
//     applyGravity(body);
// }
// function updateXpostionEular(body,dt){
//     body.velocity.x+=body.acceleration.x*dt;
//     body.currentPosition.x+=body.velocity.x*dt;
// }
// function updateYpostionEular(body,dt){
//     body.velocity.y+=body.acceleration.y*dt;
//     body.currentPosition.y+=body.velocity.y*dt;
// }
// export function applyEularIntegration(world:World){
//     for (const body of world.bodies){
//         const dt=world.timeStep;
//         updateXpostionEular(body,dt);
//         updateYpostionEular(body,dt);
//     }
// }
