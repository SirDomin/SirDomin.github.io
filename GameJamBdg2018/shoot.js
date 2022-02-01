function shoot(playerX ,playerY, playerW){
    this.w = 10;
    this.h = 10;
    this.y = playerY + this.h;
    this.x = playerX + (playerW / 2) - (this.w / 2);
    this.velocity = canvas.height / 20;

    this.render = function(){
        ctx.fillRect(x,y,w,h);
    }//render
    
    this.update = function(){
        this.y = this.velocity;
    }//update

}