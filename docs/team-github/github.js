var repos;
var arrows;

function setup() {
    pixelDensity(1);
    var canvas = createCanvas(768, 384);
    canvas.parent('github-sketch');
    
    repos = [ ]
    var seamonstersTemplate = addRepo("SeamonstersTemplate", 340, 20);
    var seamonstersDev = addRepo("SeamonstersDev", 600, 110);
    var competitionBot = addRepo("CompetitionBot2017", 370, 170);
    var person1 = addRepo("Person1/CompetitionBot2017", 370 - 210, 270);
    var person2 = addRepo("Person2/CompetitionBot2017", 370, 350);
    var person3 = addRepo("Person3/CompetitionBot2017", 370 + 210, 270);
    
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
        var boxWidth = textWidth(repo.name) + 16;
        var boxHeight = textAscent() + textDescent() + 12;
        stroke(0);
        fill(255,255,255);
        rect(repo.x - boxWidth/2, repo.y - boxHeight/2, boxWidth, boxHeight);
        noStroke();
        fill(0);
        text(repo.name, repo.x, repo.y);
    }
    
    
}

function addRepo(name, x, y) {
    var repo = {
        "name": name,
        "x": x,
        "y": y,
        "features": [ ]
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
