function Car(){
    this.w = 30;
    this.x = width/2-this.w/2;
    this.y = height - 100;
    this.speed = 5;
    this.brain = new NeuralNetwork(3,4,2);
    this.score = 0;
    this.fitness;
    this.think = function(){
        var closestDistance = Infinity;
        var closestObj = null;

        for(var i =0; i< barricades.length;i++){
            var bar = barricades[i];
            var distance = this.y - bar.y;
            if(distance < closestDistance && bar.y < this.y){
                closestDistance = distance;
                closestObj = barricades[i];
            }
        }
        if(closestObj)closestObj.color = "red";

        var inputs = [];
        inputs[0] = this.x / width;
        inputs[1] = closestObj.width / width;
        inputs[2] = closestObj.y / height;

        var output = this.brain.predict(inputs);


        var highest = 0;
        for(var i in output) {
            if (output[i] > highest) highest = output[i];

        }


        if(output[0] === highest)this.turnRight();
        if(output[1] === highest)this.turnLeft();

    };
    this.update = function(){
        this.score++;
        this.think();
    };
    this.turnLeft = function(){
        if(this.x > 0){

            this.x-=this.speed;
        }
    };
    this.turnRight = function(){
        if(this.x + this.w < width){

            this.x += this.speed;
        }
    };
    this.draw = function(){
        fill(255);
        rect(this.x,this.y,this.w,this.w);
    }
    this.mutate = function(){
        this.brain.mutate(0.3);
    }
}
