var przycisk = function(e){
	
	switch(e){
		case 27:
			if(!pause)pause = true;
			else pause = false;
			break;
		
		case 49:
			if(zawiera(Gracz.ownedWeapons,0)){if(!reloading)Gracz.weapon = Wp[0];
				}else komunikat("Weapon not owned !");
			break;
		case 50:
			if(zawiera(Gracz.ownedWeapons,1)){if(!reloading)Gracz.weapon = Wp[1];
				}else komunikat("Weapon not owned !");
			break;
		case 51:
			if(zawiera(Gracz.ownedWeapons,2)){if(!reloading)Gracz.weapon = Wp[2];
				}else komunikat("Weapon not owned !");
			break;
		
		case 52:
			if(zawiera(Gracz.ownedWeapons,3)){if(!reloading)Gracz.weapon = Wp[3];
				}else komunikat("Weapon not owned !");
			break;
		
		case 53:
			if(zawiera(Gracz.ownedWeapons,4)){if(!reloading)Gracz.weapon = Wp[4];
				}else komunikat("Weapon not owned !");
			break;
		
		case 54:
			if(zawiera(Gracz.ownedWeapons,5)){if(!reloading)Gracz.weapon = Wp[5];
				}else komunikat("Weapon not owned !");
			break;
		
		case 55:
			if(zawiera(Gracz.ownedWeapons,6)){if(!reloading)Gracz.weapon = Wp[6];
				}else komunikat("Weapon not owned !");
			break;
		case 56:
			if(zawiera(Gracz.ownedWeapons,7)){if(!reloading)Gracz.weapon = Wp[7];
				}else komunikat("Weapon not owned !");
			break;
		case 82:
			if(!reloading){
				time=Gracz.weapon.reloadTime;
				reloading=true;
			}
			break;
		
	
		
	
	
	}
	
	
}
var click = function(x,y){
	
	if(!game){
		if(!opcje&&x>canvasWidth/2-125&&x<canvasWidth/2+125&&y>100&&y<150){
			game = true;
			bullets = [];
			enemies = [];
			maxEnemies = 20;
			mur = new Image();
			mur.src = "img/wall.png";
			klacias.target = null;
		}else if(opcje){
			if(x>50&&x<canvasWidth-50&&y>50&&y<canvasHeight-50){opcje=false}
		}else if(x>canvasWidth/2-125&&x<canvasWidth/2+125&&y>200&&y<250){
			opcje=true;
		}else if(autorzy){
			if(x>50&&x<canvasWidth-50&&y>50&&y<canvasHeight-50){autorzy=false}
		}else if(x>canvasWidth/2-125&&x<canvasWidth/2+125&&y>300&&y<350){
			autorzy=true;
			
		}
	}else if(!newRound){
		if(x>canvasWidth-120&&x<canvasWidth-20&&y>canvasHeight-70&&y<canvasHeight-20&&!sklep){
			Gracz.hp = Gracz.maxHP;
			round++;
			enemiesCount = 0;
			roundTime += 1;
			second = roundTime;
			newRound = true;
			lose = false;
			win = true;
			goldEarned = 0;
			info= String("LVL "+round);
			komunikat(info);
				}else if(x>canvasWidth-320&&x<canvasWidth-20&&y>canvasHeight-70&&y<canvasHeight-20&&!sklep){sklep = true;
				}else if(sklep&&x>canvasWidth-60&&x<canvasWidth-40&&y>60&&y<80){sklep = false;sklepWeapons = false;
				}else if(!sklepWeapons&&sklep&&x>120&&x<320&&y>90&&y<140){bullet.buy();
				}else if(!sklepWeapons&&sklep&&x>120&&x<320&&y>90&&y<210){dmg.buy();
				}else if(!sklepWeapons&&sklep&&x>120&&x<320&&y>90&&y<280){hp.buy();
				}else if(!sklepWeapons&&sklep&&x>120&&x<320&&y>90&&y<350){miner.buy();
				}else if(sklep&&x>420&&x<560&&y>300&&y<350){if(!sklepWeapons){sklepWeapons=true;}else sklepWeapons = false;
				}else if(!sklep &&x>canvasWidth-460&&x<canvasWidth-410&&y>canvasHeight-70&&y<canvasHeight-20){saveGame();
				}else if (!sklep&&x>canvasWidth-395&&x<canvasWidth-345&&y>canvasHeight-70&&y<canvasHeight-20){loadGame();
				}else if(sklepWeapons&&x>120&&x<170&&y>77&&y<127){Wp[1].buy()
				}else if(sklepWeapons&&x>120&&x<170&&y>144&&y<194){Wp[2].buy()
				}else if(sklepWeapons&&x>120&&x<170&&y>211&&y<266){Wp[3].buy()
				}else if(sklepWeapons&&x>120&&x<170&&y>288&&y<338){Wp[4].buy()
				}else if(sklepWeapons&&x>420&&x<470&&y>77&&y<127){Wp[5].buy()
				}else if(sklepWeapons&&x>420&&x<470&&y>144&&y<194){Wp[6].buy()
				}else if(sklepWeapons&&x>420&&x<470&&y>211&&y<266){Wp[7].buy()
				}


//	var pozY=120;
//		var o=1;
//			for(var i =1;i<=7;i++){
//				if(i==5){
//					pozY=420;
//					o=1;
//				}
//				
//				ctx.drawImage(Wp[i].image,pozY,o*77,50,50)
//				o++;
//			}
	
	}
	
	
	
}