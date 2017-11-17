var Healer = function(){
	this.x=4;
	this.y =45;
	this.owned = false;
	this.img=new Image();
	this.img.src=("img/healer.png")
	this.render = function(){
		ctx.drawImage(this.img,this.x,this.y,50,50);
	}
	this.perTick=function(){
		if(Gracz.hp<Gracz.maxHP)Gracz.hp+=.05;
	}
	
}
var Macias = function(){
	this.name="MACIAS !";
	this.price = 10000;
	this.x=4;
	this.y=100
	this.img=new Image();
	this.img.src="";
	this.target = null;
	this.weapon=new Weapon2();
	this.maxBullets = 10;
	this.owned = 0;
	this.weapon.shot = function(){
	
		
		
			
				//bullets[getFreeBullet()] = new Bullet(Gracz.getCenterX(),Gracz.getCenterY(),getFreeBullet(),4,4);
				//radToDeg(Math.atan2((Gracz.y+Gracz.w/2) - mouseY, mouseX - (Gracz.x+Gracz.w/2)));
		
		if(klacias.target){
			this.sound = new Audio("sound/ak47.wav");
			this.sound.play();
			bullets[klacias.getFreeBullet()]=new Bullet(klacias.x+50,klacias.y+25,klacias.getFreeBullet(),4,4,radToDeg(Math.atan2((klacias.y+25) - klacias.target.y-(klacias.target.y/5), klacias.target.x-50- (klacias.x+25))))
		}
	}
	this.getFreeBullet=function(){
			for(var i =Gracz.maxBullets;i<maxBullets;i++){
		if(!bullets[i]){
			return i
			
		}
	}
		
	}
	
	
	this.getTarget=function(){
		for(var i =0;i<=maxEnemies;i++){
				if(enemies[i]&& enemies[i].x<600){
					
						klacias.target = enemies[i];
							
				}
				if(klacias.target && enemies[i]&&enemies[i].x<klacias.target.x)klacias.target = enemies[i];
				
			}
		
	}

	this.render = function(){
		ctx.fillRect(this.x,this.y,50,50);
	}
	this.perTick=function(){
		if(!klacias.target || klacias.target.hp<=0|| klacias.target.x<=75){
			klacias.target = null;
			klacias.getTarget();
			
		}	
		
	}
	
}
klacias = new Macias();
healer = new Healer();