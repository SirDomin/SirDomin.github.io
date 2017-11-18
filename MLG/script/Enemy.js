
var Enemy = function(id,w,h,dmg,hp,v,los){
	
	this.maxHP=hp;
	this.hp = hp;
	this.dmg = dmg
	this.img=new Image();
	this.img.src = "img/enemies.png";
	this.v = v;
	this.id = id;
	this.los = los;
	this.speed = 1+los/4;
	this.w=w;
	this.h = h;
	this.x =  Math.floor((Math.random() * 200) + 640);
	this.y =  Math.floor((Math.random() * 280) + 40+this.h);
	this.render = function(){
		ctx.save();
		ctx.translate( this.centerX(), this.centerY() );
		ctx.rotate(270*Math.PI/180);
		ctx.translate( -this.centerX(), -this.centerY() );
			switch(this.los){
				case 1:
					ctx.drawImage(this.img,0,0,120,122,this.x,this.y,this.w,this.h);
				break
					case 2:
						ctx.drawImage(this.img,320,0,120,122,this.x,this.y,this.w,this.h);
					break
						case 3:
							ctx.drawImage(this.img,520,0,120,122,this.x,this.y,this.w,this.h);
						break
							case 4:
								ctx.drawImage(this.img,520,145,120,122,this.x,this.y,this.w,this.h);
							break
			}		
		ctx.restore();
		ctx.fillStyle = "black";
		ctx.fillRect(this.x-1,this.y-8,this.w+1,6)
		ctx.fillStyle = "red";
		ctx.fillRect(this.x,this.y-7,(getPercent(this.hp,this.maxHP)/100)*this.w,4);
		

	}
	this.centerX=function(){
		return (this.x+this.w/2)
	}
	this.centerY=function(){
		return (this.y+this.h/2)
	}
	
	this.tick=function(){
		this.x-=this.speed;
			if(this.x<canvasWidth){
					for(var i = 0;i<maxBullets;i++){
						if(bullets[i] &&this.x < bullets[i].x + bullets[i].w &&this.x + this.w > bullets[i].x &&this.y < bullets[i].y + bullets[i].h &&this.h + this.y > bullets[i].y){
							this.hp-=bullets[i].dmg;
							if(Gracz.weapon.dmg!=3)delete bullets[i];
						}
					}		
					if(this.hp<=0){
						goldEarned += this.v*((this.los/2)+1);
						Gracz.gold+=this.v*((this.los/2)+1);
						Napis_[getFreeNapis()]=new Napis(this.x,this.y,this.v*((this.los/2)+1));
						delete enemies[this.id];enemiesCount --;
					}
		
					if(this.x<=75){Gracz.hp-=this.dmg;delete enemies[this.id];enemiesCount --;} 
			}
	}
	
}