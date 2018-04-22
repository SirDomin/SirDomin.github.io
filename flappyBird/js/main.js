var total = 400;

var render = false;
var birds = [];
var savedBirds = [];
currSpeed = 2;
var pipes = [];
var counter = 0;
var cycles;
var bestOfGen;
var textToShow;
var generations = 0;
var birdImage;
var baseImage;
var pipeImage;
var backgroundImage;
var pipeTop;
var speedText = "Speed ++";
var btnImage;
function preload(){
    startBg = 0;
    startFloor = 0;
    btnImage =  loadImage('img/btn.png');
    pipeTop = loadImage('img/pipetop.png');
    birdImage = loadImage('img/yellowbird-downflap.png');
    baseImage = loadImage('img/base.png');
    pipeImage = loadImage('img/pipe-green.png');
    backgroundImage = loadImage('img/background-day.png');

}
function setup(){
    cycles = 1;
    textToShow = "LEARNING BOTS...";
    bestOfGen = 0;
    createCanvas(600,400);

    for(var i =0 ; i < total; i++){

        birds[i] = new Bird();
    }

    //pipes.push(new Pipe());
}
function draw(){

for(var c =0; c< cycles; c++) {
    if (counter % 160 == 0) {
        pipes.push(new Pipe());

    }

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].update();
        //if(pipes[i].hits(bird)){
        //    console.log("UH");
        //}
        for (var j = birds.length - 1; j >= 0; j--) {
            if (pipes[i].hits(birds[j]) || (birds[j].y == 0 || birds[j].y >= height-50 )) {
                savedBirds.push(birds.splice(j, 1)[0]);

            }

        }

        if (pipes[i].offScreen()) {
            pipes.splice(i, 1);
            //currSpeed += 0.1;
        }
    }
    if (birds.length == 0) {
        counter = 0;
        nextGeneration();
        pipes = [new Pipe()];
    }
    for (var i in birds) {

        birds[i].think(pipes);
        birds[i].update();
        if(birds[0].score > bestOfGen)bestOfGen = birds[0].score;
    }
    counter++;

}



    background(0);
    fill(255);
    //console.log("rotation")
    //image(pipeImage,0,0);
    if(startBg <= -backgroundImage.width){
        startBg = 0;
    }
    if(startFloor <= -backgroundImage.width){
        startFloor = 0;
    }

    renderBg(startBg -= currSpeed/4);




    for (var i in birds) {
        birds[i].show();
        birds[0].showInputs();
    }
    for (var i in pipes) {
        pipes[i].show();
    }
    renderFloor(startFloor -= currSpeed);
    fill(255);
    //rect(450,height-25,75,12)
    image(btnImage,445,height - 29,75,20)
    fill(0);
    text("Birds alive: "+birds.length, 20, height - 15);
    text("Generations: "+generations, 150, height - 15);
    text("Fitness: "+birds[0].score, 250, height - 15);

    text("Best score: "+bestOfGen, 350, height - 15);
    text(speedText, 450, height - 15);
    //document.getElementById("points").innerHTML = "Best Score: " + bestOfGen + "<br>";
}
renderBg = function(posX){
    for(var i =0; i<4; i++){
        image(backgroundImage,(posX)+backgroundImage.width * i,0)

    }

};
renderFloor = function(posX){
    for(var i =0; i< 3; i++){
        image(baseImage,(posX)+baseImage.width * i,height - 50)
    }
};
speedUp = function(){
    cycles = 20;
};
function mouseClicked(){
    if(mouseX > 450 && mouseX < 450 + 75 && mouseY > height - 25 && mouseY < height-13){
        if(cycles == 20){
            cycles = 1;
            speedText = "Speed ++";
            return true;
        }
        speedText = "Speed --";
        speedUp()
    }
}
