var repos;
var arrows;

var startClick;

function setup() {
    pixelDensity(1);
    var canvas = createCanvas(768, 384);
    canvas.parent('github-sketch');
    
    repos = [ ]
    var seamonstersTemplate = addRepo("SeamonstersTemplate", 340, 20);
    var seamonstersDev = addRepo("SeamonstersDev", 600, 110);
    var competitionBot = addRepo("CompetitionBot2017", 370, 170);
    var person1 = addRepo("Person1/CompetitionBot2017", 360 - 210, 270);
    var person2 = addRepo("Person2/CompetitionBot2017", 360, 350);
    var person3 = addRepo("Person3/CompetitionBot2017", 360 + 210, 270);
    
    arrows = [ ]
    addArrow(seamonstersTemplate, seamonstersDev);
    addArrow(seamonstersTemplate, competitionBot);
    addArrow(competitionBot, person1);
    addArrow(competitionBot, person2);
    addArrow(competitionBot, person3);
}

function draw() {
    background(255,255,255);
    
    // draw arrows
    strokeWeight(4);
    stroke(0);
    for(var i = 0; i < arrows.length; i++) {
        var arrow = arrows[i];
        line(arrow.startX, arrow.startY, arrow.endX, arrow.endY);
    }
    
    // draw repos
    textAlign(CENTER, CENTER);
    textSize(20);
    for(var i = 0; i < repos.length; i++) {
        var repo = repos[i];
        var boxWidth = repo.width;
        var boxHeight = repo.height;
        stroke(0);
        fill(255,255,255);
        rect(repo.x - boxWidth/2, repo.y - boxHeight/2, boxWidth, boxHeight);
        noStroke();
        fill(0);
        text(repo.name, repo.x, repo.y);
        
        stroke(0);
        featureX = repo.x + boxWidth/2;
        for(var j = 0; j < repo.features.length; j++) {
            var featureColor = repo.features[j];
            fill(featureColor);
            rect(featureX, repo.y - boxHeight/2, 32, boxHeight);
            featureX += 32;
        }
    }
    
}

function mousePressed() {
    startClick = mouseCollision();
}

function mouseReleased() {
    var endClick = mouseCollision();
    if(startClick && endClick) {
        if(startClick == endClick) {
            endClick.features.push(randomFeatureColor());
        } else {
            console.log("merge!");
            for(var i = 0; i < startClick.features.length; i++) {
                var feature = startClick.features[i];
                if(endClick.features.indexOf(feature) == -1)
                    endClick.features.push(feature);
            }
        }
    }
}

function mouseCollision() {
    for(var i = 0; i < repos.length; i++) {
        var repo = repos[i];
        if(mouseX > repo.x - repo.width/2 && mouseX < repo.x + repo.width/2
         && mouseY > repo.y - repo.height/2 && mouseY < repo.y + repo.height/2){
            return repo;
        }
    }
}

function randomFeatureColor() {
    return color(randomColor(0, 255, 127, 0,
                             127, 255, 255, 5,
                             127, 255, 255, 5));
}


function addRepo(name, x, y) {
    textSize(20);
    var repo = {
        "name": name,
        "x": x,
        "y": y,
        "features": [ ],
        "width": textWidth(name) + 16,
        "height": textAscent() + textDescent() + 12
    };
    repos.push(repo);
    return repo;
}

function addArrow(repo1, repo2) {
    var arrow = {
        "startX": repo1.x,
        "startY": repo1.y,
        "endX": repo2.x,
        "endY": repo2.y
    }
    arrows.push(arrow);
}
