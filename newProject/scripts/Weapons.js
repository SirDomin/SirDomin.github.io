Bullet = function(x,y,w,h,speed,id,img){
	this.x = x;
	this.y = y - h / 1.8;
	this.w = w;
	this.h = h;

	this.img = img;
	this.speed = speed;
	this.id = id;
	this.dmg = player.weapon.dmg * player.dmgMultiplier;
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
		if(target)target.currHp -= this.dmg;
		delete player.bullets[this.id];
	}
}
Hitmark = function(x,y,id) {
	this.x = x;
	this.y = y  - 5;
	this.w = 20;
	this.h = 20;
	this.id = id;
	this.sound = new Audio("sounds/HITMARKER.mp3");
	this.sound.volume = volume * 2;
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
	this.dmg = 3;
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
	this.audio = [new Audio("sounds/colt.mp3"),new Audio("sounds/colt.mp3")];
	this.audio[0].volume = volume;
	this.audio[1].volume = volume;
	this.lastBulletId = 0;
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
	this.onStop = function(){}
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			
			var tmp = this.lastBulletId%2
			this.audio[tmp].src = this.audio[tmp].src;
			this.audio[tmp].play();
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!player.bullets[i]){
					this.lastBulletId = i;
					player.bullets[i] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,i,this.bulletImg);
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
	this.dmg = 4;
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
	//sound
	this.audio = [new Audio("sounds/uzi.mp3"),new Audio("sounds/uzi.mp3"),new Audio("sounds/uzi.mp3"),new Audio("sounds/uzi.mp3")];
	this.audio[0].volume = volume;
	this.audio[1].volume = volume;
	this.audio[2].volume = volume;
	this.audio[3].volume = volume;
	this.lastBulletId = 0;
	//auto shot when mousedown
	this.autofire = true;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 70;
	this.reloadTime = 3000;
	this.reloading = false;
	this.length = 50;
	this.bulletSpeed = 6;
	this.reloadStart = now - this.reloadTime;
	this.img = new Image();
	this.img.src = "img/uzi.png";
	
	this.bulletW = 20;
	this.bulletH = 10;
	this.onStop = function(){}
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			var tmp = this.lastBulletId%4
			this.audio[tmp].src = this.audio[tmp].src;
			this.audio[tmp].play();
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!player.bullets[i]){
					this.lastBulletId = i;
					player.bullets[i] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,i,this.bulletImg);
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
//ak

