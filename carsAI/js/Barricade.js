Barricade = function(){
    this.gape = 100;
    this.width = random(width/3,width - this.gape);
    this.height = 20;
    this.x =0;
    if(random() > 0.5)this.x = width - this.width ;
    this.color = "white";
    this.y = -this.height;
    this.update = function(){
        this.y += gameSpeed;
    };
    this.hits = function(car){
        if(car.x >= this.x && car.x <= this.x+this.width && car.y >= this.y && car.y <= this.y + this.height){
            return true;

        }

    };
    this.draw = function(){

        fill(this.color);
        rect(this.x,this.y,this.width,this.height);
    };
};
