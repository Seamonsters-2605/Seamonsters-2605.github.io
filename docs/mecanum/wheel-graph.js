var wheelGraphSketch = function( p ) {

  var graphImage;
  
  p.setup = function() {
    var canvas = p.createCanvas(640, 400);
    canvas.parent('wheel-graph-sketch');
    
    graphImage = p.createGraphics(640, 400);
    for(var x = 0.0; x < graphImage.width; x++) {
      var xValue = x / graphImage.width * 2*p.PI;
      var yValue = p.sin(xValue - p.PI/4);
      
      var y = (graphImage.height / 2) - (yValue * graphImage.height / 2);
      p.point(x, y);
    }
  };
  
  p.mouseClicked = function() {
    
  };
  
  p.mouseDragged = function() {
    
  };
  
  p.draw = function() {
    p.image(graphImage, 0, 0);
    p.text("A graph will be here, eventually.", p.width/2, 8);
  };
  
  function drawArrow(startX, startY, endX, endY, arrowSize) {
    
  };
};

var wheelGraph = new p5(wheelGraphSketch);
