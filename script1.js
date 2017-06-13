var rockets = [];
var particles = [];

function setup(){
  createCanvas(800,600)
  colorMode(HSB)
}

function draw(){
  background(0)
  for (let i = 0 ; i < rockets.length ; i++ ){
    let rocket = rockets[i];
    if (rocket.lifespan > 0){
      rocket.update();
      rocket.show();
    }
    if (rocket.lifespan <= 0){
      for (let j = 0 ; j < 49 ; j++){
        particles.push(new Particle(rocket.pos.x, rocket.pos.y, rocket.color))
      }
      rockets.splice(i, 1)
    }
  }
  if (particles.length >= 1){
    for (let i = 0 ; i < particles.length ; i++){
      particle = particles[i];
      particle.update();
      // filter(BLUR,3)
      particle.show();
      if (particle.lifespan <= 0){
        particles.splice(i, 1)
      }
    }
  }
}

setInterval(function(){
  rockets.push(new Rocket())
}, 500)

function Rocket(){
  this.pos = createVector(random(width), height);
  this.vel = createVector(0,-15);
  this.acc = createVector(0,-0.25);
  this.color = random(360);
  this.lifespan = random(20,30)
}

Rocket.prototype.update = function(){
  // let steer = createVector(mouseX, mouseY).sub(this.pos).sub(this.vel)
  // steer.setMag(1)
  // this.vel.add(this.acc);
  // this.vel.add(steer)
  // this.vel.limit(10)
  // this.pos.add(this.vel)
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.lifespan--;
}

Rocket.prototype.show = function(){
  stroke(this.color,100,100);
  strokeWeight(2);
  noFill();
  line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 20);
}

function Particle(x,y, color){
  this.pos = createVector(x,y);
  this.vel = createVector(random(-3,3), random(-10, 0));
  this.grav = createVector(0,0.25);
  this.lifespan = 50;
  this.color = color
}

Particle.prototype.update = function(){
  this.vel.add(this.grav);
  this.pos.add(this.vel);
  this.lifespan--;
}

Particle.prototype.show = function(){
  let size = map(this.lifespan,0,50,0,15);
  fill(this.color,100,100);
  noStroke();
  ellipse(this.pos.x, this.pos.y, size);
  fill(this.color,100,100, 0.8);
  ellipse(this.pos.x, this.pos.y, size*1.5);
  fill(this.color,100,100, 0.6);
  ellipse(this.pos.x, this.pos.y, size*2);
  fill(this.color,100,100, 0.4);
  ellipse(this.pos.x, this.pos.y, size*2.5);
  fill(this.color,100,100, 0.2);
  ellipse(this.pos.x, this.pos.y, size*3);
}
