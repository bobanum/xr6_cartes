/*jslint browser:true*/
/**
 * @file Contient toutes les fonctions permettant d'afficher des cartes.
 * - Dans cette version, une carte est un nombre entre 0 et 51 inclusivement.
 * - Comme cette représentation ne permet pas de prévoir la valeur et la sorte directement, elle sera changée dans les versions subséquentes.
 *
 * @version 0.1
 * @author Martin Boudreau
 * @copyright 2018 Techniques d'Intégration multimédia - Cégep de Saint-Jérome
 *
 */
function load() {
	var jeu, paquet;
	jeu = document.getElementById("jeu");
	ajusterCouleurs();

	paquet = nouveauPaquet();
	paquet = melangerPaquet(paquet);
	var affichageCartes;
	affichageCartes = htmlEtendreCartes(paquet);
	jeu.innerHTML = affichageCartes;
}

/**
 * Retourne un tableau de cartes dont le nombre de sortes est variables
 * ATTENTION! Cette version est temporaire. Le modèle de cartes est voué à changer.
 * @param   {number} nbSortes Le nombre de sorte à utiliser. Si le paramètre n'est pas fourni, on utilise 4 sortes.
 * @returns {Array}  Le paquet de cartes
 */
function nouveauPaquet(nbSortes) {
	var resultat, nbCartes, nbValeurs;
	nbValeurs = 13;
	if (nbSortes === undefined) {
		nbSortes = 4;
	}
	nbCartes = nbValeurs * nbSortes;
	resultat = [];
	for (var i = 0; i < nbCartes; i += 1) {
		resultat.push(i);
	}
	return resultat;
}

/**
 * Retourne un tableau de cartes mélangées
 * @param   {Array} paquet Un tableau de cartes
 * @returns {Array} Un nouveau paquet de cartes mélangées
 */
function melangerPaquet(paquet) {
	var resultat, copie, indice;
	resultat = [];
	copie = paquet.slice(0);
	while (copie.length > 0) {
		indice = pigerArray(copie);
		resultat.push(copie[indice]);
		copie.splice(indice, 1);
	}
	return resultat;
}

/**
 * Retourne l'indice d'un élément aléatoire d'un tableau
 * @param   {Array}  tableau Le tableau à traiter
 * @returns {number} L'indice trouvé (entre 0 et length-1)
 */
function pigerArray(tableau, retournerValeur) {
	var resultat, nbElements, indice;
	nbElements = tableau.length;
	indice = Math.floor(Math.random() * nbElements);
	if (retournerValeur === true) {
		resultat = tableau[indice];
	} else {
		resultat = indice;
	}
	return resultat;
}

/**
 * Change aléatoirement la couleur du fond et du texte de la page
 */
function ajusterCouleurs() {
	var h, s, l;
	h = Math.floor(Math.random() * 360);
	s = Math.floor(Math.random() * 101);
	l = Math.floor(Math.random() * 101);
	document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
	document.body.style.color = "hsl(" + (h + 180) % 360 + "," + 100 + "%," + (100 - l) + "%)";
}

/**
 * Retourne le code HTML de la carte donnée en paramètre
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @param   {Array}  pos   Tableau de nombres contenant la position de la carte : [posX, posY];
 * @returns {string} Le code HTML de la balise représentant la carte.
 */
function htmlCarte(carte, pos) {
	var resultat, style;
	style = '';
	style += 'background-position: ' + bgPosition(carte) + ';';
	style += 'font-size: 14px;';
	style += 'position: absolute;';
	if (pos === undefined) {
		style += 'left: ' + (1 + 6 * getValeur(carte)) + 'em;';
		style += 'top: ' + (1 + 8 * getSorte(carte)) + 'em;"';
	} else {
		style += 'left: ' + (1 + pos[0]) + 'em;';
		style += 'top: ' + (1 + pos[1]) + 'em;"';
	}
	resultat = '';
	resultat += '<div';
	resultat += ' class="carte"';
	resultat += ' id="carte-' + carte + '"';
	resultat += ' style="' + style + '"';
	resultat += ' title="' + titreCarte(carte) + '"';
	resultat += ' onclick="alertCarte(' + carte + ')"';
	resultat += '>';
	resultat += '</div>';
	return resultat;
}

