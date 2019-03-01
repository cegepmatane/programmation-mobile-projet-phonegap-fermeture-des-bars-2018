var Audio = function()
{
  this.chanson = new Pizzicato.Sound('action/audio/sons/bensound-badass.mp3', function(){
    console.log("play");
    this.chanson.play();
  });
  this.rammaserBiere = new Pizzicato.Sound('action/audio/sons/BoireBierre.mp3');
  this.voiture = new Pizzicato.Sound('action/audio/sons/Voiture.mp3');
  this.vomi = new Pizzicato.Sound('action/audio/sons/Vomi.mp3');
  this.heurterVoiture = new Pizzicato.Sound('action/audio/sons/HeurterVoiture.mp3');
  this.heurterCone =  new Pizzicato.Sound('action/audio/sons/HeurterCone.mp3');

}
