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
level = new Level(1);
function update(){
    //update wszystkich elem;

    level.update();

}
function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //tutaj renderujemy wszystkie leementy

    level.render();

}
function main(){
    update();
    render();
    requestAnimationFrame(main);
}
main();
