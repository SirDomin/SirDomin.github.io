function calcFitness(){
    currentRecord = Infinity;
    avgDistance = 0;
    for(var i =0; i < population.length; i++){
        var d = calcDistance(dots,population[i]);
        avgDistance += d;
        if(d < recordDistance){
            recordDistance = d;
            bestPath = population[i];
        }
        if(d < currentRecord){
            currentRecord = d;
            currentBestPath = population[i];
        }
        fitness[i] = 1/(d + 1);
    }
    avgDistance /= population.length;
}

function normalizeFitness(){
    var sum = 0;
    for(var i = 0; i < fitness.length; i++){
        sum += fitness[i];
    }
    for(var i = 0; i < fitness.length; i++){
        fitness[i] = fitness[i] / sum;
    }
}
function nextGeneration(){
    populations++;

    var newPopulation = [];
    for(var i = 0; i < population.length; i++){
        var orderA = pickOne(population,fitness);
        var orderB = pickOne(population,fitness);
        var order = crossOver(orderA,orderB);
        mutate(order,mutationRate);
        newPopulation[i] = order;
    }
    population = newPopulation;
}
function pickOne(list,prop){
    var index = 0;
    var r = random(1);
    while(r > 0){
        r = r - prop[index];
        index++;
    }
    index--;
    return list[index].slice();
}
function mutate(order,mutationRate){
    for(var i = 0; i < totalDots; i++) {
        if(random(1) < mutationRate){
            var indexA = floor(random(order.length));
            var indexB = floor(random(order.length));
            swap(order, indexA, indexB);
        }
    }
}
function crossOver(orderA, orderB){
    var start = floor(random(orderA.length));
    var end = floor(random(start + 1,orderA.length));
    var newOrder = orderA.slice(start, end);
    var left = totalDots - newOrder.length;
    for(var i = 0; i < orderB.length; i++){
        var dot = orderB[i];
        if(!newOrder.includes(dot)){
            newOrder.push(dot);
        }
    }
    return newOrder;
}
