itemek=[];

itemek[0]={
   
    get:function(){
        gameObjects.player.speedUp();
    }
    
}
itemek[1]={
    get:function(){
        gameObjects.player.bUp();
    }
}
itemek[2]={
    get:function(){
        gameObjects.player.bsUp();
    }
}
itemek[3]={
    
    get:function(){
        gameObjects.player.money+=(Math.floor(Math.random()*10)+1)*5;
    }
}
itemek[4]={
    get:function(){
        gameObjects.player.lifeUp();
    }
}
itemek[5]={
    get:function(){
        gameObjects.player.shieldUp();
    }
}
//dziala ale single shot

itemek[6]={
    get:function(){
        if(gameObjects.player.weapon.name==weapons[0].name){
            
                return gameObjects.player.bUp();
          
        }else {
            gameObjects.player.img=playerImg;
            gameObjects.player.dmg=weapons[0].dmg;
            gameObjects.player.weapon=weapons[0];
            return true;
        }
    }
}
itemek[7]={
    get:function(){
         if(gameObjects.player.weapon.name==weapons[1].name){
            
                return gameObjects.player.bUp();
          
        }else {
            gameObjects.player.img=player1Img;
            gameObjects.player.dmg=weapons[1].dmg;
            gameObjects.player.weapon=weapons[1];
            return true;
        }
    }
}
itemek[8]={
    get:function(){
        if(gameObjects.player.weapon.name==weapons[2].name){
        
            return gameObjects.player.bUp();
      
        }else {
            gameObjects.player.img=player2Img;
            gameObjects.player.dmg=weapons[2].dmg;
            gameObjects.player.weapon=weapons[2];
            return true;
        }
    }
}
itemek[9]={
    get:function(){
                
        if(gameObjects.immunity)delete gameObjects.immunity;
                gameObjects.player.immunity=true;
                gameObjects.immunity=new Img(gameObjects.player.x-gameObjects.player.w/2,gameObjects.player.y-gameObjects.player.w/2,gameObjects.player.w*2,gameObjects.player.h*2,immunityImg);
                gameObjects.immunity.lifetime=5000;
                gameObjects.immunity.then=now;
                gameObjects.immunity.ondisappear=function(){
                    gameObjects.player.immunity=false;
                }
                
    }
}


/////////////////////////////////////rarity items//////////

rarity={
    normal:[3,0,1,3],
    hard:[2,7,9],
    rare:[4,5,8],
}




///////////////////WEPS

weapons=[];
weapons[0]={
   
    name:"Single Shot",
    dmg:1,
    shot:function(){
        if(now-gameObjects.player.lShot>gameObjects.player.bTime&&gameObjects.player.getFreeBullet().length>0)
        {
        var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
        gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/6,gameObjects.player.w/2,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet0);
        gameObjects.bullets[x].color="hsla(35, 100%, 50%, 1)";
            
            gameObjects.player.lShot=now;
        }
    }
}
weapons[1]={
    name:"Double Shot",
    dmg:2,
    shot:function(){
        if(now-gameObjects.player.lShot>gameObjects.player.bTime&&gameObjects.player.getFreeBullet().length>1)
        {
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/4,gameObjects.player.y,gameObjects.player.w/4,gameObjects.player.w/2,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet1);
                gameObjects.bullets[x].color="hsla(122, 100%, 44%, 1)";
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w-gameObjects.player.w/4,gameObjects.player.y,gameObjects.player.w/4,gameObjects.player.w/2,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet1);
                gameObjects.bullets[x].color="hsla(122, 100%, 44%, 1)";
            gameObjects.player.lShot=now;
        }
    }
    
}
weapons[2]={
    
    name:"Triple Shot",
    dmg:3,
    shot:function(){
        
    
        if(now-gameObjects.player.lShot>gameObjects.player.bTime&&gameObjects.player.getFreeBullet().length>2)
        {
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet2);
                gameObjects.bullets[x].bsy*=1.1;
                gameObjects.bullets[x].color="hsla(208, 100%, 44%, 1)";    
            
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet2);
                gameObjects.bullets[x].bsx=-1;
                gameObjects.bullets[x].color="hsla(208, 100%, 44%, 1)";  
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet2);
                gameObjects.bullets[x].bsx=1;
                gameObjects.bullets[x].color="hsla(208, 100%, 44%, 1)";  
            
            gameObjects.player.lShot=now;
        }
    
    }
    
}

weapons[3]={
    name:"DeadShot",
    dmg:3,
    shot:function(){
            
        if(now-gameObjects.player.lShot>gameObjects.player.bTime&&gameObjects.player.getFreeBullet().length>1)
        {
            
            var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
            gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/2.5,gameObjects.player.w/1.5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet3);
            gameObjects.bullets[x].bsy*=2;
            gameObjects.bullets[x].color="blue";
        
            var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
            gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/2.5,gameObjects.player.w/1.5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet3);
            gameObjects.bullets[x].bsy*=2;
            gameObjects.bullets[x].color="blue";
            gameObjects.player.lShot=now;
        }
    }
    
}
weapons[4]={
    
    name:"Quad Shot",
    dmg:3,
    shot:function(){
            
        if(now-gameObjects.player.lShot>gameObjects.player.bTime&&gameObjects.player.getFreeBullet().length>3)
        {
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet4);
                
                gameObjects.bullets[x].color="hsla(46, 100%, 50%, 1)";    
            
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet4);
               
                gameObjects.bullets[x].color="hsla(46, 100%, 50%, 1)";  
            
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/3,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet4);
               
                gameObjects.bullets[x].color="hsla(46, 100%, 50%, 1)";  
            //
                var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
                gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w-gameObjects.player.w/3,gameObjects.player.y,gameObjects.player.w/5,gameObjects.player.w/5,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet4);
                
                gameObjects.bullets[x].color="hsla(46, 100%, 50%, 1)";  
            
            
            gameObjects.player.lShot=now;
        }
    }
    
    
    
}

weapons[5]={
    
    name:"Missle Launch",
    dmg:7,
    shot:function(){
            
        if(now-gameObjects.player.lShot>gameObjects.player.bTime&&gameObjects.player.getFreeBullet().length>0)
        {
            
            var x=gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1]
            gameObjects.bullets[x]=new Bullet(gameObjects.player.x+gameObjects.player.w/2,gameObjects.player.y,gameObjects.player.w/4,gameObjects.player.w/2,gameObjects.player.bs,gameObjects.player.getFreeBullet()[gameObjects.player.getFreeBullet().length-1],"enemies",bullet5);
            gameObjects.bullets[x].bsy*=2;
            gameObjects.bullets[x].onhit=function(){
                this.destroyOnColision=false;
                this.w=100;
                this.h=100;
                this.x-=this.w/2;
                this.y-=this.h/2;
                this.bsy=0;
                this.img=splash;
                this.lifetime=20;
                this.then=now;
                this.ondisappear=function(){
                    delete gameObjects.bullets[this.id];
                }
                this.onhit=function(){};
            };
            
            
            gameObjects.player.lShot=now;
        }
    }
    
    
}
/////SHOP ITEMS




