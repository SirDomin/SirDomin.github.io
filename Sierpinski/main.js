let canvas = document.getElementsByClassName("canvas")[0];
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 1.03;
canvas.style.border = "solid 1px black";
ctx = canvas.getContext("2d");
settings = {
    numberOfDots: 500,
    dotSize: 2,
    //color: "#FE5F55",
    color: "black",
}

let dots, focusedDot, pickedDot;

generateFirstDots = function(){
    dots = [];
    focusedDot = 0;
    pickedDot = 1;
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    dots.push(new Dot(canvas.width / 2 - settings.dotSize / 2, canvas.height * 0.1, settings.color));
    dots.push(new Dot(canvas.width / 10 - settings.dotSize / 2, canvas.height * 0.9, settings.color));
    dots.push(new Dot(canvas.width - canvas.width / 10 - settings.dotSize / 2, canvas.height * 0.9, settings.color));
}


renderNextDot = function(){
    let tmpPoint = getPointInMiddle(dots[focusedDot], dots[pickedDot]);
    focusedDot = dots.push(new Dot(tmpPoint.x, tmpPoint.y, settings.color)) - 1;
    pickedDot = getRandomPoint();
}
main = function(){
    requestAnimationFrame(main);
}
getRandomPoint = function(){
    return (Math.floor(Math.random() * 3));
}
getPointInMiddle = function(pointA, pointB){
    let newPoint = {
        x: (pointA.x + pointB.x) / 2,
        y: (pointA.y + pointB.y) / 2,
    }
    return newPoint;
}
render = function(){
    for(let i = 0; i < settings.numberOfDots; i++){
        renderNextDot();
    }
}
document.getElementsByClassName("button-input")[0].onclick = function(){
    settings.numberOfDots = document.getElementsByClassName("number-of-dots")[0].value;
    settings.dotSize = document.getElementsByClassName("dot-size")[0].value;
    render();
}
document.getElementsByClassName("button-input")[1].onclick = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateFirstDots();
}
document.getElementsByClassName('number-of-dots')[0].oninput = function(){
    document.getElementById('number-of-dots').innerHTML = ("["+this.value+"]");
}
document.getElementsByClassName('dot-size')[0].oninput = function(){
    document.getElementById('dot-size').innerHTML = ("["+this.value+"]");
}
document.getElementsByClassName('dot-color')[0].onchange = function(){
    document.getElementById('dot-color').innerHTML = ("["+this.value.toUpperCase()+"]")
    settings.color = this.value;
}
generateFirstDots();
main();

