var wheelGraphSketch = function( p ) {

  var ellipseMargin;
  var ellipseSize;
  
  var robotWidth;
  var robotHeight;
  
  var mecanumWheelWidth;
  var mecanumWheelHeight;
  var mecanumRollerSpacing;

  var graphImage;
  var selectedValue;
  
  var wheel1Movement;
  var wheel2Movement;
  
  p.setup = function() {
    ellipseMargin = 32;
    ellipseSize = 350 - 2*ellipseMargin;
    robotWidth = 128;
    robotHeight = 128;
    mecanumWheelWidth = 36.0;
    mecanumWheelHeight = 96.0;
    mecanumRollerSpacing = 27.0;
    
    wheel1Movement = 0;
    wheel2Movement = 0;
    
    graphImage = p.createGraphics(640, 400);
    drawGraphImage();
    
    var canvas = p.createCanvas(ellipseSize + ellipseMargin*2 + graphImage.width, 400);
    canvas.parent('wheel-graph-sketch');
    
    
    selectedValue = 0;
    
    
  };
  
  function drawGraphImage() {
    // AXES
    graphImage.stroke(0);
    graphImage.strokeWeight(3);
    graphImage.line(0, graphImage.height/2,
                    graphImage.width, graphImage.height/2);
    
    // FUNCTIONS
    for(var x = 0.0; x < graphImage.width; x++) {
      var xValue = x / graphImage.width * 2*p.PI;
      var yValue1 = p.sin(xValue - p.PI/4);
      var yValue2 = p.sin(xValue + p.PI/4);
      
      var y1 = (graphImage.height / 2) - (yValue1 * graphImage.height / 3);
      var y2 = (graphImage.height / 2) - (yValue2 * graphImage.height / 3);
      
      if(x != 0) {
        graphImage.stroke(255, 0, 0);
        graphImage.line(x-1, prevY1, x, y1);
        graphImage.stroke(0, 0, 255);
        graphImage.line(x-1, prevY2, x, y2);
      }
      
      prevY1 = y1;
      prevY2 = y2;
    }
    
    // X AXIS LINES
    graphImage.textSize(16);
    graphImage.textAlign(p.CENTER, p.TOP);
    graphImage.strokeWeight(1);
    for(var xPiValue = 0.0; xPiValue < 2.0; xPiValue += 0.25) {
      var x = xPiValue * graphImage.width / 2.0;
      graphImage.stroke(0);
      graphImage.line(x, 0, x, graphImage.height);
      
      var num = xPiValue * 4;
      var denom = 4;
      if(num % 2 == 0) {
        num /= 2;
        denom /= 2;
        if(num % 2 == 0) {
          num /= 2;
          denom /= 2;
        }
      }
      if(num == 1)
        num = "";
      
      if(num !== 0) {
        graphImage.noStroke();
        graphImage.text(num + "pi/" + denom, x, graphImage.height/2 + 4);
      }
    }
  
    // LABELS
    graphImage.textAlign(p.RIGHT, p.BOTTOM);
    graphImage.textSize(18);
    graphImage.text("Wheel Angle",
                    graphImage.width - 4, graphImage.height / 2 - 4)
    
    graphImage.strokeWeight(0.5);
    graphImage.stroke(191, 0, 0);
    graphImage.fill(191, 0, 0);
    graphImage.textAlign(p.LEFT, p.TOP);
    graphImage.text("y = sin(x - 1/4 π)", graphImage.width - 256, 16);
    
    graphImage.stroke(0, 0, 191);
    graphImage.fill(0, 0, 191);
    graphImage.textAlign(p.LEFT, p.TOP);
    graphImage.text("y = sin(x + 1/4 π)", graphImage.width - 256, 48);
  }
  
  p.mouseClicked = function() {
    
  };
  
  p.mouseDragged = function() {
    if(p.mouseX < 0 || p.mouseY < 0
        || p.mouseX > p.width || p.mouseY > p.height)
      return;
    selectedValue += (p.mouseX - p.pmouseX) / graphImage.width * p.PI*2;
    if(selectedValue < 0)
      selectedValue = 0;
    if(selectedValue > p.PI*2)
      selectedValue = p.PI*2;
  };
  
  p.draw = function() {
    p.background(255,255,255);
    p.image(graphImage, p.width - graphImage.width, 0);
    
    p.stroke(0, 255, 0);
    p.strokeWeight(4);
    var lineX = p.width-graphImage.width
      + selectedValue / (p.PI*2) * graphImage.width;
    p.line(lineX, 0, lineX, p.height)
    
    
    var ellipseX = ellipseSize / 2 + ellipseMargin;
    var ellipseY = p.height/2;
    
    wheel1Movement += p.sin(selectedValue - p.PI/4) * 2;
    wheel2Movement += p.sin(selectedValue + p.PI/4) * 2;
    
    p.fill(96, 96, 192);
    p.push();
    p.translate(ellipseX + robotWidth/2, ellipseY + robotHeight/2);
    p.scale(1, -1);
    drawMecanumWheel(-wheel2Movement);
    p.pop();
    
    p.fill(192, 96, 96);
    p.push();
    p.translate(ellipseX - robotWidth/2, ellipseY + robotHeight/2);
    drawMecanumWheel(wheel1Movement);
    p.pop();
    
    p.push();
    p.translate(ellipseX + robotWidth/2, ellipseY - robotHeight/2);
    drawMecanumWheel(wheel1Movement);
    p.pop();
    
    p.fill(96, 96, 192);
    p.push();
    p.translate(ellipseX - robotWidth/2, ellipseY - robotHeight/2);
    p.scale(1, -1);
    drawMecanumWheel(-wheel2Movement);
    p.pop();
    
    p.stroke(0);
    p.noFill();
    p.ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);
    p.stroke(0, 255, 0);
    p.line(ellipseX, ellipseY,
           ellipseX + p.cos(selectedValue)*ellipseSize/2,
           ellipseY - p.sin(selectedValue)*ellipseSize/2);
    
    p.fill(0)
    p.noStroke();
    p.textSize(24);
    p.textAlign(p.CENTER, p.TOP);
    p.text("Click and Drag", p.width/2, 8);
  };
  
  function drawArrow(startX, startY, endX, endY, arrowSize) {
    
  };
  
  function drawMecanumWheel(wheelSpin) {
    if(wheelSpin < 0)
      wheelSpin += mecanumRollerSpacing * p.ceil(-wheelSpin/mecanumRollerSpacing);
    
    p.stroke(0);
    p.rectMode(p.CENTER);
    p.imageMode(p.CENTER);
    p.strokeWeight(3);
    
    p.rect(0, 0, mecanumWheelWidth, mecanumWheelHeight);
    
    var diagY = -mecanumWheelHeight / 2 - (wheelSpin % mecanumRollerSpacing) + mecanumRollerSpacing;
    while(diagY < mecanumWheelHeight / 2 + mecanumWheelWidth) {
      var diagEndOffset = 0;
      if(diagY > mecanumWheelHeight / 2)
        diagEndOffset = diagY - mecanumWheelHeight / 2;
      var diagStartOffset = 0;
      if(diagY - mecanumWheelWidth < -mecanumWheelHeight / 2)
        diagStartOffset = diagY - mecanumWheelWidth + mecanumWheelHeight / 2;
      p.line(-mecanumWheelWidth / 2 + diagEndOffset, diagY - diagEndOffset, mecanumWheelWidth / 2 + diagStartOffset, diagY - mecanumWheelWidth - diagStartOffset);
      diagY += mecanumRollerSpacing;
    }
    
    p.strokeWeight(1);
    p.rectMode(p.CORNER);
    p.imageMode(p.CORNER);
  };
};

var wheelGraph = new p5(wheelGraphSketch);
