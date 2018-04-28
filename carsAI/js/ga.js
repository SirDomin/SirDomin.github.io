nextGeneration = function(){
    generations ++;
    for(var i =0; i< genLength; i++){
        cars[i] = pickOne();
    }
    savedCars = [];

    counter = 0;
};
pickOne = function(){
    var index = 0;
    var r = random(1);
    while(r > 0){
        r = r - savedCars[index].fitness;
        index++;
    }
    index--;

    var bird = savedCars[index];
    var child = new Car(bird.brain);
    child.mutate();

    return child;
};

calcFitness = function(){
var totalFitness = 0;
var bestFitness = 0;
var avgFitness = 0;
    for(var i =0; i < savedCars.length; i++){
        totalFitness+=savedCars[i].score;
        if(savedCars[i].score > bestFitness)bestFitness = savedCars[i].score;
    }
    avgFitness = totalFitness / savedCars.length;
    for(var i =0; i< savedCars.length; i++){
        savedCars[i].fitness = savedCars[i].score / bestFitness;
    }

};



































































