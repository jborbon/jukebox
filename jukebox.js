SC.initialize({
client_id: 'fd4e76fc67798bfa742089ed619084a6'
});
 // call juke box 
let myJukeBox; 
  document.addEventListener("DOMContentLoaded", function(){
  //myJukeBox = new Jukebox(document.getElementById("jukebox"));
  myJukebox = new Jukebox(document.getElementById("jukebox"));
});

function Jukebox(element){
// list on current songs 
  this.songs = []; 
  this.currentSong = 0
  // populate list of songs
  SC.get("/tracks", {q: "Spanish"}).then((response)=>{
  this.songs.push ( ...response );
  this.play(2);
});
  //--------------------------
  this.htmlElements = {
    container: element,
    controls: element.querySelector(".controls"),
    info: element.querySelector(".info")
  };
  let that = this;
    this.htmlElements.controls.addEventListener("click" , function(event){
  if( event.target.classList.contains ("play") ){
     that.play();
  } 
    else if (event.target.classList.contains("pause")){
    that.pause();
  } 
    else if (event.target.classList.contains("backward")){
    that.backward();
  }
    else if (event.target.classList.contains("forward")){
     that.forward();
   }
 });
};


Jukebox.prototype = {

play: function(){
  const song = this.songs[this.currentSong];
  if( this.songs[this.currentSong].player){
    this.songs[this.currentSong].player.play();
  }else {
    SC.stream(`/tracks/${song.id}`).then(function(player){
      song.player = player;
      player.play();
    });
  }
  this.updateUI();
  this.htmlElements.audio.play();
},
pause:  function(){
  this.htmlElements.audio.pause();
}, 
backward: function(){
  this.currentSong = (this.currentSong + this.songs.length - 1) %
  this.songs.length
  ;
   // this.updateUI();
   this.play();
},
forward: function(){
    this.currentSong = (this.currentSong + 1) % this.songs.length;
    // this.updateUI();
    this.play();
   },
updateUI: function(){
    this.htmlElements.info.innerText = this.songs[this.currentSong].description;
   }
 }





 /* elAudio = document.querySelector("audio");
  elAudio.play();






document.querySelector("#jukebox .controls").addEventListener("click" , function(event){
  if( event.target.classList.contains ("play") ){
     elAudio.play();
  
  } 
    else if (event.target.classList.contains("pause")){
    elAudio.pause();
  } 
    else if (event.target.classList.contains("backward")){
    currentSong-= 1 ; 
    if (currentSong< 0 ){
     currentSong = songs.length - 1 ;  
     }
     elAudio.src = `mp3/${songs[currentSong]}`;
     elAudio.play();
   }
    else if(event.target.classList.contains("forward")){
     currentSong = (currentSong + 1) % songs.length;
     elAudio.src = `mp3/${songs[currentSong]}`;
     elAudio.play();
   }
 });
});
  */





 