Weapon2 = function(x,y){
	this.dmg = 6;
	this.name = "AK";
	this.id = 2;
	this.x = x - 30;
	this.y = y + 30;
	this.w = 150;
	this.h = 15;
	this.bulletImg = new Image();
	this.bulletImg.src = "img/bullet.png";
	this.bullets = [];
	this.lastShot = now-1500;
	this.magazineSize = 350;
	this.magazine = this.magazineSize;
	this.dispersion = 30;
	this.audio = [new Audio("sounds/ak.mp3"),new Audio("sounds/ak.mp3")];
	this.audio[0].volume = volume;
	this.audio[1].volume = volume;
	this.lastBulletId = 0;
	//auto shot when mousedown
	this.autofire = true;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 100;
	this.reloadTime = 3000;
	this.reloading = false;
	this.length = 90;
	this.bulletSpeed = 8;
	this.reloadStart = now - this.reloadTime;
	this.img = new Image();
	this.img.src = "img/ak.png";
	
	this.bulletW = 20;
	this.bulletH = 10;
	this.onStop = function(){}
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			var tmp = this.lastBulletId%2
				this.audio[tmp].src = this.audio[tmp].src;
				this.audio[tmp].play();
		
			
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!player.bullets[i]){
					this.lastBulletId = i;
					player.bullets[i] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,i,this.bulletImg);
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
//shotgn
Weapon3 = function(x,y){
	this.dmg = 10;
	this.name = "Shotgun";
	this.id = 3;
	this.x = x - 30;
	this.y = y +13;
	this.w = 150;
	this.h = 50;
	this.bulletImg = new Image();
	this.bulletImg.src = "img/shotgunBullet.png";
	this.bullets = [];
	this.lastShot = now-1500;
	this.magazineSize = 4;
	this.magazine = this.magazineSize;
	this.dispersion = 100;
	this.audio = [new Audio("sounds/shotgun.mp3"),new Audio("sounds/shotgun.mp3")];
	this.audio[0].volume = volume;
	this.audio[1].volume = volume;
	this.lastBulletId = 0;
	//auto shot when mousedown
	this.autofire = false;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 300;
	this.reloadTime = 2000;
	this.reloading = false;
	this.length = 80;
	this.bulletSpeed = 10;
	this.reloadStart = now - this.reloadTime;
	this.img = new Image();
	this.img.src = "img/shotgun.png";
	
	this.bulletW = 5;
	this.bulletH = 5;
	this.onStop = function(){}
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			var tmp = this.lastBulletId%2
				this.audio[tmp].src = this.audio[tmp].src;
				this.audio[tmp].play();
		
			
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!player.bullets[0+(i*5)]){
					this.lastBulletId = i;
					player.bullets[0+(i*5)] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,0+(i*5),this.bulletImg);
					player.bullets[(1+(i*5))] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,1+(i*5),this.bulletImg);
					player.bullets[(2+(i*5))] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,2+(i*5),this.bulletImg);
					player.bullets[(3+(i*5))] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,3+(i*5),this.bulletImg);
					player.bullets[(4+(i*5))] = new Bullet(x,y,this.bulletW,this.bulletH,this.bulletSpeed,4	+(i*5),this.bulletImg);
					
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
//flamethrower
Weapon4 = function(x,y){
	this.dmg = 0;
	this.name = "Flamethrower";
	this.id = 4;
	this.x = x - 30;
	this.y = y -25;
	this.w = 150;
	this.h = 100;
	this.bulletImg = new Image();
	this.bulletImg.src = "img/flame.png";
	this.bullets = [];
	this.lastShot = now-1500;
	this.magazineSize = 400;
	this.magazine = this.magazineSize;
	this.dispersion = 100;
	this.audio = [new Audio("sounds/flamethrowerStart.mp3"),new Audio("sounds/flamethrower.mp3"),new Audio("sounds/flamethrowerEnd.mp3")];
	this.audio[0].volume = volume;
	this.audio[1].volume = volume;
	this.audio[2].volume = volume;
	this.lastBulletId = 0;
	//auto shot when mousedown
	this.autofire = true;
	//bulletMS - difference between shots (ms)
	this.bulletMS = 300;
	this.reloadTime = 2000;
	this.reloading = false;
	this.length = 90;
	this.bulletSpeed = 10;
	this.reloadStart = now - this.reloadTime;
	this.img = new Image();
	this.img.src = "img/flamethrower.png";
	this.shoting = false;
	this.bulletW = 30;
	this.bulletH = 30;
	this.burningTime = 1400;
	this.burnDmg = .5;
	this.onStop = function(){
		this.audio[0].load();
		if(this.audio[1].loop==true&&this.bulletMS != 700)this.audio[2].play();
		this.audio[1].loop = false;
		this.audio[1].src = this.audio[1].src;
		this.audio[1].load();
		//this.audio[1].src = "sounds/flamethrower.mp3"; 
		this.shoting = false;
	}
	this.render = function() {
		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.shot = function(x,y) {
	if(!this.shoting){
		this.audio[1].pause();
		this.audio[1].loop = true;
		this.audio[0].play();
		this.lastShot = now;
		this.bulletMS = 700;
		this.shoting = true;
		this.audio[0].onended = function(){
			player.weapon.audio[1].play();
		}
	}
		if(this.magazine > 0 && now - this.lastShot > this.bulletMS ) {
			this.bulletMS = 50;
			for(var i = 0; i < this.magazineSize; i++)
			{
				if(!player.bullets[0+(i*2)]){
					this.lastBulletId = i;
					player.bullets[0+(i*2)] = new Bullet(x,y-5,this.bulletW,this.bulletH,this.bulletSpeed,0+(i*2),this.bulletImg);
					player.bullets[0+(i*2)].onHit = function(target){
						if(target){
							target.currHp-=this.dmg;
							target.startBurning(player.weapon.burningTime,player.weapon.burnDmg)
						}else {
							delete player.bullets[this.id];
						}
					}
					player.bullets[(1+(i*2))] = new Bullet(x,y-5,this.bulletW,this.bulletH,this.bulletSpeed,1+(i*2),this.bulletImg);
					player.bullets[1+(i*2)].onHit = function(target){
						if(target){
							target.currHp-=this.dmg;
							target.startBurning(player.weapon.burningTime,player.weapon.burnDmg)
						}else{
							delete player.bullets[this.id]
						}
					}
					this.magazine--;
					this.lastShot = now;
					break; 
				}
			}
		}
		else {
			if(!this.reloading && this.magazine == 0)
			{
				this.onStop();
				this.reloading = true;
				this.reloadStart = now;
			}
		}

	}
}