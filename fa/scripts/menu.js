function loadButtons(){
    
    
    buttonW=canvas.width*3/5;
    buttonH=canvas.height/7;
    
    buttonX=canvas.width/5;
    
    button0Y=canvas.height/3;
    button1Y=button0Y+buttonH+canvas.height/20;
    button2Y=button1Y+buttonH+canvas.height/20;
    
    button3Y=canvas.height/5;
    button4Y=canvas.height/5;
    
    fontSize=Math.floor(canvas.width/19.6);
    
}

function makePointsfromLevel(){
    
    var pts=lvl[currLvl].pts.split(" ");
    maxEnemies=lvl[currLvl].enemies;
    for(var i=0;i<pts.length;i++){
        pts[i]=pts[i].split(",");
       
        points[i]=new Point(canvas.width/pts[i][0],canvas.height/pts[i][1]);
    }
}


function newRound(){
    
    if(gameObjects.lvl)
        gameObjects.Lvl.text="LVL "+Math.floor(currLvl+1);
    
        makePointsfromLevel();
    
    gameObjects.text0=new Text(canvas.width/2.4,canvas.height/2,55,"red","get ready!");
    gameObjects.text0.lifetime=1000;
    gameObjects.text0.then=now;
    gameObjects.text0.ondisappear=function(){
    Poziom=parseInt(currLvl+1);
        if(!game)return;
        gameObjects.text1=new Text(canvas.width/2.4,canvas.height/2,55,"red","Level "+Poziom);
        gameObjects.text1.lifetime=1500;
        gameObjects.text1.then=now;
        gameObjects.text1.ondisappear=function(){
            if(!game)return;
            repeat=true;
            for(var i=0;i<lvl[currLvl].enemies;i++)
            {
                
                    gameObjects.enemies[i]=new Enemy(lvl[currLvl].startPos[0]-i*lvl[currLvl].diff[0],lvl[currLvl].startPos[1]+i*lvl[currLvl].diff[1],canvas.width/19.6,canvas.height/11.04,"enemy",lvl[currLvl].enemyHp,lvl[currLvl].enemySpeed,i,window["enemy"+enemyImage],lvl[currLvl].shotChance);
                    if(lvl[currLvl].boss){
                        repeat=false;
                        gameObjects.enemies[i].shot=function(){
                            
                        gameObjects.bullets[this.getFreeBullet()]=new EBullet(this.x+this.w/2,this.y+this.h,10,10,this.bs,this.getFreeBullet(),"player");
                        //gameObjects.bullets[this.getFreeBullet()-1].bs=gameObjects.bullets[this.getFreeBullet()-1].bs * Math.cos(Math.atan2((gameObjects.bullets[this.getFreeBullet()-1].y+gameObjects.bullets[this.getFreeBullet()-1].h/2) - gameObjects.player.y, gameObjects.player.x - (gameObjects.bullets[this.getFreeBullet()-1].x+gameObjects.bullets[this.getFreeBullet()-1].w/2)));
                        //gameObjects.bullets[this.getFreeBullet()-1].bsx=gameObjects.bullets[this.getFreeBullet()-1].bs * -1*Math.sin(Math.atan2((gameObjects.bullets[this.getFreeBullet()-1].y+gameObjects.bullets[this.getFreeBullet()-1].h/2) - gameObjects.player.y, gameObjects.player.x - (gameObjects.bullets[this.getFreeBullet()-1].x+gameObjects.bullets[this.getFreeBullet()-1].w/2)));
                        //         //this.x += this.speed * Math.cos(Math.atan2((this.y+this.h/2) - p.y, p.x - (this.x+this.w/2)));
		                
                            gameObjects.bullets[this.getFreeBullet()-1].bsx=gameObjects.bullets[this.getFreeBullet()-1].bs*getX(gameObjects.bullets[this.getFreeBullet()-1],gameObjects.player)
                            gameObjects.bullets[this.getFreeBullet()-1].bsy=gameObjects.bullets[this.getFreeBullet()-1].bs*getY(gameObjects.bullets[this.getFreeBullet()-1],gameObjects.player)
                        
                       
                        }
                       
                        gameObjects.enemies[i].w=canvas.width/5.2;
                        gameObjects.enemies[i].h=canvas.height/5.76;
                        gameObjects.enemies[i].onkillPlus=function(){
                            for(var i=Math.random()*20+10;i>0;i--){
                                 gameObjects.items[gameObjects.items.length]=new Item(this.x+Math.random()*this.w,this.y+Math.random()*this.h,gameObjects.items.length,3);
                                bonuses++;
                            }
                        }
                    }
            }
        }
    }
        
        
}

