function Player() {
    this.w = 100; // width of player
    this.h = 100; // height of player
    this.x = (canvas.width / 2) - (this.w / 2); // player's pos on x axis
    this.y = canvas.height - this.h - 20; // player's pos on y axis
    this.hp = 10; // player's health
    this.maxHp = 10;
    this.damage = 50;
    this.score = 0; // player's score
    this.msBetweenShoots = 400; // time betweens shots
    this.msTime = 0; 
    this.velocity  = 0;
    
    this.render = function(){
        ctx.fillRect(this.x,this.y,this.w,this.h);
        if(this.msTime == this.msBetweenShoots){

        } 
        else {
            this.msTime++;
        }
    }//redner

    this.update = function(){
        this.x += this.velocity;
    }//update
    this.stop = function(){
        this.velocity = 0;
    }
    this.moveLeft = function(){
        this.velocity = ((this.velocity + 3) * -1.5);
    }//moveLeft

    this.moveRight = function(){
        this.velocity = ((this.velocity + 3) * 1.5);;
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