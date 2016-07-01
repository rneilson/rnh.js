/* Element selector shortcuts */

function sel (s, l) {
	if (l === undefined) {
		return document.querySelectorAll(s);
	}
	else {
		return l.querySelectorAll(s);
	}
}

function byid (i) {
	return document.getElementById(i);
}

function bycls (c, l) {
	if (l === undefined) {
		return document.getElementsByClassName(c);
	}
	else {
		return l.getElementsByClassName(c);
	}
}

function bytag (t, l) {
	if (l === undefined) {
		return document.getElementsByTagName(t);
	}
	else {
		return l.getElementsByTagName(t);
	}
}

export { sel, byid, bycls, bytag };
