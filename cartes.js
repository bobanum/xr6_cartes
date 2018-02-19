/*jslint browser:true*/
function load() {
	ajusterCouleurs();
	document.body.innerHTML += carteAlea();
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
	var resultat, adresse;
	adresse = 'http://prof-tim.cstj.qc.ca/martinboudreau/images_cartes/';
	adresse += 'idx/' + carte + '.png';
	resultat = '';
	resultat += '<img';
	resultat += ' class="carte"';
	resultat += ' id="' + carte + '"';
	resultat += ' src="' + adresse + '"';
	resultat += ' alt="' + nomValeur(carte) + ' de ' + nomSorte(carte) + '"';
	resultat += ' title="' + nomValeur(carte) + ' de ' + nomSorte(carte) + '"';
	resultat += '/>';
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
	var resultat, idxSorte;
	// On récupère l'indice de la sorte (0-4)
	idxSorte = getSorte(carte);
	switch (idxSorte) {
		case 0:
			resultat = "Coeur";
			break;
		case 1:
			resultat = "Carreaux";
			break;
		case 2:
			resultat = "Pique";
			break;
		case 3:
			resultat = "Trèfle";
			break;
		default:
			resultat = "N/D";
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
	var resultat, idxValeur;
	// On récupère l'indice de la valeur (0-12)
	idxValeur = getValeur(carte);
	if (idxValeur === 0) {
		resultat = "L'As";
	} else if (idxValeur > 0 && idxValeur <= 9) {
		resultat = "Le " + (idxValeur + 1);
	} else if (idxValeur == 10) {
		resultat = "Le Valet";
	} else if (idxValeur == 11) {
		resultat = "La Dame";
	} else if (idxValeur == 12) {
		resultat = "Le Roi";
	} else {
		resultat = "N/D";
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
