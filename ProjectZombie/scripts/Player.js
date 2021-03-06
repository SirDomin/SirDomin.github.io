Player = function(){
	this.dmgMultiplier = 2;
	this.bgmusic = sounds[12];
	this.bgmusic.volume = volume * 1.5
	//this.bgmusic.play();
    this.days = 0;
	this.w = 75;
	this.h = 75	;
	this.x = 0;
	this.y = canvas.h/2 - this.w/2;
	this.eowX,this.eowY;
	this.currHp = 100;
	this.maxHp = 100;
	this.maxCash = 99999;
	this.currCash = 100;
	this.hpBar = new LoadingBar(10,10,100,30);
	this.baseWidth = 100;
	this.weaponsAmmo = [7,35,35,4,400,550,20,900];
	//loading gui icons
	this.hpIcon = getImage("hpIcon");
	this.background = getImage("background");
	this.guiTop = getImage("guiTop");
	this.base = getImage("base");
    this.handle = getImage("handle");
    this.bodyImg = getImage("body");
    this.bulletIcon = getImage("bulletIcon");
    this.levelBar = new LoadingBar(canvas.w - 300,10,200,30);
    this.weapon = new Weapon0(this.x,this.y);
    this.bulletMS = new LoadingBar(this.x,this.y-40,this.w,20);
    this.reloadingTime = new RoundedLoadingBar(canvas.w/2,canvas.h/2,50);
    this.ammoBar = new RoundedLoadingBar(37,this.y + this.h * 1.6,35);
    this.ammoBar.borderWidth = 5;
    this.ammoBar.counterClockwise = false;
    this.ammoBar.textX += 10;
    this.ammoBar.textY += 5;
    this.bullets = [];
    this.ownedWeapons = [true];
    this.currentLevel = level[0][this.days];

    this.reloadingTime.whenCompleteAction = function(){
    	player.weapon.magazine = player.weapon.magazineSize;
    	player.weapon.reloading = false;
    }
	this.update = function() {
		this.hpBar.update("hsla(" + 124 * maximum(0,getDecimalValue(this.currHp,this.maxHp),1)  + ", 100%, 45%, 1)",maximum(0,getDecimalValue(this.currHp,this.maxHp),1));
		ctx.drawImage(this.hpIcon,45,12,26,26);

        if(this.currentLevel.enemies > 0)this.levelBar.update("#81c332",maximum(0,getDecimalValue(this.currentLevel.enemies,this.currentLevel.maxEnemies),1));
		//end of weapon (shot start);
		//eowX -- end of weapon X axis
		//eowY -- end of weapon Y axis
		this.eowX = this.x+this.w/2 + this.weapon.length * Math.cos(-Math.atan2((this.y + this.w / 2) - mouse.y, mouse.x - (this.x+this.w/2))) - this.weapon.bulletW/2;
		this.eowY = this.y+this.h/2 + this.weapon.length * Math.sin(-Math.atan2((this.y + this.w / 2) - mouse.y, mouse.x - (this.x+this.w/2)));	
		this.bulletMS.update("hsla(" + 124 * maximum(0,getDecimalValue(now - this.weapon.lastShot,this.weapon.bulletMS),1)  + ", 100%, 45%, 1)",maximum(0,getDecimalValue(now - this.weapon.lastShot,this.weapon.bulletMS),1));	
		if(player.weapon.reloading){
			this.reloadingTime.update("hsla(258, 1%, 53%, 0.81)",maximum(0,getDecimalValue(now - this.weapon.reloadStart,this.weapon.reloadTime),1),"Reloading","lime",15);
		}else if(mouse.down && this.weapon.autofire){
			this.shot();
		}
        //this.currentLevel.update();
	}
	this.backgroundUpdate = function() {
		ctx.drawImage(this.background,0,0,canvas.w,canvas.h);
		ctx.drawImage(this.base,0,50,this.baseWidth,canvas.h);
		ctx.shadowColor = "black";
		setShadow(0,2);
		ctx.drawImage(this.guiTop,0,0,canvas.w,50);
		setShadow(2,2);
		ctx.font = "23px Arial";
		ctx.fillStyle = "#81c332";
		ctx.fillText("$ " + player.currCash,120,32);
        ctx.fillText("Day #"+this.days,220,32);
		setShadow(0,0);
	}
	this.render = function() {
		ctx.fillStyle = "lime";
		this.ammoBar.update("hsla(" + 124 * maximum(0,getDecimalValue(this.weapon.magazine,this.weapon.magazineSize),1)  + ", 100%, 45%, 1)",maximum(0,getDecimalValue(this.weapon.magazine,this.weapon.magazineSize),1),this.weapon.magazine,"hsla(" + 124 * maximum(0,getDecimalValue(this.weapon.magazine,this.weapon.magazineSize),1)  + ", 100%, 45%, 1)",20);
		//ctx.fillText(player.weapon.magazine + " / " +player.weapon.magazineSize,10,player.y + player.h * 1.5 + 100);
		//rotate turret to follow mouse angle
		ctx.drawImage(this.bodyImg,this.x,this.y,this.w,this.h);
		ctx.drawImage(this.bulletIcon,5,this.y + this.h * 1.35,30,30)
        //render active bullets
		for(var i in this.bullets) {
			this.bullets[i].render();
			this.bullets[i].update();
		}
        ctx.save();
        ctx.translate(this.x+this.w/2,this.y+this.h/2);
        ctx.rotate(-Math.atan2((this.y+this.h/2) - mouse.y, mouse.x - (this.x+this.w/2)));
        ctx.translate( -(this.x+this.w/2), -(this.y+this.h/2));
        //render player weapon before handle
        this.weapon.render();
        ctx.drawImage(this.handle,this.x,this.y,this.w,this.h);
        ctx.restore();
		for(var i in hitmarks) {
			hitmarks[i].render();
		}

	};
	this.shot = function() {
		if(mouse.y > 50 && getDistanceBetweenPoints(mouse.x,mouse.y,this.x+this.w / 2,this.y + this.h / 2)>this.weapon.length)
			this.weapon.shot(this.eowX,this.eowY);
	};
	this.changeWeapon = function(indexOfWeapon) {
		if(indexOfWeapon in this.ownedWeapons && this.weapon.id != indexOfWeapon && indexOfWeapon !== false){
			this.weaponsAmmo[this.weapon.id] = this.weapon.magazine;
			this.weapon = new window["Weapon"+indexOfWeapon](this.x,this.y);
			if(this.weaponsAmmo[indexOfWeapon] != undefined) {
				this.weapon.magazine = this.weaponsAmmo[indexOfWeapon];
			}
		}
	}
	this.mute = function(){
		this.bgmusic.volume = 0;
		for(var i in this.weapon.audio)
			this.weapon.audio[i].volume = 0;
	}
	this.unmute = function() {
		this.bgmusic.volume = defVolume;
		for(var i in this.weapon.audio)
			this.weapon.audio[i].volume = defVolume;
	}
    this.newRound = function(idOfButton) {
        buttons[idOfButton].w = 0;
        buttons[idOfButton].h = 0;
        buttons[idOfButton+1].w = 0;
        buttons[idOfButton+1].h = 0;
        this.currentLevel = level[0][this.days];
        this.currentLevel.init();
        this.weapon.magazine = this.weapon.magazineSize;
        this.weaponsAmmo = [7,35,35,4,400,550,20,900];
    }
    this.unlockWeapon = function(indexOfWeapon) {
        if(indexOfWeapon in this.ownedWeapons) return false;
        this.ownedWeapons[indexOfWeapon] = true;
            return true;
    }
    this.unlockAllWeapons = function() {
		for(var i = 1; i<=7; i++){
			this.unlockWeapon(i);
		}
		return("All weapons unlocked, have fun!");
	}
	//this.unlockAllWeapons();
}
LoadingBar = function(x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.borderWidth = 2;
	this.backgroundColor = "black";
	this.update = function(color, percentage) {
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.fillStyle = color;
		ctx.fillRect(this.x + this.borderWidth,this.y + this.borderWidth,(this.w - this.borderWidth * 2) * percentage,this.h - this.borderWidth * 2);
	}
}
RoundedLoadingBar = function(x,y,r,whenCompleteAction) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.textX = this.x-this.r+15;
	this.textY = this.y;
	this.borderWidth = 20;
	this.backgroundColor = "hsla(258, 1%, 53%, 0.81)";
	this.counterClockwise = true;
	this.whenCompleteAction = function(){}
	this.update = function(color, percentage,text,textColor,fSize) {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r, 0,(2 * Math.PI) * percentage,this.counterClockwise);
		ctx.fillStyle = textColor;
		ctx.font = fSize + "px Arial";
		ctx.fillText(text,this.textX,this.textY);
		ctx.lineWidth = this.borderWidth;
		ctx.strokeStyle = color;
		ctx.stroke();
		if(percentage > 0.97)this.whenCompleteAction();
	}
}