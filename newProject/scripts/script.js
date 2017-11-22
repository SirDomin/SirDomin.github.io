
//prepare canvas to draw on it
canvas = {
	w : 640,
	h : 480, 
}
defVolume = 0.02;
volume = defVolume;

pause = false;
//declare time in game
d = new Date();
//create canvas
now = d.getTime();
document.createElement("canvas");
Canvas = document.getElementById("canvas");
Canvas.width = canvas.w;
Canvas.height = canvas.h;
Canvas.style.border = "solid 1px black";

//
weaponChoiceButtons = [];
WeaponChoice = document.createElement("canvas");
WeaponChoice.width = canvas.w;
WeaponChoice.height = canvas.h;
selectedWeapon = false;
WeaponChoiceEntryAudio = new Audio("sounds/WeaponChoiceEntry.mp3");
WeaponChoiceEntryAudio.volume = volume;

WeaponChoiceLeave = new Audio("sounds/WeaponChoiceLeave.mp3")
WeaponChoiceLeave.volume = volume;

WeaponChoice.style.position = 'absolute';
WeaponChoice.style.marginLeft = -canvas.w -1 + 'px';
WeaponChoice.id = "WeaponChoice";
WeaponChoice.style.visibility = 'hidden';
WCtx = WeaponChoice.getContext("2d");
document.body.appendChild(WeaponChoice);
WCtx.fillRect(200,200,200,200);
//
ctx = Canvas.getContext("2d");
//mouse, so you can use it in objects
mouse = {
	x : 0,
	y : 0,
	down : false,
}
shop = new Shop();

//keyboard events
document.addEventListener("keydown",function(e){
	console.log(e.key);
	if(e.key == "r"){
		player.weapon.magazine = 0;
		player.weapon.shot();
	}
	if(e.key == "t"){

		if(Canvas.style.webkitFilter == "blur(4px)") {
			WeaponChoiceLeave.play();
			pause = false;
			document.getElementById("WeaponChoice").style.visibility = "hidden";
			Canvas.style.webkitFilter = "blur(0px)";
		}else {
			WeaponChoiceEntryAudio.play();
			pause = true;

			weaponChoiceButtons.push(new WeaponChoiceButton(canvas.w/2+115,canvas.h/2+ 40,50,40,"img/coltSide.png"));
			weaponChoiceButtons.push(new WeaponChoiceButton(canvas.w/2+25,canvas.h/2+ 125,50,40,"img/uziSide.png"));
			//weaponChoiceButtons[0].onclick = function(){player.weapon = new Weapon0(player.x,player.y+player.h/2-10)}
			document.getElementById("WeaponChoice").style.visibility = "visible";
			Canvas.style.webkitFilter = "blur(4px)";
		}
	}
});
//update mouse coords
document.addEventListener("mousemove", function(e){
	mouse.x=e.pageX-Canvas.offsetLeft;
    mouse.y=e.pageY-Canvas.offsetTop;
});
//create player
player = new Player();

WeaponChoice.addEventListener("mousedown", function(e){
	WeaponChoiceLeave.play();
	pause = false;
	WeaponChoice.style.visibility = "hidden";
	Canvas.style.webkitFilter = "blur(0px)";
	player.changeWeapon(selectedWeapon)
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
		this.img.src = "img/volume.png";
	}else {
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

	WeaponChoiceUpdate();
	requestAnimationFrame(main);
}
update = function() {

}
WeaponChoiceUpdate = function() {

	var eowX = canvas.w/2 + canvas.h/2.6 * Math.cos(-Math.atan2((canvas.h/2) - mouse.y, mouse.x - (canvas.w/2)));
	var eowY = canvas.h/2 + canvas.h/2.6 * Math.sin(-Math.atan2((canvas.h/2) - mouse.y, mouse.x - (canvas.w/2)));	
	WCtx.clearRect(0,0,canvas.w,canvas.h);
	
	var mouseAngle = Math.atan2((canvas.w/2) - eowX, eowY - (canvas.h/2)) + .5 * Math.PI;
	if(mouseAngle < 0) mouseAngle+= 2* Math.PI;
	selectedWeapon = "false";
	 for (var i = 0; i < 8; i++) {
        WCtx.beginPath();
        WCtx.moveTo(canvas.w/2,canvas.h/2);
        WCtx.arc(canvas.w/2,canvas.h/2, canvas.h/2.6, i*2 * Math.PI / 8, (i+1)*2 * Math.PI / 8, false);
        WCtx.lineWidth = 1;
        WCtx.fillStyle = 'hsla(291, 11%, 77%, 0.36)';
        if(mouseAngle >i*2 * Math.PI / 8 && mouseAngle < (i+1)*2 * Math.PI / 8 && getDistanceBetweenPoints(canvas.w/2,canvas.h/2,mouse.x,mouse.y) > canvas.h / 4) {
        	selectedWeapon = i;
        	WCtx.fill()
        }
        WCtx.lineWidth = 1;
        WCtx.strokeStyle = '#444';
        WCtx.stroke();
    }
    WCtx.beginPath()
	WCtx.arc(canvas.w/2,canvas.h/2,canvas.h/4, 0 * Math.PI,2 * Math.PI);
	WCtx.fillStyle = "black";
	WCtx.fill();
	WCtx.stroke();

	WCtx.fillStyle = "lime";
	if(selectedWeapon!="false"){
		try{
			var tmp = new window["Weapon"+selectedWeapon]();
			WCtx.fillText("NAME: "+ tmp.name,canvas.w/2-50,canvas.h/2);
			WCtx.fillText("AMMO: "+ tmp.magazineSize,canvas.w/2-50,canvas.h/2+20);
			WCtx.fillText("DISPERSION: "+ tmp.dispersion,canvas.w/2-50,canvas.h/2+40);
		}catch(error){

		}
	}

	for(var i in weaponChoiceButtons) {
			weaponChoiceButtons[i].render();
		
	}
}

render = function() { 
	ctx.clearRect(0,0,canvas.w,canvas.h);
	player.render();
	player.update();
	for(var i in enemies) {
		enemies[i].render();
		enemies[i].update();
	}
	if(shop.active)shop.render();
	for(var i in buttons) {
		buttons[i].render();
	}
}
main();

