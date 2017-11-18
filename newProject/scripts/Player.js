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

	this.update = function() {
		//end of weapon (shot start);
		//eowX -- end of weapon X axis
		//eowY -- end of weapon Y axis
		this.eowX = this.x+this.w/2 + this.weapon.length * Math.cos(-Math.atan2((this.y + this.w / 2) - mouse.y, mouse.x - (this.x+this.w/2)));
		this.eowY = this.y+this.h/2 + this.weapon.length * Math.sin(-Math.atan2((this.y + this.w / 2) - mouse.y, mouse.x - (this.x+this.w/2)));	
			
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
			this.weapon.bullets[i].update();
			this.weapon.bullets[i].render();
		}
	}
	this.shot = function() {
		this.weapon.shot(this.eowX,this.eowY);
	}

}