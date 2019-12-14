var mic
var vol = 0
var sensibility = 0.05;
let taps = 0;

// Tiempo entre taps
let timer = 0;
let last = 0;
let time_gap = 5;

let row = 0;
let col = 0;
let numCols = 30;

let radius;
let circs = [];

function preload() {
  radius = floor(windowWidth / numCols);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {  
  background("#ffafc4");
  var vol = mic.getLevel();  
  fill(127);
  stroke(0);
  if ((vol > sensibility)&&(timer > last+time_gap)) {
    soundEvent(vol);
    last = timer;
  }
  textSize(32);
  fill(10);
  text(taps, 10, 30);  

  for (var i=0; i< circs.length; i++) {
    var c = circs[i];
    c.draw();
  }

  timer ++;
}

function touchStarted() {
  getAudioContext().resume()
}

function soundEvent(l) {
  taps++;
  let x = (col+1)*radius-(radius/2);
  let y = row*radius+radius/2;
  let c = new Circ(x,y,radius);
  append(circs, c);

  col ++;
  if (col >= numCols) {
    col = 0;
    row ++;
  }
}

class Circ {

  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;  
  }

  draw() {
    fill(10);
    ellipse(this.x, this.y, this.radius);
    console.log(this.x, this.y, this.radius);
  }

}

