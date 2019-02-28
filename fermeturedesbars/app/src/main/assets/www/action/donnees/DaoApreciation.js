//XMLHttpRequest
var DaoApreciation = function(){

  this.envoyerFormulaire = function(nom, couriel, telephone, nas, commentaire, aimer){
    //var donneeDuFormulaire = new FormData(this);
    var xhr = new XMLHttpRequest();
// l'addresse reste la meme puisque l'ip du serveur n'a pas changer
    xhr.open('GET', 'http://54.39.144.87/fermetureDesBars/pageEnvoi.php?nom='+nom+'&aimer='+aimer+'&email='+couriel+'&telephone='+telephone+'&nas='+nas+'&commentaire='+commentaire, true);


    /*xhr.open('GET', 'http://54.39.144.87/fermetureDesBars/pageEnvoi.php?nom='+nom+'&aimer='+aimer+'&email='+couriel+'&telephone='+telephone+'&nas='+nas+'&commentaire='+commentaire);
    xhr.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200)
      {
          console.log(this.response);
      }
      else if (this.readyState == 4 ) {
        alert("Erreur d'envoie");
      }
    };*/
      xhr.send();
    }
}
