var totalObjects = 20;
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
const G = 1; // filler

function preload() {
}

function setup() {
  createCanvas(1920, 1080);
  background(0,0,0);

  for (let a=0; a < totalObjects; a++){
    x[a] = random(width)
    y[a] = random(height)
    xVel[a] = random(-velocity, velocity);
    yVel[a] = random(-velocity, velocity);
    mass[a] = random(1, 20);
  }

}

function keyPressed() {
}


function draw() {
  // circle(mouseX, mouseY, 20)

  calculateForce();
  updatePositions();
  drawObjects()

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
  fill(255);
  for (let a = 0; a < totalObjects; a++) {
   if (mass[a] !== 0) {
     ellipse(x[a], y[a], 2 * Math.sqrt(mass[a]), 2 * Math.sqrt(mass[a]));
   }
  }
}

function updatePositions() {
  for (let a = 0; a < totalObjects; a++) {
    x[a] = x[a] + xVel[a];
    y[a] = y[a] + yVel[a];
  }
}


