function Player() {
    this.w = canvas.width / 8; // width of player
    this.h = canvas.width / 8; // height of player
    this.x = (canvas.width / 2) - (this.w / 2); // player's pos on x axis
    this.y = canvas.height - this.h - 20; // player's pos on y axis
    this.hp = 10; // player's health
    this.maxHp = 10;
    this.damage = 50;
    this.score = 0; // player's score
    this.msBetweenShots = 10; // time betweens shots
    this.msTime = 0; 
    this.velocity  = 0;
    this.shots = [];
    
    this.render = function(){
        ctx.fillRect(this.x,this.y,this.w,this.h);
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
        //żeby nie wyleciało poza mape
        if(this.x < 0){
            this.x = 0;
        } 
        else if (this.x + this.w > canvas.width){
            this.x = canvas.width - this.w;
        }

        
    }//update
    this.stop = function(){
        this.velocity = 0;
    }
    this.moveLeft = function(){
        this.velocity = ((this.velocity + 5) * -1.5);
    }//moveLeft

    this.moveRight = function(){
        this.velocity = ((this.velocity + 5) * 1.5);;
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