



ctx.font = "25px Impact";
Gracz = new Player(50,50,0,height/2-25,100,5,0,1);

//load weapon


	

var update = function(){

if(klacias.owned){maxBullets = Gracz.weapon.magazine+klacias.maxBullets}else maxBullets=Gracz.weapon.magazine;

if(37 in keysDown)Gracz.moveLeft();
if(39 in keysDown)Gracz.moveRight();

for(var i = 0;i<maxBullets;i++){
		if(bullets[i])bullets[i].tick();
	}

	for(var i = 0;i<maxEnemies;i++){
		if(enemies[i])enemies[i].tick();
	}
		
		if(second <=0&& enemiesCount <= 0 && win){
			newRound = false;
			komunikat("Gold earned: "+goldEarned)
			win = false;
		}
		randomEvents();
		Gracz.hp = maks(0,Gracz.maxHP,Gracz.hp);
		
		if(Gracz.hp <= 0 && !lose ){
			newRound = false;
			second = roundTime;
			round--;
			komunikat("Gold earned: "+goldEarned)
			for(var i =0;i<= maxEnemies;i++){
				if(enemies[i])delete enemies[i];
			}
			for(var i = 0;i<Gracz.maxBullets;i++){
				if(bullets[i])delete bullets[i];
			}
			lose = true;
		}
Kolo = new kolo(Gracz.getCenterX(),Gracz.getCenterY(),Math.sqrt(Math.pow(Gracz.getCenterX()-mouseX,2)+Math.pow(Gracz.getCenterY()-mouseY,2)));



	//odleglosc = Math.sqrt(Math.pow(0-mouseX,2)+Math.pow(Kolo.r-mouseY,2))
odleglosc = (Math.sqrt(Math.pow((Gracz.x+55)-mouseX,2)+Math.pow((Gracz.y+11+Gracz.weapon.length+20-Kolo.r-11)-mouseY,2)))
	
mouseangle = radToDeg(Math.atan2((Gracz.y+Gracz.w/2) - mouseY, mouseX - (Gracz.x+Gracz.w/2)));
	

	
kat =maks(0,3/2*Math.PI,Math.asin((odleglosc/2)/Kolo.r));



if(healer.owned)healer.perTick();
if(klacias.owned)klacias.perTick();

Gracz.x=maks(0,width-Gracz.w,Gracz.x);






}

var main = function(){


if(game){
if(!pause){
	if(reloading){
		time--;
		if(time<=0){
			reloading=false;
			Gracz.weapon.ammo=Gracz.weapon.magazine;
		}
	}
update();
}
render();
}else {
	if(!opcje&&!autorzy)renderMenu();
		else if(opcje&&!autorzy) {
			renderOpcje();
		}else if(!opcje&&autorzy){
			renderAutorzy();
		}
}

  d = new Date();
  now = d.getTime();
   if(!sec){
	  then = now;
	  sec = true;
   }
   if(!fire){
	   fireTime = now;
	   fire = true;
   }
   if(now - fireTime >= Gracz.weapon.ms){
	   fire = false;
	   
	   per200ms();
   }
   
	if(now - then >= 1000){
		sec = false;
		perSec();
	}
   

requestAnimFrame(main);
}


window.requestAnimFrame = function(main){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

spawnEnemy = function(){
	// function(id,w,h,dmg,hp,v)
	enemies[getFreeEnemies()] = new Enemy(getFreeEnemies(),50,50,10+round,round,round * 2,Math.floor(Math.random()*4+1));
}

randomEvents = function(){
	var random = Math.floor(Math.random()*50+1)
	switch(random){
			case 1:
			if(newRound && second > 0){
			spawnEnemy();
			enemiesCount ++;
			}
			case 2:
			if(newRound && second > 0){
			
				klacias.weapon.shot();
			
			}
				
			break;
			
		
	}
	
}

var perSec=function(){
	
	if(newRound && !pause)second--;
	if(napis){
		napis_timer++;
		if(napis_timer>=2){
			
			napis = false;
			napis_timer = 0;
			
		}
	}
	if(mine&&!pause){
		Gracz.gold += GperS;
	}
}

per200ms=function(){
	if(game && !pause && newRound && 255 in keysDown &&reloaded){
				Gracz.weapon.shot();
			
	}
	reloaded = true;
}
main();
