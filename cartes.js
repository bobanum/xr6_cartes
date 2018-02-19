/*jslint browser:true*/
function load() {
	var r, g, b;
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}
window.addEventListener("load", load);
