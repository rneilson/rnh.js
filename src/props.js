import { isCallable } from './utils.js';

/* Attribute/property setting */

function setprops (el, props) {
	if ('object' === typeof props) {
		for (let p of Object.keys(props)) {
			// Add as listener if prop value is a function
			if (isCallable(props[p])) {
				el.addEventListener(p, props[p]);
			}
			// Otherwise add as property/attribute/style
			else {
				// Special handling for style
				if (p === 'style') {
					let j = props[p];
					if ('string' === typeof j) {
						el.style.cssText = j;
					}
					else if ('object' === typeof j) {
						for (let k of Object.keys(j)) {
							el.style.setProperty(k, j[k]);
						}
					}
				}
				// Special handling for data-* attributes
				else if ('string' === typeof p && p.substr(0, 5) === 'data-') {
					el.setAttribute(p, props[p]);
				}
				else {
					el[p] = props[p];
				}
			}
		}
	}
}

/* Class addition/removal */

// Adds given class(es) to element
// Params:
//  el		Element			Target element
//  cls		array, string	Class(es) to add; multiple classes in single string will be split on spaces
function addcls(el, cls) {
	if ('string' === typeof cls) {
		// Add individually if class list already exists
		if (el.className) {
			// Split on spaces (or it'll error)
			for (let c of cls.split(' ')) {
				el.classList.add(c);
			}
		}
		// Otherwise set className directly, no parsing req'd
		else {
			el.className = cls;
		}
	}
	else if (Array.isArray(cls)) {
		// Recurse
		for (let a of cls) {
			addcls(el, a);
		}
	}
}

// Removes given class(es) from element
// Params:
//  el		Element			Target element
//  cls		array, string	Class(es) to remove; multiple classes in single string will be split on spaces
function remcls(el, cls) {
	if ('string' === typeof cls) {
		// Split on spaces (or it'll error)
		for (let c of cls.split(' ')) {
			el.classList.remove(c);
		}
	}
	else if (Array.isArray(cls)) {
		// Recurse
		for (let a of cls) {
			remcls(el, a);
		}
	}
}

// Toggles given class(es) on element
// Params:
//  el		Element			Target element
//  cls		array, string	Class(es) to toggle; multiple classes in single string will be split on spaces
function togcls(el, cls) {
	if ('string' === typeof cls) {
		// Split on spaces (or it'll error)
		for (let c of cls.split(' ')) {
			el.classList.toggle(c);
		}
	}
	else if (Array.isArray(cls)) {
		// Recurse
		for (let a of cls) {
			togcls(el, a);
		}
	}
}

export { setprops, addcls, remcls, togcls };
