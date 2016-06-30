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

export { addcls, remcls, togcls };
