/* Element selector shortcuts */

function sel (s, l) {
	return Array.from((l === undefined) ? document.querySelectorAll(s) : l.querySelectorAll(s));
}

function byid (i) {
	return document.getElementById(i);
}

function bycls (c, l) {
	return Array.from((l === undefined) ? document.getElementsByClassName(c) : l.getElementsByClassName(c));
}

function bytag (t, l) {
	return Array.from((l === undefined) ? document.getElementsByTagName(t) : l.getElementsByTagName(t));
}

export { sel, byid, bycls, bytag };
