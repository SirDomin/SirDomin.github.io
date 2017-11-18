
//prepare canvas to draw on it
canvas = {
	w : 640,
	h : 480, 
}
volume = 0.05;
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
}
//update mouse coords
Canvas.addEventListener("mousemove", function(e){
	mouse.x=e.pageX-Canvas.offsetLeft;
    mouse.y=e.pageY-Canvas.offsetTop;
});
//create player
player = new Player();
Canvas.addEventListener("mousedown", function(e){
	player.shot();
});
enemies = [];
buttons = [];
hitmarks = [];
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
}
main();

