function Shot(playerX ,playerY, playerW){
    this.w = canvas.width / 36;
    this.h = canvas.width / 36;
    this.y = playerY + this.h;
    this.x = playerX + (playerW / 2) - (this.w / 2);
    this.velocity = canvas.height / 106;

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