function shopOpen(){
    shop=true;
    gameObjects.button=[];
    Shop.toDelete=[];
    
    
    
    gameObjects.shopImg=new Img(panelW,0,Shop.w,Shop.h,shopImg)
    Shop.toDelete[0]="shopImg";
    for(var i=0;i<Shop.item.length;i++){
        tmpStr=Shop.item[i].name+"Button";
        
        gameObjects[tmpStr]=new Button(Shop.buttonStartX,Shop.buttonStartY+i*(Shop.buttonH),Shop.buttonW,Shop.buttonH,"button");
        gameObjects[tmpStr].shopItemIdx=i;
        gameObjects[tmpStr].ontap=function(){
            
            
            gameObjects.currItemName=new Text(Shop.buttonStartX+Shop.buttonW*1.2,Shop.buttonStartY*2,fontSize,"black",Shop.item[this.shopItemIdx].name);   
            
            if(gameObjects.player.money<Shop.item[this.shopItemIdx].price)
                gameObjects.currItemCost=new Text(Shop.buttonStartX+Shop.buttonW*1.2,Shop.buttonStartY*2+Shop.buttonH*2,fontSize,"red","Price: $"+Shop.item[this.shopItemIdx].price);
            else
                gameObjects.currItemCost=new Text(Shop.buttonStartX+Shop.buttonW*1.2,Shop.buttonStartY*2+Shop.buttonH*2,fontSize,"Lime","Price: $"+Shop.item[this.shopItemIdx].price);

            gameObjects.currItemDesc=new Text(Shop.buttonStartX+Shop.buttonW*1.2,Shop.buttonStartY*2+Shop.buttonH,Math.floor(fontSize/2),"black",Shop.item[this.shopItemIdx].desc);
            gameObjects.buyButton=new Button(Shop.buttonStartX+Shop.buttonW*1.2,canvas.height/1.25,Shop.buttonW,canvas.height/6.65,"button");
            gameObjects.buyButton.image=shopbtn;
            gameObjects.buyButton.shopItemIdx=this.shopItemIdx;
            gameObjects.buyButtonTxt=new Text(gameObjects.buyButton.x+gameObjects.buyButton.w/3,gameObjects.buyButton.y+fontSize,Math.floor(fontSize/1.5),"black","BUY")

            gameObjects.buyButton.ontap=function(){
                
            if(gameObjects.player.money>=Shop.item[this.shopItemIdx].price&&touch)
                {
                 if(Shop.item[this.shopItemIdx].onbuy())
                  {
                      touch=false;
                      gameObjects.player.money-=Shop.item[this.shopItemIdx].price;
                      if(gameObjects.player.money<Shop.item[this.shopItemIdx].price)
                            gameObjects.currItemCost.color="red";
                      else  gameObjects.currItemCost.color="lime";
                   }
               }else if(gameObjects.player.money<Shop.item[this.shopItemIdx].price&&touch)
                   {
                       touch=false; 
                       gameObjects.alertText=new Text(Shop.buttonStartX+Shop.buttonW*1.2,Shop.buttonStartY*3.6,fontSize/2,"red","Not enough gold, captain");
                       gameObjects.alertText.lifetime=1000;
                       gameObjects.alertText.then=now;
                       gameObjects.alertText.ondisappear=function(){
                           delete gameObjects.alertText;
                       }
                   }
            }
         

        }
        gameObjects[tmpStr].image=shopbtn;
        gameObjects[tmpStr+"Txt"]=new Text(gameObjects[tmpStr].x+fontSize/2,gameObjects[tmpStr].y+fontSize/1.5,fontSize/1.5,"black",Shop.item[i].name)
        Shop.toDelete[Shop.toDelete.length]=tmpStr+"Txt";
        Shop.toDelete[Shop.toDelete.length]=tmpStr;
    }
    
    
        gameObjects.buttonShopExit=new Button(canvas.width-panelW-canvas.width/20,0,canvas.width/19.6,canvas.height/11.04);
        gameObjects.buttonShopExit.image=exitbtn;
        gameObjects.buttonShopExit.ontap=function(){
            shopClose();
        }
        Shop.toDelete[Shop.toDelete.length]="buttonShopExit";
        Shop.toDelete[Shop.toDelete.length]="currItemName";
        Shop.toDelete[Shop.toDelete.length]="currItemCost";
        Shop.toDelete[Shop.toDelete.length]="currItemDesc";
        Shop.toDelete[Shop.toDelete.length]="buyButton";
        Shop.toDelete[Shop.toDelete.length]="alertText";
        Shop.toDelete[Shop.toDelete.length]="buyButtonTxt";
      
        //gameObjects.speedButton=new Button(shopButtonlx,shopButtonStartY,shopButtonW,shopButtonH,"button");
        //gameObjects.speedButton.ontap=function(){
        //    if(gameObjects.player.money>60&&touch)
        //        {
        //            if(gameObjects.player.speedUp())
        //                {
        //                    touch=false;
        //                    gameObjects.player.money-=60;
        //                }
        //        }
        //    }
        //
    //
        //gameObjects.buttonBullet=new Button(shopButtonlx,shopButtonStartY+shopButtonH+shopButtonH/2,shopButtonW,shopButtonH,"button");
        //gameObjects.buttonBullet.ontap=function(){
        //    if(gameObjects.player.money>100&&touch)
        //        {
        //            if(gameObjects.player.bUp())
        //                {
        //                    touch=false;
        //                    gameObjects.player.money-=60;
        //                }
        //        }
        //    }
        //gameObjects.buttonBullet.image=shopbtn;
        //gameObjects.buttonBulletTxt=new Text(gameObjects.buttonBullet.x+fontSize/2,gameObjects.buttonBullet.y+fontSize/1.3,fontSize/1.5,"black","Bullet+  [100$]")
        //
        //
        //gameObjects.buttonBs=new Button(shopButtonlx,gameObjects.buttonBullet.y+shopButtonH+shopButtonH/2,shopButtonW,shopButtonH,"button");
        //gameObjects.buttonBs.ontap=function(){
        //    if(gameObjects.player.money>150&&touch)
        //        {
        //            if(gameObjects.player.bsUp())
        //                {
        //                    touch=false;
        //                    gameObjects.player.money-=60;
        //                }
        //        }
        //    }
        //gameObjects.buttonBs.image=shopbtn;
        //gameObjects.buttonBsTxt=new Text(gameObjects.buttonBs.x+fontSize/4,gameObjects.buttonBs.y+fontSize/1.3,fontSize/1.8,"black","BulletSpeed[150$]")
    //
        //
        //
        //
        //
        //
        //
//gameObjects.shopImg=new Img(panelW,0,canvas.width-2*(panelW),canvas.height,shopImg)

    
}
function shopClose(){
    
    for(var i=0;i<Shop.toDelete.length;i++)
        {
            
            delete gameObjects[Shop.toDelete[i]];
        }
    Shop.toDelete=[];
    shop=false;
    newRound();
}

