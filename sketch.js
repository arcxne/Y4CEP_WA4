// main sketch file

let player1, player2;
let base_speeds = [7, 7];
let scores = [0, 0];
let ball;
let balls = [];
let wall_top, wall_bottom;

let startingSpeed = 7;

let mutation3trigger = true;

function setup() {
  new Canvas(800, 400);

  noStroke();

  drawObjects();

  ball.direction = 150;
  ball.speed = 22;
}

function draw() {
  background(0);

  game_screen();
}

function game_screen() {
  if (player1 == null) {
    drawObjects();
  }

  playerLogic();
  ballLogic();
  mutation1();
  mutation2();
  if (mutation3trigger) mutation3();

  fill(255);
  textSize(45);
  text(scores[0], width/4, height/8);
  text(scores[1], width*3/4, height/8);
}

function drawObjects() {
  player1 = new Sprite();

  player1.width = 15;
  player1.height = 90
  player1.x = 30;
  player1.y = height/2;
  player1.color = '#FFFFFF';
  player1.collider = 'kinematic';

  player2 = new Sprite();

  player2.width = 15;
  player2.height = 90;
  player2.x = width-30;
  player2.y = height/2;
  player2.color = '#FFFFFF';
  player2.collider = 'kinematic';

  ball = new Sprite();

  ball.diameter = 30;
  ball.x = width/4;
  ball.y = height/4+10;
  ball.color = '#FFFFFF';
  ball.collider = 'dynamic';
  ball.friction = 0;
  ball.drag = 0;
  ball.bounciness = 1;
//  ball.rotationLock = true;

  wall_top = new Sprite();

  wall_top.width = width*2;
  wall_top.height = 10;
  wall_top.x = width/2;
  wall_top.y = -5;
  wall_top.collider = 'k';
  wall_top.friction = 0;

  wall_bottom = new Sprite();

  wall_bottom.width = width*2;
  wall_bottom.height = 10;
  wall_bottom.x = width/2;
  wall_bottom.y = height+5;
  wall_bottom.collider = 'k';
  wall_bottom.friction = 0;
}

function playerLogic() {
  if (kb.pressing('w')) {
    player1.vel.y = -base_speeds[0];
  } else if (kb.pressing('s')) {
    player1.vel.y = base_speeds[0];
  } else {
    player1.vel.y = 0;
  }


  if (kb.pressing('arrow_up')) {
    player2.vel.y = -base_speeds[1];
  } else if (kb.pressing('arrow_down')) {
    player2.vel.y = base_speeds[1];
  } else {
    player2.vel.y = 0;
  }
}

function ballLogic() {
  if (ball.x < -150 || ball.x > width+150) {
    if (ball.x < width/2) scores[1]++;
    else scores[0]++;
    ball.x = width/2;
    ball.speed = (ball.speed > startingSpeed)? startingSpeed : ball.speed;
  }

  if (ball.direction > 80 && ball.direction < 110) {
    if (110-ball.direction > 20) {
      ball.direction -= 110-ball.direction;
    } else {
      ball.direction += ball.direction-80;
    }
  }
}

function mutation1() {
  // goofy spin

  base_speeds[0] = 9;
  base_speeds[1] = 9;

  player1.rotateTo(player1.vel.y*5, (player1.vel.y == 0)? base_speeds[0] : player1.vel.y/3);
  player2.rotateTo(player2.vel.y*5, (player2.vel.y == 0)? -base_speeds[1] : player2.vel.y/3);
}

function mutation2() {
  // balls speed up whenever mov keys are pressed

  if (
    kb.presses('w') ||
    kb.presses('s') ||
    kb.presses('arrow_up') ||
    kb.presses('arrow+down')
  ) {
    ball.speed *= 1.05;
  }
}

function mutation3() {
  // multiple balls
  
  for (let i=0; i<4; i++) {
    let bally = new Sprite();

    bally.diameter = 30;
    bally.x = width/4;
    bally.y = height/4+10*i+20;
    bally.color = '#FFFFFF';
    bally.collider = 'dynamic';
    bally.friction = 0;
    bally.drag = 0;
    bally.bounciness = 1;
    
    balls.push(bally);
  }

  balls.push(ball);

  startingSpeed = 5;

  mutation3trigger = false;
}

function mutation4() {
  // balls are tiny
}
