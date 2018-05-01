
//useful functions
random = function(min,max) {
	return Math.random() * (max - min) + min;
}
setShadow = function(xOffset,yOffset) {
	ctx.shadowOffsetX = xOffset; 
	ctx.shadowOffsetY = yOffset;
}
mute = function() {
	if(volume == 0) {
		volume = defVolume;
		return true
	}else {
		volume = 0;
		return false;
	}
}
changeVolume = function(value) {
	volume = value;
}
getDistanceBetweenPoints = function(x1,y1,x2,y2) {
	return (Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
}
//returns decimal value out of division 2 numbers
getDecimalValue = function(curr,max) {
	return curr/max;
}
//returns value that does not extend minimum and maximum given value
maximum = function(min,curr,max) {
	if(curr < min)return min;
		else if(curr > max)return max;
	return curr;
}
var ShopButton = function(x,y,w,h,imgsrc) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = imgsrc;
	//this.img.src = imgsrc || "img/button.png";
	this.clicked = false;
	this.render = function() {
            shop.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    }
	this.onclick = function() {}
}
/////
var Button = function(x,y,w,h,imgsrc) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = imgsrc;
	//this.img.src = imgsrc || "img/button.png";
	this.clicked = false;
	this.render = function() {
      
            ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
       
    }
	this.onclick = function() {}
}
var WeaponChoiceButton = function(x,y,w,h,img) { 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = img
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
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2+115,canvas.h/2+ 40,50,40,getImage("coltSide")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2+25,canvas.h/2+ 125,50,40,getImage("uziSide")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-110,canvas.h/2+ 115,90,50,getImage("akSide")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-150,canvas.h/2,30,110,getImage("shotgunSide")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-150,canvas.h/2-115,30,110,getImage("flamethrowerSide")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2-120,canvas.h/2-180,110,90,getImage("machineGun")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2,canvas.h/2-180,110,90,getImage("laserGunSide")));
	this.weaponImages.push(new WeaponChoiceButton(canvas.w/2+107,canvas.h/2-70,70,50,getImage("iceGunSide")));
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
		if(this.selectedWeapon<8)player.changeWeapon(this.selectedWeapon);
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
		if(this.selectedWeapon!==false && this.selectedWeapon in player.ownedWeapons){
			if(this.tmp.id != this.selectedWeapon ) {
				try{
					this.tmp = new window["Weapon"+this.selectedWeapon]();
				}catch(error){
				
				}
			}
			WCtx.fillText("NAME: "+ this.tmp.name,canvas.w/2-50,canvas.h/2);
			WCtx.fillText("AMMO: "+ this.tmp.magazineSize,canvas.w/2-50,canvas.h/2+20);
			WCtx.fillText("DISPERSION: "+ this.tmp.dispersion,canvas.w/2-50,canvas.h/2+40);
		}else if(!(this.selectedWeapon in player.ownedWeapons) && this.selectedWeapon!==false) {
			WCtx.fillStyle = "red";
			WCtx.fillText("LOCKED",canvas.w/2-50,canvas.h/2);
		
		}else {
			WCtx.fillText("Move mouse ",canvas.w/2-50,canvas.h/2);
			
		}
		for(var i in this.weaponImages) {
            if(i in player.ownedWeapons)
			 this.weaponImages[i].render();
		}
	}
}
weaponChoiceMenu = new WeaponChoiceMenu();


Level = function(day) {
    this.maxEnemies = Math.floor(Math.sqrt(day) * 20)
    this.enemies = this.maxEnemies;
    for(var i = this.enemies; i > 0; i--) {
        enemies[i] = new Enemy(i,Math.round(Math.sqrt(day) * 10));
    }
    this.onEnemyKill = function(type) {
        
        this.enemies--;
        player.currCash += 100;
        if(this.enemies <= 0) {
            player.days++;
            buttons[2].w = 40;
            buttons[2].h = 41;
            buttons[3].w = 40;
            buttons[3].h = 41;
        }
    }
    this.update = function() {
        
    }
}

Sprite = function() {
	
}