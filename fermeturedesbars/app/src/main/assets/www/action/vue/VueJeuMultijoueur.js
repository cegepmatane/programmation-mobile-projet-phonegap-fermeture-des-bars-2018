var VueJeuMultijoueur = (function () {

    var contenuPage = document.getElementById("jeu-multijoueur").innerHTML;

    return function (listeJoueur) {
        var vueJeuMultijoueur = this;
        var canvas;
        var content;
        var scene;
        var route;
        var hammer;
        var joueurActuel;
        var isPartieEnCours;
        var isJeuStopper;
        var listeNiveauAlcool = [];
        var niveauAlcoolJoueurActuel;

        function initialiser() {
            console.log("vueJeuMultijoueurInitialiser");
            isPartieEnCours = false;

        }

        this.afficher = function () {
            console.log('vueJeuAfficher()');
            hammer = new Hammer(document.body);

            document.body.innerHTML = contenuPage;
            canvas = document.getElementById("dessin");
            arrangerCanvas();

            //Initialisation scene createJs
            scene = new createjs.Stage(canvas);

            //Inistialisation du rafraichissement du jeu
            createjs.Ticker.setInterval(1000 / 60);
            createjs.Ticker.setFPS(60);

            //Initilialisation de la route et des variables
            route = new Route(scene, content, canvas);
        }

        this.chargerJoueurEtObjet = function () {
            console.log(listeJoueur.length);
            for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
                var joueur = listeJoueur[indiceListeJoueur];
                joueur.setContent(content);
                joueur.setScene(scene);
                joueur.afficher();
                //Chargement niveau alcool
                niveauAlcool = new NiveauAlcool(scene, joueur, joueur.id, listeJoueur[indiceListeJoueur].getCouleur());
                listeNiveauAlcool.push(niveauAlcool);
                niveauAlcool.afficher();
                document.body.dispatchEvent(new CustomEvent("niveaualcoolestcharger"));

                if (joueur.getIsJoueurActuel()) {
                    joueurActuel = joueur;
                    hammer.on('pan', function (evenement) {
                        //if (joueur && !isJeuStopper) {
                        joueur = joueurActuel;
                        if (joueur) {
                            joueur.setPosition(evenement.center.x, evenement.center.y);
                        }
                    });
                    gestionnaireObjets = new GestionnaireObjets(scene, content, joueur, niveauAlcool);
                }
                
            }
            for(indiceListeNiveauAlcool=0; indiceListeNiveauAlcool<listeNiveauAlcool.length; indiceListeNiveauAlcool++){
                if(listeNiveauAlcool[indiceListeNiveauAlcool].getId() == joueurActuel.getId() ){
                    niveauAlcoolJoueurActuel = listeNiveauAlcool[indiceListeNiveauAlcool];

                }
            }

            //Envoyer evenement au serveur pour demarrer le jeu
            document.body.dispatchEvent(new CustomEvent("joueurestcharger"));
        }

        this.debuterPartie = function (isPartieEnCours) {
            console.log('debuterPartie');
            this.isPartieEnCours = isPartieEnCours;
            createjs.Ticker.addEventListener("tick", rafraichirJeu);

        }

        this.setNiveauAlcool = function (nouveauNiveauAlcool) {
            niveauAlcool.modifierNiveauAlcool(nouveauNiveauAlcool);

        }

        function rafraichirJeu(evenement) {
            route.derouler(vitesseRoute);
            scene.update(evenement);

            niveauAlcoolJoueurActuel.demarrerDiminution();

            //console.log(joueurActuel.getPositions());
            document.body.dispatchEvent(new CustomEvent('envoyerpositionsetniveaualcool', {
                detail: {
                    positions: joueurActuel.getPositions(),
                    niveauAlcool: niveauAlcoolJoueurActuel.getNivauAlcool()
                }
            }));

        }

        this.transmettrePositionsAdversaireNiveauAlcool = function (donnees) {

            for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
                if (listeJoueur[indiceListeJoueur].id == donnees.detail.idJoueur) listeJoueur[indiceListeJoueur].setPositions(donnees.detail.positions);
                
            }
            for (indiceListeNiveauAlcool=0; indiceListeNiveauAlcool< listeNiveauAlcool.length; indiceListeNiveauAlcool++){
                if (listeNiveauAlcool[indiceListeNiveauAlcool].getId() == donnees.detail.idJoueur) {
                    console.log(donnees.detail.niveauAlcool);
                    listeNiveauAlcool[indiceListeNiveauAlcool].setNiveauAlcool(donnees.detail.niveauAlcool);
                }
            }
        }


        function arrangerCanvas() {
            console.log("vueJeuArrangerCanvas");
            content = document.getElementById("content");
            scaleVitesse = content.offsetWidth / 1920;
            vitesseRoute = MONDE.VITESSE_JEU * scaleVitesse;

            if (canvas.width < content.offsetWidth) {

                canvas.width = content.offsetWidth;
            }

            if (canvas.height < content.offsetHeight) {
                canvas.height = content.offsetHeight;
            }
        }

        initialiser();

    }
})();