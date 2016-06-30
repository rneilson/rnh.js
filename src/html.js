import { isCallable, strLike, nodeLike } from './utils.js';
import { id } from './select.js';
import { addcls } from './classes.js';

/* HTMLElement creation, append/remove of children */

// Creates HTMLElement
// Params:
// 	tag			string				Element tag to create (default 'div')
// Additional params by type:
// 	classes		string				Class or class list to set on element (multiple args will be concantenated)
// 	props		object				Properties to set on element; functions will be added as event listeners	 
// 	children	array, element		Child nodes to insert; argument passed to addchd()
function h (tag, ...args) {
	var el;

	// Create element
	if ('string' === typeof tag && tag !== '') {
		el = document.createElement(tag);
	}
	else {
		el = document.createElement('div');
	}

	// Parse add'l args
	for (let arg of args) {
		// Guard
		if (arg === null || arg === undefined)
			;
		// Add classes
		else if ('string' === typeof arg) {
			if (el.className) {
				addcls(el, arg);
			}
			else {
				el.className = arg;
			}
		}
		// Add children
		else if (Array.isArray(arg) || nodeLike(arg)) {
			addchd(el, arg);
		}
		// Add properties/listeners
		else if ('object' === typeof arg) {
			for (let p of Object.keys(arg)) {
				// Add as listener if prop value is a function
				if (isCallable(arg[p])) {
					el.addEventListener(p, arg[p]);
				}
				// Otherwise add as property/attribute/style
				else {
					// Special handling for style
					if (p === 'style') {
						let j = arg[p];
						if ('string' === typeof j) {
							el.style.cssText = j;
						}
						else if ('object' === typeof j) {
							for (let k of j) {
								el.style.setProperty(k, j[k]);
							}
						}
					}
					// Special handling for data-* attributes
					else if ('string' === typeof p && p.substr(0, 5) === 'data-') {
						el.setAttribute(p, arg[p]);
					}
					else {
						el[p] = arg[p];
					}
				}
			}
		}
	}

	return el;
}

// Creates text element
// Params:
// 	str			stringish			Content of text node to create
function t (str) {
	var s = str === undefined ? '' : str === null ? '' : 'string' === typeof str ? str : String(str);
	return document.createTextNode(s);
}

// Creates comment element
// Params:
// 	str			stringish			Content of comment node to create
function c (str) {
	var s = str === undefined ? '' : str === null ? '' : 'string' === typeof str ? str : String(str);
	return document.createComment(s);
}

// Creates <br> element
function b () {
	return document.createElement('br');
}

// Appends one or more child elements to given element
// Params:
// 	el			Node				Node to append child(ren) to
// 	children	array, stringish	Child(ren) to append; stringish will be added as text nodes
// 	detach		boolean				Detach element from DOM before appending child(ren)
function addchd (el, children, detach) {
	var temp = null;

	// Optionally detach element from DOM
	if (detach && el.parentNode !== null) {
		// Comment node as placeholder in the DOM
		temp = c();
		el.parentNode.replaceChild(temp, el);
	}

	// Add children
	if (Array.isArray(children)) {
		for (let i = 0, len_i = children.length; i < len_i; i++) {
			let child = children[i];
			if (strLike(child)) {
				el.appendChild(t(child));
			}
			else {
				el.appendChild(child);
			}
		}
	}
	else if (strLike(children)) {
		el.appendChild(t(children));
	}
	else if (nodeLike(children)) {
		el.appendChild(children);
	}

	// Reattach if previously detached
	if (detach && temp !== null) {
		temp.parentNode.replaceChild(el, temp);
	}

	return el;
}

// Removes one or more child elements from given element
// Params:
// 	el			Node				Node to remove child(ren) from
// 	children	array, stringish	Child(ren) to remove; stringish will be selected by id
// 	detach		boolean				Detach element from DOM before appending child(ren)
function remchd (el, children, detach) {
	var temp = null;

	// Optionally detach element from DOM
	if (detach && el.parentNode !== null) {
		// Comment node as placeholder in the DOM
		temp = document.createComment();
		el.parentNode.replaceChild(temp, el);
	}

	// Remove children
	if (Array.isArray(children)) {
		for (let i = 0, len_i = children.length; i < len_i; i++) {
			let child = children[i];
			if (strLike(child)) {
				el.removeChild(id(child));
			}
			else {
				el.removeChild(child);
			}
		}
	}
	else if (strLike(children)) {
		el.removeChild(id(children));
	}

	// Reattach if previously detached
	if (detach && temp !== null) {
		temp.parentNode.replaceChild(el, temp);
	}

	return el;
}

// Removes all child elements from given element
// Params:
// 	el			Node				Node to remove child(ren) from
// 	detach		boolean				Detach element from DOM before appending child(ren)
function clrchd (el, detach) {
	var temp = null;

	// Optionally detach element from DOM
	if (detach && el.parentNode !== null) {
		// Comment node as placeholder in the DOM
		temp = document.createComment();
		el.parentNode.replaceChild(temp, el);
	}

	// Clear children
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	} 

	// Reattach if previously detached
	if (detach && temp !== null) {
		temp.parentNode.replaceChild(el, temp);
	}

	return el;
}

/* Common shortcuts */

function a (...args) {
	return h('a', ...args);
}

function p (...args) {
	return h('p', ...args);
}

function div (...args) {
	return h('div', ...args);
}

function span (...args) {
	return h('span', ...args);
}

function ul (...args) {
	return h('ul', ...args);
}

function li (...args) {
	return h('li', ...args);
}

export { h, t, c, b, addchd, remchd, clrchd, a, p, div, span, ul, li };
