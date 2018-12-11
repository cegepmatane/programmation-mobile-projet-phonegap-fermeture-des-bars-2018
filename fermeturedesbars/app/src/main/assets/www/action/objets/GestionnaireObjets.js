var GestionnaireObjets = function(scene, content, joueur, niveauAlcool, score){
  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();
  var EtatJoueur = {
    enMarche: "enMarche",
    estEcraser: "estEcraser",
    estEnVomissement: "estEnVomissement"
  }
  var iterateurVerification = 0;
  //vitesse du jeu
  var vitesseObjetRoute = 1;
  var vitesseRoute = -1;
  var vitesseVoiture = 3;

  function initialiser(){
    setTimeout(function() {
    bouteilles.push(new Bouteille(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    obstacles.push(new Obstacle(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    voitures.push(new Voiture(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    bouteilles.push(new Bouteille(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    voitures.push(new Voiture(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    obstacles.push(new Obstacle(scene, content));
    }, getNombreHazard(0, 3000));
  }
  this.verification = function(){
    switch (iterateurVerification) {

    case 0:
      for(iObstacles = 0; iObstacles < obstacles.length; iObstacles++){
        if (obstacles[iObstacles]) {
          obstacles[iObstacles].mouvementObstacle(vitesseObjetRoute);
          verificationCollisionnementJoueurObjet(obstacles[iObstacles]);
        }
      }
      iterateurVerification++;
      break;
    case 1:
      for(iBouteilles = 0; iBouteilles < bouteilles.length; iBouteilles++){
        if (bouteilles[iBouteilles]) {
          bouteilles[iBouteilles].mouvementBouteille(vitesseObjetRoute);
          verificationCollisionnementJoueurBouteille(bouteilles[iBouteilles]);
        }
      }
      iterateurVerification++;
      break;
    case 2:
      for(iVoitures = 0; iVoitures < voitures.length; iVoitures++){
        if (voitures[iVoitures]) {
          voitures[iVoitures].mouvementVoiture(vitesseVoiture);
          verificationCollisionnementJoueurObjet(voitures[iVoitures]);
        }
      }
      iterateurVerification = 0;
      break;
    }
  }
  //Verification de la collision avec le joueur et la voiture
  function verificationCollisionnementJoueurObjet(objet) {
    if (joueur.rectangleCollisionJoueur().intersects(objet.getCollision())) {
      //console.log("COLLISIONNEMENT ! ");
      detail = [];
      detail['etatJoueur'] = EtatJoueur.estEcraser;
      document.body.dispatchEvent(new CustomEvent("PARTIE_TERMINER", {'detail':detail}));
    }
  }

  function verificationCollisionnementJoueurBouteille(bouteille) {
    if (joueur.rectangleCollisionJoueur().intersects(bouteille.getCollision())) {
      //console.log("COLLISIONNEMENT ! ");
      bouteille.repositionnerBouteille();
      score.augmenterScore(10);
      niveauAlcool.ajouterNiveau(10);
    }
  }
  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }
  initialiser();
}
