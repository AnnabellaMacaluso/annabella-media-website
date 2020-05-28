var start = false;
var initiate = 0;
var totalObjects = 100;
var width = 1920;
var height = 1080;
var velocity = 1.5;
var x = new Array(totalObjects);
var y = new Array(totalObjects);
var xVel = new Array(totalObjects);
var yVel = new Array(totalObjects);
var xAcc = new Array(totalObjects);
var yAcc = new Array(totalObjects);
var mass = new Array(totalObjects);
var dx;
var dy;
var dist;
var force;
var xForce;
var yForce;
let history = false;
const G = 3; // filler

function setup() {
  createCanvas(1920, 1080);
  background(0,0,0);

  for (let a=0; a < totalObjects; a++){
    x[a] = random(width);
    y[a] = random(height);
    xVel[a] = random(-velocity, velocity);
    yVel[a] = random(-velocity, velocity);
    mass[a] = random(1, 10);
  }

}

function mousePressed() {
  let mX = mouseX;
  let mY = mouseY;
  let b = false;

  for(let a = 0; a < totalObjects; a++) {
    if(mass[a] === 0 && !b) {
      x[a] = mX;
      y[a] = mY;
      xVel[a] = random(-velocity, velocity);
      yVel[a] = random(-velocity, velocity);
      mass[a] = random(1, 10);
      b = true;
    }
  }

  if(!b){
    x.push(mX);
    y.push(mY);
    xVel.push(random(-velocity, velocity));
    yVel.push(random(-velocity, velocity));
    mass.push(random(1, 10));
  }
}

function draw() {
  if(mouseIsPressed && initiate === 0){
    start = true;
    background(0);
    initiate ++;
  }
  if(!start){
    drawObjects();
  }

  if(initiate > 0){
    calculateForce();
    updatePositions();
    collisionDetection();
    drawObjects();
  }
}

function calculateForce() {
  for (let a = 0; a < totalObjects; a++){
    xAcc[a] = 0;
    yAcc[a] = 0;
    for (var b = 0; b < totalObjects; b++) {
      if(a !== b && mass[a] !== 0) { // not same object and no mass of zero which may cause 0/0 error
        dx = x[b] - x[a];
        dy = y[b] - y[a];
        dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        force = (G * mass[a] * mass[b]) / Math.pow(dist, 2);
        xForce = force * dx / dist;
        yForce = force * dy / dist;
        xAcc[a] = xAcc[a] + (xForce / mass[a]);
        yAcc[a] = yAcc[a] + (yForce / mass[a]);
      }
    }
    xVel[a] = xVel[a] + xAcc[a];
    yVel[a] = yVel[a] + yAcc[a];

  }
}

function drawObjects() {

  background(0);
  if(history){
    // fill(squareColor);
    noStroke();
    square(30, 20, 25);
  } else {
    // fill(squareColor);
    noStroke();
    square(30, 20, 25);
  }

  background(0);
  fill(255);
  for (let a = 0; a < totalObjects; a++) {
   if (mass[a] !== 0) {
     ellipse(x[a], y[a], 2 * Math.sqrt(mass[a]), 2 * Math.sqrt(mass[a]));
   }
  }
}

function updatePositions() {
  for (let a = 0; a < totalObjects; a++) {
    if(x[a] <= 5 || x[a] >= 1915) {
      xVel[a] *= -1;
      xAcc[a] *= -1;
      xForce[a] *= -1;
    } else if (y[a] <= 5 || y[a] >= 1075){
      yVel[a] *= -1;
      yAcc[a] *= -1;
      yForce[a] *= -1;
    }
  }
  for (let a = 0; a < totalObjects; a++) {
    x[a] = x[a] + xVel[a];
    y[a] = y[a] + yVel[a];
  }
}

function collisionDetection() {
  for (let a = 0; a < totalObjects; a++) {
    for (let b = 0; b < totalObjects; b++) {
      if(a !== b && mass[a] !== 0) {
        dx = x[b] - x[a];
        dy = y[b] - y[a];
        dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (dist <= Math.sqrt(mass[a]) + Math.sqrt(mass[b])) {
          xVel[a] = ((mass[a] * xVel[a]) + (mass[b] * xVel[b])) / (mass[a] + mass[b]);
          yVel[a] = ((mass[a] * yVel[a]) + (mass[b] * yVel[b])) / (mass[a] + mass[b]);
          mass[a] += mass[b];
          x[a] = ((mass[a] * x[a]) + (mass[b] * x[b])) / (mass[a] + mass[b]);
          y[a] = ((mass[a] * y[a]) + (mass[b] * y[b])) / (mass[a] + mass[b]);
          mass[b] = 0;
        }
      }
    }
  }
}




