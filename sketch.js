//variables
var x = 700;
var y = 365;
var mic;
var mySong;
var r = 20;
var g = 80;
var b = 200;
var fairy;

function preload() {
  mySong = loadSound("./assets/audio.mp3");
  fairy = loadImage("./assets/fairy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //create and start the mic
  mic = new p5.AudioIn();
  mic.start();

  //setup analyzer and music
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong)

  //song plays from the beginning
  mySong.loop();
  mySong.setVolume(0.02);



}

function draw() {

  //constraints to make the pixie don't fly out of the canvas
  var xConstrain = map(x, 0, width, 0, width, true);
  var yConstrain = map(y, 0, height, 0, height, true);

  //variables mapped for the background
  var r = map(x, 0, width, 80, 100, true);
  var g = map(x, 0, width, 100, 75, true);
  var b = map(x, 0, width, 100, 80, true);

  //fill of the pixie that changes with x position
  var fil = 255;
  var fil = map(x, 0, width, 255, 0, true);

  background(r, g, b + random(8));

  //movement of the pixie
  if (keyIsDown(LEFT_ARROW)) {
    x += 5 * noise(1000) * random(6);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x -= 5 * noise(1000) * random(6);
  }
  if (keyIsDown(UP_ARROW)) {
    y += 5 * noise(1000) * random(6);
  }
  if (keyIsDown(DOWN_ARROW)) {
    y -= 5 * noise(1000) * random(6);
  }

  //draw the pixie and change its dimension according to the volume recorded by the mic
  var vol = mic.getLevel();
  stroke(0, 50);
  strokeWeight(0.2);
  fill(fil, 80);
  ellipse(xConstrain, yConstrain, 105 + vol * 600 + random(5));
  ellipse(xConstrain, yConstrain, 50 + vol * 700 + random(5));
  push();
  fill(255, 90);
  ellipse(xConstrain, yConstrain, 15 + vol * 100 + random(5));
  pop();
  imageMode(CENTER);
  image(fairy, xConstrain, yConstrain + 3, 20 + vol * 100 + random(25), 20 + vol * 100 + random(1));

  //text instructions
  if (vol > 0.1) {
    textAlign(CENTER, CENTER);
    textSize(60 + vol * 10);
    textFont('Playfair');
    textStyle(ITALIC);
    text("please stop, IT HURTS!", width / 2, height / 2 + 50);
  } else {
    textAlign(CENTER, CENTER);
    textSize(30 + vol * 10);
    textFont('Playfair');
    textStyle(ITALIC);
    text("you can whisper, but pixies don't like loud sounds", width / 2, height / 2 + 50);
    text("they can't even fly straight...", width / 2, height / 2 + 90);
    textSize(20 + vol * 10);
    text("try it yourself with arrow keys", width / 2, height / 2 + 125);
  }

}
