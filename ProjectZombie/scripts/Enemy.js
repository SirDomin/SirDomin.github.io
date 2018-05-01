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



Enemy = function(id, maxHp,speed) {

	this.x = random(canvas.w,(canvas.w*2) + id * 30) ;
	this.y = random(100,canvas.h-100);
	this.burnStart = 0;
	this.burnImg = new Image();
	this.burnImg.src = "img/flame.png";
	this.w = 30;
	this.h = 30;
	this.id = id;
    this.maxSpeed = speed;
	this.speed = this.maxSpeed;
	this.maxHp = maxHp;
	this.currHp = this.maxHp;
	this.burningTime = 0;
	this.burnDmg = 0;
    this.dmgMultiplier = 1;
	this.hpBar = new LoadingBar(this.x,this.y - 10,this.w,this.h/5);
    this.freezeTime = 2000;
    this.freezeStart = 0;
    this.freezing = false;
    this.type = "soldier";
	this.bulletCollision = function() {
		for(var i in player.bullets) {
			var x = player.bullets[i];
			if(x.x + x.w >= this.x && x.y + x.h >= this.y && x.x <= this.x + this.w && x.y <= this.y + this.h) return i;
		}
	}
	this.update = function() {
		if(this.currHp<=0){
			this.onKill();
		}
		if(this.x > 110)this.x-=this.speed;
		if(this.bulletCollision())player.bullets[this.bulletCollision()].onHit(this);
	}
	this.render = function() {
		this.hpBar.x = this.x;
		ctx.fillRect(this.x,this.y,this.w,this.h)
		if(now - this.burnStart < this.burningTime){
			this.currHp-=this.burnDmg * this.dmgMultiplier;
			ctx.drawImage(this.burnImg,this.x,this.y,this.w,this.h);
		}
        if(now - this.freezeStart < this.freezeTime) {
            
            ctx.fillStyle = "hsla(191, 100%, 50%, 0.4)";
            ctx.fillRect(this.x - 5,this.y - 5, this.w + 10, this.h + 10);
            
        }else if(!this.freezing) {
            this.speed = this.maxSpeed;
            this.dmgMultiplier = 1; 
        }
	}
	this.onKill = function() {
		for(var i = 0; i <= 10; i ++)
    		{
    			if(!splats[i]) {
    				splats[i]=new BloodSplat(this.x-20,this.y-20,this.w+40,this.h+40,i);
    				
    				break;
    			}
    		}

        player.currentLevel.onEnemyKill(this.type);
        delete enemies[this.id];
	}
	this.startBurning = function(burningTime,dmg) {
		this.burnDmg = dmg;
		this.burningTime = burningTime;
		this.burnStart = now;
	}
    this.freeze = function(freezeTime) {
        this.freezeTime = freezeTime;
        this.freezeStart = now;
        this.dmgMultiplier = 5;
    }
    this.setDimensions = function(w,h){
	    this.w = w;
	    this.h = h;
        this.hpBar = new LoadingBar(this.x,this.y - 10,this.w,this.h/5);
    }
    this.setPosition = function(newX,newY) {
		this.x = newX;
		this.y = newY;
        this.hpBar = new LoadingBar(this.x,this.y - 10,this.w,this.h/5);

    }

}
