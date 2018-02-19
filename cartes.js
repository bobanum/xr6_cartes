/*jslint browser:true*/
function load() {
	var r, g, b;
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	document.body.innerHTML += carteAlea();
}

function htmlCarte(carte) {
	var resultat, adresse;
	adresse = 'http://prof-tim.cstj.qc.ca/martinboudreau/images_cartes/';
	adresse += 'idx/' + carte + '.png';
	resultat = '';
	resultat += '<img';
	resultat += ' class="carte"';
	resultat += ' id="' + carte + '"';
	resultat += ' src="' + adresse + '"';
	resultat += ' alt="Sorte: ' + getSorte(carte) + ', Valeur: ' + getValeur(carte) + '"';
	resultat += ' title="Sorte: ' + getSorte(carte) + ', Valeur: ' + getValeur(carte) + '"';
	resultat += '/>';
	return resultat;
}

function getSorte(carte) {
	var resultat;
	resultat = Math.floor(carte / 13);
	return resultat;
}

function getValeur(carte) {
	var resultat;
	resultat = carte % 13;
	return resultat;
}

function carteAlea() {
	var idxCarte = Math.floor(Math.random() * 52);
	return htmlCarte(idxCarte);
}
window.addEventListener("load", load);
