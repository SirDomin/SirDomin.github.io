class Terminal{
  constructor(){
    this.x = window.innerWidth / 3;
    this.y = window.innerHeight / 3.23;
    this.w = window.innerWidth / 2;
    this.h = window.innerHeight / 1.615;
    this.linesY = [ 400, 440, 490, 530, 570, 610, 650, 690, 730, 770];
    this.linesX = this.x + this.w / 48;
    this.lines = [];
    this.sequenceId = null;
    this.lineHeight = this.h / 15;
    this.fontSize = window.innerWidth / 101.4;
    this.barHeight = window.innerHeight / 19.38;
    this.rendering =  true;
    this.title = "Terminal";
    this.exitButton = {
      x: this.x + this.w - this.barHeight,
      y: this.y,
      w: this.barHeight,
      h: this.barHeight,
      text:{
        x: this.x + (this.w * 1.011) - this.barHeight,
        y: this.y + this.barHeight / 1.05,
        fontSize: this.barHeight / 1.25,
      }
    }
    this.minimizeButton = {
      x: this.x + this.w - this.barHeight * 2,
      y: this.y,
      w: this.barHeight,
      h: this.barHeight,
      text:{ 
        x: this.x + (this.w * 1.011) - this.barHeight * 2,
        y: this.y + this.barHeight / 1.08,
        fontSize: this.barHeight / 1.25,
      }
    }
    this.openButton = {
      x: this.x + this.w / 2 - (this.barHeight * 1.5),
      y: this.y + this.h - this.barHeight,
      w: this.barHeight * 3,
      h: this.barHeight,
      text:{
        x: this.x + this.w / 2 - (this.barHeight * 1.3),
        y: this.y + this.h - this.barHeight + (this.barHeight / 1.2),
        fontSize: this.barHeight / 1.5,
      }
    }
    this.buttonId = buttons.push(new Button(this.openButton.x, this.openButton.y, this.openButton.w, this.openButton.h, pageColors.blue)) -1;
    buttons[this.buttonId].rendering = false;
    this.sequenceId = sequences.push(new Sequence(this.openButton.text.x, this.openButton.text.y, "OPEN", 1, this.openButton.text.fontSize)) -1;
    sequences[this.sequenceId].rendering = false;
    this.exitButtonId = buttons.push(new Button(this.exitButton.x, this.exitButton.y, this.exitButton.w, this.exitButton.h, pageColors.red)) - 1;
    this.exitButtonTextId = sequences.push(new Sequence(this.exitButton.text.x, this.exitButton.text.y, "X", 1, this.exitButton.text.fontSize)) - 1;
    this.minimizeButtonId = buttons.push(new Button(this.minimizeButton.x, this.minimizeButton.y, this.minimizeButton.w, this.minimizeButton.h, pageColors.blue )) - 1;
    this.minimizeButtonTextId = sequences.push(new Sequence(this.minimizeButton.text.x, this.minimizeButton.text.y, "_", 1, this.minimizeButton.text.fontSize)) - 1;
    buttons[this.minimizeButtonId].onClickEvent = function(){
      objects[0].minimize();
    }
    this.windowBarButtonId = buttons.push(new Button(windowBar.x + windowBar.buttonWidth + windowBar.spaceBetweenButtons, windowBar.y, windowBar.buttonWidth, windowBar.buttonWidth, pageColors.darkBlue)) -1;
    buttons[this.windowBarButtonId].onClickEvent = function(){
      if(objects[0].rendering){
        objects[0].minimize();
      }else{
        objects[0].popup();
      }
    }
    buttons[this.windowBarButtonId].borderWidth = "0.5";
    this.windowBarButtonTextId = sequences.push(new Sequence(windowBar.x + windowBar.buttonWidth + windowBar.spaceBetweenButtons , window.innerHeight / 1.02, "Terminal", 1, (windowBar.w / 155))) -1;
    this.titleId = sequences.push(new Sequence(this.x, this.exitButton.text.y + (this.w/140), "Terminal", 1, this.w/20)) - 1;
    for(let i = 1; i < 11; i++){
      this.linesY[i-1] = this.y + (this.barHeight * 2) + (this.lineHeight * i);
    }


  }
  update(){

  }
  setLine(line, text){
    this.lines[line] = text;
  }
  minimize(){

    sequences[this.titleId].rendering = false;
    buttons[this.windowBarButtonId].color = pageColors.blue;
    this.rendering = false;
    buttons[this.buttonId].rendering = false;
    buttons[this.exitButtonId].rendering = false;
    buttons[this.minimizeButtonId].rendering = false;
    sequences[this.minimizeButtonTextId].rendering = false;
    sequences[this.exitButtonTextId].rendering = false;
    sequences[this.sequenceId].rendering = false;
  }
  close(){
    
    sequences[this.windowBarButtonTextId].rendering = false;
    sequences[this.titleId].rendering = false;
    buttons[this.windowBarButtonId].w = 0;
    buttons[this.windowBarButtonId].rendering = false;
    this.rendering = false;
    buttons[this.buttonId].rendering = false;
    buttons[this.exitButtonId].rendering = false;
    buttons[this.minimizeButtonId].rendering = false;
    sequences[this.minimizeButtonTextId].rendering = false;
    sequences[this.exitButtonTextId].rendering = false;
    sequences[this.sequenceId].rendering = false;
  }
  popup(){
    sequences[this.windowBarButtonTextId].rendering = true;
    sequences[this.titleId].rendering = true;
    this.rendering = true;
    buttons[this.buttonId].rendering = true;
    buttons[this.exitButtonId].rendering = true;
    buttons[this.minimizeButtonId].rendering = true;
    buttons[this.windowBarButtonId].rendering = true;
    buttons[this.windowBarButtonId].w = windowBar.buttonWidth;
    buttons[this.windowBarButtonId].color = pageColors.darkBlue;
    sequences[this.minimizeButtonTextId].rendering = true;
    sequences[this.exitButtonTextId].rendering = true;
    sequences[this.sequenceId].rendering = true;
    
  }
  clear(){
    this.lines = [];
    this.close();
    
  }
  render(){
    if(this.rendering){
      ctx.beginPath();
      ctx.fillStyle = pageColors.black;
      ctx.lineWidth = settings.borderWidth;
      ctx.strokeStyle=pageColors.white;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
      this.renderBar();
     for(let i in this.lines){
        ctx.fillStyle = pageColors.white;
        ctx.font = this.fontSize+"px fontP"
        ctx.fillText(this.lines[i],this.linesX, this.linesY[i]);
      }
    }
  }

  renderBar(){
    ctx.fillStyle = pageColors.white;
    ctx.fillRect(this.x, this.y + this.barHeight, this.w,settings.borderWidth);
    
  }

}
class WindowBar{
  constructor(){
    this.x = 0;
    this.y = window.innerHeight - window.innerHeight / 19.38;
    this.w = window.innerWidth;
    this.h = window.innerHeight / 19.38;
    this.buttonWidth = this.h * 2;
    this.spaceBetweenButtons = this.buttonWidth / 10;
    this.startMenu = new StartMenu(this.h);
    this.startId = buttons.push(new Button(this.x, this.y, this.buttonWidth, this.h, pageColors.blue)) -1;
    buttons[this.startId].borderWidth = "0.5";
    buttons[this.startId].clickedColor = pageColors.darkBlue; 
    buttons[this.startId].onClickEvent = function(){
      windowBar.startMenu.start();
    }
    //console.log(window.innerWidth / 20)
    this.textId = sequences.push(new Sequence((this.w / 360), window.innerHeight / 1.02, "START", 1, (this.w / 110)))
    this.soundButtonId = buttons.push(new Button(window.innerWidth - this.h, this.y, this.h, this.h, pageColors.white)) - 1;
    buttons[this.soundButtonId].soundIcon = new Image();
    buttons[this.soundButtonId].soundIcon.src = "mute.png";
    buttons[this.soundButtonId].state = 1;
    buttons[this.soundButtonId].render = function(){
      if(this.rendering){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle=pageColors.white;
        ctx.drawImage(this.soundIcon, this.x, this.y, this.w, this.h)
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
      }
    }
    buttons[this.soundButtonId].onClickEvent = function(){
      
      if(!this.state){
        windowBar.mute();
        
      }else{
        windowBar.unmute();
        
      }
      
    }
  }

