class Terminal{
  constructor(){
    this.x = 450;
    this.y = 300;
    this.w = 700;
    this.h = 600;
    this.linesY = [350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850];
    this.lines = [];
  }
  update(){

  }
  setLine(line, text){
    this.lines[line] = text;
  }
  clear(){
    this.lines = [];
  }
  render(){
    ctx.beginPath();
    ctx.fillStyle = pageColors.blue;
    ctx.lineWidth="4";
    ctx.strokeStyle=pageColors.white;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();

    for(let i in this.lines){
      ctx.fillStyle = pageColors.white;
      ctx.font = "15px fontP"
      ctx.fillText(this.lines[i], this.x + 20, this.linesY[i]);
    }
  }

}
