var target;
var popmax;
var mutationRate;
var population;
var bestPhrase;

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function setup() {
    bestPhrase = document.getElementsByClassName("best")[0];
    target = "To be or not to be.";
    popmax = 300;
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
}
setup();
interval = setInterval(draw,200);
