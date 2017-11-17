var Weapon0 = function(){
	this.image = new Image();
	this.image.src = "img/0.png";
	this.reloadTime=100;
	this.magazine=7;
	this.ammo=7;
	this.id=0;
	this.length=20;
	this.name = "Colt";
	this.dmg = 1;
	this.ms = 400;
	this.autofire =false;
	this.bs = 6;
	this.lufa = 2;
		this.w = 13;
		this.h = 9;
	this.shot = function(){
		if(this.ammo>0&&!reloading&&!reloading){
				this.sound = new Audio("sound/glock.wav");
				this.sound.play();
				this.sound.volume = 0.5;
				this.ammo--;
				bullets[this.ammo] = new Bullet(xr,yr,this.ammo,5,5,mouseangle);
		}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
	

			
		
	}
	

	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
	}
		this.render = function(){
			ctx.save();
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(265*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,328,12,13,9,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
			ctx.fillStyle="black";
		
		}
	
}
var Weapon1 = function(){
	this.image = new Image();
	this.image.src="img/7.png";
	this.reloadTime=200;
	this.magazine=40;
	this.ammo=40;
	this.w=22;
	this.h=18;
	this.lufa = 4
	this.name = "Mac10";
	this.id=1;
	this.price = 2000;
	this.dmg = .8;
	this.bs = 15;
	this.ms = 70;
	this. autofire = true;
	
		this.shot = function(){
			if(this.ammo>0&&!reloading){
				this.sound = new Audio("sound/mac10.wav");
				this.sound.play();
				this.sound.volume=0.5;
				this.ammo--;
				bullets[this.ammo] = new Bullet(xr,yr,this.ammo,4,4,mouseangle,(Math.random()*2)-5);
			}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
		
	}
	this.render = function(){
			ctx.save()
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(270*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,10,3,22,18,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
		}
	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
	
}


var Weapon2 = function(){
	this.image = new Image();
	this.image.src = "img/2.png";
	this.reloadTime=150;
	this.magazine=30;
	this.ammo=30;
	this.id=2;
	this.w = 54;
	this.h=17;
	this.lufa =4;
	this.price = 3550;
	this.name = "AK-47";
	this.dmg = 1.5;
	this.ms = 120;
	this.bs = 8;
	this.autofire = true;
	this.shot = function(){
		if(this.ammo>0&&!reloading){
		this.sound = new Audio("sound/ak47.wav");
		this.sound.play();
		this.sound.volume=0.5;
			bullets[this.ammo] = new Bullet(xr,yr,this.ammo,4,4,mouseangle);
			this.ammo--;
		}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
		
	
		
	}
		this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
	this.render = function(){
			ctx.save()
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(270*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,47,119,this.w,this.h,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
		}
	
}
var Weapon3=function(){
	this.image = new Image();
	this.image.src = "img/5.png";
	this.name = "Mag7";
	this.reloadTime=400;
	this.magazine=15;
	this.ammo=15;
	this.w=44;
	this.h=12;
	this.lufa=3;
	this.id=3;
	this.price = 5600;
		this.dmg = 2;
	this.bs = 20;
	this.ms = 600;
	this.autofire=false;
		this.shot = function(){
			if(this.ammo>0&&!reloading){
			this.sound = new Audio("sound/sawedoff.wav");
			this.sound.play();
				bullets[this.ammo-2] = new Bullet(xr,yr,this.ammo-2,4,4,mouseangle);
				bullets[this.ammo-1] = new Bullet(xr,yr,this.ammo-1,4,4,mouseangle,5);
				bullets[this.ammo] = new Bullet(xr,yr,this.ammo,4,4,mouseangle,-5);
				this.ammo-=3;
			}else if(!reloading){
		
			time=this.reloadTime;
			reloading=true;
		}
		
	}
	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
	this.render = function(){
			ctx.save();
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(270*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,131,173,this.w,this.h,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
		}
	
}
var Weapon4 = function(){
	this.image = new Image();
	this.image.src ="img/6.png";
	this.name = "XM";
	this.reloadTime=300;
	this.magazine=30;
	this.ammo=30;
	this.id=4;
	this.w=59;
	this.h=12;
	this.lufa=3;
	this.price = 8000;
			this.dmg = 2;
	this.bs = 20;
	this.ms = 300;
	this.autofire=true;
		this.shot = function(){
			if(this.ammo>0&&!reloading){
			this.sound = new Audio("sound/xm1014.wav");
			this.sound.volume=0.5;
				this.sound.play();
				bullets[this.ammo-2] = new Bullet(xr,yr,this.ammo-2,4,4,mouseangle);
				bullets[this.ammo-1] = new Bullet(xr,yr,this.ammo-1,4,4,mouseangle,5);
				bullets[this.ammo] = new Bullet(xr,yr,this.ammo,4,4,mouseangle,-5);
				this.ammo-=3;
			}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
		
	}
	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
	this.render = function(){
			ctx.save();
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(270*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,117,187,this.w,this.h,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
		}
	
}



var Weapon5 = function(){
	this.image = new Image();
	this.image.src = "img/3.png";
	this.id=5;
	this.reloadTime=500;
	this.magazine=8;
	this.ammo=8;
	this.w=52;
	this.h=16;
	this.lufa =5;
	this.price = 12000;
	this.name = "AWP";
	this.dmg = 3;
	this.bs = 20;
	this.ms = 1000;
	this.autofire = false;
	this.shot = function(){
		if(this.ammo>0&&!reloading){
			this.sound = new Audio("sound/awp.mp3");
		this.sound.play();
		bullets[this.ammo] = new Bullet(xr,yr,this.ammo,6,6,mouseangle);
		this.ammo--;
		}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
		
	}
	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
	this.render = function(){
			ctx.save();
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(270*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,178,168,this.w,this.h,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
		}
	
}
var Weapon6 = function(){
	this.image = new Image();
	this.image.src = "img/4.png";
	this.reloadTime=500;
	this.magazine=20;
	this.ammo=20;
	this.id=6;
	this.w=64;
	this.h=30;
	this.lufa =8;
	this.price = 13700;
	this.name = "G3SG1";
	this.dmg = 2;
	this.bs = 20;
	this.ms = 400;
	this.autofire=true;
		this.shot = function(){
			if(this.ammo>0&&!reloading){
				this.sound = new Audio("sound/g3.wav");
				this.sound.play();
				bullets[this.ammo] = new Bullet(xr,yr,this.ammo,10,4,mouseangle);
				this.ammo--;
			}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
		
	}
	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
			this.render = function(){

			ctx.save();
		ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
		ctx.rotate(270*Math.PI/180);
			
		ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
	
		ctx.drawImage(weaponRenderImage,248,238,128,60,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
		
	ctx.restore();
		}
}
var Weapon7= function(){
	this.image = new Image();
	this.id=7;
	this.reloadTime=600;
	this.magazine=250;
	this.ammo=250;
	this.w=50;
	this.h=32;
	this.lufa=6;
	this.price = 20000;
	this.image.src = "img/1.png";
	this.name = "MG";
	this.dmg = .5;
	this.ms = 85;
	this.bs = 16;
	this.autofire=true;
	this.shot = function(){
		if(this.ammo>0&&!reloading){
			this.sound = new Audio("sound/MG.wav");
			this.sound.play();
			bullets[this.ammo] = new Bullet(xr,yr,this.ammo,2,2,mouseangle,7);
			this.ammo--;
		}else if(!reloading){
			time=this.reloadTime;
			reloading=true;
		}
		
		
	}
	this.buy = function(){
		
		if(!zawiera(Gracz.ownedWeapons,this.id)){
			if(Gracz.gold >= this.price){
				Gracz.gold -= this.price;
				Gracz.ownedWeapons.push(this.id);
				komunikat(this.name+" Bought! ");
			}else komunikat("not enough gold !");
		}else komunikat("You own that weapon!");
		
	}
	this.render = function(){
			ctx.save();
				ctx.translate( Gracz.getCenterX(), Gracz.getCenterY()-25 );
				ctx.rotate(270*Math.PI/180);
				ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY()+25 );
				ctx.drawImage(weaponRenderImage,248,170,100,64,Gracz.getCenterX(),Gracz.getCenterY()-25,this.w,this.h);
			ctx.restore();
		}
	
}

Wp = [];


	
		Wp[0] = new Weapon0()
		Wp[1] = new Weapon1()
		Wp[2] = new Weapon2()
		Wp[3] = new Weapon3()
		Wp[4] = new Weapon4()
		Wp[5] = new Weapon5()
		Wp[6] = new Weapon6()
		Wp[7] = new Weapon7()
	
