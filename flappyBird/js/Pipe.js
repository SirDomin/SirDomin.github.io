var Pipe = function(){
    this.spaceBetween = 150;
    this.top = random((height - 50)-this.spaceBetween);
    this.bottom = this.top + this.spaceBetween;
    this.w = 70;
    this.x = width;
    this.color = "white";
    this.speed = currSpeed;
    this.img = loadImage('img/pipe-green.png');
    this.show = function(){

        image(pipeTop, this.x, this.top - pipeTop.height,this.w,pipeTop.height);
        image(this.img, this.x, this.bottom,this.w);




        //rect(this.x,0,this.w,this.top);
        //rect(this.x,this.bottom,this.w,height - this.bottom);
    };
    this.update = function(){

        this.x -= this.speed;
    };
    this.offScreen = function(){
        return (this.x+this.w<0);
    };
    this.hits = function(obj){
        if((obj.y < this.top || obj.y >this.bottom) && obj.x > this.x && obj.x < this.x + this.w){

            return true;
        }

        return false;
    }
};