function mainMenu(){
    
    gameObjects={};
    
    backgroundColor="black";
    

    
    
    gameObjects.button0=new Button(buttonX,button0Y,buttonW,buttonH,"button");
    
    gameObjects.button0.ontap=function(){
        
        
        touch=false;
        newGame();
    }
    
    
    
    gameObjects.button1=new Button(buttonX,button1Y,buttonW,buttonH,"button");
    
    gameObjects.button1.ontap=function(){
        
        levelDesigner();
        touch=false;
    }

    gameObjects.button2=new Button(buttonX,button2Y,buttonW,buttonH,"button");
    
    gameObjects.button2.ontap=function(){
       
        backgroundColor="red";
        touch=false;
    }
    
    gameObjects.text0=new Text(buttonX+buttonW/3,button0Y+fontSize,fontSize,"red","START");
    gameObjects.text1=new Text(buttonX+buttonW/3,button1Y+fontSize,fontSize,"red","LVL Designer");

}


function newGame(){
    
    game=true;
    gameObjects={};
    
    backgroundColor="cyan";
    
    
    
    gameObjects.player = new player(canvas.width/2,canvas.height-canvas.height/10,canvas.width/19.66,canvas.height/11.06,"gracz");
    gameObjects.destroyPic=[];
    gameObjects.bullets=[];
    gameObjects.enemies=[];
    gameObjects.items=[];
    
    gameObjects.player.ontap=function(){
        
    }
    //gameObjects.img0=new Img(0,0,canvas.width/10,canvas.height,panelImage);
    gameObjects.panelL=new Img(0,0,panelW,panelH,panelL);
    gameObjects.panelR=new Img(canvas.width-panelW,0,panelW,panelH,panelL);
    gameObjects.buttonL= new Img(canvas.width/100,canvas.height-canvas.height/5.52,canvas.width/10,canvas.height/5.52,steeringL);
    gameObjects.buttonL.ontap=function(){
         if(!shop)gameObjects.player.moveLeft();
    }
    
    gameObjects.buttonR= new Img(gameObjects.buttonL.x+canvas.width/10+canvas.width/100,canvas.height-canvas.height/5.52,canvas.width/10,canvas.height/5.52,steeringR);
    gameObjects.buttonR.ontap=function(){
       if(!shop)gameObjects.player.moveRight();
    }
    
    gameObjects.shot= new Img(canvas.width-canvas.width/10-canvas.width/100,canvas.height-canvas.height/5.52,canvas.width/10,canvas.height/5.52,shotImg);
    gameObjects.shot.ontap=function(){
        
        
        if(!shop)gameObjects.player.shot();
                
            
    }
    
    
    gameObjects.score=new Text(panelW+panelW/10,canvas.height/20,fontSize/2,"white","SCORE: ","score");
    
    gameObjects.S=new Text(panelH/100,panelH/2-panelH/10+fontSize/3.5,Math.floor(fontSize/2.5),"red","S");
    gameObjects.B=new Text(panelH/100,panelH/2-panelH/20+fontSize/3.5,Math.floor(fontSize/2.5),"red","B");
    gameObjects.BS=new Text(panelH/5000,panelH/2-1+fontSize/3.5,Math.floor(fontSize/2.7),"red","BS");
    gameObjects.Lvl=new Text(panelH/100,panelH/1.4-1+fontSize/3.5,Math.floor(fontSize/2),"red","LVL ","Poziom");
    gameObjects.money=new Text(5,canvas.height/20,Math.floor(fontSize/2),"black","$","Money")
    
    
    
    
    
    newRound();
    

}


