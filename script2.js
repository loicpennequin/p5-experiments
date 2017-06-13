var img;
var brushes = [];

function preload(){
  img = loadImage('johnlocke.jpg')
}

function setup(){
  createCanvas(800,600);
  imageMode(CENTER);
  translate(width/2, height/2);
  background(0);
  img.loadPixels();
  for (let i = 0 ; i < 3 ; i++){
    brushes.push(new Brush(random(width), random(height)))
  }
}

function draw(){
  for (let i = 0 ; i < brushes.length ; i++){
    brush = brushes[i];
    brush.update();
    brush.show();
  }

  // var pixel = img.get(mouseX,mouseY)
  // fill(pixel)
  // noStroke()
  // ellipse(mouseX, mouseY, 10)
}

function Brush(x,y){
  this.pos = createVector(x,y);
  this.vel = createVector(0,-15);
  // this.target = createVector(random(width), random(height))
}

Brush.prototype.update = function(){
  // if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 30){
  //   this.target = createVector(random(width), random(height))
  //
  // }
  // let desire = createVector(this.target.x, this.target.y)
  let desire = createVector(mouseX, mouseY)
  let steer = desire.sub(this.pos).sub(this.vel)
  steer.setMag(0.2)
  this.vel.add(steer)
  this.vel.limit(6)
  this.pos.add(this.vel)
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.lifespan--;
}

Brush.prototype.show = function(){
  var pixel = img.get(this.pos.x, this.pos.y)
  fill(pixel)
  noStroke()
  ellipse(this.pos.x, this.pos.y, 15)
}
