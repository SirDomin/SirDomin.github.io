
var gameObject = function(x,y,w,h,name){
    
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.name=name;
    
}
gameObject.prototype.render=function(){
    
    if(this.image){
        ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
         
    }else
        {
        ctx.fillStyle="red";
    
    ctx.fillRect(this.x,this.y,this.w,this.h);
        }
}


/////////////////////////////////////////////////

var player=function(x,y,w,h,name){
    gameObject.call(this,x,y,w,h,name);
    
    this.speed=canvas.width/300;
    this.b=3;
    this.maxb=25;
    
    
    this.autofire=false;
    
    this.money=100;
    this.maxSpeed=canvas.width/100;
    this.speedStep=(this.maxSpeed-this.speed)/20;
    this.bs=canvas.height/150;
    this.maxbs=canvas.height/50;
    this.bsStep=((this.maxbs-this.bs)/20);
    
    this.bTime=400;
    this.lShot=now-this.bTime;
    this.dmg=1;
    
    this.immunity=false;
    
    this.img=playerImg;
    
    this.life=1;
    this.maxLifes=5;
    this.weapon=weapons[0];
    
    this.shieldHp=1;
    this.shieldMaxHp=5;
    
    this.getFreeBullet=function(){
        var free=[];
        for(var i =0;i<=this.b;i++)
            {
                
                if(!gameObjects.bullets[i]){
                
                    
                    free[free.length]=i;
                }
                    
            }
        return free;
    }
    
    this.shot=function(){
        
       
            this.weapon.shot();
        
    }
    this.render=function(){
        
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
        if(gameObjects.immunity)gameObjects.immunity.x=this.x-this.w/2
    }
    
    this.speedUp=function(){
        if(this.speed<this.maxSpeed)
            {
                this.speed+=this.speedStep;
                return true;
            }else
                return false;
    }
    
    this.bsUp=function(){
        
        
        
        if(this.bs<this.maxbs)
            {
               this.bTime-=10;
                this.bs+=this.bsStep;
                return true;
            }else
                return false;
    }
    this.bUp=function(){
        
        
        if(this.b<this.maxb)
            {
                
                this.b++;
                return true;
            }else
                return false;
    }
    
    
    
    
    
    
}
player.prototype.moveLeft=function(){
    if(this.x>panelW)this.x-=this.speed;
}
player.prototype.moveRight=function(){
    if(this.x<canvas.width-panelW-this.w)this.x+=this.speed;
}
player.prototype.onDmgGet=function(){
    
if(!this.immunity){
    if(this.shieldHp>0)
        {
            
                this.shieldHp--;
            
        }else {
            if(this.life<=0){
                lvl[currLvl].enemies=maxEnemies;
                gameObjects.bullets=[];
                gameOver();
                
            }else{
                this.life--;
                this.immunity=true;
                gameObjects.immunity=new Img(this.x-this.w/2,this.y-this.w/2,this.w*2,this.h*2,immunityImg);
                gameObjects.immunity.lifetime=5000;
                gameObjects.immunity.then=now;
                gameObjects.immunity.ondisappear=function(){
                    gameObjects.player.immunity=false;
                }
            }
        }
}
}
player.prototype.lifeUp=function(){
    
    if(this.life<this.maxLifes)
        {
            this.life++;
            return true;
        }else return false;
}
player.prototype.shieldUp=function(){
    if(this.shieldHp<this.shieldMaxHp)
        {
            this.shieldHp++;
            return true;
        }else {
            if(this.lifeUp())
                return true
            else return false;
        }
}



