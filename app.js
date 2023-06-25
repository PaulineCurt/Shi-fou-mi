// Sélection des éléments HTML
let resetBtn = document.getElementById("reset"); // Bouton de réinitialisation
let scoreJoueur = document.getElementById("score-joueur"); // Affichage du score du joueur
let scoreOrdinateur = document.getElementById("score-ordinateur"); // Affichage du score de l'ordinateur
let btnJoueur = [...document.getElementsByClassName("btn-joueur")]; // Tableau des boutons de choix du joueur
let opierreBtn = document.getElementById("opierre"); // Bouton "Pierre"
let ofeuilleBtn = document.getElementById("ofeuille"); // Bouton "Feuille"
let ociseauxBtn = document.getElementById("ociseaux"); // Bouton "Ciseaux"
let message = document.getElementById("message"); // Message d'état
let nextBtn = document.getElementById("next"); // Bouton "Suivant"

// Fonction appelée lorsqu'une manche est jouée
const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur"); // Sélection du choix du joueur

    // Désactivation des boutons et suppression des écouteurs d'événements
    btnJoueur.forEach((btn) => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
    });

    // Mise en surbrillance du choix du joueur
    choix.classList.remove("desactivated");
    choix.classList.add("active");

    let choixJoueur = choix.id; // Récupération du choix du joueur

    let choixOrdi = faireChoixOrdinateur(); // Génération du choix de l'ordinateur

    verifierGagnant(choixJoueur, choixOrdi); // Vérification du gagnant de la manche

    nextBtn.style.visibility = "visible"; // Affichage du bouton "Suivant"
};

// Fonction pour générer le choix de l'ordinateur
const faireChoixOrdinateur = () => {
    // 0 = pierre, 1 = feuille, 2 = ciseaux
    let nbAleatoire = Math.floor(Math.random() * 3);

    switch (nbAleatoire) {
        case 0:
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            ofeuilleBtn.classList.add("active");
            return FEUILLE;
        default:
            ociseauxBtn.classList.add("active");
            return CISEAUX;
    }
};

// Constantes pour les choix possibles
const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

// Vérification du gagnant de la manche
const verifierGagnant = (choixJoueur, choixOrdi) => {
    if (choixJoueur == choixOrdi) {
        message.textContent = "Egalité !";
        return;
    }

    if (choixJoueur == PIERRE) {
        if (choixOrdi == FEUILLE) {
            return victoireOrdinateur();
        } else if (choixOrdi == CISEAUX) {
            return victoireJoueur();
        }
    }

    if (choixJoueur == FEUILLE) {
        if (choixOrdi == CISEAUX) {
            return victoireOrdinateur();
        } else if (choixOrdi == PIERRE) {
            return victoireJoueur();
        }
    }

    if (choixJoueur == CISEAUX) {
        if (choixOrdi == PIERRE) {
            return victoireOrdinateur();
        } else if (choixOrdi == FEUILLE) {
            return victoireJoueur();
        }
    }
};

// Fonction appelée en cas de victoire de l'ordinateur
const victoireOrdinateur = () => {
    message.textContent = "L'ordinateur gagne...";
    scoreOrdinateur.textContent++;
};

// Fonction appelée en cas de victoire du joueur
const victoireJoueur = () => {
    message.textContent = "Vous gagnez ! :)";
    scoreJoueur.textContent++;
};

// Fonction pour préparer une nouvelle manche
const preparerNouvelleManche = () => {
    // Réactivation des boutons du joueur et ajout des écouteurs d'événements
    btnJoueur.forEach((btn) => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");
        btn.addEventListener("click", jouerManche);
    });

    nextBtn.style.visibility = "hidden"; // Masquage du bouton "Suivant"

    // Suppression de la surbrillance des choix de l'ordinateur
    opierreBtn.classList.remove("active");
    ofeuilleBtn.classList.remove("active");
    ociseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer !"; // Réinitialisation du message d'état
};

// Écouteur d'événement pour le bouton de réinitialisation
resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;

    preparerNouvelleManche();
});

// Écouteur d'événement pour le bouton "Suivant"
nextBtn.addEventListener("click", preparerNouvelleManche);

// Ajout des écouteurs d'événements aux boutons de choix du joueur
btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));
