function Population(p, m, num){
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.target = p;
    this.totalFitness = 0;
    this.avgFitness = 0;
    this.best = "";

    for(var i = 0; i < num; i++){
        this.population[i] = new DNA(this.target.length);
    }

    this.calcFitness = function(){
        this.totalFitness = 0;
        for(var i = 0; i < this.population.length; i++){
            this.population[i].calcFitness(target);
            this.totalFitness += this.population[i].fitness;
        }
        this.avgFitness = this.totalFitness /this.population.length;
    };
    this.calcFitness();
    this.naturalSelection = function(){
        this.matingPool = [];
        var maxFitness = 0;
        for(var i = 0; i < this.population.length; i++){
            if(this.population[i].fitness > maxFitness){
                maxFitness = this.population[i].fitness;
                this.best = this.population[i];
            }
        }
        for(var i = 0;i < this.population.length; i++){
            var fitness = this.population[i].fitness;
            var n = Math.floor(fitness * 100);
                for(var j = 0; j < n; j++){
                    this.matingPool.push(this.population[i]);
                }
        }
    };
    this.generate = function(){
        for(var i = 0; i < this.population.length; i++){
            var a = Math.floor(random(0,this.matingPool.length-1));
            var b = Math.floor(random(0,this.matingPool.length-1));
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];
            //console.log(this.matingPool);
            var child = partnerA.crossover(partnerB);
            child.mutate(mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    };
    this.getBest = function(){
        return this.best;
    }

}
