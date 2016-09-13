import { cr, replace, addchd, remchd, clrchd, brklns, txt, html, t, c, br } from './html.js';

function h (tag, ...args) {
	return cr(tag, args);
}

function a (...args) {
	return cr('a', args);
}

function p (...args) {
	return cr('p', args);
}

function div (...args) {
	return cr('div', args);
}

function span (...args) {
	return cr('span', args);
}

function ul (...args) {
	return cr('ul', args);
}

function li (...args) {
	return cr('li', args);
}

function em (...args) {
	return cr('em', args);
}

function strong (...args) {
	return cr('strong', args);
}

function img (...args) {
	return cr('img', args);
}

function pre (...args) {
	return cr('pre', args);
}

function input (...args) {
	return cr('input', args);
}

function select (...args) {
	return cr('select', args);
}

function textarea (...args) {
	return cr('textarea', args);
}

export { replace, addchd, remchd, clrchd, brklns, txt, html, t, c, br, h, a, p, div, span, ul, li, em, strong, img, pre, input, select, textarea };
export { sel, byid, bycls, bytag } from './select.js';
export { setprops, addcls, remcls, togcls } from './props.js';
export { has, makestr, strlike, nodelike } from './utils.js';