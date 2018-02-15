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
Map = function() {
  this.width = 800;
  this.height = 800;
  canvas.width = this.width;
  canvas.height = this.height;
  this.changeDimensions = function(){
      if(this.width < 800){
          this.width += 100;
          this.height +=100;
      }else {
          this.width = 400;
          this.height = 400;
      }
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
          this.tilesPerRow = 10;
      }
        this.tileWidth = map.width/this.tilesPerRow;
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
//main character
Snake = function() {
    this.speed = settings.tileWidth;
    //create head
    this.segments = [new Segment(0,0,"red",0)];
    this.speedX = this.speed;
    this.speedY = 0;
    this.lastSegmentId = 1;
    this.lastUpdated = 0;
    //create first food
    food = new Food("lime");
    this.addSegment = function(){
        this.segments.push(new Segment(this.segments[this.segments.length-1].x,this.segments[this.segments.length-1].y,"black",this.segments.length));
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
            this.lastUpdated = time;
            //move head (direction set in checkMoves Method)
            this.segments[0].x += this.speedX;
            this.segments[0].y += this.speedY;
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
            food = new Food("Lime");
        }
    }
};
//food constructor color arg - sets the color of food
Food = function(color){
    this.color = color;
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
    this.buttonColor = "lime";
    this.fontColor = "white";
    this.choiceColor = "red";
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
            ctx.font = this.fontSize+"px Arial";
            ctx.fillStyle = this.fontColor;
            ctx.fillText(this.buttons[i],map.width/3.5,this.buttonHeight*2+(this.buttonHeight*2*i)+this.fontSize);
        }
    }
};
menu = new Menu();
Options = function(){
    this.selected = 0;
    this.rendering = false;
    this.buttonColor = "lime";
    this.fontColor = "white";
    this.choiceColor = "red";
    this.fontSize = map.width/20;
    this.buttonHeight = map.height/9;
    this.buttonWidth = map.width/1.1;
    this.buttons = ['difficulity','fields on the map','game dimensions','EXIT'];
    this.states = [
        function(){settings.changeSpeed()},
        function(){settings.changeTiles()},
        function(){map.changeDimensions(); options = new Options(); options.rendering = true},
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
            ctx.font = this.fontSize+"px Arial";
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
    ctx.fillStyle = "cyan";
    if(menu.rendering){
        menu.render();
    }else if(options.rendering){

        options.render();
    }
    else{

        //draw score
        ctx.fillText("Score: " + (snake.segments.length - 1),5,menu.fontSize);
        food.render();
        snake.render();
    }

    requestAnimationFrame(main);
};
//refresh game
speed = function(){
    return settings.speed;
};
main();


