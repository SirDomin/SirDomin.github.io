var dots = [];
var totalDots = 20;
var avgDistance = 0;
var population = [];
fitness = [];
var populations = 0;
var currentShortest = Infinity;
var displayBest;
var displayBestCurr;
popmax = 500;
var mutationRate = 0.01;
var currentBestPath;
var order;
var shortestDistance;
var bestPath;
var recordDistance = Infinity;
function setup(){
    createCanvas(1200,600);

    displayBest = document.getElementById("best");
    displayBestCurr = document.getElementById("bestCurr");
    //displayAvg = document.getElementById("avg");
    order = [];
    for(var i = 0; i < totalDots; i++){
        var v = createVector(random(width),random(height/3));
        dots[i] = v;
        order[i] = i;
    }
    for(var i = 0; i < popmax; i++){
        population[i] = shuffle(order);

    }
    var d = calcDistance(dots,order);
    shortestDistance = d;
    bestPath = dots.slice();
}
function draw(){
    background(0);

    //genetic alg

    calcFitness();
    normalizeFitness();
    nextGeneration();
    textSize(32);
    fill(150, 171, 176);
    stroke(150, 171, 176);
    text("Best of current generation \\/",10,height/2);
    text("Best ever /\\ ",width/2,height/2);
    noFill();
    for(var i = 0; i < dots.length; i++){
        ellipse(dots[i].x,dots[i].y,8,8);
    }

    stroke(125,255,0);
    strokeWeight(2);
    noFill();
    beginShape();
    for(var i = 0; i < bestPath.length; i++){
        vertex(dots[bestPath[i]].x,dots[bestPath[i]].y);
    }
    endShape();

    translate(0,height/1.5);
    noFill();
    stroke(150, 171, 176);
    for(var i = 0; i < dots.length; i++){
        ellipse(dots[i].x,dots[i].y,8,8);
    }
    strokeWeight(2);
    noFill();
    stroke(0, 204, 255);
    beginShape();
    for(var i = 0; i < currentBestPath.length; i++){
        vertex(dots[currentBestPath[i]].x,dots[currentBestPath[i]].y);
    }
    endShape();

    displayBest.innerHTML="Shortest distance: "+floor(recordDistance);
    displayBestCurr.innerHTML="Shortest distance in current generation: "+floor(currentShortest);
    //displayAvg.innerHTML="Average distance: "+avgDistance;
}




function swap(a, i, j){

    a[j] = [a[i], a[i] = a[j]][0];
    return a;
}
function calcDistance(a,order){
    var sum = 0;

        for (var i = 0; i < order.length - 1; i++) {
            var pointAIndex = order[i];
            var pointA = a[pointAIndex];
            var pointBIndex = order[i + 1];
            var pointB = a[pointBIndex];
            var d = dist(pointA.x, pointA.y, pointB.x, pointB.y);
            sum += d;
        }
    return sum;
}
