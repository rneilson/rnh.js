import { makestr, strlike, nodelike } from './utils.js';
import { byid } from './select.js';
import { setprops, addcls } from './props.js';

/* HTMLElement creation, append/remove children */

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
		else if (Array.isArray(arg) || nodelike(arg)) {
			addchd(el, arg);
		}
		// Add properties/listeners
		else if ('object' === typeof arg) {
			setprops(el, arg);
		}
	}

	return el;
}

// Replaces element with another
// Params:
// 	el			Node					Node to replace
// 	newel		Node					Node to replace with
function replace (el, newel) {
	if (el.parentNode) {
		el.parentNode.replaceChild(newel, el);
	}
	return el;
}

// Appends one or more child elements to given element
// Params:
// 	el			Node					Node to append child(ren) to
// 	children	array, stringish, Node	Child(ren) to append; stringish will be added as text nodes
// 	detach		boolean					Detach element from DOM before appending child(ren)
function addchd (el, children, detach) {
	var temp = null;

	// Optionally detach element from DOM
	if (detach && el.parentNode !== null) {
		// Comment node as placeholder in the DOM
		temp = c();
		replace(el, temp);
	}

	// Add children
	if (Array.isArray(children)) {
		for (let i = 0, len_i = children.length; i < len_i; i++) {
			let child = children[i];
			if (strlike(child)) {
				el.appendChild(t(child));
			}
			else if (nodelike(child)) {
				el.appendChild(child);
			}
		}
	}
	else if (nodelike(children)) {
		el.appendChild(children);
	}
	else if (strlike(children)) {
		el.appendChild(t(children));
	}

	// Reattach if previously detached
	if (detach && temp !== null) {
		replace(temp, el);
	}

	return el;
}

// Removes one or more child elements from given element
// Params:
// 	el			Node					Node to remove child(ren) from
// 	children	array, stringish, Node	Child(ren) to remove; stringish will be selected by id
// 	detach		boolean					Detach element from DOM before appending child(ren)
function remchd (el, children, detach) {
	var temp = null;

	// Optionally detach element from DOM
	if (detach && el.parentNode !== null) {
		// Comment node as placeholder in the DOM
		temp = c();
		replace(el, temp);
	}

	// Remove children
	if (Array.isArray(children)) {
		for (let i = 0, len_i = children.length; i < len_i; i++) {
			let child = children[i];
			if (strlike(child)) {
				el.removeChild(byid(child));
			}
			else if (nodelike(child)) {
				el.removeChild(child);
			}
		}
	}
	else if (nodelike(children)) {
		el.removeChild(children);
	}
	else if (strlike(children)) {
		el.removeChild(byid(children));
	}

	// Reattach if previously detached
	if (detach && temp !== null) {
		replace(temp, el);
	}

	return el;
}

// Removes all child elements from given element
// Params:
// 	el			Node				Node to remove child(ren) from
// 	detach		boolean				Detach element from DOM before removing children
function clrchd (el, detach) {
	var temp = null;

	// Optionally detach element from DOM
	if (detach && el.parentNode !== null) {
		// Comment node as placeholder in the DOM
		temp = c();
		replace(el, temp);
	}

	// Clear children
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	} 

	// Reattach if previously detached
	if (detach && temp !== null) {
		replace(temp, el);
	}

	return el;
}

/* String/text conversion into element arrays */

// Splits string on newlines, converts to text nodes, and inserts <br> elements; returns array of nodes
// Params:
// 	str			string				String to parse
function brklns (str) {
	var ret = [];
	var arr = makestr(str).split('\n');
	if (arr.length > 0) {
		// Add first text node
		ret.push(t(arr[0]));
		// Add subsequent text nodes, with <br> elements between
		for (var i = 1; i < arr.length; i++) {
			ret.push(br());
			ret.push(t(arr[i]));
		}
	}
	return ret;
}

// Converts/splits template string into array of elements, including converting \n to <br>
// Inserted expressions will be called if a function, inserted directly if a node, or converted to text otherwise
function txt (strings, ...inserts) {
	var ret = [];
	if (strings.length > 0) {
		// Add first text node
		ret.push(...brklns(strings[0]));
		// Alternate inserts and additional text nodes
		for (var i = 1; i < strings.length; i++) {
			let insert = inserts[i-1];
			if (nodelike(insert)) {
				ret.push(insert);
			}
			else if (typeof insert === 'function') {
				ret.push(insert());
			}
			else if (strlike(insert)) {
				ret.push(...brklns(insert));
			}
			else {
				ret.push(t(String(insert)));
			}
			ret.push(...brklns(strings[i]));
		}
	}
	return ret;
}

// Converts HTML (in string template form) into array of nodes
// Does *not* insert <br> elements on newlines
// NOTE: elements received as insert args are converted to text during processing
function html (strings, ...inserts) {

	// Converts insert arg to string
	function parse (insert) {
		if (nodelike(insert)) {
			// Return as HTML if available
			if (insert.outerHTML) {
				return insert.outerHTML;
			}
			// Return raw text if text node
			else if (insert.nodeType == 3) {
				return insert.textContent;
			}
			// Return commented text if comment node
			else if (insert.nodeType == 8) {
				return `<!--${insert.textContent}-->`;
			}
			// TODO: handle DocumentFragment nodes (recursive calls on children?)
			// Default to empty string
			return '';
		}
		else if (typeof insert === 'function') {
			return parse(insert());
		}
		else if (strlike(insert)) {
			return insert;
		}
		else {
			return String(insert);
		}
	}

	// Convert all to concatenated HTML string
	var str = '';
	if (strings.length > 0) {
		// Add first text node
		str += strings[0];
		// Alternate inserts and additional text nodes
		for (let i = 1; i < strings.length; i++) {
			let insert = inserts[i-1];
			str += parse(insert);
			str += strings[i];
		}
	}

	// Create temp div and set HTML string to innerHTML
	var tmp = h('div');
	tmp.innerHTML = str;

	// Return temp div children as array
	var ret = [];
	for (let j = 0, chd = tmp.childNodes; j < chd.length; j++) {
		ret.push(chd[j]);
	}

	return ret;
}

/* Common shortcuts */

// Creates text element
// Params:
// 	str			stringish			Content of text node to create
function t (str) {
	return document.createTextNode(makestr(str));
}

// Creates comment element
// Params:
// 	str			stringish			Content of comment node to create
function c (str) {
	return document.createComment(makestr(str));
}

// Creates <br> element
function br () {
	return document.createElement('br');
}

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

function em (...args) {
	return h('em', ...args);
}

function strong (...args) {
	return h('strong', ...args);
}

function img (...args) {
	return h('img', ...args);
}

function pre (...args) {
	return h('pre', ...args);
}

function input (...args) {
	return h('input', ...args);
}

function select (...args) {
	return h('select', ...args);
}

function textarea (...args) {
	return h('textarea', ...args);
}

export { h, replace, addchd, remchd, clrchd, brklns, txt, html, t, c, br, a, p, div, span, ul, li, em, strong, img, pre, input, select, textarea };
