function Player() {
    this.w = canvas.width / 3; // width of player
    this.h = canvas.width / 6; // height of player
    this.x = (canvas.width / 2) - (this.w / 2); // player's pos on x axis
    this.y = canvas.height - this.h - 50; // player's pos on y axis
    this.hp = 15; // player's health
    this.maxHp = 15;
    this.damage = 20;
    this.score = 0; // player's score
    this.msBetweenShots = 10; // time betweens shots
    this.msTime = 0; 
    this.velocity  = 0;
    this.shots = [];
    this.img = new Sprite(butterflyImage,7, 44, 28, 3);
    this.name = "test";

    this.collisonBox = {
        w: this.w / 3,
        h: this.h,
        x: this.x + (this.w / 3) ,
        y: this.y
    }

    this.render = function(){
        //ctx.fillRect(this.collisonBox.x,this.collisonBox.y,this.collisonBox.w,this.collisonBox.h);
        this.img.render(this.x, this.y, this.w , this.h)
        for(i = 0; i < this.shots.length; i++){
            this.shots[i].update();
            this.shots[i].render();
            if(this.shots[i].y <= 0){
                this.shots.splice([i],1);
            }
        }
        if(this.msTime >= this.msBetweenShots){
            this.shots[this.shots.length] = new Shot(this.x,this.y,this.w);
            this.msTime = 0;
        } 
        else {
            this.msTime += 1;
        }
    }//redner

    this.update = function(){
        this.x += this.velocity;
        this.collisonBox.x += this.velocity;//this.x + this.w / 2 - (this.w / 4);
        //żeby nie wyleciało poza map
        /*
        if(this.x < 0){
            this.x = 0;
            this.collisonBox.x = this.x + (this.w / 3);
        } 
        else if (this.x + this.w > canvas.width){
            this.x = canvas.width - this.w;
            this.collisonBox.x = this.x + (this.w / 3);
        }
        */
       if(this.x < 0){
        this.x = 0;
        this.collisonBox.x = this.x + (this.w / 3);
    } 
    else if (this.x + this.w > canvas.width){
        this.x = canvas.width - this.w;
        this.collisonBox.x = this.x + (this.w / 3);
    }
        if(this.hp <= 0){
            game = false;
        }
    for(x in enemies){
        if(checkCollision({x: this.collisonBox.x, y: this.collisonBox.y, w: this.collisonBox.w, h: this.collisonBox.h},{x: enemies[x].collisonBox.x, y: enemies[x].collisonBox.y, w: enemies[x].collisonBox.w, h: enemies[x].collisonBox.h})){
            this.hp -= 5;
        }
        for(i in enemies[x].shots){
            if(checkCollision({x: this.collisonBox.x, y: this.collisonBox.y, w: this.collisonBox.w, h: this.collisonBox.h},{x: enemies[x].shots[i].x, y: enemies[x].shots[i].y, w: enemies[x].shots[i].w, h: enemies[x].shots[i].h})){
                enemies[x].shots.splice(i, 1);
                this.hp -= 5;
            }
        }
    }
        
    }//update
    this.stop = function(){
        this.velocity = 0;
    }
    this.moveLeft = function(){
            this.velocity = ((this.velocity + 5) * -1.0);
    }//moveLeft

    this.moveRight = function(){
            this.velocity = ((this.velocity + 5) * 1.0);
    }//moveRight

    this.heal = function(valueHp){
        this.hp += valueHp;
    }//changeHp
    
    this.addScore = function(valueScore){
        this.score += valueScore;
    }//changeScore
    
    this.hitEnemy = function(valueDamage){
        this.hp -= valueDamage;
    }//hitEnemy

    this.getHp = function(){
        return (this.hp / this.maxHp) ;
    }//getHp

    this.getScore = function(){
        return this.score;
    }//getScore



}