var Player = function(){
    this.w = 40;
    this.h = 40;
    this.x = width/2 - this.w;
    this.y = height - 70;


};
Player.prototype.update = function(){
  if(keyIsDown(RIGHT_ARROW)){
      this.x ++;
  }
};
Player.prototype.draw = function(){
    fill(255);
    rect(this.x,this.y,this.w,this.h);
};
