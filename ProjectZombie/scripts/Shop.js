ShopItem = function(name,price,desc,magazine){
	this.name = name;
	this.price = price;
	this.desc = desc;
	this.magazine = magazine;
}
var Shop = function(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = canvas.w;
    this.canvas.height = canvas.h;
    this.canvas.style.position = 'absolute';
    this.canvas.style.marginLeft = -canvas.w -1 + 'px';
    this.canvas.style.marginTop = window.innerHeight/2 - canvas.h/2+"px";
    this.canvas.style.visibility = "hidden";
    document.body.appendChild(this.canvas);
    this.selectedItem = 0;
    this.selectedWeapon = new Weapon0();
	this.active = false;
	this.buttons = [
        new ShopButton(canvas.w-50,0,50,50),
    ];
    
    this.buttons[0].img = images[12];
    this.buttons[0].onclick = function(){
       shop.close();
    }
    this.buttons[1] = new ShopButton(150,50,80,200,getImage("shopbtnv"));
    this.buttons[2] = new ShopButton(canvas.w-230,50,80,200,getImage("shopbtnv"));
    this.buttons[3] = new ShopButton(220,canvas.h - 100,200,80,getImage("shopbtn"));
    //this.buttons[3] = new ShopButton(50,250,200,80,getImage("shopbtn"));
    //this.buttons[4] = new ShopButton(50,350,200,80,getImage("shopbtn"));
    //this.buttons[5] = new ShopButton(canvas.w-250,50,200,80,getImage("shopbtn"));
    //this.buttons[6] = new ShopButton(canvas.w-250,150,200,80,getImage("shopbtn"));
    //this.buttons[7] = new ShopButton(canvas.w-250,250,200,80,getImage("shopbtn"));
    this.buttons[1].onclick = function() {
        shop.prevWeapon();
    }
    this.buttons[2].onclick = function() {
        shop.nextWeapon();
    }
    this.buttons[3].onclick = function() {
        if(player.currCash >= shop.selectedWeapon.price) {
            if(player.unlockWeapon(shop.selectedWeapon.id)) {
                player.currCash-=shop.selectedWeapon.price;
                alert("PRESS \"T\" To change weapon!")
            }
        }
    }
	this.render = function() {
		this.ctx.fillStyle = "rgb(77,77,77)";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.shadowColor = "black"
        this.ctx.shadowOffsetX = 2; 
        this.ctx.shadowOffsetY = 2;
        this.ctx.fillStyle = "#81c332";
		this.ctx.font = "40px Arial";
        this.ctx.fillText("-SHOP-",canvas.w/2-80,40);
        for(var i in this.buttons) {
            this.buttons[i].render();
        }
        var tmpW = getImage(this.selectedWeapon.imgSide).width;
        var tmpH = getImage(this.selectedWeapon.imgSide).height;
        var scaleH = tmpW/tmpH;
        tmpW = 150;
        tmpH = tmpH / scaleH;
        if(this.selectedWeapon.id!=3 && this.selectedWeapon.id !=4 & this.selectedWeapon.id !=5)
            this.ctx.drawImage(getImage(this.selectedWeapon.imgSide),250,50,tmpW,tmpH);
        else if(this.selectedWeapon.id==3) {
            this.ctx.drawImage(getImage(this.selectedWeapon.imgSide),250,50,tmpW/2,tmpH/18);
        } else if(this.selectedWeapon.id ==4) {
            this.ctx.drawImage(getImage(this.selectedWeapon.imgSide),250,50,tmpW,tmpH/8);
        }else {
            this.ctx.drawImage(getImage(this.selectedWeapon.imgSide),250,50,tmpW,tmpH/2);
        }
        this.ctx.font = "15px Arial"; 
        this.ctx.fillText(this.selectedWeapon.name,250,300);
        this.ctx.fillText("Ammo: "+this.selectedWeapon.magazineSize,250,315);
        this.ctx.fillText("Dmg: "+this.selectedWeapon.dmg,250,330);
        if(this.selectedWeapon.id in player.ownedWeapons) {
            this.ctx.fillText("Price: OWNED",250,345);
        }
        else{
            this.ctx.fillText("Price: $"+this.selectedWeapon.price,250,345);
            this.ctx.fillText("New Balance: ",450,canvas.h-85)
            if((player.currCash-this.selectedWeapon.price)<0)this.ctx.fillStyle="red";
            this.ctx.fillText((player.currCash-this.selectedWeapon.price)+"$",450,canvas.h-70)
        }
        this.ctx.font = "50px Arial";
        this.ctx.fillText("-BUY-",250,canvas.h-50);
        //this.ctx.drawImage(getImage("uziSide"),60,60,50,50);
        //this.ctx.drawImage(getImage("akSide"),60,160,100,50);
        
        //this.ctx.drawImage(getImage("shotgunSide"),10,220,50,150);
       
        //this.ctx.drawImage(getImage("flamethrowerSide"),60,360,150,50);
        
        //for(var i =1;i<5;i++) {
		//		this.tmp = new window["Weapon"+i]();
        //        
        //        
        //        
        //        
        //        
        //        
        //}
        //for(var i =1;i<4;i++) {
        //    this.tmp = new window["Weapon"+(i+4)]();
        //    
        //    this.ctx.fillText(this.tmp.name,canvas.w-150,(i*100) - 30);
        //    this.ctx.fillText("Ammo: "+this.tmp.magazineSize,canvas.w-150,(i*100) - 15)
        //    this.ctx.fillText("Dmg: "+this.tmp.dmg,canvas.w-150,(i*100) )
        //    this.ctx.fillText("Price: $"+this.tmp.price,canvas.w-150,(i*100) +15 )
        //}
        this.ctx.shadowOffsetX = 0; 
        this.ctx.shadowOffsetY = 0;
	}
	this.open = function() {
        player.weapon.onStop();
        mouse.down = false;

        this.active = true;
        this.canvas.style.visibility = "visible";
	}
	this.close = function() {
		this.active = false;
	    this.canvas.style.visibility = "hidden";
	}
    this.mouseDown = function(){
       
        for(var i in this.buttons){
            if(mouse.x > this.buttons[i].x && mouse.x < this.buttons[i].x + this.buttons[i].w && mouse.y > this.buttons[i].y && mouse.y < this.buttons[i].y + this.buttons[i].h) {
			     this.buttons[i].onclick();
            }
        }
    }
    this.prevWeapon = function() {
        if(this.selectedWeapon.id > 0) {
            this.selectedWeapon = new window["Weapon"+(--this.selectedWeapon.id)]();
        }
    }
    this.nextWeapon = function() {
        if(this.selectedWeapon.id < 7) {
            this.selectedWeapon = new window["Weapon"+(++this.selectedWeapon.id)]();
        }
    }
    
    this.canvas.addEventListener("mousedown",function(){
        shop.mouseDown();
    });
        
}