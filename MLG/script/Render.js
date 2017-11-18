
var render = function(){
ctx.clearRect(0,0,630,500);


ctx.fillStyle="hsla(121, 79%, 35%, 1)";
ctx.fillRect(0,0,canvasWidth,canvasHeight);


ctx.drawImage(mur,0,0);






for(var i = 0;i<maxBullets;i++){
		if(bullets[i])bullets[i].render();
	}

	for(var i = 0;i<maxEnemies;i++){
		if(enemies[i])enemies[i].render();
	}


ctx.fillStyle="red";
/*
ctx.beginPath();
ctx.arc(Kolo.getX(),Kolo.y,Kolo.r,0,2*Math.PI);


ctx.stroke();


	ctx.beginPath();
	ctx.moveTo(Gracz.getCenterX(),Gracz.getCenterY());
	ctx.lineTo(mouseX,mouseY);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(Gracz.getCenterX(),Gracz.getCenterY());
	ctx.lineTo(Gracz.getCenterX()-Kolo.r,Gracz.getCenterY());
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(Gracz.getCenterX()-Kolo.r,Gracz.getCenterY());
	ctx.lineTo(mouseX,mouseY);
	ctx.stroke();
*/
	
	
	
	

//	
//ctx.beginPath();
//ctx.arc(Gracz.getCenterX(),Gracz.getCenterY(),29,0,2*Math.PI);

//ctx.fill();
//ctx.stroke();


		
	
	//top menu
	
	ctx.fillStyle="hsla(234, 7%, 48%, 1)";
	ctx.fillRect(0,0,canvasWidth,40)
	
	ctx.fillStyle="black"
	
ctx.fillText("HP ",10,30);


//hp
ctx.fillStyle="black";
ctx.fillRect(40,4,104,30);
ctx.fillStyle="hsla(121, 79%, 50%, 1)";
ctx.fillRect(42,6,getPercent(Gracz.hp,Gracz.maxHP)/100*100,26);

//kasa
	ctx.fillStyle="black"
	ctx.font = "25px Impact";
ctx.fillText("Gold: ",160,30);
ctx.fillStyle="gold";
ctx.fillText(Gracz.gold,215,30);


ctx.fillStyle = "black";
ctx.fillText("lvl: "+round, 280,30)
ctx.fillRect(350,10,250,20);
ctx.fillStyle ="white";
ctx.fillRect(352,12,getPercent(maks(0,roundTime,second),roundTime)/100*246,16);


if(sklep){
	ctx.fillStyle = "hsla(183, 6%, 58%, 0.8)";
	ctx.fillRect(100,70,canvasWidth-150,canvasHeight-100)
	
	ctx.fillStyle = "red";
	ctx.fillRect(canvasWidth - 60,60,20,20)
	ctx.fillStyle = "white";
	ctx.fillText("X", canvasWidth - 55,80)

	ctx.fillText("STORE", canvasWidth - 305,80)
	
	if(!sklepWeapons){
	ctx.fillStyle ="hsla(247, 48%, 58%, 0.84)";
	ctx.fillRect(120,90,200,50);
	ctx.fillRect(120,160,200,50);
	ctx.fillRect(120,230,200,50);
	ctx.fillRect(120,300,200,50);
	
	ctx.fillRect(420,300,140,50);
	
	ctx.fillStyle="white";
	ctx.fillText("Weapons >",430,335)
	ctx.fillText("Reload "+"("+bullet.price+" G)",130,125)
	ctx.fillText("["+Gracz.weapon.reloadTime+"]",320,125)
	ctx.fillText("Dmg "+"("+dmg.price+" G)",130,195)
	ctx.fillText("["+Gracz.dmg+"]",320,195)
	ctx.fillText("HP "+"("+hp.price+" G)",130,265)
	ctx.fillText("["+Gracz.maxHP+"]",320,265)
	ctx.fillText("Miner "+"("+miner.price+" G)",130,335)
	ctx.fillText("["+GperS+"/s]",320,335)
	}else{
		ctx.fillStyle ="hsla(247, 48%, 58%, 0.84)";
		ctx.fillRect(420,300,140,50);
		var pozX=120;
		var o=1;
			for(var i =1;i<=7;i++){
				if(i==5){
					pozX=420;
					o=1;
				}
				ctx.fillStyle="white";
				ctx.fillText(Wp[i].name+" ",pozX+60,o*77+20);
				ctx.fillText("["+Wp[i].price+"]",pozX+60,o*77+50);
				ctx.drawImage(Wp[i].image,pozX,o*77,50,50);
				o++;
			}
		
		
		ctx.fillStyle="white";
		ctx.fillText("Shop >",430,335);
	}
}

		if(pause){
			ctx.fillStyle="pink";
			ctx.fillText("PAUSE (press P to continue)", canvasWidth/2-100,canvasHeight/2);
		}
		if(!newRound && !sklep){
			ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
			ctx.fillRect(canvasWidth-120,canvasHeight-70,100,50);
			
			ctx.fillStyle = "black";
			ctx.fillText("GO !",canvasWidth-90,canvasHeight-35);
			
			//shop button
			ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
			ctx.fillRect(canvasWidth-320,canvasHeight-70,100,50);
			
			ctx.fillStyle = "black";
			ctx.fillText("STORE",canvasWidth-300,canvasHeight-35);
			
			
			//save button
			ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
			ctx.fillRect(canvasWidth-460,canvasHeight-70,50,50);
			
			ctx.fillStyle = "black";
			ctx.fillText("SAVE",canvasWidth-460,canvasHeight-35);
			
			//load button
			ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
			ctx.fillRect(canvasWidth-395,canvasHeight-70,50,50);
			
			ctx.fillStyle = "black";
			ctx.fillText("LOAD",canvasWidth-395,canvasHeight-35);
			
		}
			ctx.fillStyle="hsla(234, 7%, 48%, 1)";
			ctx.fillRect(0,canvasHeight,canvasWidth,100);
			
			for(var i = 0;i<=Wp.length-1;i++){
					ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
					ctx.drawImage(Wp[i].image,75*i+25,canvasHeight+40,50,50);
					if(getCurrentWeapon()==i){ctx.fillStyle = "hsla(122, 100%, 50%, 1)";
					}else {ctx.fillStyle="black"};
					ctx.fillText(Wp[i].name,75*i+20,canvasHeight+35)
				
			}
		
		
		

		if(napis){
		ctx.fillStyle = "red";
		ctx.fillRect(canvasWidth/2-125,canvasHeight-50,250,50);
		ctx.fillStyle="white";
		ctx.fillText(napis,canvasWidth/2-100,canvasHeight-20)
	}
	
	if(healer.owned)healer.render();
	if(klacias.owned)klacias.render();
	

	for(var i =0;i<=Napis_.length;i++){
		
		if(Napis_[i])Napis_[i].render();
	}
	
	
//ctx.beginPath();
//ctx.arc(Gracz.getCenterX(),Gracz.getCenterY(),40,0,2*Math.PI);
//

ctx.stroke();

	
ctx.save();
ctx.translate( Gracz.getCenterX(), Gracz.getCenterY() );
ctx.rotate(-degToRad(mouseangle)+Math.PI/2 );
	test = kat*2*Math.PI*25/360;
ctx.translate( -Gracz.getCenterX(), -Gracz.getCenterY() );
Gracz.weapon.render();
	ctx.fillRect(Gracz.x,Gracz.y,50,50)

ctx.restore();
ctx.fillStyle="black";
if(Gracz.weapon.name!="Mag7"|| Gracz.weapon.name!="XM"){
		ctx.fillText(Gracz.weapon.ammo+" / "+Gracz.weapon.magazine,10,300); 
}else ctx.fillText(Gracz.weapon.ammo/3+" / "+Gracz.weapon.magazine,10,300);

if(Gracz.weapon.ammo<=0&&!reloading){
	
	ctx.fillStyle="hsla(60, 100%, 56%, 1)";
	ctx.fillText("Press R or shot to reload! ",190,250)
}
if(reloading){
	ctx.fillStyle="hsla(60, 100%, 56%, 1)";
		ctx.fillText("RELOADING !",190,250)
		ctx.fillStyle="black";
		ctx.fillRect(200,270,102,22);
		ctx.fillStyle="white";
		ctx.fillRect(201,271,getPercent(time,Gracz.weapon.reloadTime),20);
	}
xr = Gracz.getCenterX() + (29 +Gracz.weapon.w-5) * Math.cos(-degToRad(mouseangle))
yr = Gracz.getCenterY()+Gracz.weapon.lufa*2 + (29+Gracz.weapon.w-5) * Math.sin(-degToRad(mouseangle))
//ctx.fillRect(xr,yr,5,5)



}

