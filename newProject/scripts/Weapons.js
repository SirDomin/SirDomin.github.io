Bullet = function(x,y,w,h,speed,id,img){
	this.x = x;
	this.y = y - h / 1.8;
	this.w = w;
	this.h = h;
	this.img = img;
	this.speed = speed;
	this.id = id;
	this.target = {
		x : mouse.x ,
		y : mouse.y + random(-player.weapon.dispersion,player.weapon.dispersion) * getDistanceBetweenPoints(mouse.x,mouse.y,this.x,this.y)/500,
	}
	this.rotation = -Math.atan2((this.y + this.h / 2) - this.target.y, this.target.x - (this.x + this.w / 2));
	//speed x and y calculated on target x,y and start point
	this.xVelocity = Math.cos(Math.atan2((this.y + this.h / 2) - (this.target.y), this.target.x - (this.x + this.w / 2)));
    this.yVelocity = -1 * Math.sin(Math.atan2((this.y + this.h / 2) - (this.target.y), this.target.x - (this.x + this.w / 2)));
    this.update = function() {
    	this.x += this.speed * this.xVelocity;
    	this.y += this.speed * this.yVelocity;
    	if(this.x<-this.speed||this.y<50 + this.speed / 2||this.y>canvas.h-this.speed * 0.5||this.x>canvas.w-this.speed * 1.7){
    		this.onHit();
    	}
    }
	this.render = function() {
		//rotate the bullet so it looks realistic
		ctx.save();
		ctx.translate(this.x + this.w / 2,this.y + this.h / 2);
        ctx.rotate(this.rotation);
        ctx.translate( -(this.x + this.w / 2), - (this.y + this.h / 2));
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
		ctx.restore();
	}	
	this.onHit = function(target){
			for(var i = 0; i <= 10; i ++)
    		{
    			if(!hitmarks[i]) {
    				hitmarks[i]=new Hitmark(this.x,this.y,i)
    				break;
    			}
    		}
		if(target)target.currHp --;
		delete player.weapon.bullets[this.id];
	}
}
Hitmark = function(x,y,id) {
	this.x = x;
	this.y = y  - 5;
	this.w = 20;
	this.h = 20;
	this.id = id;
	this.sound = new Audio("sounds/HITMARKER.mp3");
	this.sound.volume = volume;
	this.img = new Image();
	this.img.src = "img/hitmark.png";
	this.timeCreated = now;
	this.sound.play();
	this.render = function(){
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
		if(now - this.timeCreated > 200)delete hitmarks[this.id];
	}
}
Weapon0 = function(x,y){
	this.id = 0;
	this.name = "COLT";
	this.x = x+30;
	this.y = y + 32;
	this.w = 40;
	this.h = 10;
	this.bulletImg = new Image();
	this.bulletImg.src = "img/bullet.png";
	this.bullets = [];
	this.lastShot = now-1500;
	this.magazineSize = 7;
	this.magazine = this.magazineSize;
	this.dispersion = 5;
	//auto shot when mousedown
	this.autofire = false;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 200;
	this.reloadTime = 1000;
	this.reloading = false;
	this.length = 40;
	this.bulletSpeed = 5;
	this.reloadStart = now - this.reloadTime;
	this.img = new Image();
	this.img.src = "img/colt.png";
	
	this.bulletW = 20;
	this.bulletH = 10;
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!this.bullets[i]){
					this.bullets[i] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,i,this.bulletImg);
					this.magazine--;
					this.lastShot = now;
					break; 
				}
			}
		}
		else {
			if(!this.reloading && this.magazine == 0)
			{
				this.reloading = true;
				this.reloadStart = now;
			}
		}
	}
}
//weapon 1
Weapon1 = function(x,y){
	this.name = "UZI";
	this.id = 1;
	this.x = x+30;
	this.y = y + 33;
	this.w = 50;
	this.h = 10;
	this.bulletImg = new Image();
	this.bulletImg.src = "img/bullet.png";
	this.bullets = [];
	this.lastShot = now-1500;
	this.magazineSize = 35;
	this.magazine = this.magazineSize;
	this.dispersion = 100;
	//auto shot when mousedown
	this.autofire = true;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 150;
	this.reloadTime = 3000;
	this.reloading = false;
	this.length = 50;
	this.bulletSpeed = 5;
	this.reloadStart = now - this.reloadTime;
	this.img = new Image();
	this.img.src = "img/uzi.png";
	
	this.bulletW = 20;
	this.bulletH = 10;
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!this.bullets[i]){
					this.bullets[i] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,i,this.bulletImg);
					this.magazine--;
					this.lastShot = now;
					break; 
				}
			}
		}
		else {
			if(!this.reloading && this.magazine == 0)
			{
				this.reloading = true;
				this.reloadStart = now;
			}
		}
	}
}