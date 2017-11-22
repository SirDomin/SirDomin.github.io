var Button = function(x,y,w,h,imgsrc) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = new Image();
	this.img.src = imgsrc || "img/button.png";
	this.clicked = false;
	this.render = function() {

		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.onclick = function() {
		
	}

}
var WeaponChoiceButton = function(x,y,w,h,imgsrc) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = new Image();
	this.img.src = imgsrc || "img/button.png";
	this.clicked = false;
	this.render = function() {

		WCtx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.onclick = function() {
		
	}

}