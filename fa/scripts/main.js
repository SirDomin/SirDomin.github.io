
document.addEventListener('deviceready',function(){
preload();    
})
preload();
test=0;
function main(){
    
    now = new Date().getTime();
    
    
   
    
    update();
    
    requestAnimationFrame(main);
}





