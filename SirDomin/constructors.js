class Sequence {
  constructor(x, y, word, delay_in_seconds, font_size){
    this.delayInterval = (delay_in_seconds * 1000 || 1000) / word.length
    this.delay = this.delayInterval;
    this.word = word;
    this.creationTime = time;
    this.x = x;
    this.y = y;
    this.visibleLetters = 0;
    this.wordToShow = "";
    this.letterIndexes = [];
    this.fontSize = font_size;

    for(let i =0; i < this.word.length; i++){
      this.letterIndexes.push(i);
    }
    this.letterIndexes = shuffle(this.letterIndexes);

    for(let i = 0; i < this.word.length; i++){
      if(this.word[i] != " "){
        this.wordToShow += Math.floor(Math.random() + 0.5)
      }else{
        this.wordToShow += " ";
      }
    }
  }

  show(){
    let index = this.letterIndexes[this.visibleLetters];
    this.wordToShow = this.wordToShow.replaceAt(index, this.word[index])
    this.visibleLetters++;
  }
  update(){
    if(this.visibleLetters != this.word.length && this.creationTime + this.delay <= time){
      this.show();
      this.delay += this.delayInterval;
    }
  }
  render(){
    ctx.fillStyle = pageColors.white;
    ctx.font = this.fontSize + "px fontP"
    ctx.fillText(this.wordToShow, this.x, this.y);
  }
}
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
