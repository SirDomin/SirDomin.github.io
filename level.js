tmpobj = {
    x: 10,
    y: 10

}

speed = 1;
colors =["white", "blue", "yellow", "brown", "cyan"];
Tile = function(x, y, id){
    this.w = settings.tileWidth;
    this.h = settings.tileHeight;
    this.x = x;
    this.y = y;
    this.id = id;
    this.img = images[id];
    this.render = function(){
        //ctx.fillStyle=colors[this.id];
        //ctx.fillRect(this.x,this.y, this.w, this.h);
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h + 5);
    }
    this.update = function(){
        this.y += speed;
        if(this.y > canvas.height){
            this.y = -settings.tileHeight ;
        }
    }
}
Level = function(lvl){
    this.level = lvl;
    this.tiles = [];
    this.gui = new Gui();

    this.tiles.push(new Tile(0,-(settings.tileHeight), 0));
    this.tiles.push(new Tile(0,settings.tileHeight * 0 , 1));
    this.tiles.push(new Tile(0,settings.tileHeight * 1, 2));
    this.tiles.push(new Tile(0,settings.tileHeight * 2, 3));
    this.tiles.push(new Tile(0,settings.tileHeight * 3, 4));
    this.update = function(){
        for(var i = 0; i < this.tiles.length; i++){
            this.tiles[i].update();
        }
    }
    this.render = function(){
        for(var i = 0; i < this.tiles.length; i++){
            this.tiles[i].render();
        }
        
    }
    this.lvlup = function(){
        console.log("XS")
        currLvl ++;
        this.level ++;
        for(x in enemies){
            if(!enemies[x].exist){
                enemies[x] = new Enemy();
            }else{
                enemies[x].x = (canvas.width - enemies[x].w) * Math.random();
                enemies[x].y = -canvas.height  * Math.random();
                enemies[x].promoted = false;
                 enemies[x].img = new Sprite(window["spiderImage"+enemies[x].evo],8, 32, 32, 6)
            }
            enemiesCount++;
        }
    }
}
Gui = function(){
    this.x = 0;
    this.y = 0;
    this.w = settings.tileWidth;
    this.h = settings.tileHeight / 2;
    this.fontSize = this.w / 20;
    this.hpBar = {
        x: this.w / 100,
        y: this.h / 10,
        w: this.w / 100 + this.w/5,
        h: this.h /5 - 2
    }
    this.score = {
        x: this.hpBar.x + this.hpBar.w * 1.5,
        y: this.h / 3.5,
    }
    this.level = {
        x: this.w - this.w / 7,
        y: this.score.y,
    }
    this.update = function(){

    }
    this.render = function(){
        //ctx.fillStyle = "black";
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "black";
        ctx.font= this.fontSize + 'px "Vast Shadow"';
        ctx.fillText("Score: " + player.getScore(),this.score.x,this.score.y);
        ctx.fillText("lvl: " + level.level,this.level.x,this.level.y);
        ctx.fillStyle="black";
        ctx.fillRect(this.hpBar.x - 2,this.hpBar.y - 2, this.hpBar.w + 4, this.hpBar.h + 4 )
        ctx.fillStyle="red";
        ctx.fillRect(this.hpBar.x,this.hpBar.y, this.hpBar.w * player.getHp(), this.hpBar.h)
    }
}
Sprite = function(image, numberOfImages, imageWidth, imageHeight, animSpeed){
    this.animSpeed = animSpeed;
    this.img = image;
    this.noi = numberOfImages - 1;
    this.w = imageWidth;
    this.h = imageHeight;
    this.currState = 0;
    this.state = 0;
    this.render = function(x, y, w, h){
        this.state = this.state % this.animSpeed + 1;
        if(this.state % this.animSpeed == 0)this.currState = (this.currState % this.noi) +1;
        ctx.drawImage(this.img, this.w * this.currState, 0, this.w, this.h, x, y,w, h)
    }
}