var renderMenu = function(){
	
	ctx.fillStyle = "hsla(234, 7%, 48%, 1)";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
		//TYTUL
		
		ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
		ctx.fillText("Castle Defender "+version, 100,40);
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(canvasWidth/2-125,100,250,50);
		ctx.fillRect(canvasWidth/2-125,200,250,50);
		ctx.fillRect(canvasWidth/2-125,300,250,50);
		
	ctx.fillStyle ="black";
		ctx.fillText("START",canvasWidth/2-35,135)
		ctx.fillText("CONTROLS",canvasWidth/2-55,235)
		ctx.fillText("DONT CLICK !",canvasWidth/2-65,335)
	
	
}
var renderOpcje=function(){
	
			ctx.fillStyle = "hsla(234, 7%, 48%, 1)";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
		//TYTUL
		
		ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
		ctx.fillText("Castle Defender "+version, 100,40);
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(50,50,canvasWidth-100,canvasHeight-100);
		
		
	ctx.fillStyle ="black";
		ctx.fillText("Click : shot",100,100)
		ctx.fillText("Mousemove: aim",100,170)
		ctx.fillText("R : reload",100,240)
		ctx.fillText("1-7 : weapons",100,320)
		ctx.fillText("Click to continue!",400,200)
		
	
}
var renderAutorzy=function(){
			ctx.fillStyle = "hsla(234, 7%, 48%, 1)";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
		//TYTUL
		
		ctx.fillStyle = "hsla(183, 100%, 58%, 1)";
		ctx.fillText("Castle Defender "+version, 100,40);
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(50,50,canvasWidth-100,canvasHeight-100);
		
		
	ctx.fillStyle ="black";
		ctx.fillText("Code: SirDomin",100,100)
		ctx.fillText("Game Idea: SirDomin",100,170)
		ctx.fillText("R : reload",100,240)
		ctx.fillText("1-7 : weapons",100,320)
		ctx.fillText("Click to continue!",400,200)
		
	
}