ShopItem = function(name,price,desc,magazine){
	this.name = name;
	this.price = price;
	this.desc = desc;
	this.magazine = magazine;
}
var Shop = function(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = canvas.w;
    this.canvas.height = canvas.h;
    this.canvas.style.position = 'absolute';
    this.canvas.style.marginLeft = -canvas.w -1 + 'px';
    this.canvas.style.visibility = "hidden";
    document.body.appendChild(this.canvas);
	this.active = false;
	this.buttons = [
        new Button(canvas.w-50,0,50,50),
    ];
    this.buttons[0].img = images[12];
    this.buttons[0].onclick = function(){
       shop.close();
    }
	this.render = function() {
		ctx.fillStyle = "rgb(77,77,77)";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        
        for(var i in this.buttons) {
            this.buttons[i].render();
        }
	}
	this.open = function() {
        this.active = true;
        this.canvas.style.visibility = "visible";
	}
	this.close = function() {
		this.active = false;
	    this.canvas.style.visibility = "hidden";
	}
    this.mouseDown = function(){
       
        for(var i in this.buttons){
            if(mouse.x > this.buttons[i].x && mouse.x < this.buttons[i].x + this.buttons[i].w && mouse.y > this.buttons[i].y && mouse.y < this.buttons[i].y + this.buttons[i].h) {
			     this.buttons[i].onclick();
            }
        }
    }
    this.canvas.addEventListener("mousedown",function(){
        shop.mouseDown();
    });
        
}