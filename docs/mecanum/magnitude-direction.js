var magnitudeDirectionSketch = function( p ) {
  var originX;
  var originY;
  var pointX;
  var pointY;
  
  p.setup = function() {
    var canvas = p.createCanvas(640, 400);
    originX = 320;
    originY = 240;
    pointX = originX + 192;
    pointY = originY - 96;
    canvas.parent('magnitude-direction-sketch');
  };
  
  p.mouseClicked = function() {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      pointX = p.mouseX;
      pointY = p.mouseY;
    }
  };
  
  p.mouseDragged = function() {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      pointX = p.mouseX;
      pointY = p.mouseY;
    }
  };
  
  p.draw = function() {
    p.background(255);
    p.strokeWeight(4);
    p.textSize(16);
    
    p.stroke(240, 96, 31);
    p.fill(240, 96, 31);
    drawArrow(originX, originY, pointX, originY, 8);
    p.noStroke();
    p.textAlign(p.CENTER, p.TOP);
    p.text("X", (originX+pointX)/2, originY + 8);
    
    p.stroke(63, 63, 255);
    p.fill(63, 63, 255);
    drawArrow(pointX, originY, pointX, pointY, 8);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Y", pointX + 8, (originY + pointY) / 2);
    
    p.stroke(63, 191, 63);
    p.fill(63, 191, 63);
    drawArrow(originX, originY, pointX, pointY, 12);
    p.noStroke();
    p.textAlign(p.CENTER, p.BOTTOM);
    p.push();
    p.translate(originX, originY);
    p.rotate(p.atan2(pointY - originY, pointX - originX));
    p.text("magnitude", p.sqrt( p.sq(pointX - originX) + p.sq(pointY - originY) )/2, -8);
    p.pop();
    
    p.stroke(0, 0, 0);
    p.noFill();
    p.arc(originX, originY, 96, 96, p.atan2(pointY-originY, pointX-originX), 2*p.PI);
    p.noStroke();
    p.fill(0, 0, 0);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.text("direction", originX + 56, originY - 8);
    
    p.textAlign(p.CENTER, p.TOP);
    p.text("(click and drag!)", p.width/2, 8);
  };
  
  function drawArrow(startX, startY, endX, endY, arrowSize) {
    p.line(startX, startY, endX, endY);
    var len = p.sqrt( p.sq(startX-endX) + p.sq(startY-endY) );
    var vectorX = (endX - startX) / len * arrowSize;
    var vectorY = (endY - startY) / len * arrowSize;
    p.line(endX, endY, endX-vectorX-vectorY, endY-vectorY+vectorX);
    p.line(endX, endY, endX-vectorX+vectorY, endY-vectorY-vectorX);
  };
};

var magnitudeDirection = new p5(magnitudeDirectionSketch);
