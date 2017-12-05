var Button = function(x,y,w,h,imgsrc) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = new Image();
	this.img.src = imgsrc || "img/button.png";
	this.clicked = false;
	this.render = function() {
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    }
	this.onclick = function() {}
}
var WeaponChoiceButton = function(x,y,w,h,imgsrc) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = new Image();
	this.img.src = imgsrc || "img/button.png";
	this.clicked = false;
	this.render = function() {
		WCtx.drawImage(this.img,this.x,this.y,this.w,this.h);
	}
	this.onclick = function() {}
}
WeaponChoiceMenu = function(){
	this.started = 0;
	this.eowX,this.eowY;
	this.mouseAngle;
	this.selectedWeapon=false;
	this.weaponImages = [];
	this.audio = new Audio();
	this.audio.volume = 0.5;
	this.blur = 0;
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2+115,canvas.h/2+ 40,50,40,"img/coltSide.png"));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2+25,canvas.h/2+ 125,50,40,"img/uziSide.png"));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-110,canvas.h/2+ 115,90,50,"img/akSide.png"));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-150,canvas.h/2,30,110,"img/shotgunSide.png"));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-150,canvas.h/2-115,30,110,"img/flamethrowerSide.png"));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-120,canvas.h/2-180,110,90,"img/machineGun.png"));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2,canvas.h/2-180,110,90,"img/laserGun.png"));
	this.handle = function() {
		if(!this.started) {
			this.start();
		}
	}
	this.hide = function() {
		mouse.down = false;
		this.started = 0;
		this.audio.src = sounds[9].src;
		this.audio.play();
		pause = false;
		if(this.selectedWeapon<7)player.changeWeapon(this.selectedWeapon);
		document.getElementById("WeaponChoice").style.visibility = "hidden";
		this.blur = 0
		Canvas.style.webkitFilter = "blur(0px)";
	}
	this.start = function() {
		this.tmp = new Weapon0();
		this.selectedWeapon = 0;
		this.audio.src = sounds[8].src;
		this.audio.play();
		this.lastWeapon = player.weapon.id;
		this.started = 1;
		pause = true;
		document.getElementById("WeaponChoice").style.visibility = "visible";
	}
	this.calculateMouseAngle = function() {
		this.eowX = canvas.w/2 + canvas.h/2.6 * Math.cos(-Math.atan2((canvas.h/2) - mouse.y, mouse.x - (canvas.w/2)));
		this.eowY = canvas.h/2 + canvas.h/2.6 * Math.sin(-Math.atan2((canvas.h/2) - mouse.y, mouse.x - (canvas.w/2)));	
		this.mouseAngle = Math.atan2((canvas.w/2) - this.eowX, this.eowY - (canvas.h/2)) + .5 * Math.PI;
		if(this.mouseAngle < 0) this.mouseAngle+= 2* Math.PI;
	}
	this.drawSegments = function() {
		//8 weapon segments
		for (var i = 0; i < 8; i++) {
        	WCtx.beginPath();
        	WCtx.moveTo(canvas.w/2,canvas.h/2);
        	WCtx.arc(canvas.w/2,canvas.h/2, canvas.h/2.6, i*2 * Math.PI / 8, (i+1)*2 * Math.PI / 8, false);
        	if(this.mouseAngle >i*2 * Math.PI / 8 && this.mouseAngle < (i+1)*2 * Math.PI / 8 && getDistanceBetweenPoints(canvas.w/2,canvas.h/2,mouse.x,mouse.y) > canvas.h / 4) {
        		this.selectedWeapon = i;
        		WCtx.fill()
        	}
        	WCtx.lineWidth = 1;
        	WCtx.strokeStyle = '#444';
        	WCtx.stroke();
    	}
    	//middle arc
    	WCtx.beginPath()
		WCtx.arc(canvas.w/2,canvas.h/2,canvas.h/4, 0 * Math.PI,2 * Math.PI);
		WCtx.fillStyle = "rgb(77,77,77)";
		WCtx.fill();
		WCtx.stroke();
		WCtx.fillStyle = "lime";
	}
	this.render = function() {
		if(this.blur<4)Canvas.style.webkitFilter = "blur("+ (this.blur += 0.1)+"px)";
		this.calculateMouseAngle();
		this.selectedWeapon = false;
		WCtx.lineWidth = 1;
        WCtx.fillStyle = 'hsla(291, 11%, 77%, 0.36)';
	 	this.drawSegments();
		if(this.selectedWeapon!==false&&this.selectedWeapon<7){
			if(this.tmp.id != this.selectedWeapon) {
				try{
					this.tmp = new window["Weapon"+this.selectedWeapon]();
				}catch(error){
				
				}
			}
			WCtx.fillText("NAME: "+ this.tmp.name,canvas.w/2-50,canvas.h/2);
			WCtx.fillText("AMMO: "+ this.tmp.magazineSize,canvas.w/2-50,canvas.h/2+20);
			WCtx.fillText("DISPERSION: "+ this.tmp.dispersion,canvas.w/2-50,canvas.h/2+40);
		}else if(this.selectedWeapon>=5) {
			WCtx.fillStyle = "red";
			WCtx.fillText("LOCKED",canvas.w/2-50,canvas.h/2);
		
		}else {
			WCtx.fillText("Move mouse ",canvas.w/2-50,canvas.h/2);
			WCtx.fillText("AMMO: "+ this.tmp.magazineSize,canvas.w/2-50,canvas.h/2+20);
			WCtx.fillText("DISPERSION: "+ this.tmp.dispersion,canvas.w/2-50,canvas.h/2+40);
		}
		for(var i in this.weaponImages) {
			this.weaponImages[i].render();
		}
	}
}
weaponChoiceMenu = new WeaponChoiceMenu();

Sprite = function() {
	
}