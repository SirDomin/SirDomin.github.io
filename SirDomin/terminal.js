class Terminal{
  constructor(){
    this.x = 450;
    this.y = 300;
    this.w = 700;
    this.h = 600;
    this.linesY = [ 400, 440, 490, 530, 570, 610, 650, 690, 730, 770];
    this.lines = [];
    this.buttonId = null;
    this.sequenceId = null;
  }
  update(){

  }
  setLine(line, text){
    this.lines[line] = text;
  }
  clear(){
    this.lines = [];
    delete buttons[this.buttonId];
    delete sequences[this.sequenceId];
  }
  render(){
    ctx.beginPath();
    ctx.fillStyle = pageColors.black;
    ctx.lineWidth="4";
    ctx.strokeStyle=pageColors.white;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();

    this.renderBar();

    for(let i in this.lines){
      ctx.fillStyle = pageColors.white;
      ctx.font = "15px fontP"
      ctx.fillText(this.lines[i], this.x + 20, this.linesY[i]);
    }
  }

  renderBar(){
    ctx.fillStyle = pageColors.white;
    ctx.fillRect(this.x, this.y + 50, this.w, 4);
  }

}
