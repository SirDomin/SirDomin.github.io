var canvas = document.getElementById("canvas");
canvas.style.border = "solid 1px black";
ctx = canvas.getContext("2d");
keysDown = [];
iteration = 0;
var food;
var snake;
var menu;
var time;
var options;
currColorStyle = 0;
var foodColor = ["#84107a"];
var snakeHead = ["#81c332"];
var segment =   ["#4d4d4d"];
getColor = function(object){

    return window[object][currColorStyle];

};

Map = function() {
  this.width = 400;
  this.height = 400;
  canvas.width = this.width;
  canvas.height = this.height;
  this.currentDimensions = 0;
  this.dimensions = [{w:480,h:480},{w:600,h:600},{w:720,h:720},{w:840,h:840}];
  this.changeDimensions = function(){

      if(this.currentDimensions < this.dimensions.length -1){
          this.currentDimensions++;
      }else {
          this.currentDimensions = 0;
      }
      this.width = this.dimensions[this.currentDimensions].w;
      this.height = this.dimensions[this.currentDimensions].h;
      canvas.width = this.width;
      canvas.height = this.height;
  }
};
//create map
map = new Map();
Settings = function(){
    this.speed = 150;
    this.tilesPerRow = 20;
    this.tileWidth = map.width/this.tilesPerRow;
    this.difficulity = ['INSANE','HARD','NORMAL','EASY'];
    this.changeSpeed = function(){
        if(this.speed <= 150){
            this.speed += 50;
        }else {
            this.speed = 50;
        }
    };
    this.getDifficulity = function(){
        return this.difficulity[(this.speed/50)-1];
    };
    this.changeTiles = function(){
      if(this.tilesPerRow <40) {
          this.tilesPerRow+=10;

      } else {
          this.tilesPerRow = 20;
      }
        Math.round(this.tileWidth = map.width/this.tilesPerRow);
    };
};
settings = new Settings();
//key events
window.addEventListener("keydown",function(e){
    keysDown[e.keyCode] = true;
    //console.log(e.keyCode)
});
window.addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];
});
//test function
testDimensions = function(){
    var x = [20,30,40];
    for(var i in map.dimensions){
        for(var y in x){
            console.log("x = "+x[y]+" | mapDimensions = "+map.dimensions[i].w+" Tile Width: "+map.dimensions[i].w/x[y]);
        }
    }
};
//main character
Snake = function() {
    this.speed = settings.tileWidth;
    //create head
    this.segments = [new Segment(0,0,getColor("snakeHead"),0)];
    this.speedX = this.speed;
    this.speedY = 0;
    this.lastSegmentId = 1;
    this.lastUpdated = 0;
    //create first food
    food = new Food(getColor("foodColor"));
    this.addSegment = function(){
        this.segments.push(new Segment(this.segments[this.segments.length-1].x,this.segments[this.segments.length-1].y,getColor("segment"),this.segments.length));
        this.lastSegmentId = this.segments.length;
    };
    //set direction
    this.move = function(x,y){
        if(x === -this.speedX)return false;
        if(y === -this.speedY)return false;
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
            if(this.segments[i].x === this.segments[0].x && this.segments[i].y === this.segments[0].y){
                console.log("segment");
                return true;
            }
        }
        return false;
    };
    this.render = function(){
        this.checkMoves();
        //render and update segments
        for(var i = this.segments.length;i>=0;i--){
            if(i !== this.lastSegmentId)this.segments[i].render();
        }
        if(time - this.lastUpdated >= settings.speed) {
            for(var i = this.segments.length;i>=0;i--){
                if(i !== this.lastSegmentId)this.segments[i].update();
            }
            iteration++;
            //console.log(this.segments[0].x+" : "+this.segments[0].y);
            //console.log(food.x+" : "+food.y);

            this.lastUpdated = time;
            //move head (direction set in checkMoves Method)
            this.segments[0].x += Math.floor(this.speedX);
            this.segments[0].y += Math.floor(this.speedY);
            //collision with map borders and segments
            if (this.segments[0].x > map.width || this.segments[0].x < 0 || this.segments[0].y >= map.height || this.segments[0].y < 0 || this.collisionWithSegments()) {
                //restart the game if any collision is detected
                food = false;
                //snake = new Snake();
                snake = false;
                menu.rendering = true;
            }
        }
        //collision with food
        if(this.segments[0].x === food.x && this.segments[0].y === food.y){
            this.addSegment();
            food = new Food(getColor("foodColor"));
        }
    }
};
//food constructor color arg - sets the color of food
Food = function(color){
    this.color = color;
    //console.log(this.color);
    this.w = settings.tileWidth;
    this.h = settings.tileWidth;
    //set random position on the map
    this.x = Math.floor(Math.random() * ((map.width - settings.tileWidth)/settings.tileWidth) ) * settings.tileWidth;
    this.y = Math.floor(Math.random() * ((map.height - settings.tileWidth)/settings.tileWidth) ) * settings.tileWidth;
    this.render = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
};
Segment = function(x,y,color,id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = settings.tileWidth;
    this.h = settings.tileWidth;
    this.color = color;
    this.update = function(){
        if(this.id !== 0){
            this.x = snake.segments[this.id-1].x;
            this.y = snake.segments[this.id-1].y;
        }
    };
    this.render = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }

};
Menu = function(){
    this.selected = 0;
    this.rendering = true;
    this.buttonColor = "hsla(322, 0%, 30%, 1)";
    this.fontColor = "black";
    this.choiceColor = "#81c332";
    this.fontSize = map.width/12;
    this.buttonHeight = map.height/7;
    this.buttonWidth = map.width/2;
    this.buttons = ['START','OPTIONS','????'];
    this.states = [
      function(){menu.rendering = false; snake = new Snake()},
      function(){menu.rendering = false; options.rendering = true }
    ];
    //up
    this.checkKeys = function(){
        if(38 in keysDown){
            if(this.selected>0){
                delete keysDown[38];
                this.selected--;
            }
        }
        if(40 in keysDown){
            if(this.selected<1){
                this.selected++;
                delete keysDown[40];
            }
        }
        if(13 in keysDown){
            this.states[this.selected]();
            delete keysDown[13];
        }
    };
    this.render = function(){
        this.checkKeys();
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,map.width,map.height);
        for(var i =0;i<2;i++){
            ctx.fillStyle=this.buttonColor;
            if(i===this.selected)ctx.fillStyle = this.choiceColor;
            ctx.fillRect(map.width/4,this.buttonHeight*2+(this.buttonHeight*2*i),this.buttonWidth,this.buttonHeight);
            ctx.font = this.fontSize+"px ConcertOne-Regular";
            ctx.fillStyle = this.fontColor;
            ctx.fillText(this.buttons[i],map.width/3.5,this.buttonHeight*2+(this.buttonHeight*2*i)+this.fontSize);
        }
        ctx.fillStyle="white";
        ctx.fillText("SNAKE by SirDomin",map.width/6.5,this.buttonHeight*2-(this.buttonHeight*2)+this.fontSize);

        ctx.fillText("steering: ",0,this.buttonHeight*5.4+this.fontSize);
        ctx.fillText("arrow keys + enter",0,this.buttonHeight*6+this.fontSize);
    }
};
menu = new Menu();
Options = function(selected){

    this.selected = selected || 0;
    this.rendering = false;
    this.buttonColor = "hsla(322, 0%, 30%, 1)";
    this.fontColor = "black";
    this.choiceColor = "#81c332";
    this.fontSize = map.width/20;
    this.buttonHeight = map.height/9;
    this.buttonWidth = map.width/1.1;
    this.buttons = ['difficulity','fields on the map','game dimensions','EXIT'];
    this.states = [
        function(){settings.changeSpeed()},
        function(){settings.changeTiles()},
        function(){map.changeDimensions(); options = new Options(options.selected); options.rendering = true},
        function(){menu = new Menu(); options.rendering = false }
    ];
    this.checkKeys = function(){
        if(38 in keysDown){
            if(this.selected>0){
                delete keysDown[38];
                this.selected--;
            }
        }
        if(40 in keysDown){
            if(this.selected<4){
                this.selected++;
                delete keysDown[40];
            }
        }
        if(13 in keysDown){
            this.states[this.selected]();
            delete keysDown[13];
        }
    };
    this.render = function(){
        this.checkKeys();
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,map.width,map.height);
        for(var i =0;i<4;i++){
            ctx.fillStyle=this.buttonColor;
            if(i===this.selected)ctx.fillStyle = this.choiceColor;
            ctx.fillRect(map.width/20,this.buttonHeight+(this.buttonHeight*1.5*i),this.buttonWidth,this.buttonHeight);
            ctx.font = this.fontSize+"px ConcertOne-Regular";
            ctx.fillStyle = this.fontColor;
            ctx.fillText(this.buttons[i],map.width/20,this.buttonHeight*1.2+(this.buttonHeight*1.5*i)+this.fontSize);
        }
        ctx.fillText(settings.getDifficulity(),map.width/1.5,this.buttonHeight*1.2+this.fontSize);
        ctx.fillText(settings.tilesPerRow.toString(),map.width/1.5,this.buttonHeight*1.2+(this.buttonHeight*1.5)+this.fontSize);
        ctx.fillText(map.width+" x "+map.height,map.width/1.5,this.buttonHeight*1.2+(this.buttonHeight*1.5*2)+this.fontSize);
    }
};
options = new Options();
main = function() {
    time = new Date();
    time = time.getTime();
    ctx.clearRect(0,0,map.width,map.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,map.width,map.height);

    if(menu.rendering){
        menu.render();
    }else if(options.rendering){

        options.render();
    }
    else{

        food.render();
        snake.render();
        //draw score
        ctx.fillStyle = "#253474";
        if(snake)
            ctx.fillText("Score: " + (snake.segments.length - 1),5,menu.fontSize);
    }

    requestAnimationFrame(main);
};
//refresh game
speed = function(){
    return settings.speed;
};
main();