///////////////////////////BULLET
var Bullet=function(x,y,w,h,bs,id,collider,img){
    
    gameObject.call(this,x,y,w,h);
    this.x-=this.w/2;
    this.id=id;
    this.bs=bs;
    this.colider=collider;
    this.bsx=0;
    this.bsy=bs;
    this.img=img;
    this.color="red";
    this.destroyOnColision=true;
    this.road=function(){
         this.y+=(-this.bsy);
        this.x+=(-this.bsx);
    }
    this.onhit=function(){
        
    }
    this.render=function(){
      
        this.road();
       if(!this.img){
           
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
       }else{
           ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
       }
        if(this.y<0)delete gameObjects.bullets[this.id];
        
    }
    
    this.collision=function(){
        
        for(var x in gameObjects){
            
            if(x==this.colider)
                {
                   for(var enemy=0;enemy<gameObjects.enemies.length;enemy++)
                       {
                            if(gameObjects[x][enemy]&&this.x+this.w>gameObjects[x][enemy].x&&this.x<gameObjects[x][enemy].x+gameObjects[x][enemy].w&&this.y+this.w>gameObjects[x][enemy].y&&this.y<gameObjects[x][enemy].y+gameObjects[x][enemy].h){
                                
                                if(gameObjects[x][enemy].hp<=gameObjects.player.dmg)
                                    {
                                        gameObjects[x][enemy].onkill();
                                        delete gameObjects[x][enemy];
                                       
                                    }else{
                                        gameObjects[x][enemy].hp-=gameObjects.player.dmg;
                                    }
                                
                                this.onhit();
                               if(this.destroyOnColision)delete gameObjects.bullets[this.id];
                                
                                break;
                            }
                        
                       }
                }
        }
        
    }
    
    
    
}


var Enemy=function(x,y,w,h,name,hp,speed,id,img,perc){
    this.id=id;
    gameObject.call(this,x,y,w,h,name);
    this.bs=5;
    this.speed=speed;
    this.hp=hp;
    this.maxHp=hp;
    this.currPoint=0;
    this.randPos=false;
    this.img=img;
    this.perc=perc;
    this.getFreeBullet=function(){
        for(var i=gameObjects.player.b;i<gameObjects.player.b+20;i++){
            if(!gameObjects.bullets[i])
                return i;
            
        }
    }
    
    this.event=function(){
        
         if(Math.random()*100<this.perc){
                this.shot();
            }
    }
    
    this.shot=function(){
        gameObjects.bullets[this.getFreeBullet()]=new EBullet(this.x+this.w/2,this.y+this.h,10,10,this.bs,this.getFreeBullet(),"player");

    }
    this.getFreePic=function(){
        for(var i=0;i<=gameObjects.destroyPic.length;i++)
            {
                if(!gameObjects.destroyPic[i])
                    return i;
            }
        
    }
    //this.angle=radToDeg(Math.atan2((this.y+this.w/2) - p.y, p.x - (this.x+this.w/2)))
    this.render=function(){
        if(points[this.currPoint])
            {
                
                var p=points[this.currPoint];
                
                        //this.x += this.speed * Math.cos(Math.atan2((this.y+this.h/2) - p.y, p.x - (this.x+this.w/2)));
		              //this.y += this.speed * -1*Math.sin(Math.atan2((this.y+this.h/2) - p.y, p.x - (this.x+this.w/2)));
                    this.x+=this.speed * getX(gameObjects.enemies[this.id],p)
                    this.y+=this.speed * getY(gameObjects.enemies[this.id],p)
                
                if(this.x+this.w/3<p.x&&this.x+this.w-this.w/3>p.x&&this.y+this.h/3<p.y&&this.y+this.h-this.h/3>p.y)
                {
                    
                    if(this.currPoint>=points.length-1||this.randPos)
                        {
                            if(!lvl[currLvl].repeat)
                                {
                                    this.randPos=true;
                                    this.currPoint=Math.floor(Math.random()*(points.length));
                                }else this.currPoint=0;
                        }
                    else
                        this.currPoint++;
                   
                }
            }
        
           this.event();
        
        //this.x+=this.speed;
        //if(this.x>canvas.width-panel.width)this.x=panel.width-this.w
        //if(this.x<panel.width-this.w)this.x=canvas.width-panel.width;
        ctx.fillStyle="black";
        ctx.fillRect(this.x,this.y-2*(canvas.height/100),this.w,canvas.height/100);
        ctx.fillStyle="red";
        ctx.fillRect(this.x+1,this.y-2*(canvas.height/100)+1,getPercentage(this.hp,this.maxHp)*(this.w-2),canvas.height/100-2)
        
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
        //ctx.fillStyle="black";
        //ctx.fillRect(this.x,this.y,this.w,this.h);
        
    }
    this.collide=true;
}
Enemy.prototype.onkill=function(){
    
        var id=this.getFreePic();
        gameObjects.destroyPic[id]=new Img(this.x,this.y,this.w,this.h,window["destroyPic"+Math.floor(Math.random()*3)]);
        gameObjects.destroyPic[id].lifetime=1000;
        gameObjects.destroyPic[id].then=now;
        gameObjects.destroyPic[id].ondisappear=function(){
            delete this;
        }
        
        if(this.onkillPlus)this.onkillPlus();
        
        lvl[currLvl].enemies--;
        score+=this.hp+1;
        
        if(Math.floor(Math.random()*100+1)>85){
            
            gameObjects.items[gameObjects.items.length]=new Item(this.x+this.w/2,this.y+this.h/2,gameObjects.items.length,losujItem());
            bonuses++;
        }
    }

