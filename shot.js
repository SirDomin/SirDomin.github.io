function Shot(playerX ,playerY, playerW){
    this.w = 10;
    this.h = 10;
    this.y = playerY + this.h;
    this.x = playerX + (playerW / 2) - (this.w / 2);
    this.velocity = 6;

    this.render = function(){
        ctx.fillStyle="blue";
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y + this.h / 2 , this.w / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill(); 
        //ctx.fillRect(this.x,this.y,this.w,this.h);
    }//render
    
    this.update = function(){
        this.y -= this.velocity;
    }//update

}