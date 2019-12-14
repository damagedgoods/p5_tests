var mic
var vol = 0
var sensibility = 0.05;
let taps = 0;

// Tiempo entre taps
let timer = 0;
let last = 0;
let time_gap = 5;

let letras = [];
let size = 120;
let texto = " Azzurro, il pomeriggio è troppo azzurro e lungo per me. Mi accorgo di non avere più risorse senza di te, e allora io quasi quasi prendo il treno e vengo, vengo da te, ma il treno dei desideri nei miei pensieri all’incontrario va."
let currentX = 0;
let currentY = size;

function preload() {  
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
  textSize(size);
  fill(10);
  //text(taps, 10, 30);
  timer ++;

  for (var i=0; i<letras.length; i++) {
    let l = letras[i];
    l.draw()
  }

}

function touchStarted() {
  getAudioContext().resume()
}

function soundEvent(l) {
  taps++;
  let x = currentX;
  let y = currentY;
  let c = texto[taps]; 
  
  let newLetra = new Letra(x,y,c);
  append(letras, newLetra);
  currentX += textWidth(texto[taps]);
  if (currentX > windowWidth) {
    currentX = 0;
    currentY += textLeading()*0.7;
  }

  if (c == ' ') {
    soundEvent(l); // Si era un espacio, repito
  }  
}


class Letra {

  constructor(x, y, letra) {
    this.x = x;
    this.y = y;
    this.letra = letra;  
  }

  draw() {
    fill(10);
    text(this.letra, this.x, this.y);
  }

}
