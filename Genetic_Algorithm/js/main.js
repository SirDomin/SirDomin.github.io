var target;
var popmax;
var mutationRate;
var population;
var bestPhrase;
x = 1;
var lastValue = 0;
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function setup() {
    createCanvas();
    bestPhrase = document.getElementsByClassName("best")[0];
    target = "Genetic algorithm";
    popmax = 100;
    mutationRate = 0.01;

    document.getElementsByClassName("target")[0].innerHTML = target;
    population = new Population(target, mutationRate, popmax);
    draw();

}
function draw(){
    population.calcFitness();
    population.naturalSelection();
    population.generate();
    displayInfo();

}
function createCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 200;

    prepareChart();
}

function prepareChart(){
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillText("average fitness",1,10);
    ctx.fillText("Generations",canvas.width-70,canvas.height -10);
    ctx.fillStyle = "black";
    ctx.lineWidth = 0.5;
    for(var i =0; i < 20; i++){
        ctx.beginPath();
        ctx.moveTo((i)*25,0);
        ctx.lineTo((i)*25,canvas.height);
        ctx.fillText((i)*50,i*25,canvas.height);
        ctx.stroke();
    }
    for(var i =0;i<10;i++){
        ctx.beginPath();
        ctx.moveTo(0,canvas.height - i*(canvas.height/10));
        ctx.lineTo(canvas.width,canvas.height - i*(canvas.height/10));
        ctx.fillText(i/10,0,canvas.height - i*(canvas.height/10));
        ctx.stroke();
    }
}
function updateChart(){
    x+=0.5;
    //ctx.fillRect(x,canvas.height - (canvas.height * population.avgFitness),2,2);

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.moveTo(x,canvas.height - (canvas.height * lastValue));
    ctx.lineTo(x,canvas.height - (canvas.height * population.avgFitness));
    ctx.moveTo(x,canvas.height - (canvas.height * population.avgFitness));
    ctx.stroke();
    lastValue = population.avgFitness;
}

function displayInfo(){
    var answer = population.getBest();
    if(answer.genes.join("") == target)window.clearInterval(interval);
    document.getElementsByClassName("best")[0].innerHTML = "Best phrase: "+answer.genes.join("");
    document.getElementsByClassName("best")[0].innerHTML += "<br>Best fitness: "+answer.fitness;
    document.getElementsByClassName("stats")[0].innerHTML = "total generations: "+population.generations;
    document.getElementsByClassName("stats")[0].innerHTML += "<br>average fitness: "+population.avgFitness;
    document.getElementsByClassName("stats")[0].innerHTML += "<br>population per generation: "+popmax;
    document.getElementsByClassName("stats")[0].innerHTML += "<br>mutation rate "+mutationRate;
    document.getElementsByClassName("all")[0].innerHTML = "All phrases: <br>";
    for(var i=0;i<population.population.length;i++){
        document.getElementsByClassName("all")[0].innerHTML += population.population[i].genes.join("")+"<br>";
    }

    updateChart();


}
setup();
interval = setInterval(draw,1);
