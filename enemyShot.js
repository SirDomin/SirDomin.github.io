function EnemyShot(playerX ,playerY, playerW){
    this.w = canvas.width / 36;
    this.h = canvas.width / 36;
    this.y = playerY + this.h;
    this.x = playerX + (playerW / 2) - (this.w / 2);
    this.velocity = 6;

    this.render = function(){
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }//render
    
    this.update = function(){
        this.y += this.velocity;
    }//update

}