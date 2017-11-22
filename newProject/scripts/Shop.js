ShopItem = function(name,price,desc,magazine){
	this.name = name;
	this.price = price;
	this.desc = desc;
	this.magazine = magazine;
}


var Shop = function(){
	this.x = 0;
	this.y = 52;
	this.startY = canvas.h;
	this.w = canvas.w;
	this.h = canvas.h - this.y;
	this.active = false;
	this.loadSpeed = 0;
	this.targetY;
	this.buttons;
	this.show = function() {
		this.targetY = 52;
		this.active = true;
		this.loadSpeed = 50;
		this.buttons = buttons.length;

	}
	this.render = function() {
		ctx.fillStyle = "rgb(77,77,77)";
		ctx.fillRect(this.x,this.startY,this.w,this.h);
		this.startY += this.loadSpeed * -1 * Math.sin(Math.atan2((this.startY) - (this.targetY), 0 - (this.x + this.w / 2)));
		if(Math.round(this.startY) == canvas.h) {
			this.close();
		}
		if(Math.round(this.startY)==52 && this.loadSpeed == 50){
			this.open();
		}
	}
	this.hide = function() {
		buttons.splice(this.buttons,buttons.length);
		this.loadSpeed = 50;
		this.targetY = canvas.h;
	}
	this.open = function() {
		this.loadSpeed = 0;
		buttons[this.buttons] = new Button(100,100,100,20)
	}
	this.close = function() {
		
		this.active = false;
	}
}