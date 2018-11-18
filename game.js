canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

settings = {
    tileWidth: canvas.width,
    tileHeight: canvas.height/4,
    bulletWidth: 10,
    bulletHeight: 10,
    baseObjectWidth1: canvas.width / 6,
    baseObjectWidth2: canvas.width / 4,
    baseObjectHeight: canvas.height / 10
}
images = [];
for(var i = 0; i < 5; i++){
    images[i] = new Image();
    images[i].src = "tile"+(i%1)+".png";
}
spiderImage = new Image();
spiderImage.src = "spider.png";
butterflyImage = new Image();
butterflyImage.src = "motyl.png";

player = new Player();
level = new Level(1);
enemies = [];
for(var i =0; i < 5; i++){
    enemies.push(new Enemy())
}
pause = false;
document.addEventListener("touchstart",function(e){

    if(e.changedTouches[0].pageX < canvas.width / 2){
        player.moveLeft();
    }else{
        player.moveRight();
    }
});
document.addEventListener("touchend", function(e){
    player.stop();
});
window.addEventListener("orientationchange", function() {
    if(window.innerHeight > window.innerWidth){
        document.body.style.setProperty("-webkit-transform", "rotate(-90deg)", null);
        this.document.getElementById("canvas").style="margin-left: 75vh;"
        pause = true;   
    }else{
        document.body.style.setProperty("-webkit-transform", "rotate(0deg)", null);
        this.document.getElementById("canvas").style="margin-left: 0vh;"
        pause = false;
        main();
    }
});



function checkCollision(obj1, obj2){
    if (obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.h + obj1.y > obj2.y) {
         return true;
     }
}

function update(){
    //update wszystkich elem;

    level.update();
    player.update();
    for(i in enemies){
        enemies[i].update();
    }
}
function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //tutaj renderujemy wszystkie leementy

    level.render();
    player.render();
    for(i in enemies){
        enemies[i].render();
    }
    if(pause){
        ctx.save()
        ctx.fillStyle="black";
        ctx.fillRect(0,0,1000, 1000 );
        ctx.fillStyle = "white";
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(Math.PI/2);
        ctx.fillText("UNSUPPORTED PORTRAIT MODE", -canvas.width / 3, 0);
        ctx.rotate(-Math.PI/2);

// un-translate the canvas back to origin==top-left canvas

ctx.translate(-canvas.width/2,-canvas.height/2);
    }
}
function main(){
    update();
    render();
    if(!pause)requestAnimationFrame(main);
}
main();
