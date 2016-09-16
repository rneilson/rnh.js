// Utility functions

export function has (obj, prop) {
	if (typeof prop === 'string') {
		prop = prop.split('.');
	}
	else if (!Array.isArray(prop)) {
		prop = [prop];
	}
	var i;
	for (i = 0; i < prop.length - 1; i++) {
		if (obj === null || obj === undefined) {
			return false;
		}
		let p = prop[i];
		let o = Object(obj);
		if (!Object.prototype.hasOwnProperty.call(o, p)) {
			return false;
		}
		obj = o[p];
	}
	return obj !== null && obj !== undefined && Object.prototype.hasOwnProperty.call(obj, prop[i]);
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
