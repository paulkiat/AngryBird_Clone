////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 950, 20, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(0,190,0);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: angle});
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  fill(65,105,225);
  // set angle of equal to global var angle
  Body.setAngle(propeller, angle);
  // set angular velocity of equal to global var angleSpeed
  Body.setAngularVelocity(propeller, angleSpeed);
  // update variable angle by angleSpeed
  angle+=angleSpeed;
  // draw the vertices of the body
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
  colors.push(color(random(255),random(255),random(255)));
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for (var i=0; i<birds.length; i++) {
    var bird = birds[i];
    fill(colors[i]);
    stroke(255);
    drawVertices(bird.vertices);
    }
  pop();

  for (var i=birds.length-1; i>0; i--) {
    if (isOffScreen(bird)) {
      removeFromWorld(bird);
      birds.splice(i,1);
    }
  }

}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  // create neste for loop of boxes into 3x6 array, size 80x80
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      var box = Bodies.rectangle(600+i*80, 100+j*80, 80, 80, 
        { isStatic: false} );
      // add box --> World; push box --> array [boxes[i]]
      World.add(engine.world, [box]); 
      boxes.push(box);
      colors.push(color(random(255),random(255),random(255)));
    }
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  // loop over array of boxes and execute drawVertices()
  for (var i=0; i < boxes.length; i++) {
    var box = boxes[i];
    fill(colors[i]);
    drawVertices(box.vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  //your code here
  // initialise global var slingShotBird as circle
  slingshotBird = Bodies.circle(200, 100, 20, 
                                  {friction: 0,
                                  restitution: 0.95});
  // mass of slingshotBird = 10x original mass
  Body.setMass(slingshotBird, slingshotBird.mass*10);

  // initialise global var slingshotConstraint as a constraint
  // with stiffness 0.01 and dampening 0.0001
  slingshotConstraint = Constraint.create({
    pointA: {x: 200, y: 200},
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001,
    length: 30
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  // use drawVertices and drawConstraint helper functions
  // draw slingshotbird and slingshotConstraint
  fill(255,165,0);
  stroke(0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}



