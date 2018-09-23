let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let buttons = [];
let objects = [];
let particles = [];
let sequences = [];

let time;
let mouse = {
  clicked : false,
  x : 0,
  y : 0,
  cursor: new Image(),
  hand: new Image(),
}
mouse.cursor.src = "cursor.png";




let pageColors = {
  blue: "#064789",
  darkBlue: "#032445",
  white: "#d3e8fd",
  black: "#000",
  red: "#b30000",
}


let settings = {
  borderWidth : window.innerWidth / 380.25,
  mainText :{
    x: window.innerWidth / 20,
    y: window.innerHeight / 10,
    font: window.innerWidth / 32,
  },
  secondText:{
    x: window.innerWidth / 20,
    y: window.innerHeight / 5,
    font: window.innerWidth / 48,
  },

  mainButton1:{
    x: window.innerWidth / 20,
    y: window.innerHeight / 3.23,
    w: window.innerWidth / 4,
    h: window.innerHeight / 9.69,
    text: {
      x: window.innerWidth / 17.45,
      y: window.innerHeight / 2.65,
      fontSize: window.innerWidth / 60,
    }
  },
  mainButton2:{
    x: window.innerWidth / 20,
    y: window.innerHeight / 2.31,
    w: window.innerWidth / 4,
    h: window.innerHeight / 9.69,
    text: {
      x: window.innerWidth / 17.45,
      y: window.innerHeight / 2,
      fontSize: window.innerWidth / 72,
    }
  },
  mainButton3:{
    x: window.innerWidth / 20,
    y: window.innerHeight / 5,
    w: window.innerWidth / 4,
    h: window.innerHeight / 9.69,
    text: {
      x: 1,
      y: 1,
      fontSize: window.innerWidth / 76,
    }
  },


  
  cursorWidth: window.innerWidth / 90,
  cursorHeight: window.innerHeight / 50,

}
date = new Date();
time = date.getTime();
let windowBar = new WindowBar();
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function checkCollisionsWithButtons(x, y){
  for(let i in buttons){
    if(buttons[i].rendering && buttons[i].collision(x,y))return true;
  }
  return false;
}

document.addEventListener("mousedown", (e) => {
  mouse.clicked = true;
  mouse.y = e.pageY;
  mouse.x = e.pageX;

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

  if(checkCollisionsWithButtons(mouse.x, mouse.y)){
    mouse.cursor.src = "hand.png";
  }else{
    mouse.cursor.src = "cursor.png";
  }
})

let render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = pageColors.blue;
  ctx.fillRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle = pageColors.white;
  for(let i in particles){
    particles[i].render();
  }
  for(let i in objects){
    objects[i].render();
  }
  windowBar.render();
  for(let i in buttons){
    buttons[i].render();
  }
  for(let i in sequences){
    sequences[i].render();
  }
  
  ctx.drawImage(mouse.cursor, mouse.x, mouse.y, settings.cursorWidth, settings.cursorHeight)
 
}
let update = function(){
  date = new Date();
  time = date.getTime();
  windowBar.update();

  for(let i in particles){
    particles[i].update();
  }
  for(let i in objects){
    objects[i].update();
  }
  
  for(let i in buttons){
    buttons[i].update();
  }
  for(let i in sequences){
    sequences[i].update();
  }
}

let main = function(){


  update();
  render();
  requestAnimationFrame(main);
}
objects.push(new Terminal())
buttons[objects[0].exitButtonId].onClickEvent = function(){
  objects[0].clear();
}


sequences.push(new Sequence(settings.mainText.x, settings.mainText.y, "DOMINIK GARBULSKI", 1, settings.mainText.font));
sequences.push(new Sequence(settings.secondText.x, settings.secondText.y, "MAIN PROJECTS:", 3, settings.secondText.font));

for(let i = 0; i < 25; i++){

  particles.push(new Particle(random(0, canvas.width), 0))
}
buttons.push(new Button(settings.mainButton1.x, settings.mainButton1.y, settings.mainButton1.w, settings.mainButton1.h, pageColors.blue))

sequences.push(new Sequence(settings.mainButton1.text.x, settings.mainButton1.text.y, "Flappy Bird AI", 1, settings.mainButton1.text.fontSize));

buttons[buttons.length - 1].onClickEvent = function(){
  objects[0].clear();
  objects[0].setLine(0, "Reconstruction of popular game Flappy Bird,");
  objects[0].setLine(1, "Connected with Neural Networks.")
  objects[0].setLine(3, "Each bird makes decission based on given")
  objects[0].setLine(4, "inputs. 'to jump or not to jump, that is")
  objects[0].setLine(5, "the question' ~ Flappy Bird")
  objects[0].setLine(6, "Birds brains need some time to learn, so ")
  objects[0].setLine(7, "give them some time and enjoy.")
  objects[0].setLine(8, "Tags: #MachineLearning #AI #FlappyBird")
  objects[0].setLine(9, "#NeuralNetworks #GeneticAlgorithm")
  buttons[objects[0].buttonId].rendering = true;
  buttons[objects[0].buttonId].onClickEvent = function(){
    windowBar.mute();
    window.open("https://sirdomin.github.io/flappyBird/", '_blank');
  }
  objects[0].popup();
}

buttons.push(new Button(settings.mainButton2.x, settings.mainButton2.y, settings.mainButton2.w, settings.mainButton2.h, pageColors.blue))
sequences.push(new Sequence(settings.mainButton2.text.x, settings.mainButton2.text.y, "Digit Recognition", 1, settings.mainButton2.text.fontSize));
//console.log(settings.mainButton1.x, window.innerHeight / 470, settings.mainButton2.w / 16)
//console.log("w: "+window.innerWidth/ 300, "h: " +window.innerHeight / 100, "f: "+window.innerWidth/ 16 );
buttons[buttons.length - 1].onClickEvent = function(){
  objects[0].clear();
  objects[0].setLine(0, "Machine Learning used to recognize ");
  objects[0].setLine(1, "handwritten digits.")
  objects[0].setLine(3, "Use canvas to draw a digit and let")
  objects[0].setLine(4, "computer guess what digit did you write.")
  objects[0].setLine(5, "Model was created by me and trained")
  objects[0].setLine(6, "by me. It converts images to matrixes")
  objects[0].setLine(7, "and checks connections between pixels.")
  objects[0].setLine(8, "Tags: #MachineLearning #AI #TensorFlow")
  objects[0].setLine(9, "#NeuralNetworks #DigitRecognition")
  buttons[objects[0].buttonId].rendering = true;
  buttons[objects[0].buttonId].onClickEvent = function(){
    windowBar.mute();
    window.open("https://sirdomin.github.io/DigitRecognition/", '_blank');
  }
  objects[0].popup();
  
}



main();
//setInterval(main, 1000/200)
