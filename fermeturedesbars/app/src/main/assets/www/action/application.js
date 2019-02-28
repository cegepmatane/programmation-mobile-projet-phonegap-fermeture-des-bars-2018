(function () {

  instance = this;

  var connexionNode;
  var joueurActuel;
  //var audio = new Audio();
  function initialiser() {

    this.vueApreciation = new VueApreciation();
    this.vueChoisirPseudo = new VueChoisirPseudo();
    this.vueFinMultijoueur = new VueFinMultijoueur();
    this.vueFinSolo = new VueFinSolo();
    this.vueJeuMultijoueur = new VueJeuMultijoueur();
    this.vueMenuPrincipale = new VueMenuPrincipale();
    this.vueStatistique = new VueStatistique();

    document.body.addEventListener("transmetre_id_room", naviguerAttenteMultiJoueurAvecIdRoom);
    document.body.addEventListener("cree_joueur", creerJoueurMultijoueur);
    document.body.addEventListener("commencer_multijoueur", commencerMultijoueur);
    //audio.chanson.onload = function(){
    //  audio.chanson.play();
    //};

    console.log(localStorage['pseudo']);

    window.addEventListener("hashchange", this.naviguer);
    window.location.hash = '#menu-principale';
    if (!localStorage['pseudo']) {
      window.location.hash = '#choisir-pseudo';
    } else {
      this.naviguer();
    }

    console.log("WIDTH" + window.innerWidth);
    console.log("HEIGHT" + window.innerHeight);
    this.naviguer();


  }
  naviguer = function (event) {
    if (!window.location.hash || (window.location.hash.match(/^#menu-principale/))) {
      this.vueMenuPrincipale.afficher();
    } else if (window.location.hash.match(/^#choisir-pseudo/)) {
      this.vueChoisirPseudo.afficher();
    } else if (window.location.hash.match(/^#choix-room/)) {


      connexionNode = new ConnexionNode();

      this.vueChoixRoom = new VueChoixRoom(envoyerCreationRoom);
      connexionNode.initierConnexion();
      this.vueChoixRoom.afficher();

    } else if (window.location.hash.match(/^#attente-multijoueur\/([0-9])+/)) {
      hash = window.location.hash.match(/^#attente-multijoueur\/([0-9])+/);
      this.vueAttenteMultijoueur = new VueAttenteMultijoueur(envoyerJoueurPret);
      idRoom = hash[1];
      connexionNode.rejoindreUneRoom(idRoom);
      this.vueAttenteMultijoueur.afficher();

    } else if (window.location.hash.match(/^#jeu-multijoueur/)) {
      this.vueJeuMultijoueur.afficher();

    } else if (window.location.hash.match(/^#jeu/)) {
      joueur = new Joueur();
      this.jeu = new Jeu(joueur, /*audio*/);
      this.jeu.demarrerJeu();
      //this.vueJeu.afficher();

    } else if (window.location.hash.match(/^#fin-multijoueur/)) {
      this.vueFinMultijoueur.afficher();

    } else if (window.location.hash.match(/^#fin-solo/)) {
      this.vueFinSolo.afficher(this.jeu.getScore());

    } else if (window.location.hash.match(/^#apreciation/)) {
      this.vueApreciation.afficher();

    } else if (window.location.hash.match(/^#statistique/)) {
      this.vueStatistique.afficher();

    } else if (window.location.hash.match(/^#quitter/)) {

    }
  }

  function creerJoueurMultijoueur(evenement) {
    nouveauJoueur = evenement.detail.joueur;
    joueurActuel = new Joueur();
    joueurActuel.setId(nouveauJoueur.id);
    joueurActuel.setPseudo(nouveauJoueur.pseudo);
  }

  function envoyerJoueurPret(evenement) {
    connexionNode.envoyerJoueurPret();
  }

  function commencerMultijoueur(evenement) {
    console.log('commencerMultijoueur');
    nouvelleListeJoueur = evenement.detail.listeJoueur;
    var listeJoueur = [];
    for (indiceListeJoueur = 0; indiceListeJoueur < nouvelleListeJoueur.length; indiceListeJoueur++) {

      if (nouvelleListeJoueur[indiceListeJoueur].id != joueurActuel.id) {
        nouveauJoueur = new Joueur();
        nouveauJoueur.setId(nouvelleListeJoueur[indiceListeJoueur].id);
        nouveauJoueur.setPseudo(nouvelleListeJoueur[indiceListeJoueur].pseudo);
        nouveauJoueur.setIdRoom(nouvelleListeJoueur[indiceListeJoueur].idRoom);
        nouveauJoueur.setCouleur(nouvelleListeJoueur[indiceListeJoueur].couleur);
        listeJoueur.push(nouveauJoueur);
      } else {
        joueurActuel.setIsJoueurActuel(true);
        joueurActuel.setCouleur(nouvelleListeJoueur[indiceListeJoueur].couleur);
        listeJoueur.push(joueurActuel);

      }

    }
    this.jeuMultijoueur = new JeuMultijoueur(listeJoueur, connexionNode,joueurActuel);
    this.jeuMultijoueur.demarrerJeu();
  }

  function envoyerCreationRoom(nomRoom) {
    listeRoom = connexionNode.creerUneRoom(nomRoom);
  }

  /*function afficherNouvellesListeRoom(listeRoom) {
    this.vueChoixRoom.afficherListeRoom(listeRoom)
  }*/

  function naviguerAttenteMultiJoueurAvecIdRoom(evenement) {
    idRoom = evenement.detail.idRoom;
    joueurActuel.setIdRoom(idRoom);
    window.location.hash = "#attente-multijoueur/" + idRoom;
  }

  /*function afficherListeJoueur(listeJoueur) {

    this.vueAttenteMultijoueur.afficherListeJoueur(listeJoueur)
  }*/

  /*function afficherJoueurPret(joueur) {
    vueAttenteMultijoueur.afficherJoueurPret(joueur);
  }*/


  initialiser();

})();
