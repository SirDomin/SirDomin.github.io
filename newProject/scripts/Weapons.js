Bullet = function(x,y,w,h,speed,src){
	this.x = x;
	this.y = y - h / 1.8;
	this.w = w;
	this.h = h;
	this.speed = speed;

	this.target = {
		x : mouse.x,
		y : mouse.y,
	}
	//speed x and y calculated on target x,y and start point
	this.xVelocity = Math.cos(Math.atan2((this.y + this.h / 2) - (this.target.y), this.target.x - (this.x + this.w / 2)));
    this.yVelocity = -1 * Math.sin(Math.atan2((this.y + this.h / 2) - (this.target.y), this.target.x - (this.x + this.w / 2)));

    this.update = function() {
    	this.x += this.speed * this.xVelocity;
    	this.y += this.speed * this.yVelocity;
    }

	this.render = function() {
		//rotate the bullet so it looks realistic
		ctx.save();
		ctx.translate(this.x + this.w / 2,this.y + this.h / 2);
        ctx.rotate(-Math.atan2((this.y + this.h / 2) - this.target.y, this.target.x - (this.x + this.w / 2)));
        ctx.translate( -(this.x + this.w / 2), - (this.y + this.h / 2));
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.restore();
	}
}


Weapon0 = function(x,y){
//30,295
	this.x = x;
	this.y = y;
	this.w = 100;
	this.h = 20;
	this.bullets = [];
	this.magazineSize = 100;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 400;
	this.length = 60;
	this.speed = 5;
	this.img = new Image();
	this.img.src = "img/gun.png";
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.bullets.length < this.magazineSize) {
			this.bullets.push(new Bullet(x,y,10,5,5,"t"));

		}
	}

}
