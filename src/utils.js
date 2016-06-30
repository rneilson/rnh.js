// Utility functions

export function isCallable (fn) {
	return typeof fn === 'function' || Object.prototype.toString.call(fn) === '[object Function]';
}

export function hasProp (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function strLike (s) {
	var type = typeof s;
	return type === 'string' || type === 'number' || type === 'boolean' || s instanceof Date || s instanceof RegExp;
}