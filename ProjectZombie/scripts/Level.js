level = [];
level[0] = [];

var enemies =[];

Level0 = function() {
    maxLevels = 10;

}
testLevel = function(inpenemies,cashMultiplier,hpMultiplier,speed) {
    this.maxEnemies = inpenemies;
    this.currenemies = 0;
    this.speed = speed;
    this.hpMultiplier = hpMultiplier;
    this.cashMultiplier = cashMultiplier;
    this.init = function() {
        this.enemies = this.maxEnemies;
    //console.log(this.enemies)
        for(var i = this.maxEnemies; i > 0; i--) {
            enemies[i] = new Enemy(i,Math.round(Math.sqrt(this.hpMultiplier) * 10),this.speed);
        }
    };
    this.onEnemyKill = function(type) {
        this.enemies--;
        player.currCash += 10*this.cashMultiplier;
        if(this.enemies <= 0) {
            player.days++;
            buttons[2].w = 40;
            buttons[2].h = 41;
            buttons[3].w = 40;
            buttons[3].h = 41;
        }
    };
    this.update = function(){};
};
firstMapBossLevel = function(inpenemies,cashMultiplier,hpMultiplier,speed) {
    this.maxEnemies = inpenemies;
    this.currenemies = 0;
    this.bossX = canvas.w+200;
    this.bossY = (canvas.h - 100)/2 + 50;
    this.speed = speed;
    this.hpMultiplier = hpMultiplier;
    this.cashMultiplier = cashMultiplier;
    this.init = function() {
        this.enemies = this.maxEnemies;
    //console.log(this.enemies)
        for(var i = this.maxEnemies; i >= 0; i--) {
            enemies[i] = new Enemy(i,Math.round(Math.sqrt(this.hpMultiplier) * 10),0.5 );
            var x = this.bossX - 200 + (Math.floor(i/10) * 100);
            var y = (i + 2) * (enemies[i].h + 10) - (Math.floor(i/10) * 400);
            enemies[i].setPosition(x,y);
        }

        this.bossId = this.maxEnemies;
        enemies[this.bossId] = new Enemy(this.maxEnemies,100,0.5);
        enemies[this.bossId].x = this.bossX;
        enemies[this.bossId].y = this.bossY;
        enemies[this.bossId].setDimensions(100,100);
        enemies[this.bossId].type = "boss";

    };
    this.onEnemyKill = function(type) {
        this.enemies--;
        player.currCash += 10*this.cashMultiplier;
        if(type=="boss") player.currCash+= 50* this.cashMultiplier;
        if(this.enemies <= 0) {
            player.days++;
            buttons[2].w = 40;
            buttons[2].h = 41;
            buttons[3].w = 40;
            buttons[3].h = 41;
        }
    };
    this.update = function(){};
};

//inpenemies,cashMultiplier per kill, hp multiplier (difficulity), speed
level[0].push(new firstMapBossLevel(20,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));
level[0].push(new testLevel(2,1,0.5,2.1));