/**
 * Retourne le HTML des cartes données disposées en colonnes
 * @param   {Array}  cartes Un paquet de cartes de taille variable
 * @returns {string} Le HTML des cartes
 */
function htmlEtendreCartes(cartes) {
	var resultat, i, n, uneCarte, emplacement, nbColonnes;
	nbColonnes = 10;
	resultat = '';
	n = cartes.length;
	for (i = 0; i < n; i += 1) {
		uneCarte = cartes[i];
		emplacement = [6 * (i % nbColonnes), 5 + 2 * Math.floor(i / nbColonnes)];
		resultat += htmlCarte(uneCarte, emplacement);
	}
	return resultat;
}

/**
 * Retourne le titre complet de la carte donnée (se retrouve dans le title de la carte)
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns {string} Le titre. Ex.: "Le 2 de Pique"
 */
function titreCarte(carte) {
	var resultat;
	resultat = nomValeur(carte) + ' de ' + nomSorte(carte);
	return resultat;
}

/**
 * Affiche le titre complet de la carte donnée dans un alert
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns void
 */
function alertCarte(carte) {
	alert('Je suis "' + titreCarte(carte) + '"');
}

/**
 * Retourne la valeur du background-position pour la carte donnée
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns {string} La valeur CSS sous le format "-5em -14em"
 */
function bgPosition(carte) {
	var resultat, posY, posX;
	posY = getSorte(carte) * 7;
	posX = getValeur(carte) * 5;
	resultat = "-" + posX + "em -" + posY + "em";
	return resultat;
}

/**
 * Retourne l'indice de la sorte de la carte donnée en paramètre
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns {number} L'indice de la sorte (un nombre entre 0 et 3)
 */
function getSorte(carte) {
	var resultat;
	resultat = Math.floor(carte / 13);
	return resultat;
}

/**
 * Retourne l'indice de la valeur de la carte donnée en paramètre
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns {number} L'indice de la valeur (de 0 à 12)
 */
function getValeur(carte) {
	var resultat;
	resultat = carte % 13;
	return resultat;
}

/**
 * Retourne le nom de la sorte de la carte donnée en paramètre
 * Une carte invalide retourne "N/D"
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns {string} Le nom de la sorte (Coeur, Carreaux, Pique ou Trèfle)
 */
function nomSorte(carte) {
	var resultat, idxSorte, sortes;
	sortes = [
		"Coeur",
		"Trèfle",
		"Carreaux",
		"Pique",
	];
	// On récupère l'indice de la sorte (0-4)
	idxSorte = getSorte(carte);
	if (sortes[idxSorte] === undefined) {
		resultat = "N/D";
	} else {
		resultat = sortes[idxSorte];
	}
	return resultat;
}

/**
 * Retourne le nom de la valeur de la carte donnée en paramètre
 * Une carte invalide retourne "N/D"
 * @param   {number} carte L'indice de la carte (de 0 à 51)
 * @returns {string} Le nom de la valeur (de L'As à Le Roi en passant par Le 7)
 */
function nomValeur(carte) {
	var resultat, idxValeur, valeurs;
	valeurs = [
		"As",
		"Deux",
		"Trois",
		"Quatre",
		"Cinq",
		"Six",
		"Sept",
		"Huit",
		"Neuf",
		"Dix",
		"Valet",
		"Dame",
		"Roi"
	];
	// On récupère l'indice de la valeur (0-12)
	idxValeur = getValeur(carte);
	if (valeurs[idxValeur] === undefined) {
		resultat = "N/D";
	} else {
		resultat = valeurs[idxValeur];
	}
	return resultat;
}

/**
 * Retourne le code HTML d'une carte aléatoire
 * @returns {string} le code HTML de la carte pigée
 */
function carteAlea() {
	var idxCarte = Math.floor(Math.random() * 52);
	return htmlCarte(idxCarte);
}

window.addEventListener("load", load);
