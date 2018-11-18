function Boss(){
    this.w = 200;
    this.h = 200;
    this.x = canvas.width / 2 - this.w / 2;
    this.y = 120;
    this.hp = 500;
    this.maxHp = 500;
    this.velocity = 3;
    this.value = 1000;
    this.shots = [];
    this.msTime = 0;
    this.msBetweenShots = 200 + 400* Math.random();
    this.imgLeft = new Sprite();



}