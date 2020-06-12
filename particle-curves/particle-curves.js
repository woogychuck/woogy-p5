let system;

const particleLifespan = 400;
const xSpreadMax = 10;
const ySpreadMax = 5;
const gravityStrength = 0.05;
const originPosition = {
  x:500,
  y:400
};
const colorThemes = ['jungle','water','fire','chaos'];
let currentTheme = 0;
let colorGenerator = new ColorRandomizer('jungle');

function setup() {
  createCanvas(1000, 800);
  noFill();
  system = new ParticleSystem(createVector(width / 2, 550));
}

function draw() {
  background(255);
  system.addParticle();
  system.run();
}

// A simple Particle class
let Particle = function(position) { 
  this.acceleration = createVector(0, gravityStrength);
  const xSpread = random(xSpreadMax*-1, xSpreadMax);
  const ySpread = random(ySpreadMax*-1, ySpreadMax);
  this.velocity = createVector(xSpread, ySpread);
  this.position = position.copy();
  this.lifespan = particleLifespan;
  
  //SET ANCHOR POINTS
  this.anchor1 = createVector(originPosition.x,originPosition.y);
  this.anchor2 = createVector(500,random(-1,1) > 0 ? 800 : 0);

  //SET CONTROL POINTS
  this.control1 = createVector(parseInt(random(300,700)),400);
  this.control2 = createVector(this.control1.x + parseInt(random(-100,100)), 400);

};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.control1.add(this.velocity);
  this.control2.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(colorGenerator.getColor((this.lifespan / particleLifespan)+.01));
  strokeWeight(1);
  bezier( 
    this.anchor1.x,  this.anchor1.y,
    this.control1.x,  this.control1.y,
    this.control2.x,  this.control2.y,
    this.anchor2.x,  this.anchor2.y
  );
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.emptyParticles = function(){
  this.particles = [];
  this.addParticle();
}

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

function mouseClicked(){
  system.emptyParticles();
  currentTheme++;
  if(currentTheme >= colorThemes.length){
    currentTheme = 0;
  }
  colorGenerator = new ColorRandomizer(colorThemes[currentTheme]);
}
