function newChar() {
    var c = Math.floor(random(63,122));
    if(c === 63) c = 32;
    if(c === 64) c = 46;
    return String.fromCharCode(c);

}
function DNA(num){

    this.genes = [];
    this.fitness = 0;
    for(var i = 0; i < num; i++){
        this.genes[i] = newChar();

    }
    this.getPhrase = function(){
        return this.genes.join("");
    };

    this.calcFitness = function(target){
        var score = 0;
        for(var i = 0; i < this.genes.length; i++){
            if(this.genes[i] === target.charAt(i)){
                score++;
            }
        }
        this.fitness = score/target.length;

    };
    this.crossover = function(partner){
        var child = new DNA(this.genes.length);
        var midpoint = Math.floor(random(0,this.genes.length));
        for(var i=0;i<this.genes.length;i++){
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];

        }
        return child;

    };
    this.mutate = function(mutationRate){
        for(var i =0; i< this.genes.length; i++){
            if(Math.random() < mutationRate ){
                this.genes[i] = newChar();
            }
        }
    }
}
