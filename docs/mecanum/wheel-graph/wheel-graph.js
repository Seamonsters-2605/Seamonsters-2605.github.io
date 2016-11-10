var wheelGraphSketch = function( p ) {
  
  p.setup = function() {
    var canvas = p.createCanvas(640, 400);
    canvas.parent('wheel-graph-sketch');
  };
  
  p.mouseClicked = function() {
    
  };
  
  p.mouseDragged = function() {
    
  };
  
  p.draw = function() {
    p.text("A graph will be here, eventually.", p.width/2, 8);
  };
  
  function drawArrow(startX, startY, endX, endY, arrowSize) {
    
  };
};

var wheelGraph = new p5(wheelGraphSketch);
