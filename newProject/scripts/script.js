
//prepare canvas to draw on it
canvas = {
	w : 640,
	h : 480, 
}
defVolume = 0.02;
volume = defVolume;
//declare time in game
d = new Date();
//create canvas
now = d.getTime();
document.createElement("canvas");
Canvas = document.getElementById("canvas");
Canvas.width = canvas.w;
Canvas.height = canvas.h;
Canvas.style.border = "solid 1px black";
ctx = Canvas.getContext("2d");
//mouse, so you can use it in objects
mouse = {
	x : 0,
	y : 0,
	down : false,
}

//update mouse coords
Canvas.addEventListener("mousemove", function(e){
	mouse.x=e.pageX-Canvas.offsetLeft;
    mouse.y=e.pageY-Canvas.offsetTop;
});
//create player
player = new Player();
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
enemies = [];
buttons = [];
hitmarks = [];
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
	render();
	requestAnimationFrame(main);
}
update = function() {

}
render = function() { 
	ctx.clearRect(0,0,canvas.w,canvas.h);
	player.render();
	player.update();
	for(var i in buttons) {
		buttons[i].render();
	}
}
main();

