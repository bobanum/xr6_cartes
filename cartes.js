/*jslint browser:true*/
function load() {
	var jeu, cartesCoeur, cartesTrefle, cartesCarreau, cartesPique, paquet;
	jeu = document.getElementById("jeu");
	ajusterCouleurs();

	cartesCoeur = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	cartesTrefle = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
	cartesTrefle.push(23);
	cartesTrefle.push(24, 25);

	cartesCarreau = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
	cartesCarreau.unshift(26);

	cartesPique = [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, "Enlevez-moi avec pop"];
	cartesPique.pop();
	cartesPique.pop();

	paquet = ["Enlevez-moi avec shift"];
	paquet = paquet.concat(cartesCoeur, cartesTrefle, cartesCarreau, cartesPique);
	paquet.shift();
	//alert(paquet);

	var carte, affichageCartes;
	affichageCartes = '';
	carte = pigerArray(paquet);
	affichageCartes += htmlCarte(carte);
	paquet.splice(carte,1);
	carte = pigerArray(paquet);
	affichageCartes += htmlCarte(carte);
	paquet.splice(carte,1);
	carte = pigerArray(paquet);
	affichageCartes += htmlCarte(carte);
	paquet.splice(carte,1);
	carte = pigerArray(paquet);
	affichageCartes += htmlCarte(carte);
	paquet.splice(carte,1);
	jeu.innerHTML = affichageCartes;
}

/**
 * Retourne l'indice d'un élément aléatoire d'un tableau
 * @param   {Array}  tableau Le tableau à traiter
 * @returns {number} L'indice trouvé (entre 0 et length-1)
 */
function pigerArray(tableau) {
	var resultat, nbElements;
	nbElements = tableau.length;
	resultat = Math.floor(Math.random() * nbElements);
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
 * @returns {string} Le code HTML de la balise représentant la carte.
 */
function htmlCarte(carte) {
	var resultat;
	resultat = '';
	resultat += '<div';
	resultat += ' class="carte"';
	resultat += ' id="carte-' + carte + '"';
	resultat += ' style="background-position: ' + bgPosition(carte) + '; font-size: 14px;"';
	resultat += ' title="' + titreCarte(carte) + '"';
	resultat += ' onclick="alertCarte(' + carte + ')"';
	resultat += '>';
	resultat += '</div>';
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
