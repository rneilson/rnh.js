import { isCallable, strLike } from './utils.js';
import { id } from './select.js';

/* HTMLElement creation, append/remove of children */

// Creates HTMLElement
// Params:
// 	tag			string				Element tag to create (default 'div')
// 	classes		array, string		Class list to set on element
// 	props		object				Properties to set on element; functions will be added as event listeners	 
// 	children	array, stringish	Child nodes to insert; stringish will be added as a plain text node
function h (tag, classes, props, children) {
	var el;

	// Create element
	if ('string' === typeof tag && tag !== '') {
		el = document.createElement(tag);
	}
	else {
		el = document.createElement('div');
	}

	// Add classes
	if (classes !== undefined && classes !== null) {
		if ('string' === typeof classes) {
			el.className = classes;
		}
		else if (Array.isArray(classes)) {
			el.className = classes.join(' ');
		}
	}

	// Add properties/listeners
	if (props !== undefined && props !== null && 'object' === typeof props) {
		for (var p in props) {
			if (isCallable(props[p])) {
				el.addEventListener(p, props[p]);
			}
			else {
				el[p] = props[p];
			}
		}
	}

	// Add children
	if (children !== undefined && children !== null) {
		addchd(el, children);
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
		for (var i = 0, len_i = children.length; i < len_i; i++) {
			var child = children[i];
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
		for (var i = 0, len_i = children.length; i < len_i; i++) {
			var child = children[i];
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

function a (classes, props, children) {
	return h('a', classes, props, children);
}

function p (classes, props, children) {
	return h('p', classes, props, children);
}

function div (classes, props, children) {
	return h('div', classes, props, children);
}

function span (classes, props, children) {
	return h('span', classes, props, children);
}

function ul (classes, props, children) {
	return h('ul', classes, props, children);
}

function li (classes, props, children) {
	return h('li', classes, props, children);
}

export { h, t, c, b, addchd, remchd, clrchd, a, p, div, span, ul, li };
