var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;

canvas.w = 500;
canvas.h = 500;
var ctx = canvas.getContext("2d");
r = canvas.h / 2.1;

x = canvas.w / 2;
y = canvas.h / 2;
elements = 10;
var multiplier = 2;
angle = 360/elements;

document.getElementById("multiplierSlider").oninput = function(){
    document.getElementById("multiplier").value = this.value
    multiplier = parseInt(this.value) ;
    refresh();
}
document.getElementById("elementsSlider").oninput = function(){
    document.getElementById("elements").value = this.value
    elements = parseInt(this.value) ;
    refresh();
}

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
    for (var i = 0; i < elements; i++) {
        ctx.beginPath();
        //ctx.moveTo(canvas.w / 2, canvas.h / 2);
        ctx.arc(x, y,r , i * 2 * Math.PI / elements, (i + 1) * 2 * Math.PI / elements, false);
        points.push({x: x + r * Math.cos(i * 2 * Math.PI / elements)-0.5, y: y + r * Math.sin(i * 2 * Math.PI / elements)-0.5 });
        lastX = x + r * Math.cos(i * 2 * Math.PI / elements)-2;
        lastY = y + r * Math.sin(i * 2 * Math.PI / elements)-2;
        ctx.fillStyle = "red";
        ctx.fillRect(points[i].x-1,points[i].y-1,2,2);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'black';
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


refresh();




















