
nextGeneration = function(){
    generations++;

    calcFitness();
    savedBirds[0]= bestEver;
    for(var i =0 ; i < total; i++){
        birds[i] = pickOne();
    }
    savedBirds = [];
    if(generations > 20&& bestOfGen < 4000)mutationRate = (generations%10) / 10;
    else {
        mutationRate = 0.1;
    }
};

function pickOne(){
    var index = 0;
    var r = random(1);
    while(r > 0){
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;

    var bird = savedBirds[index];
    var child = new Bird(bird.brain);
    child.mutate();

    return child;
}


calcFitness = function(){
    var sum = 0;
    for(var i in savedBirds){
        sum+=savedBirds[i].score;

        if(savedBirds[i].score > bestOfGen){

            bestOfGen = savedBirds[i].score;
        }
    }
    for(var i in savedBirds){
        savedBirds[i].fitness = savedBirds[i].score / sum;
    }

};
