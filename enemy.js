function Enemy() {
	this.w = canvas.width / 7 + 2; 
	this.h = canvas.width / 7 + 2;
	this.x = (canvas.width - this.w) * Math.random();
	this.y = -canvas.height  * Math.random() * 2;
	this.evo = 5;
	this.hp = 50;
	this.maxHp = 50;
	this.value = 100;
	this.exist = true;
	this.shoots = false;
	this.promoted = false;
	this.velocity = 2;
	this.bodyDmg = 1;
	this.msTime = 0;
	this.msBetweenShots = 200 + 400* Math.random();
	this.shots = [];
	this.img = new Sprite(spiderImage,8, 32, 32, 6);
	this.hpBar = {
		x: this.x,
		y: this.y - 8,
		w: this.w,
		h: this.h / 5 - 2
	}

	this.collisonBox = {
        w: this.w / 3,
        h: this.h,
        x: this.x + (this.w / 3) ,
        y: this.y
    };
	
	this.render = function(){
		if(this.exist && !this.promoted){
			//ctx.fillRect(this.collisonBox.x, this.collisonBox.y, this.collisonBox.w, this.collisonBox.h);
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
	this.move = function(){
		this.y += this.velocity;
		this.collisonBox.y = this.y;
	}
	this.update = function(){
		if(this.y < canvas.height && this.exist && !this.promoted){
			this.move();
		} else if (this.y + this.h >= canvas.height && this.exist && !this.promoted){
			//evolution;
			enemiesCount--;
			//console.log(enemiesCount);
			this.evo += 1;
			this.promoted = true;
			this.hp = 50 * (this.evo + 1);
			this.maxHp = 50 * (this.evo + 1);
			this.value = 100 * (this.evo + 1);
			if(this.evo > 4){
				this.shoots = true;
			}
		}
		this.hpBar.x = this.x;
		this.hpBar.y = this.y - 8; 	
		this.hpBar.w = this.w;
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

	this.setNewYX = function(){
		this.x = (canvas.width - this.w) * Math.random();
		this.y = -canvas.height  * Math.random() * 2;
		this.collisonBox.y = this.y;
		this.collisonBox.x = this.x + (this.w / 3);
	}
	
	this.damage = function(dmg){ 
		this.hp -= dmg;
		
		if(this.hp<=0){
			this.onkill();
		}
	}//damage
	this.onkill = function(){
		player.score += this.value;
		enemiesCount--;
		this.exist = false;
	}
	this.getValue = function(){
		return this.value;
	}//getValue
	


}