var originX;
var originY;
var pointX;
var pointY;

function setup() {
  var canvas = createCanvas(640, 400);
  originX = 320;
  originY = 240;
  pointX = originX + 192;
  pointY = originY - 96;
  canvas.parent('magnitude-direction-sketch');
}

function mouseClicked() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    pointX = mouseX;
    pointY = mouseY;
  }
}

function mouseDragged() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    pointX = mouseX;
    pointY = mouseY;
  }
}

function draw() {
  background(255);
  strokeWeight(4);
  textSize(16);
  
  stroke(240, 96, 31);
  fill(240, 96, 31);
  drawArrow(originX, originY, pointX, originY, 8);
  noStroke();
  textAlign(CENTER, TOP);
  text("X", (originX+pointX)/2, originY + 8);
  
  stroke(63, 63, 255);
  fill(63, 63, 255);
  drawArrow(pointX, originY, pointX, pointY, 8);
  noStroke();
  textAlign(LEFT, CENTER);
  text("Y", pointX + 8, (originY + pointY) / 2);
  
  stroke(63, 191, 63);
  fill(63, 191, 63);
  drawArrow(originX, originY, pointX, pointY, 12);
  noStroke();
  textAlign(CENTER, BOTTOM);
  push();
  translate(originX, originY);
  rotate(atan2(pointY - originY, pointX - originX));
  text("magnitude", sqrt( sq(pointX - originX) + sq(pointY - originY) )/2, -8);
  pop();
  
  stroke(0, 0, 0);
  noFill();
  arc(originX, originY, 96, 96, atan2(pointY-originY, pointX-originX), 2*PI);
  noStroke();
  fill(0, 0, 0);
  textAlign(LEFT, BOTTOM);
  text("direction", originX + 56, originY - 8);
  
  textAlign(CENTER, TOP);
  text("(click and drag!)", width/2, 8);
}

function drawArrow(startX, startY, endX, endY, arrowSize) {
  line(startX, startY, endX, endY);
  var len = sqrt( sq(startX-endX) + sq(startY-endY) );
  vectorX = (endX - startX) / len * arrowSize;
  vectorY = (endY - startY) / len * arrowSize;
  line(endX, endY, endX-vectorX-vectorY, endY-vectorY+vectorX);
  line(endX, endY, endX-vectorX+vectorY, endY-vectorY-vectorX);
}