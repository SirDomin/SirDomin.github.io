defVolume = 0.02;
volume = defVolume;
pause = false;

//declare time in game
d = new Date();
now = d.getTime();
//create canvas
document.createElement("canvas");
Canvas = document.getElementById("canvas");
Canvas.width = canvas.w;
Canvas.height = canvas.h;
Canvas.style.border = "solid 1px black";
Canvas.style.marginLeft = window.innerWidth/2 - canvas.w/2+"px";
Canvas.style.marginTop = window.innerHeight/2 - canvas.h/2+"px";
//Canvas.style.visibility = 'hidden';
WeaponChoice = document.createElement("canvas");
WeaponChoice.width = canvas.w;
WeaponChoice.height = canvas.h;
WeaponChoice.style.position = 'absolute';
WeaponChoice.style.marginLeft = -canvas.w -1 + 'px';
WeaponChoice.style.marginTop = window.innerHeight/2 - canvas.h/2+"px";
WeaponChoice.id = "WeaponChoice";
WeaponChoice.style.visibility = 'hidden';
WCtx = WeaponChoice.getContext("2d");
document.body.appendChild(WeaponChoice);
ctx = Canvas.getContext("2d");
//mouse, so you can use it in objects
mouse = {
	x : 0,
	y : 0,
	down : false,
}
shop = new Shop();
keysDown = [];
//keyboard events
document.addEventListener("keydown",function(e){
	if(e.keyCode == 82){
		player.weapon.magazine = 0;
		player.weapon.shot();
	}
	if(e.keyCode == 84 && !shop.active){
		weaponChoiceMenu.handle();
	}
	keysDown[e] = true;
});
document.addEventListener("keyup",function(e){
	delete keysDown[e];
	if(e.keyCode == 84 && !shop.active){
		weaponChoiceMenu.hide();
	}

})
//update mouse coords
document.addEventListener("mousemove", function(e){
	mouse.x=e.pageX-Canvas.offsetLeft;
    mouse.y=e.pageY-Canvas.offsetTop;
});

//create player
player = new Player();
//mouse events
WeaponChoice.addEventListener("mousedown", function(e){
	weaponChoiceMenu.handle();
	
});
Canvas.addEventListener("mousedown", function(e){
	for(var i in buttons) {
		if(mouse.x > buttons[i].x && mouse.x < buttons[i].x + buttons[i].w && mouse.y > buttons[i].y && mouse.y < buttons[i].y + buttons[i].h) {
			buttons[i].onclick();
		}
	}
	if(!shop.active){
		player.shot();
        mouse.down = true;
    }
});
Canvas.addEventListener("mouseup",function(e){
	player.weapon.onStop();
	mouse.down = false;
});
shopItems = [];

buttons = [];
hitmarks = [];
splats = [];
//
buttons[buttons.length] = new Button(canvas.w - 50, 10, 30, 30, getImage("settingsIcon"));
buttons[buttons.length] = new Button(canvas.w - 90, 10, 30, 30, getImage("volumeImg"));
var x = buttons.length -1;
buttons[x].onclick = function(){
	if(mute())
	{
		player.unmute();
		this.img = getImage("volumeImg");
	}else {
		player.mute();
		this.img = getImage("noVolumeImg");
	}
};
buttons[0].onclick = function(){
    
};
buttons.push(new Button(canvas.w-300, 5, 40, 41, getImage("goButton")));
buttons[2].onclick = function() {
    player.newRound(2);
}
buttons[3] = new Button(canvas.w - 250, 5, 40, 41, getImage("shopButton"));
buttons[3].onclick = function() {
	mouse.down = false;
    shop.open();
}

main = function() {
 	d = new Date();
  	now = d.getTime();
	update();
	if(!pause)render();
	//if(84 in keysDown)WeaponChoiceUpdate();
	if(weaponChoiceMenu.started)WeaponChoiceUpdate();
	//main();
}
update = function() {}
WeaponChoiceUpdate = function() {
	WCtx.clearRect(0,0,canvas.w,canvas.h);
	weaponChoiceMenu.render();
}
render = function() {
	ctx.clearRect(0,0,canvas.w,canvas.h);
    player.backgroundUpdate();

    for(var i in splats) {
        splats[i].render();
    }
	for(var i in enemies) {
		enemies[i].render();
		enemies[i].update();
	}
    for(var i in enemies) {
        enemies[i].hpBar.update("hsla(" + 124 * maximum(0,getDecimalValue(enemies[i].currHp,enemies[i].maxHp),1)  + ", 100%, 45%, 1)",maximum(0,getDecimalValue(enemies[i].currHp,enemies[i].maxHp),1));

    }
	if(shop.active)shop.render();
	for(var i in buttons) {
		buttons[i].render();
	}
	player.render();
	player.update();
    if(shop.active)shop.render();
    if(menu.active)menu.render();
}


loadingStart = 0;
loadingEnd = imagesToLoad.length + loadingWeaponsSound.length ;

loadingBar = function(){
	ctx.clearRect(0,0,canvas.w,canvas.h);
	d = new Date()
	now = d.getTime();
  	if(!loadingStart){
  		
  		loadingStart = now;
  		
  	}
  	now -= loadingStart
  	
  	percentage = maximum(0,getDecimalValue(imagesToLoad.length + loadingWeaponsSound.length ,loadingEnd),1)
  		ctx.beginPath()
		ctx.arc(canvas.w/2,canvas.h/2,100, 0 * Math.PI,(2 * Math.PI) * percentage,false);
        ctx.fillStyle = "rgb(77,77,77)";
        ctx.fillRect(0,0,canvas.w,canvas.h);
		ctx.fillStyle = "lime";
    
		ctx.font ="13px Arial";
		ctx.fillText("LOADING",canvas.w/2-95,canvas.h/2)
		ctx.fillText("Player "+loading,0,canvas.h-100);
		ctx.fillText("Sounds: "+loadingWeaponsSound,0,canvas.h-80);
		ctx.fillText("Weapons: "+imagesToLoad,0,canvas.h-60);
		ctx.lineWidth = 5;
		ctx.strokeStyle = "black";
		ctx.stroke();
		console.log()
		if(percentage < 1 &&( !isEmpty(loading) || !isEmpty(loadingWeaponsSound) || !isEmpty(imagesToLoad))){
			
			requestAnimationFrame(loadingBar)
		}else {
			main();
		}

}

isEmpty = function(array){
	for(var i in array)
	{
		
		if(array[i])return false;
	}
	return true;
}
menu = new Menu();
//main();
setInterval(main,1000/70);
loadingBar();


