// main sketch file

let player;
let ball;
let monster1;

function setup() {
  createCanvas(800, 800);

  // drawObjects();
  // setupScene();
}

function draw() {
  background(0);

  // playerLogic();
}

function drawObjects() {
  player = new Sprite();

  player.width = 60;
  player.height = 60
  player.x = width/2;
  player.y = height/10;
  player.color = '#2a9d8f';
  player.collider = 'kinematic';

  ball = new Sprite();

  ball.diameter = 80;
  ball.x = width/2;
  ball.y = height/2;
  ball.color = '#DDA178';
  ball.collider = 'dynamic';
  ball.friction = 0;
  ball.bounciness = 0;
  ball.rotationLock = true;

  monster1 = new Sprite();

  monster1.width = 40;
  monster1.height = 40;
  monster1.x = width/4;
  monster1.y = height/2;
  monster1.color = 'red';
  monster1.collider = 'kinematic';
}

function setupScene() {

  // setup walls

}

function playerLogic() {
  // player follows mouse
  let posX = constrain(mouseX, 40, 760);
  player.moveTowards(posX, player.y, 0.25);

  // switch sides when SpaceBar is pressed
  if (kb.presses("space")) {
    if (player.y > height/2) player.y = height/10;
    else player.y = height*9/10;
  }
}
