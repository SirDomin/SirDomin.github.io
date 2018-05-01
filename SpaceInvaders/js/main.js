

function preload(){

}
function setup(){
    createCanvas(600,400);
    player = new Player();

}
function draw(){
    background(0);
    player.update();
    player.draw();
}
