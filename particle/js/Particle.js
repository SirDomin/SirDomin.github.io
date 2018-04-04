var Particle = function(x,y,r,id){
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
    this.render = function(){
        if(Math.sqrt(Math.pow(mouseX-points[this.id].x,2)+Math.pow(mouseY-points[this.id].y,2)) < 50){
            this.x = points[this.id].x + random(-50,50);
            this.y = points[this.id].y + random(-50,50);
        }else{
            this.x += (0.5)*Math.cos(Math.atan2(this.y - points[this.id].y,points[this.id].x - this.x ));
            this.y += -(0.5)*Math.sin(Math.atan2(this.y - points[this.id].y ,points[this.id].x - this.x));
        }
        ellipse(this.x-this.r,this.y-this.r,r,r);

    }
};
