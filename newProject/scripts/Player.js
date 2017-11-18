Player = function(){

	this.w = 75;
	this.h = 75	;
	this.x = 0;
	this.y = canvas.h/2 - this.w/2;
	this.eowX,this.eowY;
    this.handle = new Image();
    this.handle.src = "img/handle.png";
    this.bodyImg=new Image(this.w,this.h);
    this.bodyImg.src="img/body.png";
    this.weapon = new Weapon0(this.x,this.y+this.h/2-10);
    this.bulletMS = new LoadingBar(this.x,this.y-40,this.w,20);
    this.reloadingTime = new RoundedLoadingBar(canvas.w/2,canvas.h/2,50);
    this.reloadingTime.whenCompleteAction = function(){
    	player.weapon.magazine = player.weapon.magazineSize;
    	player.weapon.reloading = false;
    }
	this.update = function() {
		//end of weapon (shot start);
		//eowX -- end of weapon X axis
		//eowY -- end of weapon Y axis
		this.eowX = this.x+this.w/2 + this.weapon.length * Math.cos(-Math.atan2((this.y + this.w / 2) - mouse.y, mouse.x - (this.x+this.w/2)));
		this.eowY = this.y+this.h/2 + this.weapon.length * Math.sin(-Math.atan2((this.y + this.w / 2) - mouse.y, mouse.x - (this.x+this.w/2)));	
		this.bulletMS.update("green",maximum(0,getDecimalValue(now - this.weapon.lastShot,this.weapon.bulletMS),1));	
		if(player.weapon.reloading){
			this.reloadingTime.update("lime",maximum(0,getDecimalValue(now - this.weapon.reloadStart,this.weapon.reloadTime),1));
		}
	}
	this.render = function() {
		//rotate turret to follow mouse angle
		ctx.drawImage(this.bodyImg,this.x,this.y,this.w,this.h);
        ctx.save();
        ctx.translate(this.x+this.w/2,this.y+this.h/2);
        ctx.rotate(-Math.atan2((this.y+this.h/2) - mouse.y, mouse.x - (this.x+this.w/2)));
        ctx.translate( -(this.x+this.w/2), -(this.y+this.h/2));
        //render player weapon before handle
        this.weapon.render();
        ctx.drawImage(this.handle,this.x,this.y,this.w,this.h);
        ctx.restore();

        //render active bullets
        for(var i in this.weapon.bullets) {
			this.weapon.bullets[i].render();
			this.weapon.bullets[i].update();
		}

		ctx.fillText(player.weapon.magazine + " / " +player.weapon.magazineSize,10,50);

	}
	this.shot = function() {
		this.weapon.shot(this.eowX,this.eowY);
	}

}

LoadingBar = function(x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.borderWidth = 2;
	this.backgroundColor = "black";
	this.update = function(color, percentage) {
	
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.fillStyle = color;
		ctx.fillRect(this.x + this.borderWidth,this.y + this.borderWidth,(this.w - this.borderWidth * 2) * percentage,this.h - this.borderWidth * 2);
	}
}

RoundedLoadingBar = function(x,y,r,whenCompleteAction) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.borderWidth = 20;
	this.backgroundColor = "hsla(161, 12%, 33%, 0.54)";
	this.whenCompleteAction = function(){}
	this.update = function(color, percentage) {
		
		ctx.beginPath()
		ctx.arc(this.x,this.y,this.r, 0 * Math.PI,(2 * Math.PI) * percentage,true);
		ctx.font = "15px Arial";
		ctx.fillText("Reloading",this.x-this.r+15,this.y)
		ctx.lineWidth = this.borderWidth;
		ctx.strokeStyle = this.backgroundColor;
		ctx.stroke();
		if(percentage > 0.99)this.whenCompleteAction();
	}
}