class Dot{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        ctx.fillStyle=color;
        ctx.fillRect(this.x - settings.dotSize / 2, this.y - settings.dotSize / 2, settings.dotSize, settings.dotSize)
    }
    render(){
        
    }
}