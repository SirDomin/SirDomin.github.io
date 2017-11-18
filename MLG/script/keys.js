
	document.body.addEventListener('keydown',function(e){
		keysDown[e.keyCode]=true;
		console.log(e.keyCode);
		przycisk(e.keyCode);
	});
	
	document.body.addEventListener('keyup',function(e){
		delete keysDown[e.keyCode];
	});
	document.getElementById("canvas").addEventListener('mousemove',function(e){
			mouseX=e.clientX-5 || e.pageX-5;
			mouseY=e.clientY-5 || e.pageY-5;
			
			//console.log(mouseX+" "+mouseY)
	});
		document.getElementById("canvas").addEventListener('click',function(e){
			if(game && !pause && newRound && reloaded){
				
				Gracz.weapon.shot();
				reloaded = false;
			}
			click(mouseX,mouseY);
	
	});
		document.getElementById("canvas").addEventListener('mousedown',function(e){
		if(Gracz.weapon.autofire)keysDown[255] = true;
		
	});
			document.getElementById("canvas").addEventListener('mouseup',function(e){
		delete keysDown[255];
		
	});