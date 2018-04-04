var font;
var particles = [];
function preload(){
    font = loadFont('ChauPhilomeneOne-Italic.ttf');
}
loadingProgress = 800;
function setup(){
    createCanvas(800,300);
    background(51);



    points = font.textToPoints('SirDomin',50,200,192);
    for(var i in points){
        particles[i] = new Particle(points[i].x,points[i].y,5,i)
    }


}
function draw(){
    background(0);
    loadingProgress-=20;
    if(loadingProgress<0)loadingProgress = 800;
    for(var i in particles){
        particles[i].render();
    }

}
