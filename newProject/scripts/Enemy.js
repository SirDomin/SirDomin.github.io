BloodSplat = function(x,y,w,h,id) {

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.id = id;
	this.timeCreated = now;
	this.lifetime = 700;
	this.img = new Image();
	this.img.src = "img/blood.png";
	this.render = function() {

		ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
		if(now - this.timeCreated > this.lifetime)delete splats[this.id];
	}
}

Enemy = function(id) {
	this.x = random(canvas.w,canvas.w);
	this.y = random(100,canvas.h-100);
	this.w = 100;
	this.h = 100;
	this.id = id;
	this.speed = 0.5;
	this.maxHp = 10;
	this.currHp = this.maxHp;
	this.hpBar = new LoadingBar(this.x,this.y - 30,this.w,20);
	this.bulletCollision = function() {
		for(var i in player.weapon.bullets) {
			var x = player.weapon.bullets[i];
			if(x.x + x.w >= this.x && x.y + x.h >= this.y && x.x <= this.x + this.w && x.y <= this.y + this.h) return i;

			//return false;
		}
	}
	this.update = function() {
		if(this.currHp<=0){
			this.onKill();
		}
		if(this.x > 110)this.x-=this.speed;
		if(this.bulletCollision())player.weapon.bullets[this.bulletCollision()].onHit(this);
	}
	this.render = function() {
		this.hpBar.x = this.x;
		this.hpBar.update("hsla(" + 124 * maximum(0,getDecimalValue(this.currHp,this.maxHp),1)  + ", 100%, 45%, 1)",maximum(0,getDecimalValue(this.currHp,this.maxHp),1));
		ctx.fillRect(this.x,this.y,this.w,this.h)
	}
	this.onKill = function() {
		for(var i = 0; i <= 10; i ++)
    		{
    			if(!splats[i]) {
    				splats[i]=new BloodSplat(this.x,this.y,this.w,this.h,i);
    				delete enemies[this.id];
    				break;
    			}
    		}
		//this.bulletCollision = function(){return false;};
		
	}
}
