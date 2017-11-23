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
WeaponChoice = document.createElement("canvas");
WeaponChoice.width = canvas.w;
WeaponChoice.height = canvas.h;
WeaponChoice.style.position = 'absolute';
WeaponChoice.style.marginLeft = -canvas.w -1 + 'px';
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
	if(e.keyCode == 84){
		weaponChoiceMenu.handle();
	}
	keysDown[e] = true;
});
document.addEventListener("keyup",function(e){
	delete keysDown[e];
	if(e.keyCode == 84){
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
	player.shot();
	mouse.down = true;
});
Canvas.addEventListener("mouseup",function(e){
	player.weapon.onStop();
	mouse.down = false;
});
shopItems = [];
enemies = [];
buttons = [];
hitmarks = [];
splats = [];
//
buttons[buttons.length] = new Button(canvas.w - 50, 10, 30, 30, "img/settingsIcon.png");
buttons[buttons.length] = new Button(canvas.w - 90, 10, 30, 30, "img/volume.png");
var x = buttons.length -1;
buttons[x].onclick = function(){
	if(mute())
	{
		player.unmute();
		this.img.src = "img/volume.png";
	}else {
		player.mute();
		this.img.src = "img/novolume.png";
	}
};
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
main = function() {
 	d = new Date();
  	now = d.getTime();
	update();
	if(!pause)render();
	//if(84 in keysDown)WeaponChoiceUpdate();
	if(weaponChoiceMenu.started)WeaponChoiceUpdate();
	requestAnimationFrame(main);
}
update = function() {}
WeaponChoiceUpdate = function() {
	WCtx.clearRect(0,0,canvas.w,canvas.h);
	weaponChoiceMenu.render();
}
render = function() { 
	ctx.clearRect(0,0,canvas.w,canvas.h);
	player.backgroundUpdate();
	for(var i in enemies) {
		enemies[i].render();
		enemies[i].update();
	}
	if(shop.active)shop.render();
	for(var i in buttons) {
		buttons[i].render();
	}
	player.render();
	player.update();
}
for(var i =0;i<20;i++)
enemies.push(new Enemy(i))

loadingStart = 0;
loadingEnd = 10000;
loadingBar = function(){
	ctx.clearRect(0,0,canvas.w,canvas.h);
	d = new Date()
	now = d.getTime();
  	if(!loadingStart){
  		
  		loadingStart = now;
  		
  	}
  	now -= loadingStart
  	
  	percentage = maximum(0,getDecimalValue(now,loadingEnd),1)
  		ctx.beginPath()
		ctx.arc(canvas.w/2,canvas.h/2,100, 0 * Math.PI,(2 * Math.PI) * percentage,false);
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
//main();
loadingBar();


