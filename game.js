canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
player = new Player();
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
    images[i].src = "tile"+(i%2)+".png";
}

level = new Level(1);
function update(){
    //update wszystkich elem;

    level.update();
    player.update();
}
function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //tutaj renderujemy wszystkie leementy

    level.render();
    player.render();
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
