var bullet = {
	price:200,
	amount : 2,
	price_alg:1,
	
	buy : function(){
		if(Gracz.gold >= this.price){
			if(Gracz.weapon.reloadTime>50){
			Gracz.gold -= this.price;
			Gracz.weapon.reloadTime-=10;
			this.price =Math.floor(this.price *this.price_alg);
			}else komunikat("reload time limit!")
			
		}else komunikat("not enough gold !");
		
	}
}
var dmg = {
	price:240,
	amount: 1,
	price_alg: 1.6,
	
		buy : function(){
		if(Gracz.gold >= this.price){
			Gracz.gold -= this.price;
			Gracz.dmg +=1;
			this.price =Math.floor(this.price *this.price_alg);
		}else komunikat("not enough gold !");
		
	}
	
}
var hp = {
	price: 250,
	price_alg: 1.7,
	
		buy : function(){
		if(Gracz.gold >= this.price){
			Gracz.gold -= this.price;
			Gracz.maxHP +=10;
			Gracz.hp+=10;	
			this.price =Math.floor(this.price *this.price_alg);
		}else komunikat("not enough gold !");
		
	}
	
	
}
var miner = {
		price: 300,
	price_alg: 1.5,
	
		buy : function(){
		if(Gracz.gold >= this.price){
			Gracz.gold -= this.price;
				mine = true;
				GperS+=5;
			this.price =Math.floor(this.price *this.price_alg);
		}else komunikat("not enough gold !");
		
	}
}