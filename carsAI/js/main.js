genLength = 100;
var cars = [];
var barricades = [];
var counter = 0;
gameSpeed = 2;
savedCars = [];
generations = 0;

function setup(){
    createCanvas(300,600);
    //barricades[0] = new Barricade();
    for(var i =0; i< genLength; i++){
        cars.push(new Car())
    }
}
function draw(){
    
    if (counter % 120 == 0) {
        barricades.push(new Barricade());

    }
    //fill(0);
    background(0);

    for(var i = 0;i < barricades.length; i++){
        barricades[i].update();
        barricades[i].draw();
        for(var j = 0; j < cars.length; j++){
            if(barricades[i].hits(cars[j])){

                savedCars.push(cars.splice(j,1));
            }
        }
    }
    for(var i =0;i<cars.length;i++){
        cars[i].think();
        cars[i].draw();
    }
    if(cars.length == 0 )nextGeneration();
    counter ++;
}

