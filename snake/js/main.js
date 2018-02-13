var canvas = document.getElementById("canvas");
canvas.style.border = "solid 1px black";
ctx = canvas.getContext("2d");
keysDown = [];
iteration = 0;
Map = function() {
  this.width = 200;
  this.height = 200;
  canvas.width = this.width;
  canvas.height = this.height;
};
//key events
window.addEventListener("keydown",function(e){
    keysDown[e.keyCode] = true;
});
window.addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];
});
//main character
Snake = function() {
    this.speed = 10;
    //creade head
    this.segments = [new Segment(0,0,"red",0)];
    this.speedX = this.speed;
    this.speedY = 0;
    this.lastSegmentId = 1;
    this.addSegment = function(){
        this.segments.push(new Segment(this.segments[this.segments.length-1].x,this.segments[this.segments.length-1].y,"black",this.segments.length))
        this.lastSegmentId = this.segments.length;
    };
    //set direction
    this.move = function(x,y){
        this.speedX = x;
        this.speedY = y;
    };
    //key events handlers
    this.checkMoves = function(){
        if(39 in keysDown){
            this.move(this.speed,0);
            delete keysDown[39];
        }
        if(37 in keysDown){
            this.move(-this.speed,0);
            delete keysDown[37];
        }
        if(40 in keysDown){
            this.move(0,this.speed);
            delete keysDown[40];
        }
        if(38 in keysDown){
            this.move(0,-this.speed);
            delete keysDown[38];
        }
        if(32 in keysDown){
            //this.addSegment();
            delete keysDown[32];
        }
    };
    //check collision with segments
    this.collisionWithSegments = function(){
        for(var i=1; i< this.segments.length; i++) {
            if(this.segments[i].x == this.segments[0].x && this.segments[i].y == this.segments[0].y) return true;
        }
        return false;
    };
    this.render = function(){
        this.checkMoves();
        //render and update segments
        for(var i = this.segments.length;i>=0;i--){
            if(i != this.lastSegmentId)this.segments[i].render();
        }
        //move head (direction set in checkMoves Method)
        this.segments[0].x += this.speedX;
        this.segments[0].y += this.speedY;
        //collision with map borders and segments
        if(this.segments[0].x > map.width || this.segments[0].x < 0 || this.segments[0].y > map.height || this.segments[0].y < 0 || this.collisionWithSegments()){
            //restart the game if any collision is detected
            snake = new Snake();
        };
        //collision with food
        if(this.segments[0].x == food.x && this.segments[0].y == food.y){
            this.addSegment();
            food = new Food("Lime");
        }
    }
};
//food constructor color arg - sets the color of food
Food = function(color){
    this.color = color;
    this.w = 10;
    this.h = 10;
    //set random position on the map
    this.x = Math.floor(Math.random() * ((map.width - 10)/10) ) * 10;
    this.y = Math.floor(Math.random() * ((map.height - 10)/10) ) * 10;
    this.render = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
};
Segment = function(x,y,color,id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 10;
    this.color = color;
    this.render = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        if(this.id != 0){
            this.x = snake.segments[this.id-1].x;
            this.y = snake.segments[this.id-1].y;
        }
    }

};
//create map
map = new Map();
//create player (snake)
snake = new Snake();
//create first food
food = new Food("lime");
main = function() {
    ctx.clearRect(0,0,map.width,map.height);
    ctx.fillStyle = "cyan";
    //draw score
    ctx.fillText("Score: " + (snake.segments.length - 1),5,10);
    food.render();
    snake.render();
    iteration++;
};
//refresh game every 100ms
setInterval(main,100);

