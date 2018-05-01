Menu = function() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = canvas.w;
    this.canvas.height = canvas.h;
    this.canvas.id = "Menu";
    this.canvas.style.position = 'absolute';
    this.canvas.style.marginLeft = -canvas.w -1 + 'px';
    this.canvas.style.marginTop = window.innerHeight/2 - canvas.h/2+"px";
    this.canvas.style.visibility = "visible";
    this.active = true;
    this.buttons = [];
    this.buttonW = canvas.w/3;
    this.buttonX = canvas.w/2 - this.buttonW/2;
    document.body.appendChild(this.canvas);
    //Canvas.style.visibility = "hidden";

    this.buttons[0] = new Button(this.buttonX,100,this.buttonW,50,getImage("button"));
    this.buttons[0].onclick = function(){
        menu.canvas.style.visibility = "hidden";
        menu.active = false;
    };
    this.buttons[1] = new Button(this.buttonX,200,this.buttonW,50,getImage("button"));
    this.buttons[1].onclick = function(){
      alert("Not supported yet")
    };
    this.render = function(){
        this.ctx.clearRect(0,0,canvas.w,canvas.h);
        this.ctx.fillStyle = "#81c332";
        this.ctx.fillRect(0,0,canvas.w,52);
            for(var i in this.buttons){
                this.buttons[i].render();
            }

        this.ctx.font = "40px Skranji-Regular";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("PROJECT: Zombie", 160,40);
            this.ctx.fillText("New Game", this.buttonX + 5, 140)
            this.ctx.fillText("Load Game", this.buttonX + 5, 240)
    };
    this.canvas.addEventListener("mousedown",function(e){
        for(var i in menu.buttons){
            if(mouse.x > menu.buttons[i].x && mouse.x < menu.buttons[i].x + menu.buttons[i].w && mouse.y > menu.buttons[i].y && mouse.y < menu.buttons[i].y + menu.buttons[i].h) {
                menu.buttons[i].onclick();
            }
        }
    });

};
