// Utility functions

export function has (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function makestr (s) {
	return s === undefined ? '' : s === null ? '' : typeof s === 'string' ? s : String(s);
}

export function strlike (s) {
	var t = typeof s;
	if (t === 'string' || t === 'number' || t === 'boolean') return true;
	t = Object.prototype.toString.call(s);
	if (t === '[object Date]' || t === '[object RegExp]') return true;
	return false;
}

export function nodelike (n) {
	return (n && n.nodeName && n.nodeType);
}
