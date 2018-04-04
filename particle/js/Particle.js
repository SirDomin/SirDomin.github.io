var Particle = function(x,y,r,id){
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
    this.render = function(){
        if(Math.sqrt(Math.pow(mouseX-this.x,2)+Math.pow(mouseY-this.y,2)) < 100){
            this.x += (2)*Math.cos(Math.atan2(mouseY - points[this.id].y, points[this.id].x - mouseX));
            this.y += (2)*Math.sin(Math.atan2(mouseY - points[this.id].y, points[this.id].x - mouseX));
        }else{
            this.x += (0.5)*Math.cos(Math.atan2(this.y - points[this.id].y,points[this.id].x - this.x ));
            this.y += -(0.5)*Math.sin(Math.atan2(this.y - points[this.id].y ,points[this.id].x - this.x));
        }
        ellipse(this.x-this.r,this.y-this.r,r,r);

    }
};
