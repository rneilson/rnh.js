/* Element selector shortcuts */

function id (i) {
	return document.getElementById(i);
}

function sel (s, l) {
	if (l === undefined) {
		return document.querySelectorAll(s);
	}
	else {
		return l.querySelectorAll(s);
	}
}

function cls (c, l) {
	if (l === undefined) {
		return document.getElementsByClassName(c);
	}
	else {
		return l.getElementsByClassName(c);
	}
}

function tag (t, l) {
	if (l === undefined) {
		return document.getElementsByTagName(t);
	}
	else {
		return l.getElementsByTagName(t);
	}
}

export { id, sel, cls, tag };
