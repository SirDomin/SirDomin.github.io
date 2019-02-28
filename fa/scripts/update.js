function update(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    //


    //////////////////////////optymalizacja !!//////////////
    for(var p in gameObjects)
    {
        
        if(gameObjects[p]&&gameObjects[p].lifetime)
            if(gameObjects[p].then+gameObjects[p].lifetime<now)
                {
                
                    gameObjects[p].ondisappear();
                    delete gameObjects[p];
                }
          if(gameObjects[p]){
              if(p!="bullets"&&p!="enemies"&&p!="items"&&p!="button"&&p!="destroyPic"){
                gameObjects[p].render();
                  
                  if(gameObjects[p].collision)
                    gameObjects[p].collision();
                  
              }else{
          
                  for(var x in gameObjects[p]){
                      
                  //for(var x=0;x<gameObjects[p].length;x++){
                      if(gameObjects[p]&&gameObjects[p][x])
                          {
                                gameObjects[p][x].render();
                              if(gameObjects[p][x]&&gameObjects[p][x].collision)
                                gameObjects[p][x].collision();
                              
                              if(gameObjects[p]&&gameObjects[p][x]&&gameObjects[p][x].lifetime&&gameObjects[p][x].then+gameObjects[p][x].lifetime<now)
                                  {
                                        gameObjects[p][x].ondisappear();
                                        delete gameObjects[p][x];
                                  }
                              
                          }
                    }
              }
                  
                
          }
          
        if(ongoingTouches&&gameObjects[p]&&gameObjects[p].ontap){
            for(var i in ongoingTouches)
                if(ongoingTouches[i].pageX>gameObjects[p].x&&
                   ongoingTouches[i].pageX<gameObjects[p].x+gameObjects[p].w&&
                   ongoingTouches[i].pageY>gameObjects[p].y&&
                   ongoingTouches[i].pageY<gameObjects[p].y+gameObjects[p].h){
                    gameObjects[p].ontap();
                 break;   
                }
        }   
    }
   if(pointEdit){
      for(var i=0;i<points.length;i++)
      {
          if(points[i])
            points[i].render();
          
          if(points[i+1])
              {
                ctx.beginPath();
                  ctx.moveTo(points[i].x,points[i].y);
                ctx.lineTo(points[i+1].x,points[i+1].y);
                ctx.stroke();
              }
          
      }
    }
    if(game){
        Money=gameObjects.player.money;
        ctx.fillStyle="black";
        ctx.font=fontSize/2+"px Arial";
        
        
        ctx.fillRect(panelW/5,panelH/2-panelH/10,7*(panelW/10),panelH/40);
        ctx.fillRect(panelW/5,panelH/2-panelH/20,7*(panelW/10),panelH/40);
        ctx.fillRect(panelW/5,panelH/2,7*(panelW/10),panelH/40);
        ctx.fillRect(panelW/8,canvas.height/20+canvas.height/5,7*(panelW/10),panelH/40);
        ctx.fillStyle="lime";
        
        ctx.drawImage(barImg,panelW/5+1,panelH/2-panelH/10+1,getPercentage(getMax(0,gameObjects.player.maxSpeed,gameObjects.player.speed),gameObjects.player.maxSpeed)*(7*(panelW/10)-2),panelH/40-2);
        ctx.drawImage(barImg,panelW/5+1,panelH/2+1,getPercentage(getMax(0,gameObjects.player.maxbs,gameObjects.player.bs),gameObjects.player.maxbs)*(7*(panelW/10)-2),panelH/40-2);
        ctx.drawImage(barImg,panelW/5+1,panelH/2-panelH/20+1,getPercentage(getMax(0,gameObjects.player.maxb,gameObjects.player.b),gameObjects.player.maxb)*(7*(panelW/10)-2),panelH/40-2);
        //ctx.fillRect(panelW/5,panelH/4,7*(panelW/10),panelH/40);
        
        ctx.fillStyle="hsla(157, 0%, 74%, 1)";
        ctx.drawImage(item5,0,canvas.height/20+canvas.height/5,panelH/40,panelH/40)
        ctx.fillRect(panelW/8+1,canvas.height/20+canvas.height/5+1,getPercentage(getMax(0,gameObjects.player.shieldMaxHp,gameObjects.player.shieldHp),gameObjects.player.shieldMaxHp)*7*(panelW/10)-2,panelH/40-2);
        
        for(var i=0;i<=gameObjects.player.life;i++)
            {
                
                ctx.drawImage(item4,i*(panelW/8),canvas.height/20+canvas.height/10,panelW/8,panelW/8);
            }
        
        
    
    }
 
   
    if(lvl[currLvl].enemies<=0){
        
        if(!repeat&&!bonuses){
            points=[];
            lvl[currLvl].enemies=maxEnemies;
            if(lvl[currLvl+1])currLvl++;
                else currLvl=0;
            if(currLvl%4)newRound();
            else {
                enemyImage++;
                shopOpen();
            }
        }else if(repeat){
            lvl[currLvl].enemies=maxEnemies;
            repeat=false;
            for(var i=0;i<lvl[currLvl].enemies;i++){
        gameObjects.enemies[i]=new Enemy(lvl[currLvl].startPos[0]-i*lvl[currLvl].diff[0],lvl[currLvl].startPos[1]+i*lvl[currLvl].diff[1],canvas.width/19.6,canvas.height/11.04,"enemy",lvl[currLvl].enemyHp,lvl[currLvl].enemySpeed,i,window["enemy"+enemyImage],lvl[currLvl].shotChance);

            }
        }
    }
  
    
        
}