  mute(){
    buttons[this.soundButtonId].state = 1;
    buttons[this.soundButtonId].soundIcon.src = "mute.png";
    document.getElementById("music").pause();
    document.getElementById("music").muted = true;
  }
  unmute(){
    buttons[this.soundButtonId].state = 0;
    document.getElementById("music").play();
    document.getElementById("music").volume = 0.05;
    document.getElementById("music").muted = false;
    buttons[this.soundButtonId].soundIcon.src = "sound.png";
    
  }




  update(){
   
  }
  render(){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle=pageColors.white;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
  }
}

class StartMenu{
  constructor(h){
    this.x = 0;
    this.y = window.innerHeight/3.3;
    this.w = window.innerWidth/3.3;
    this.h = window.innerHeight - this.y - h;
    this.rendering = 0;
    this.buttons = [];
    
      this.buttons.push({
        btnId: buttons.push(new Button(this.x, this.y, this.w * 0.1, this.h/10, pageColors.blue)) -1,
        seqId: sequences.push(new Sequence(this.x, this.y, "TESTING WORD", 0.1, 15)) - 1,
      })
    for(let i in this.buttons){
      buttons[this.buttons[i].btnId].rendering = false;
      sequences[this.buttons[i].seqId].rendering = false;
    }
    
  }
  update(){

  }
  render(){
    if(this.rendering) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle=pageColors.white;
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    }
    
  }
  collision(x, y){
    if(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h)return true;
    return false;
  }
  start(){
    if(this.rendering){
      this.close();
    }else{
      buttons[windowBar.startId].active = true;
      this.rendering = 1
      for(let i in mainButtons){
        buttons[mainButtons[i].btnId].rendering = false;
        sequences[mainButtons[i].seqId].rendering = false;
      }
      this.buttons[0] = {
        btnId: buttons.push(new Button(this.x, this.y, this.w*0.995, this.h/10, pageColors.blue)) -1,
        seqId: sequences.push(new Sequence(this.x + this.w * 0.01, this.y + (this.w / 23.1) *2, "-> LinkedIn Profile <- ", 2, this.w / 23.1)) - 1,
      }
      buttons[this.buttons[0].btnId].onClickEvent = function(){
        windowBar.mute();
        window.open("https://www.linkedin.com/in/sirdomin/", '_blank');
      }
      this.buttons[1] ={
        btnId: buttons.push(new Button(this.x, this.y + this.h/10, this.w*0.995, this.h/10, pageColors.blue)) -1,
        seqId: sequences.push(new Sequence(this.x + this.w * 0.05, this.y + this.h/10 + (this.w / 23.1) *2, "-> Github Profile <- ", 2, this.w / 23.1)) - 1,
      }
      buttons[this.buttons[1].btnId].onClickEvent = function(){
        windowBar.mute();
        window.open("https://github.com/sirdomin", '_blank');
      }
    }
    
  }
  close(){
    for(let i in mainButtons){
      buttons[mainButtons[i].btnId].rendering = true;
      sequences[mainButtons[i].seqId].rendering = true;
    }
    buttons[windowBar.startId].active = false;
    this.rendering = 0;
    for(let i in this.buttons){
      delete buttons[this.buttons[i].btnId];
      delete sequences[this.buttons[i].seqId];
    }
  
    //
  }
}