
var Bullet = function(x,y,id,w,h,angle,an){
	
	
	this.dmg = Gracz.dmg*Gracz.weapon.dmg;
	if(!an){
	this.angle = angle+(Math.random()*3)-2;
	}else this.angle = angle+((Math.random()*3)-2)*an
	this.rotation = kat;
	this.id = id;
	this.x = x;
	this.y = y;
	this.speed = Gracz.weapon.bs;
	this.w=w;
	this.h = h;
	
	
	
	this.render = function(){
		
		ctx.fillStyle="blue";
		ctx.save();
ctx.translate( this.x+this.w/2,this.y-this.h/2 );
ctx.rotate(this.rotation*2 );
ctx.translate( -this.x+this.w/2, -this.y-this.h/2 );
ctx.fillRect(this.x-this.w/2, this.y-this.w/2, this.w, this.h);
ctx.restore();
		
		
		
	}
	
	this.tick=function(){
		
	if(this.x<0||
	this.x>canvasWidth||
	this.y<0||
	this.y>canvasHeight) delete bullets[this.id];
		
		
		this.x += this.speed * Math.cos(degToRad(this.angle));
		this.y += this.speed * -1*Math.sin(degToRad(this.angle));
	}
	
}