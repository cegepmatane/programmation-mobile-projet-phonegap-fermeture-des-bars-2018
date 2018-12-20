function Joueur() {
  var joueur = this;

  var id;
  var idRoom;
  var pseudo;

  this.content;
  this.scene;
  var distanceDoit;
  var fantome;
  var partieTerminer;
  var EtatJoueur = {
    enMarche: "enMarche",
    estEcraser: "estEcraser",
    estEnVomissement: "estEnVomissement"
  }
  var animationCourante;

  var IMAGEIVROGNOREMARCHE = "images/spriteSheetIvrogne.png";

  // positions courante pour les deplacements
  var xCourant;
  var yCourant;

  //Variables d'animations
  var animMarche;
  var animEcraser;
  var animVomi;

  function initialiser() {

  }



  this.afficher = function () {
    console.log('afficher()');
    console.log(this.scene);

    distanceDoit = 80;
    partieTerminer = false;
    imageIvrogne = new Image();
    imageIvrogne.src = IMAGEIVROGNOREMARCHE;
    imageIvrogne.onload = terminerChargement;

    xCourant = joueur.content.offsetWidth / 2;
    yCourant = 100;

    //Pour le déplacement du personnage le tactile
    fantome = new createjs.Shape();
    fantome.graphics.beginFill("black").drawCircle(0, 0, 50);
    fantome.graphics.beginFill("white").drawCircle(0, 0, 25);
    fantome.alpha = 0.5;
    fantome.x = joueur.content.offsetWidth / 2;
    fantome.y = window.innerHeight / 2 + 100;

    joueur.scene.addChild(fantome);
  }

  function terminerChargement() {

    //Création de la spriteSheet
    spriteIvrogne = new createjs.SpriteSheet({
      images: [imageIvrogne],
      frames: {
        "regX": 0,
        "height": 892,
        "count": 0,
        "regY": 0,
        "width": 480
      },
      framerate: 13,
      animations: {
        //Gestion des 3 animations de la feuille de sprite
        marche: [0, 6, "marche"],
        vomi: [8, 15, "vomi"],
        ecrasement: [16]
      }
    });

    //Pour les 3 anims on créer une sprite et on l'adapte en fonction de l'ecran
    scale = (0.4 * joueur.content.offsetWidth) / 1920;
    animMarche = new createjs.Sprite(spriteIvrogne, "marche");
    animMarche.scaleX = scale;
    animMarche.scaleY = scale;
    //animMarche.scaleX = (0.3 * content.offsetWidth) / 1920;
    //animMarche.scaleY = (0.15 * content.offsetHeight) / 938;

    animVomi = new createjs.Sprite(spriteIvrogne, "vomi");
    animVomi.scaleX = scale;
    animVomi.scaleY = scale;
    //animVomi.scaleX = (0.3 * content.offsetWidth) / 1920;
    //animVomi.scaleY = (0.15 * content.offsetHeight) / 938;

    animEcraser = new createjs.Sprite(spriteIvrogne, "ecrasement");
    animEcraser.scaleX = scale;
    animEcraser.scaleY = scale;
    //animEcraser.scaleX = (0.3 * content.offsetWidth) / 1920;
    //animEcraser.scaleY = (0.15 * content.offsetHeight) / 938;

    animationCourante = animMarche;

    gererAnimation(animationCourante);
  }

  //Gestion des animations en fonction des changement de l'etatCourant du personnage
  function gererAnimation(animation) {
    joueur.scene.removeChild(animMarche);
    animationCourante = animation;
    animationCourante.x = xCourant;
    animationCourante.y = yCourant;
    joueur.scene.addChild(animationCourante);
  }

  //On set l'etat du joueur suivant la machine d'etat
  this.setEtatJoueur = function (etatJoueur) {
    if (!partieTerminer) {
      switch (etatJoueur) {
        case EtatJoueur.enMarche:
          animationCourante = animMarche;
          break;
        case EtatJoueur.estEcraser:
          animationCourante = animEcraser;
          partieTerminer = true;
          break;
        case EtatJoueur.estEnVomissement:
          animationCourante = animVomi;
          partieTerminer = true;
          break;
      }
      gererAnimation(animationCourante);
    }
  }

  this.monterEnY = function (vitesse) {
    animationCourante.y -= vitesse;
    xCourant -= vitesse;
    fantome.y += vitesse * 5;
  }
  this.setPosition = function (x, y) {
    if (!partieTerminer) {
      differenceY = window.innerHeight / 2;
      y = y - differenceY;
      limiteXDoite = joueur.content.offsetWidth * 0.7;
      limiteXGauche = joueur.content.offsetWidth * 0.2;
      if ((animationCourante.x - x) < distanceDoit && (animationCourante.x - x) > -distanceDoit && (animationCourante.y - y) < distanceDoit && (animationCourante.y - y) > -distanceDoit && y > 0 && x < limiteXDoite && x > limiteXGauche) {
        animationCourante.x = x;
        animationCourante.y = y;
        xCourant = x;
        yCourant = y;

        fantome.x = x;
        fantome.y = y + differenceY;
      }
    }
  }

  //Retour de la collision du joueur
  this.getRectangleCollision = function () {
    return animationCourante.getTransformedBounds();
  }
  this.setEtatJoueurMarche = function () {
    this.setEtatJoueur(EtatJoueur.enMarche);
  }
  this.setEtatJoueurEcraser = function () {
    this.setEtatJoueur(EtatJoueur.estEcraser);
  }
  this.setEtatJoueurVomisement = function () {
    this.setEtatJoueur(EtatJoueur.estEnVomissement);
  }

  this.setContent = function (content) {
    joueur.content = content;
  }

  this.setScene = function (scene) {
    joueur.scene = scene;
  }

  this.getId = function () {
    return id;
  }

  this.getPseudo = function () {
    return pseudo;
  }

  this.getIdRoom = function () {
    return idRoom;
  }


  this.setId = function (id) {
    this.id = id;
  }
  this.setIdRoom = function (idRoom) {
    this.idRoom = idRoom;
  }
  this.setPseudo = function (pseudo) {
    this.pseudo = pseudo;
  }

  initialiser();
}