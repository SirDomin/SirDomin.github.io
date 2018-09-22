let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let buttons = [];
let objects = [];
let particles = [];
let time;
let mouse = {
  clicked : false,
  x : 0,
  y : 0,
}
let pageColors = {
  blue: "#064789",
  darkBlue: "#032445",
  white: "#d3e8fd",

}
date = new Date();
time = date.getTime();

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

document.addEventListener("mousedown", (e) => {
  mouse.clicked = true;
  mouse.x = e.pageX;
  mouse.y = e.pageY;

  for(let i in buttons){
    if(buttons[i].collision(mouse.x, mouse.y)){
      buttons[i].onClick();
    }
  }
})
document.addEventListener("mouseup", (e) => {
  mouse.clicked = false;
})
document.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
})

let render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = pageColors.blue;
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = pageColors.white;
  ctx.fillRect(mouse.x, mouse.y, 5, 5)

  for(let i in particles){
    particles[i].render();
  }
  for(let i in buttons){
    buttons[i].render();
  }
  for(let i in objects){
    objects[i].render();
  }
}
let update = function(){
  date = new Date();
  time = date.getTime();


  for(let i in particles){
    particles[i].update();
  }
  for(let i in buttons){
    buttons[i].update();
  }
  for(let i in objects){
    objects[i].update();
  }
}

let main = function(){


  update();
  render();
  requestAnimationFrame(main);
}
objects.push(new Terminal())
objects.push(new Sequence(100, 100, "DOMINIK GARBULSKI", 1, 60));
objects.push(new Sequence(100, 200, "MAIN PROJECTS:", 3, 40));

for(let i = 0; i < 25; i++){

  particles.push(new Particle(random(0, canvas.width), 0))
}
buttons.push(new Button(100, 300, 300, 100, pageColors.white))
objects.push(new Sequence(110, 360, "Flappy Bird AI", 1, 20));
buttons[buttons.length - 1].onClickEvent = function(){
  objects[0].setLine(0, "Reconstruction of popular game Flappy Bird,");
  objects[0].setLine(1, "Connected with Neural Networks.")
  objects[0].setLine(3, "Each bird makes decission based on given")
  objects[0].setLine(4, "inputs. 'to jump or not to jump, that is")
  objects[0].setLine(5, "the question' ~ Flappy Bird")
  objects[0].setLine(6, "Birds brains need some time to learn, so ")
  objects[0].setLine(7, "give them some time and enjoy.")
  objects[0].setLine(8, "Tags: #MachineLearning #AI FlappyBird")
  objects[0].setLine(9, "#NeuralNetworks #GeneticAlgorithm")
  buttons.push(new Button(600, 850, 100, 50, pageColors.white))
}


main();
//setInterval(main, 1000/200)
