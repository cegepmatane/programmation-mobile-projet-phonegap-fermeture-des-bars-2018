function Partie(idRoom, nomRoom, listeJoueur) {

  GestionnaireObjets = require('./objets/GestionnaireObjets.js');
  this.idRoom = idRoom;
  this.nomRoom = nomRoom;
  var timeoutBoucle;
  var event = require('events');
  var emiter = new event.EventEmitter();
  var vitesse = 1000 / 60;
  var gestionnaireObjets = new GestionnaireObjets(emiter);
  var debutInterval = 0;
  var partieEnCours = false;
  var nombreJoueurCharger = 0;

  function initialiser() {
    
    for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
      // Ajouter les evenements necessaire ICI pour le jeu
      listeJoueur[indiceListeJoueur].connexion.on('elements_joueur_est_charger', gererJoueurCharger);
    }

    timeoutBoucle = setInterval(boucleJeu, vitesse);
    emiter.on('bouteillesortieecran', gererBouteilleSortieEcran);
    emiter.on('obstaclesortieecran', gererObstacleSortieEcran);
    emiter.on('voituresortieecran', gererVoitureSortiEcran);
  }

  function boucleJeu() {

    debutInterval = Date.now();

   /*  gestionnaireObjets.repositionnerObjets(Bouteille, nouvelInterval);
    gestionnaireObjets.repositionnerObjets(Obstacle, nouvelInterval);
    gestionnaireObjets.repositionnerObjets(Voiture, nouvelInterval); */


    //Si le nouveau temps est plus grand que l'accelaration souhaiter par rapport au début de l'interval
    /* if (nouvelInterval - debutInterval >= 20) {
      vitesseRoute += 0.005;

      debutInterval = nouvelInterval;
    } */

    //Appliquer les déplacements
    //gestionnaireObjets.deplacerLesObjets(vitesseRoute);
  }


  function gererJoueurCharger(idJoueur) {
    nombreJoueurCharger++;
    console.log('nbreJoueur : ' + nombreJoueurCharger);

    //Si les joueurs sont charger débuter la partie
    if (nombreJoueurCharger == 2) {
      console.log('nombreJoueurCharger >= 2');
      partieEnCours = true;
      console.log(nomRoom);
      io.to(nomRoom).emit('liste_joueurs_charger', partieEnCours);
    }
  }

  function gererBouteilleSortieEcran(idBouteille) {
    position = gestionnaireObjets.repositionnerBouteille(idBouteille);
  }

  function gererObstacleSortieEcran(idObstacle) {
    position = gestionnaireObjets.repositionnerObstacle(idObstacle);
  }

  function gererVoitureSortiEcran(idVoiture) {
    position = gestionnaireObjets.repositionnerVoiture(idVoiture);
  }


  initialiser();
}

module.exports = Partie;