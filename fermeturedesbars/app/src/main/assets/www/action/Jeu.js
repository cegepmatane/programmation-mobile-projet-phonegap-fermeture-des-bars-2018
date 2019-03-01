var Jeu = function (joueur, audio) {

    jeu = this;
    var vueJeu;
    var score;
    var niveauAlcool;
    var compteurBouteilleVerteChargee;
    var compteurObstacleCharge;
    var compteurVoitureCharge;
    var partieTerminer;
    var audio = new Audio();
    function initialiser() {
        vueJeu = new VueJeu();

        document.body.addEventListener("fondecranpret", chargerJoueurEtObjet);
        document.body.addEventListener("collisionavecobjet", terminerJeu);
        document.body.addEventListener("collisionavecbouteille", gererCollisionAvecBouteille);
        document.body.addEventListener("bouteillesortieecran", gererBouteilleSortieEcran);
        document.body.addEventListener("bouteillevertechargee", gererBouteilleVerteChargee);
        document.body.addEventListener("obstaclecharger", gererObstacleCharge);
        document.body.addEventListener("obstaclesortieecran", gererObstacleSortieEcran);
        document.body.addEventListener("voiturechargee", gererVoitureChargee);
        document.body.addEventListener("voituresortieecran", gererVoitureSortiEcran);
        document.body.addEventListener("niveaualcoolestcharger", gererNiveauAlcoolCharger);
    }

    function chargerJoueurEtObjet(){
        vueJeu.chargerJoueurEtObjet(joueur);
    }

    this.demarrerJeu = function () {
        partieTerminer = false;
        vueJeu.afficher();
        score = 0;
        niveauAlcool = 100;

        compteurBouteilleVerteChargee = 0;
    }

    function terminerJeu(evenement) {
      if(!partieTerminer)
        vueJeu.stopperJeu(finaliserJeu);
      partieTerminer = true;
      switch (evenement.detail.typeMort) {
        case 'alcool':
          audio.vomi.play();
          break;
        case 'voiture':
          audio.heurterVoiture.play();
          break;
        case 'cone':
          audio.heurterCone.play();
          break;
      }
    }



    function gererCollisionAvecBouteille(evenement) {
      if(!partieTerminer){
        console.log("gererCollisionBouteille");
        score += 10;
        vueJeu.setScore(score);
        niveauAlcool = vueJeu.getNiveauAlcool();

        if (niveauAlcool >= 90) niveauAlcool = 100;
        else niveauAlcool += MONDE.POINTS_AUGMENTER_BIERE;

        vueJeu.setNiveauAlcool(niveauAlcool)
        console.log("grerCollisionAvecBoteille" + evenement.detail.idBouteille);


        //delais avant la premiere aparition des bouteilles
        vueJeu.ajouterBouteille(evenement.detail.idBouteille, getNombreHazard(0, 3000));
      }
    }

    function gererBouteilleSortieEcran(evenement) {
      if(!partieTerminer){
        //delais avant la reaparition des bouteilles
        vueJeu.ajouterBouteille(evenement.detail.idBouteille, getNombreHazard(0, 3000));
      }
    }

    function gererBouteilleVerteChargee(evenement) {

        compteurBouteilleVerteChargee++;
        if (compteurBouteilleVerteChargee == MONDE.NOMBRE_BOUTEILLE - 1) {
            for (indiceBouteille = 0; indiceBouteille < MONDE.NOMBRE_BOUTEILLE; indiceBouteille++) {
                vueJeu.ajouterBouteille(indiceBouteille, getNombreHazard(0, 5000));
            }
        }
    }

    this.getScore = function () {
        return score;
    }

    function gererObstacleCharge(evenement) {
        compteurObstacleCharge++;
        if (compteurObstacleCharge == MONDE.NOMBRE_OBSTACLE - 1) {
            for (indiceObstacle = 0; indiceObstacle < MONDE.NOMBRE_OBSTACLE; indiceObstacle++) {
                vueJeu.ajouterObstacle(indiceObstacle, getNombreHazard(0, 5000));
            }
        }
    }

    function gererObstacleSortieEcran(evenement) {
      if(!partieTerminer){
        vueJeu.ajouterObstacle(evenement.detail.idObstacle, getNombreHazard(0, 5000));
      }
    }

    function gererVoitureChargee(evenement) {
        compteurVoitureCharge++;
        if (compteurVoitureCharge == MONDE.NOMBRE_VOITURE - 1) {
            for (indiceVoiture = 0; indiceVoiture < MONDE.NOMBRE_VOITURE; indiceVoiture++) {
                vueJeu.ajouterVoiture(indiceVoiture, getNombreHazard(0, 5000));
            }
        }
    }

    function gererVoitureSortiEcran(evenement) {
      if(!partieTerminer){
        console.log("gererVoitureSortiEcran" + evenement.detail.idVoiture);
        vueJeu.ajouterVoiture(evenement.detail.idVoiture, getNombreHazard(0, 5000));
      }
    }

    function gererNiveauAlcoolCharger(evenement) {
        console.log("gererNiveauAlcoolCharger");
        vueJeu.setNiveauAlcool(niveauAlcool);
    }

    function getNombreHazard(min, max) {
        return Math.random() * (max - min) + min;
    }

    function gererFinDejeu(evenement){
        window.location.hash = "fin-solo";

    }

    function finaliserJeu() {

        document.body.removeEventListener("fondecranpret", chargerJoueurEtObjet);
        document.body.removeEventListener("collisionavecobjet", terminerJeu);
        document.body.removeEventListener("collisionavecbouteille", gererCollisionAvecBouteille);
        document.body.removeEventListener("bouteillesortieecran", gererBouteilleSortieEcran);
        document.body.removeEventListener("bouteillevertechargee", gererBouteilleVerteChargee);
        document.body.removeEventListener("obstaclecharger", gererObstacleCharge);
        document.body.removeEventListener("obstaclesortieecran", gererObstacleSortieEcran);
        document.body.removeEventListener("voiturechargee", gererVoitureChargee);
        document.body.removeEventListener("voituresortieecran", gererVoitureSortiEcran);
        document.body.removeEventListener("niveaualcoolestcharger", gererNiveauAlcoolCharger);
        document.body.innerHTML += '';
        window.location.hash = "fin-solo";
    }
    initialiser();

}
