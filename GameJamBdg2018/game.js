canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
game = true;
started = false;
currLvl = 1;
settings = {
    tileWidth: canvas.width,
    tileHeight: canvas.height/4,
    bulletWidth: 10,
    bulletHeight: 10,
    baseObjectWidth1: canvas.width / 6,
    baseObjectWidth2: canvas.width / 4,
    baseObjectHeight: canvas.height / 10,
    playerVelocity : 5
}
lineY = canvas.height/10;
lineHeight = settings.baseObjectHeight / 2;
images = [];
for(var i = 0; i < 5; i++){
    images[i] = new Image();
    images[i].src = "tile"+(i%1)+".png";
}
timeDelay = 30;
currDelay = 0;
spiderImage = new Image();
spiderImage.src = "spider.png";

spiderImage1 = new Image();
spiderImage1.src = "spider1.png";

spiderImage2 = new Image();
spiderImage2.src = "spider2.png";

spiderImage3 = new Image();
spiderImage3.src = "spider3.png";

spiderImage4 = new Image();
spiderImage4.src = "spider4.png";

spiderImage5 = new Image();
spiderImage5.src = "spider5.png";

blood = new Image();
blood.src = "blood.png";

skip = true;

clickable = false;
spiderBossL = new Image();
spiderBossL.src = "boss_w_lewo.png"
spiderBossR = new Image();
spiderBossR.src = "boss_w_prawo.png";
butterflyImage = new Image();
butterflyImage.src = "motyl.png";
tail = new Image();
tail.src="tail.png";
var bgAudio = new Audio("dj.mp3");
bgAudio.onloadeddata = function(){
    main();
    bgAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
//db
touchPoint = {
    x: canvas.width / 2,
    y: canvas.height - (canvas.width / 6) - 50
}
document.addEventListener('touchmove', function(e) {
    // Iterate through the list of touch points that changed
    // since the last event and print each touch point's identifier.

    touchPoint.x = e.changedTouches[0].pageX;
    //touchPoint.y = e.changedTouches[0].pageX;
 }, false);


var config = {
    apiKey: "AIzaSyCcnIYcmV9hc3jEZqbecA1J11nyB36U2fg",
    authDomain: "databasehuuug1.firebaseapp.com",
    databaseURL: "https://databasehuuug1.firebaseio.com",
    projectId: "databasehuuug1",
    storageBucket: "databasehuuug1.appspot.com",
    messagingSenderId: "165136848581"
  };
  firebase.initializeApp(config);
  leaderboard = [];
  var database = firebase.database();
  var ref = database.ref('scores');
  
  function gotData(data){  // czyta z bazy i wyświetla 
    leaderboard = [];
    var scores = data.val();
    var keys = Object.keys(scores);

    for(var i = 0; i < keys.length; i++){
        var k = keys[i];
        var name = scores[k].name;
        var score = scores[k].score;
        //console.log(name,score);
        //document.getElementById("bigOne").innerHTML += name + ', ' + score  +'</br>' ;
        leaderboard.push({name: name, score: score});
    }
    //console.log(leaderboard);
    best = [0,0,0];
    leaderboard.sort(function(a, b){return a.score - b.score});
    leaderboard.reverse();
    ctx.fillText("LEADERBOARDS", canvas.width / 3, lineY + lineHeight*4);
    if(leaderboard.length < 10){
        maxToShow = leaderboard.length;
    }else{
        maxToShow = 10;
    }
    for(x1= 0; x1 < maxToShow; x1++){
        ctx.fillText(leaderboard[x1].name+" : "+leaderboard[x1].score, canvas.width / 4, lineY + lineHeight*(x1 + 5));
    }
  }
  function displayData(){
    ref.once('value', gotData);
  }
  //ref.on('value', gotData);


bossLevel = false;
guideImage = new Image();
guideImage.src = "guide.png"
enemiesCount = 0;
player = new Player();
level = new Level(currLvl);
enemies = [];
for(var i = 0; i < 15; i++){
    enemiesCount++;
    enemies.push(new Enemy())
}
pause = false;
document.addEventListener("touchstart",function(e){
    player.velocity = settings.playerVelocity;
    touchPoint.x = e.changedTouches[0].pageX;
    if(e.changedTouches[0].pageX < canvas.width / 2){ // dwa różne ify, jeden dzieli na połowę ruszanie, a drugi od lewej/prawej gracza
    //if(e.changedTouches[0].pageX < player.x + (player.w / 2)){
        player.moveLeft();
    }else{
        player.moveRight();
    }
    if(!game && clickable){
        
        bgAudio.play();
        speed = 1;
        game = true;
        player = new Player();
        level = new Level(1);
        enemies = [];
        enemiesCount = 0;
        for(var i =0; i < 15; i++){
            enemiesCount ++;
            enemies.push(new Enemy());
        }
        main();
    }
    if(!started){
        started = true;
         interb = setInterval(()=>{
            bgAudio.play();
            clearInterval(interb);
         }, 1000);
    }
});
document.addEventListener("touchend", function(e){
    touchPoint.x = player.x;
    player.stop();
});
window.addEventListener("orientationchange", function() {
    if(window.innerHeight > window.innerWidth){
        document.body.style.setProperty("-webkit-transform", "rotate(-90deg)", null);
        this.document.getElementById("canvas").style="margin-left: 75vh;"
        pause = true;   
    }else{
        document.body.style.setProperty("-webkit-transform", "rotate(0deg)", null);
        this.document.getElementById("canvas").style="margin-left: 0vh;"
        pause = false;
        main();
    }
});



function checkCollision(obj1, obj2){
    if (obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.h + obj1.y > obj2.y) {
         return true;
     }
}

function update(){
    //update wszystkich elem;

    level.update();
    player.update();

    if(started)for(i in enemies){
     
        enemies[i].update();
    }
    
    if(enemiesCount <= 0 && skip){
        skip = false;
        skipped = setInterval(function(){
            level.lvlup();
            skip = true;
            clearInterval(skipped);
        }, 2000);
        
    }
}
function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //tutaj renderujemy wszystkie leementy

    level.render();
    if(started)for(i in enemies){
        enemies[i].render();
    }
    player.render();
    level.gui.render();
    if(!skip){
        ctx.fillStyle="black";
        ctx.fillRect(0,canvas.height / 3, canvas.width, settings.baseObjectHeight);
        ctx.fillStyle = "white";
        ctx.fillText(" level clear", 0, canvas.height / 3)
        ctx.fillText(" LVL up, "+enemiesKilled+" enemies got upgraded", 0, canvas.height / 3 + canvas.height / 28)
        ctx.fillText(" "+(15 -enemiesKilled)+" enemies became faster", 0, canvas.height / 3 + canvas.height / 12)
    }
    if(pause){
        ctx.save()
        ctx.fillStyle="black";
        ctx.fillRect(0,0,1000, 1000 );
        ctx.fillStyle = "white";
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(Math.PI/2);
        ctx.fillText("UNSUPPORTED LANDSCAPE MODE", -canvas.width / 3, 0);
        ctx.rotate(-Math.PI/2);

// un-translate the canvas back to origin==top-left canvas

ctx.translate(-canvas.width/2,-canvas.height/2);
    }
    if(!game){
        clicc = setInterval(function(){
            clickable = true;
            clearInterval(clicc);
        }, 1000)
        bossLevel = false;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillText( player.hp <= 0 ? "YOU LOST" : "YOU WON", canvas.width / 2.5, lineY);
        ctx.fillText("score: "+player.getScore(), canvas.width / 2.5, lineY + lineHeight*1);
        ctx.fillText("tap to play again", canvas.width / 3, lineY + lineHeight*2);
        displayData();
        if(player.hp > 0){

            enemies[0].img = new Sprite(blood,8, 64, 64, 6);
            enemies[0].img.render(this.x, this.y, this.w, this.h);
            player.name = "";
            while(!player.name)
                player.name = prompt("Your nickname");
                clicc = setInterval(function(){
                    clickable = true;
                    clearInterval(clicc);
                }, 1000)
            var data = {
                name: player.name,
                score: player.score
              }
              
              ref.push(data);
        }
    }

}
function main(){
    update();
    render();

    if(!pause && game) requestAnimationFrame(main);
}
//main();