var EBullet=function(x,y,w,h,bs,id){
    this.w=w;
    this.h=h;
    this.x=x-this.w/2;
    this.y=y;
    this.bs=bs;
    this.id=id;
    this.bsx=0;
    this.bsy=bs;
    this.road=function(){
        
        this.y+=this.bsy;
        this.x+=this.bsx;
        
        
    }
    this.render=function(){
        this.road();
        
        ctx.fillStyle="maroon";
        ctx.fillRect(this.x,this.y,this.w,this.h);
        if(this.y>canvas.height)delete gameObjects.bullets[this.id];
    }
    this.collision=function(){
        var p=gameObjects.player;
        
        if(kolizja(gameObjects.bullets[this.id],p)){
            delete gameObjects.bullets[this.id];
            gameObjects.player.onDmgGet();
        }
            
    }
}

/////////////////////////////////////////////////

var Button = function(x,y,w,h,name){
    
    gameObject.call(this,x,y,w,h,name);
    
    this.image=buttonImage;
    
    
}
Button.prototype=Object.create(gameObject.prototype);

Button.prototype.constructor=gameObject;

/////


 var Text = function(x,y,fSize,color,text,src){
     gameObject.call(this,x,y);
     
     this.color=color;
     this.fSize=Math.floor(fSize);
     this.text=text;
     this.src=src;
     
     this.render=function(){
         ctx.fillStyle=this.color;
          ctx.font=this.fSize+"px Arial";
         if(this.src)ctx.fillText(this.text+window[this.src],this.x,this.y);
        
         ctx.fillText(this.text,this.x,this.y);
     }
 }
 
 var Img=function(x,y,w,h,img){
     gameObject.call(this,x,y,w,h);
     this.img=img;
     this.render=function(){
         ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
     }
     
 }

var gameObjects={
  
};
////////////////////////////////////////////
var Item=function(x,y,id,type){
    
    var los=Math.floor(Math.random()*20)+5
    
    this.w=gameObjects.player.w/1.5;
    this.h=gameObjects.player.w/1.5;
    
    
    
    this.x=x-this.w/2;
    this.y=y;
    this.img="item"+type;
    this.img=window[this.img];
    this.type=type;
    this.id=id;
   this.speed=lvl[currLvl].enemySpeed/3+los/20;
    
}
Item.prototype.render=function(){
    
    
    
    this.y+=this.speed;
    if(this.y>=canvas.height){
         bonuses--;
        delete gameObjects.items[this.id];
       
    }
    ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
}
Item.prototype.collision=function(){
    
    var p=gameObjects.player;
    
    if(this.x+this.w>p.x&&this.x<p.x+p.w&&this.y+this.h>p.y&&this.y<p.y+p.h)
        {
            bonuses--;
            itemek[this.type].get();
            delete gameObjects.items[this.id];
        }
    
}
////////////////////////////////////////////

var Point=function(x,y){
    this.x=x;
    this.y=y;
    
    this.render=function(){
        ctx.fillStyle="red";
        ctx.fillRect(this.x-4,this.y-4,8,8);
    }
}

//gameObjects.gracz=new player(10,10,20,20,"gracz");
//gameObjects.statek=new gameObject(100,100,100,100,"statek");







    