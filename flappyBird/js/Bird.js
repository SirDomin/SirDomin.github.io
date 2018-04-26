function Bird( brain ){
    this.y = height/2;
    this.x = 50;

    this.gravity = 0.2;
    this.velocity = 0;
    this.lift = -4;
    this.inputs = [];
    this.score = 0;
    this.fitness = 0;
    if(brain){

        this.brain = brain.copy();

    }else {
        this.brain = new NeuralNetwork(6,8,2);
        //this.brain = deserialize('{\"input_nodes\":4,\"hidden_nodes\":4,\"output_nodes\":2,\"weights_ih\":{\"rows\":4,\"cols\":4,\"data\":[[-0.06801323436435817,-0.1948362540509199,0.37123151246817365,0.44771719783367525],[0.24687727745075683,-0.39349805894541473,-0.0657439984070235,-0.038926891770951155],[0.0959044257571188,0.7185070597274197,-1.3277531935975615,-1.4041590755491042],[-0.019697189727449993,0.23022126719806651,-0.5412167750475181,0.9189940096494587]]},\"weights_ho\":{\"rows\":2,\"cols\":4,\"data\":[[-0.3007830779315972,-0.12781548402684093,0.5745828615452165,-0.6011671483919908],[0.007980896147479166,0.5454917955980306,-1.0310824718714506,-0.9253990654722787]]},\"bias_h\":{\"rows\":4,\"cols\":1,\"data\":[[-1.1956345659166907],[-0.4565521762484312],[-0.3159399073493973],[1.0325048625453417]]},\"bias_o\":{\"rows\":2,\"cols\":1,\"data\":[[-0.7934974238510824],[-0.5984920514443358]]},\"learning_rate\":0.1,\"activation_function\":{}}');
    }


    this.show = function(){
        //stroke(255);
        //fill(255,10);
        //ellipse(this.x,this.y,25,25);
        image(birdImage,this.x - birdImage.width/2,this.y - birdImage.height/2)
    };
    this.showInputs = function(){
        stroke(64, 255, 0);
        line(this.x, this.inputs[0], this.inputs[3], this.inputs[2]);
        line(this.x, this.inputs[0], this.inputs[3], this.inputs[1]);
        line(this.inputs[3], this.inputs[1], this.inputs[3], this.inputs[2]);
        line(this.inputs[4], this.inputs[1], this.inputs[3], this.inputs[1]);
        line(this.inputs[4], this.inputs[1], this.inputs[4], this.inputs[2]);
        line(this.inputs[4], this.inputs[2]-2, this.inputs[3], this.inputs[2]-2);

        //line(p2, p3, p2, p2);
        //line(p2, p2, p3, p2);
        //line(p3, p2, p3, p3);
    };
    this.think = function(pipes){

        var closestPipe = null;
        var closestD = Infinity;

        for( var i =0; i< pipes.length;i++){
            var d = pipes[i].x + pipes[i].w - this.x;
            if(d < closestD && d > 0){
                closestPipe = pipes[i];
                closestD = d;
            }
        }
        closestPipe.color="yellow";
        var inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closestPipe.top / height;
        inputs[2] = closestPipe.bottom / height;
        inputs[3] = closestPipe.x / width;
        inputs[4] = (closestPipe.x + closestPipe.w) / width;
        inputs[5] = this.velocity / 10;

        this.inputs[0] = this.y;
        this.inputs[1] = closestPipe.top;
        this.inputs[2] = closestPipe.bottom;
        this.inputs[3] = closestPipe.x;
        this.inputs[4] = (closestPipe.x + closestPipe.w);
        var output = this.brain.predict(inputs);

        if(output[0] > output[1]){
            this.up();
        }

    };
    this.update = function(){

        this.score++;

        this.velocity += this.gravity;
        this.y += this.velocity;
        if(this.y > height){
            this.y = height;
            this.velocity = 0;
        }
        if(this.y < 0){
            this.y = 0;
            this.velocity = 0;
        }
    }
    this.up = function(){
        this.velocity = this.lift;
        this.velocity *= 0.9;

    }

    this.mutate = function(){
        this.brain.mutate(0.08);
    }

}
