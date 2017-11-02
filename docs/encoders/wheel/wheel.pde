PImage wheel;
float rotation;
float mouseStartGrab, mouseStartRotation;

void setup() {
  size(500,500);
  wheel = loadImage("record-2.png");
}

void draw() {
  background(255,255,255);
  pushMatrix();
  translate(width/2,height/2);
  rotate(rotation);
  drawWheel();
  popMatrix();
  
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(36);
  text(int(degrees(rotation) / 360 * 400), width/2, 0);
}

void mousePressed() {
  mouseStartRotation = rotation;
  mouseStartGrab = getMouseAngle();
}

void mouseDragged() {
  float prevRotation = rotation;
  rotation = mouseStartRotation + (getMouseAngle() - mouseStartGrab);
  while(rotation - prevRotation > PI)
    rotation -= PI*2;
  while(rotation - prevRotation < -PI)
    rotation += PI*2;
}

void drawWheel() {
  imageMode(CENTER);
  //println((mouseX - width/2) + ", " + (mouseY - height/2) + ";;");
  image(wheel, 0, 0, 400, 400);
  /*stroke(255,0,0);
  strokeWeight(5);
  noFill();
  ellipse(0, 0, 400, 400);
  point(0,0);*/
}

float getMouseAngle() {
  float y = mouseY - (width/2-1);
  float x = mouseX - (height/2+4);
  return atan2(y, x);
}