function levelDesigner(){
    pointEdit=true;
    //currLvl=prompt("LVL? ");
    
    gameObjects={};
    
    backgroundColor="cyan";
    
    
    
    gameObjects.player = new player(canvas.width/2,canvas.height-canvas.height/10,canvas.width/19.66,canvas.height/11.06,"gracz");
    gameObjects.bullets=[];
    gameObjects.enemies=[];
    gameObjects.player.ontap=function(){
        
    }
    //gameObjects.img0=new Img(0,0,canvas.width/10,canvas.height,panelImage);
    gameObjects.panel=new Img(0,0,panelW,panelH,panelL);
    gameObjects.panelR=new Img(canvas.width-panelW,0,panelW,panelH,panelL);
    gameObjects.buttonL= new Img(canvas.width/100,canvas.height-canvas.height/5.52,canvas.width/10,canvas.height/5.52,steeringL);
    gameObjects.buttonL.ontap=function(){
         gameObjects.player.moveLeft();
    }
    
    gameObjects.buttonR= new Img(gameObjects.buttonL.x+canvas.width/10+canvas.width/100,canvas.height-canvas.height/5.52,canvas.width/10,canvas.height/5.52,steeringR);
    gameObjects.buttonR.ontap=function(){
       gameObjects.player.moveRight();
    }
    
    gameObjects.shot= new Img(canvas.width-canvas.width/10-canvas.width/100,canvas.height-canvas.height/5.52,canvas.width/10,canvas.height/5.52,shotImg);
    gameObjects.shot.ontap=function(){
                
                //newRound();
        
            
    }
    
    
}