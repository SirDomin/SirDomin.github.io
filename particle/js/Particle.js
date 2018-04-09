var Particle = function(x,y,r,id){
    this.x = x;
    this.y = y;

    this.x = random(0,800);
    this.y = random(0,300);

    this.r = r;
    this.id = id;
    this.distance = random(50,100)
    this.render = function(){
        var d = Math.sqrt(Math.pow(mouseX-this.x,2)+Math.pow(mouseY-this.y,2));
        if( d < this.distance){
            this.x += -(4)*Math.cos(Math.atan2(mouseY - points[this.id].y, points[this.id].x - mouseX));
            this.y += (4)*Math.sin(Math.atan2(mouseY - points[this.id].y, points[this.id].x - mouseX));
        }else{
            this.x += (1)*Math.cos(Math.atan2(this.y - points[this.id].y,points[this.id].x - this.x ));
            this.y += -(1)*Math.sin(Math.atan2(this.y - points[this.id].y ,points[this.id].x - this.x));
        }
        ellipse(this.x-this.r,this.y-this.r,r,r);

    }
};
