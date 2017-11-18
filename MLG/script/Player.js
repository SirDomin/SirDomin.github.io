function Player(w,h,x,y,hp,s,gold,dmg){
	this.dmg = dmg;
	this.gold = gold;
	this.maxHP = hp;
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.hp = hp;
	this.speed = s;
	
	this.handler=0;
	this.ownedWeapons=[0];
		this.weapon = Wp[0];
	this.getCenterX=function(){
		return (this.x+25);
	}
	
	
}

Player.prototype.getCenterY=function(){
	return (this.y+25);
}

Player.prototype.getHp=function(){
	return this.hp;
}

Player.prototype.getX=function(){
	return this.x;
}
Player.prototype.getY=function(){
	return this.y;
}
Player.prototype.getW=function(){
	return this.w;
	
}
Player.prototype.getH=function(){
	return this.h;
}

Player.prototype.moveRight=function(){
	this.x+=this.speed;
	
	
}
Player.prototype.moveLeft=function(){
	this.x-=this.speed;
	
	
}

