let system;

const particleLifespan = 400;
const spreadWidth = 2;
const gravityStrength = 0.1;

function setup() {
  createCanvas(1000, 800);
  system = new ParticleSystem(createVector(width / 2, 550));
}

function draw() {
  background(255);
  system.addParticle();
  system.run();
}

// A simple Particle class
let Particle = function(position) {
  this.red = parseInt(random(255));
  this.green = parseInt(random(255));
  this.blue = parseInt(random(255));  
  this.acceleration = createVector(0, gravityStrength);
  this.velocity = createVector(random(spreadWidth*-1, spreadWidth), random(-8, 2));
  this.position = position.copy();
  this.lifespan = particleLifespan;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(1);
  const particleColor = `rgba(${this.red}, ${this.green}, ${this.blue}, ${(this.lifespan/particleLifespan)})`;
  console.log(particleColor)
  fill(particleColor);
  ellipse(this.position.x, this.position.y, 12, 12);
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

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
