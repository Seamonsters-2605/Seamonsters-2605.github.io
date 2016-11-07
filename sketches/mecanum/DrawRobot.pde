// DIMENSIONS
final float robotWidth = 192.0;
final float robotHeight = 192.0;
final float robotBaseHeightMargin = 66.0;
final float movementArrowLength = 40.0;
final float torqueArrowLength = 20.0;

void drawRobot(float x, float y, float rot, float[] wheelSpins, float[] velocities) {
  pushMatrix();
  translate(x, y);
  rotate(rot);
  
  // the robot base
  strokeWeight(3);
  fill(255, 255, 255);
  stroke(0);
  rectMode(CENTER);
  rect(0, 0, robotWidth, robotHeight + robotBaseHeightMargin*2);
  strokeWeight(1);
  rectMode(CORNER);
  
  // circle to show the front of the robot
  strokeWeight(3);
  fill(0);
  ellipse(0, -robotHeight/2 - robotBaseHeightMargin, 16, 16);
  
  driveTrain.drawWheels(wheelSpins, velocities);
  
  // FORCE ARROWS
  stroke(0, 255, 0);
  strokeWeight(7);
  
  //movement arrow
  PVector movement = driveTrain.getRobotTranslation(velocities);
  if(movement.mag() > .05) {
    float arrowEndX = movement.x * movementArrowLength;
    float arrowEndY = movement.y * movementArrowLength;
    // arrow line
    line(0, 0, arrowEndX, arrowEndY);
    // arrowhead
    movement.rotate(PI/4);
    line(arrowEndX, arrowEndY, arrowEndX - movement.x * 10, arrowEndY - movement.y * 10);
    movement.rotate(-PI/2);
    line(arrowEndX, arrowEndY, arrowEndX - movement.x * 10, arrowEndY - movement.y * 10);
  }
  
  //rotation arrow
  float rotation = driveTrain.getRobotRotation(velocities) * torqueArrowLength;
  if(abs(rotation) > .01) {
    float start = -PI/2;
    float end = -PI/2;
    float arrowEnd = 0.0;
    if(rotation > 0.0) {
      end += rotation;
      arrowEnd = end;
    }
    if(rotation < 0.0) {
      start += rotation;
      arrowEnd = start;
    }
    float arcWidth = (robotHeight + robotBaseHeightMargin) * 2;
    noFill();
    arc(0, 0, arcWidth, arcWidth, start, end);
    arc(0, 0, arcWidth, arcWidth, start + PI, end + PI);
    fill(255,255,255);
    
    // arrowhead
    PVector arrowStart = new PVector(arcWidth/2, 0.0);
    arrowStart.rotate(arrowEnd);
    PVector arrowEndOffset = new PVector(16.0, -16.0);
    arrowEndOffset.rotate(arrowEnd);
    if(rotation < 0.0) {
      arrowEndOffset.rotate(PI);
    }
    line(arrowStart.x, arrowStart.y, arrowStart.x + arrowEndOffset.x, arrowStart.y + arrowEndOffset.y);
    line(-arrowStart.x, -arrowStart.y, -arrowStart.x - arrowEndOffset.x, -arrowStart.y - arrowEndOffset.y);
    arrowEndOffset.rotate(-PI/2);
    line(arrowStart.x, arrowStart.y, arrowStart.x + arrowEndOffset.x, arrowStart.y + arrowEndOffset.y);
    line(-arrowStart.x, -arrowStart.y, -arrowStart.x - arrowEndOffset.x, -arrowStart.y - arrowEndOffset.y);
  }
  
  strokeWeight(1);
  stroke(0);
  
  popMatrix();
}