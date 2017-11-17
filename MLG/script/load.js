c = document.getElementById("canvas");
ctx = c.getContext("2d");
height = 400;
width = 630;

Napis_=[];
	
	xd=0;
	autorzy=false;
	opcje=false;
	fire = false;
	reloading=false;
	reloaded = false;
	sklepWeapons=false;
		autofire = false;
		mouseX =0;
		mouseY=0;
		second=30;
		enemiesCount = 0;
		roundTime = 30;
		round = 0;
		napis = false;
		sklep = false;
		lose = false;
		sec = false;
		newRound = false;
		pause = false;
		game = false;
		version= "alpha 0.4";


	weaponRenderImage= new Image();
	weaponRenderImage.src="img/weapons.png";




saveGame=function(){

	localStorage.setItem('gold',Gracz.gold);
	localStorage.setItem('dmg',Gracz.dmg);
	localStorage.setItem('maxHP',Gracz.maxHP);
	localStorage.setItem('w',Gracz.w);
	localStorage.setItem('h',Gracz.h);
	localStorage.setItem('x',Gracz.x);
	localStorage.setItem('hp',Gracz.hp);
	localStorage.setItem('speed',Gracz.speed);
	localStorage.setItem('maxBullets',Gracz.maxBullets);
	localStorage.setItem('klaciasOwned',klacias.owned);
	localStorage.setItem('healerOwned',healer.owned);
	
	localStorage.setItem('owned',Gracz.ownedWeapons);
	
	localStorage.setItem('bulletPrice',bullet.price);
	localStorage.setItem('dmgPrice',dmg.price);
	localStorage.setItem('hpPrice',hp.price);
	localStorage.setItem('minerPrice',miner.price);
	
	localStorage.setItem('GperS',GperS);
	localStorage.setItem('mine',mine);
	localStorage.setItem('round',round);
	
	
	
	komunikat("Saved");
}

loadGame = function(){
	Gracz.gold = parseInt(localStorage.getItem('gold'));
	Gracz.dmg = parseInt(localStorage.getItem('dmg'));
	Gracz.maxHP = parseInt(localStorage.getItem('maxHP'));
	Gracz.w = parseInt(localStorage.getItem('w'));
	Gracz.h = parseInt(localStorage.getItem('h'));
	Gracz.x = parseInt(localStorage.getItem('x'));
	Gracz.hp = parseInt(localStorage.getItem('hp'));
	Gracz.speed = parseInt(localStorage.getItem('speed'));
	Gracz.maxBullets = parseInt(localStorage.getItem('maxBullets'));
	klacias.owned = parseInt(localStorage.getItem('klaciasOwned'))
	healer.owned = parseInt(localStorage.getItem('healerOwned'))

Gracz.ownedWeapons =localStorage.getItem('owned').split(",");
	
	
	bullet.price = parseInt(localStorage.getItem('bulletPrice'));
	dmg.price = parseInt(localStorage.getItem('dmgPrice'));
	hp.price = parseInt(localStorage.getItem('hpPrice'));
	miner.price = parseInt(localStorage.getItem('minerPrice'));
	
	
	round = parseInt(localStorage.getItem('round'));
	mine = parseInt(localStorage.getItem('mine'));
	GperS = parseInt(localStorage.getItem('GperS'));
	
	

	
	
	komunikat("Loaded");	
}



GperS = 0;
mine = false;
win = true;
goldEarned = 0;

function radToDeg(angle) {
    return angle * (180 / Math.PI);
}

function degToRad(angle) {
    return angle * (Math.PI / 180);
}

getFreeBullet = function(){
	
	for(var i = 0;i<Gracz.maxBullets;i++){
		if(!bullets[i]){
			return i
			
		}
	}
	
	
}

getFreeEnemies = function(){
	
	for(var i = 0;i<=maxEnemies;i++){
		if(!enemies[i])return i;
	}
}

function kolo(x,y,r){
			this.x = x;
			this.y=y;
			this.r=r;
			
			
		}
		kolo.prototype.getX=function(){
		return this.x;}


keysDown=[];

maks=function(min,max,x){
	if(x<min){
		return min;
	}else if(x>max){
		return max;
	}else return x;
	
}

var getPercent = function(a,max){
	return(a/max*100)
	
	
}
var komunikat = function(tekst){
	
	napis = tekst;
	napis_timer = 0;
	
}

var getCurrentWeapon = function(){
	for(var w = 0;w<=Wp.length;w++){
		if(Wp[w].name == Gracz.weapon.name) return w;
	}
	
	
}
var getFreeNapis=function(){
	for(var i=0;i<=Napis_.length;i++)if(!Napis_[i])return i;
	
}
var zawiera = function(arr,item){
	for(var i =0;i<=arr.length;i++){
		if(arr[i] == item)return true;
	}
}
var Napis=function(napisx,napisy,amount){
	this.id=getFreeNapis();
	this.x=napisx;
	this.y=napisy;
	this.maxy=napisy-20;
	this.amount=amount;
		this.render=function(){
			ctx.fillStyle="gold";
			ctx.fillText(this.amount,this.x,this.y);
			//ctx.fillRect(this.x,this.y,100,100)
			this.y--;
			if(this.y<=this.maxy)delete Napis_[this.id];
		}
	
	
}

