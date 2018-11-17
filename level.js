tmpobj = {
    x: 10,
    y: 10

}

speed = 5;
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
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h + 5)
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

        
        this.gui.render();
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

Sprite = function(image, numberOfImages, imageWidth, imageHeight){
    this.img = img;
    this.noi = numberOfImages;
    this.w = imageWidth;
    this.h = imageHeight;
    this.getState = function(){
        
    }

}