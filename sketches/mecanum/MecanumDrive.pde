// DIMENSIONS
final float mecanumWheelWidth = 36.0;
final float mecanumWheelHeight = 96.0;
final float mecanumRollerSpacing = 27.0;
final float mecanumWheelArrowLength = 80.0;

class MecanumDriveTrain implements DriveTrain {
  final float[] forward = {1.0, -1.0, 1.0, -1.0};
  final float[] right = {1.0, 1.0, -1.0, -1.0};
  final float[] turnRight = {1.0, 1.0, 1.0, 1.0};
  
  boolean omniWheel = false;
  float wheelRotation = 0.0;
  
  void omniWheelMode() {
    omniWheel = true;
  }
  
  void mecanumMode() {
    omniWheel = false;
  }
  
  String getDriveTrainName() {
    if(omniWheel)
      return "Omni-wheel Drive";
    else
      return "Mecanum Drive";
  }
  
  int numWheels() {
    // front left, front right, back left, back right
    return 4;
  }
  
  float[] forwardWheelSpins() {
    return forward;
  }
  
  float[] rightWheelSpins() {
    return right;
  }
  
  float[] turnRightWheelSpins() {
    return turnRight;
  }
  
  PVector getRobotTranslation(float[] velocities) {
    float forwardMovement = (velocities[0] + velocities[2] - velocities[1] - velocities[3]) / sqrt(2.0);
    float rightMovement = (velocities[0] + velocities[1] - velocities[2] - velocities[3]) / sqrt(2.0);
    PVector movement = new PVector(rightMovement, -forwardMovement);
    return movement;
  }
  
  float getRobotRotation(float[] velocities) {
    return (velocities[0] + velocities[2] + velocities[1] + velocities[3]) * .006;
  }
  
  void drawWheels(float[] wheelSpins, float[] velocities) {
    // front left
    pushMatrix();
    translate(-robotWidth / 2, -robotHeight / 2);
    scale(1, -1);
    drawWheel(-wheelSpins[0], -velocities[0]);
    popMatrix();
    
    // front right
    pushMatrix();
    translate(robotWidth / 2, -robotHeight / 2);
    drawWheel(-wheelSpins[1], -velocities[1]);
    popMatrix();
    
    // back left
    pushMatrix();
    translate(-robotWidth / 2, robotHeight / 2);
    drawWheel(wheelSpins[2], velocities[2]);
    popMatrix();
    
    // back right
    pushMatrix();
    translate(robotWidth / 2, robotHeight / 2);
    scale(1, -1);
    drawWheel(wheelSpins[3], velocities[3]);
    popMatrix();
  }
  
  void drawWheel(float wheelSpin, float wheelVelocity) {
    pushMatrix();
    rotate(wheelRotation);
    
    // make wheel spin positive
    if(wheelSpin < 0)
      wheelSpin += mecanumRollerSpacing * ceil(-wheelSpin/mecanumRollerSpacing);
      
    if(omniWheel) {
      drawOmniWheel(wheelSpin);
      wheelRotation += (-PI/4 - wheelRotation) / 10.0;
    } else {
      drawMecanumWheel(wheelSpin, wheelVelocity);
      wheelRotation += (-wheelRotation) / 10.0;
    }
    
    popMatrix();
  }
}


void drawMecanumWheel(float wheelSpin, float wheelVelocity) {
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(3);
  
  // force vector arrow outline
  stroke(191, 191, 191);
  line(-mecanumWheelArrowLength, -mecanumWheelArrowLength, mecanumWheelArrowLength, mecanumWheelArrowLength);
  
  // force vector arrow
  stroke(255, 0, 0);
  line(0, 0, -wheelVelocity * mecanumWheelArrowLength, -wheelVelocity * mecanumWheelArrowLength);
  float arrowOffset = wheelVelocity > 0 ? 16 : -16;
  line(-wheelVelocity * mecanumWheelArrowLength, -wheelVelocity * mecanumWheelArrowLength,
    -wheelVelocity * mecanumWheelArrowLength, -wheelVelocity * mecanumWheelArrowLength + arrowOffset);
  line(-wheelVelocity * mecanumWheelArrowLength, -wheelVelocity * mecanumWheelArrowLength,
    -wheelVelocity * mecanumWheelArrowLength + arrowOffset, -wheelVelocity * mecanumWheelArrowLength);
  stroke(0, 0, 0);
  
  // the wheel
  fill(127, 127, 127);
  rect(0, 0, mecanumWheelWidth, mecanumWheelHeight);
  
  // wheel roller lines
  // processing.js doesn't support clip(), which is why I have to have so much ugly code here
  //clip(0, 0, mecanumWheelWidth, mecanumWheelHeight);
  float diagY = -mecanumWheelHeight / 2 - (wheelSpin % mecanumRollerSpacing) + mecanumRollerSpacing;
  while(diagY < mecanumWheelHeight / 2 + mecanumWheelWidth) {
    float diagEndOffset = 0;
    if(diagY > mecanumWheelHeight / 2)
      diagEndOffset = diagY - mecanumWheelHeight / 2;
    float diagStartOffset = 0;
    if(diagY - mecanumWheelWidth < -mecanumWheelHeight / 2)
      diagStartOffset = diagY - mecanumWheelWidth + mecanumWheelHeight / 2;
    line(-mecanumWheelWidth / 2 + diagEndOffset, diagY - diagEndOffset, mecanumWheelWidth / 2 + diagStartOffset, diagY - mecanumWheelWidth - diagStartOffset);
    diagY += mecanumRollerSpacing;
  }
  
  //noClip();
  strokeWeight(1);
  rectMode(CORNER);
  imageMode(CORNER);
}

void drawOmniWheel(float wheelSpin) {
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(3);
  
  // the tank tread
  fill(127, 127, 127);
  rect(0, 0, mecanumWheelWidth, mecanumWheelHeight);
  
  // wheel lines
  //clip(0, 0, tankTreadWidth, tankTreadHeight);
  float lineY = -mecanumWheelHeight / 2 - (wheelSpin % mecanumRollerSpacing) + mecanumRollerSpacing;
  while(lineY < mecanumWheelHeight / 2) {
    line(-mecanumWheelWidth / 2, lineY, mecanumWheelWidth / 2, lineY);
    lineY += mecanumRollerSpacing;
  }
  
  //noClip();
  strokeWeight(1);
  rectMode(CORNER);
  imageMode(CORNER);
}