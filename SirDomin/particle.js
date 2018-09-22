class Particle{
  constructor(x, y){
    this.state = random(0, 1);
    this.x = x;
    this.y = y - random(0 , canvas.height);
    this.z = random(0, 5);
    this.speed = Math.random() * 10;

  }
  update(){
    this.y += (4 + this.speed);
    if(this.y > canvas.width)this.y = 0;
  }
  render(){
    ctx.font = (10 + this.z) + "px fontP";
    ctx.fillText(this.state, this.x, this.y);
  }
}
