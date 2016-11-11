var wheelGraphSketch = function( p ) {

  var graphImage;
  
  p.setup = function() {
    var canvas = p.createCanvas(640, 400);
    canvas.parent('wheel-graph-sketch');
    
    graphImage = p.createGraphics(640, 400);
    
    p.strokeWeight(6);
    
    for(var x = 0.0; x < graphImage.width; x++) {
      var xValue = x / graphImage.width * 2*p.PI;
      var yValue1 = p.sin(xValue - p.PI/4);
      var yValue2 = p.sin(xValue + p.PI/4);
      
      var y1 = (graphImage.height / 2) - (yValue1 * graphImage.height / 3);
      var y2 = (graphImage.height / 2) - (yValue2 * graphImage.height / 3);
      
      if(x != 0) {
          p.stroke(255, 0, 0);
          p.line(x-1, prevY1, x, y1);
          p.stroke(0, 0, 255);
          p.line(x-1, prevY2, x, y2);
      }
      
      prevY1 = y1;
      prevY2 = y2;
    }
    
    p.strokeWeight(1);
    p.stroke(0);
  };
  
  p.mouseClicked = function() {
    
  };
  
  p.mouseDragged = function() {
    
  };
  
  p.draw = function() {
    p.image(graphImage, 0, 0);
    p.noStroke();
    p.text("A graph will be here, eventually.", p.width/2, 8);
  };
  
  function drawArrow(startX, startY, endX, endY, arrowSize) {
    
  };
};

var wheelGraph = new p5(wheelGraphSketch);
