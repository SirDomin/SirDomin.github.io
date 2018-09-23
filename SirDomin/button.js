class Button{
  constructor(x, y, w, h, color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.clicked = 0;
    this.borderWidth = settings.borderWidth;
    this.rendering = true;
    this.clickedColor = color;
    this.active = false;
  }
  update(){

  }
  onClick(){
    this.clicked = 1;
    this.onClickEvent();
  }
  onClickEvent(){

  }
  render(){
    if(this.rendering){
      ctx.beginPath();
      if(this.active){
        ctx.fillStyle = this.clickedColor;
      }else{
        ctx.fillStyle = this.color;
      }
      ctx.lineWidth = this.borderWidth;
      ctx.strokeStyle=pageColors.white;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    }
    
  }
  collision(x, y){

    if(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h){
      return true;
    }else{
      this.clicked = 0;
      return false;
    }

  }
}
