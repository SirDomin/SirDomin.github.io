var canvas = document.getElementById("canvas");
if(window.innerWidth < 500) canvas.width = window.innerWidth;
else canvas.width = 500;

canvas.height = canvas.width;

colors = ["lime","pink","cyan","yellow"];
colorsPointer = 0;
canvas.w = canvas.width;
canvas.h = canvas.width;
var ctx = canvas.getContext("2d");
r = canvas.h / 2.1;

x = canvas.w / 2;
y = canvas.h / 2;
elements = 10;
var multiplier = 2;
var color = "green";
angle = 360/elements;
var renderDots = 1;
var transparent = false;
document.getElementById("renderdots").onchange = function(){
    renderDots ^= 1;
    refresh();
};
document.getElementById("transparent").onchange = function(){
  transparent ^= 1;
  refresh();
};
document.getElementById("multiplierSlider").oninput = function(){
    document.getElementById("multiplier").value = this.value;
    multiplier = parseFloat(this.value) ;
    refresh();
};
document.getElementById("elementsSlider").oninput = function(){
    document.getElementById("elements").value = this.value;
    elements = parseInt(this.value) ;
    refresh();
};

document.getElementById("multiplier").onchange = function(){
  multiplier = parseInt(this.value) || (document.getElementById("multiplier").value = 1);
  refresh();

};
document.getElementById("elements").onchange = function(){

    elements = parseInt(this.value) || (document.getElementById("elements").value = 1);
    refresh();
};



var refresh = function(){
    var startX = x;
    var startY = y-r;
    var points = [];
    var lastX = startX-2;
    var lastY = startY-2;
    ctx.clearRect(0,0,canvas.w,canvas.h);
    ctx.fillStyle = "white";
    if(!transparent)ctx.fillRect(0,0,canvas.w,canvas.h);
    for (var i = 0; i < elements; i++) {
        ctx.beginPath();
        //ctx.moveTo(canvas.w / 2, canvas.h / 2);
        ctx.arc(x, y,r , i * 2 * Math.PI / elements, (i + 1) * 2 * Math.PI / elements, false);
        points.push({x: x + r * Math.cos(i * 2 * Math.PI / elements)-0.5, y: y + r * Math.sin(i * 2 * Math.PI / elements)-0.5 });
        lastX = x + r * Math.cos(i * 2 * Math.PI / elements)-2;
        lastY = y + r * Math.sin(i * 2 * Math.PI / elements)-2;
        ctx.fillStyle = "red";
        if(renderDots)ctx.fillRect(points[i].x-1,points[i].y-1,2,2);
        ctx.lineWidth = (((2137/elements)*0.1) > 1.1)? 1.1 : (2137/elements)*0.1;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    ctx.moveTo(points[0].x,points[0].y);
    ctx.beginPath();
    for(var p = 0; p < points.length; p++){

        ctx.moveTo(points[p].x,points[p].y);
        ctx.lineTo(points[(p * multiplier )% (points.length)].x,points[(p * multiplier )% (points.length)].y);
    }
    ctx.stroke();
};

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById("download").addEventListener("click", function(){
   downloadCanvas(this,"canvas","Circle E"+elements+"M"+multiplier);

});
refresh();




















