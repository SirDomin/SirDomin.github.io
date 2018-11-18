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
        if(!started){
            ctx.drawImage(guideImage, 0, 0, canvas.width, canvas.height); // renderowanie tutoriala dopóki nie klikniesz w ekran
        }
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
    this.tiles.push(new Tile(0,settings.tileHeight * 0, 1));
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
        currLvl ++;
        this.level ++;
        for(x in enemies){
            if(!enemies[x].exist){
                enemies[x] = new Enemy();
            }else{
        if(enemies[x].evo == 6){
           bossLevel = true;
        }else{
                enemies[x].setNewYX();
                enemies[x].promoted = false;
                enemies[x].img = new Sprite(window["spiderImage" + enemies[x].evo],8, 32, 32, 6)
                enemies[x].w *= 1.1;
                enemies[x].h *= 1.1;
        }
            }
            enemiesCount++;
        }
        if(bossLevel){
            enemies = [];
            enemiesCount = 1;
            enemies[0] = new Enemy();
            enemies[0].w = canvas.width / 3;
            enemies[0].h = canvas.width / 3;
            enemies[0].x = canvas.width / 2 - (canvas.width /3 /2 );
            enemies[0].y = - enemies[0].h;
            enemies[0].maxHp = 1000;
            enemies[0].hp = 1000;
            enemies[0].value = 1000;
            enemies[0].img = new Sprite(spiderBossR,8, 64, 64, 6)
            enemies[0].onkill = function(){

                player.score += this.value;
			    enemiesCount--;
                this.exist = false;
                game = false;
            }
            enemies[0].move = function(){
                if(this.y < canvas.height / 5){
                    this.y += this.velocity;
                    return 0;
                }
                speed = 0;
                this.x += this.velocity;
                if(this.x < 0){
                    this.velocity = -this.velocity;
                    this.img = new Sprite(spiderBossR,8, 64, 64, 6);
                }
                if(this.x + this.w > canvas.width){
                    this.velocity = -this.velocity;
                    this.img = new Sprite(spiderBossL,8, 64, 64, 6);
                } 
            }
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
        ctx.fillStyle = "white";
        ctx.font= this.fontSize * 1.4+ 'px "font"';
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