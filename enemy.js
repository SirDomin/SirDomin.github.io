function Enemy(w = 50,h = 50) {
	this.w = w; 
	this.h = h;
	this.x = (canvas.width - this.w) * Math.random();
	this.y = -canvas.height /2  * Math.random();
	this.evo = 6;
	this.hp = 50;
	this.maxHp = 50;
	this.value = 100;
	this.exist = true;
	this.shoots = true;
	this.promoted = false;
	this.velocity = 1;
	this.bodyDmg = 1;
	this.msTime = 0;
	this.msBetweenShots = 200;
	this.shots = [];
	this.img = new Sprite(spiderImage,8, 32, 32, 6);
	this.hpBar = {
		x: this.x,
		y: this.y - 8,
		w: this.w,
		h: this.h / 5 - 2
	}
	this.render = function(){
		if(this.exist && !this.promoted){
			this.img.render(this.x, this.y, this.w, this.h);
			for(i = 0; i < this.shots.length; i++){
				this.shots[i].update();
				this.shots[i].render();
				if(this.shots[i].y >= canvas.height){
					this.shots.splice([i],1);
				}
				
			}
			ctx.fillStyle="black";
			ctx.fillRect(this.hpBar.x - 2,this.hpBar.y - 2, this.hpBar.w + 4, this.hpBar.h + 4);
			ctx.fillStyle="red";
			ctx.fillRect(this.hpBar.x,this.hpBar.y, this.hpBar.w * (this.hp / this.maxHp), this.hpBar.h);
		}
	}//render
		
	
	this.update = function(){
		if(this.y < canvas.height && this.exist && !this.promoted){
			this.y += this.velocity;
		} else if (this.y + this.h >= canvas.height && this.exist && !this.promoted){
			//this.evolution();
			this.evo += 1;
			this.promoted = true;
			this.hp = 50 * (this.evo + 1);
			this.maxHp = 50 * (this.evo + 1);
			this.value = 100 * (this.evo + 1);
			if(this.evo > 6){
				this.shoots = true;
			}
		}
		this.hpBar.x = this.x;
		this.hpBar.y = this.y - 8; 	
		if(this.shoots){
			if(this.msTime >= this.msBetweenShots){
				this.shots[this.shots.length] = new EnemyShot(this.x, this.y, this.w);
				this.msTime = 0;
			} else {
				this.msTime++;
			}
		}

		
		for(x in player.shots){
			if(this.exist)
			if(checkCollision({x: player.shots[x].x, y: player.shots[x].y, w: player.shots[x].w, h: player.shots[x].h},{x: this.x, y: this.y, w: this.w, h: this.h})){
				this.damage(player.damage);
				player.shots.splice([x],1);
			}
		}
		
	}//update
	
	this.damage = function(dmg){ 
		this.hp -= dmg;
		
		if(this.hp<=0){
			player.score += this.value;
			this.exist = false;
		}
	}//damage
	
	this.evolution = function(){		// evolution of enemy
		
	}//evolution

	this.getValue = function(){
		return this.value;
	}//getValue
	


}