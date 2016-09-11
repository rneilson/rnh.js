# rnh.js
A library for HTML creation and manipulation in Javascript (ES6)

**Please note**:
This project is a work in progress. The base API *should* remain stable as additional features are added, but it's not guaranteed.

## Overview

**rnh.js** is a library for creating, selecting, and manipulating HTML elements, written using ES6 standards. It is loosely based on [Hyperscript](https://github.com/dominictarr/hyperscript), with some additional convenience functions for selecting elements using browser-native interfaces, and adding/removing DOM nodes.

## Requirements

**rnh.js** requires Node 6.0 or higher to build, and uses rollup.js for bundling. Usage in ES5 environments requires transpliation with Babel or equivalent.

## Installation

The easiest method is simply `npm install rnh`. Manual installation is possible through `git clone https://github.com/rneilson/rnh.js.git`; however, creating the bundled library (in the `/dist` directory) requires Node to be installed, and can be built with `npm run build`.

## Importing

ES6 syntax:
```
import * as rnh from 'rnh';
```

Node/CommonJS syntax:
```
var rnh = require('rnh');
```

Three library versions are available depending on use:
- `/dist/rnh.js` ES6 native export format (recommended for use with rollup.js)
- `/dist/rnh.cjs.js` CommonJS module format (for use with Node/npm)
- `/dist/rnh.iife.js` Immediately-invoked function expression (for direct use in the browser)

## Element/node creation

#### `h (tag, ...args)`

Creates an HTMLElement node.

| Param | Type | Desc |
| ----- | ---- | ---- |
| tag | string | Element tag to create (default 'div') |
| args | * | Processed by type |

Additional arguments:

| Type | Desc |
| ---- | ---- |
| string | Class or class list to set on element (multiple args will be concantenated) |
| object | Properties/attributes to set on element; argument(s) passed to `setprops()` |
| array, element | Child nodes to insert; argument(s) passed to `addchd()` |

Example:
```javascript
import * from 'rnh';

var ex = h('div', {id: 'main', class: 'main'},
	h('p', 'big',
		[ h('span', {style: {color: 'red'}}, t('This')), 'is the first line.', br(), 'This is the second.' ]),
	h('p', 'small',
		[ 'Also, strings within an array', br(), 'are converted to text nodes.' ])
);
```

Output (ex.outerHTML, indentation added for clarity):

```html
<div id="main" class="main">
	<p class="big">
		<span style="color: red;">This</span>is the first line.<br>
		This is the second.
	</p>
	<p class="small">
		Also, strings within an array<br>
		are converted to text nodes.
	</p>
</div>
```

#### `t (str)`

Creates text node. `null` and `undefined` will be converted into the empty string. Other non-string types will be cast using `String()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| str | stringlike | Content of text node to create |

#### `c (str)`

Creates comment node. `null` and `undefined` will be converted into the empty string. Other non-string types will be cast using `String()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| str | stringlike | Content of comment node to create |

#### `br ()`

Creates `<br>` element.

#### `a (...args)`

Equivalent to `h('a', ...args)`.

#### `p (...args)`

Equivalent to `h('p', ...args)`.

#### `div (...args)`

Equivalent to `h('div', ...args)`.

#### `span (...args)`

Equivalent to `h('span', ...args)`.

#### `ul (...args)`

Equivalent to `h('ul', ...args)`.

#### `li (...args)`

Equivalent to `h('li', ...args)`.

#### `em (...args)`

Equivalent to `h('em', ...args)`.

#### `strong (...args)`

Equivalent to `h('strong', ...args)`.

#### `img (...args)`

Equivalent to `h('img', ...args)`.

#### `pre (...args)`

Equivalent to `h('pre', ...args)`.

#### `input (...args)`

Equivalent to `h('input', ...args)`.

#### `select (...args)`

Equivalent to `h('select', ...args)`.

#### `textarea (...args)`

Equivalent to `h('textarea', ...args)`.

## Element/node child manipulation

#### `replace (el, newel)`

Replaces one node with another. Returns `el`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Node | Node to replace |
| newel | Node | Node to replace with |

#### `addchd (el, children, detach)`

Appends one or more child nodes to given node. Returns `el`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Node | Node to append child(ren) to |
| children | array, stringlike, Node | Child(ren) to append; stringlike (see `strLike()`) will be added as text nodes |
| detach | boolean | Detach node from DOM before appending child(ren) |

#### `remchd (el, children, detach)`

Removes one or more child nodes from given node. Returns `el`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Node | Node to remove child(ren) from |
| children | array, stringlike, Node | Child(ren) to remove; stringlike will be selected by id |
| detach | boolean | Detach node from DOM before removing child(ren) |

#### `clrchd (el, detach)`

Removes all child nodes from given node. Returns `el`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Node | Node to remove child(ren) from |
| detach | boolean | Detach node from DOM before removing children |

## Text to node conversion

#### `brklns (str)`

Splits string on newlines, converts to text nodes, and inserts `<br>` elements in place of '\n'; returns array of nodes. `null` and `undefined` will be converted into the empty string. Other non-string types will be cast using `String()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| str | string | String to parse |

#### `txt (strings, ...inserts)`

Converts/splits template string into array of elements/nodes, including converting `\n` to `<br>` where applicable. Inserted expressions will be called if a function, inserted directly if a node, or converted to text otherwise. Please note that this function is for use with template strings instead of direct calls.
```javascript
var str = 'string';
var arr = rnh.txt`This is a ${str}, which will be converted\nto an array of DOM nodes.`;
// Result:		[ text, text, text, br, text ]
// Contents:	[ 'This is a ', 'string', ', which will be converted', <br>, 'to an array of DOM nodes.' ]
// (Please note the strings above represent text nodes, not strings.)
```

#### `html (strings, ...inserts)`

Converts/splits template string into array of elements/nodes, including converting HTML where applicable. Inserted expressions will be called if a function, inserted according to outerHTML property if a node, or converted to text otherwise. Please note that this function is for use with template strings instead of direct calls. Also note that all inserted expressions are converted to text form during processing, which is inefficient when inserting HTMLElement objects directly.
```javascript
var str = 'string';
var arr = rnh.html`This is a <span>${str}</span>, which will be converted<br>to an array of DOM nodes.`;
// Result:		[ text, span, text, br, text ]
// Contents:	[ 'This is a ', '<span>string</span>', ', which will be converted', <br>, 'to an array of DOM nodes.' ]
// (Please note the strings above represent elements or text nodes, not strings.)
```

## Element property/attribute manipulation

#### `setprops (el, props)`

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Element | Target element |
| props | object | Properties or attributes to set |

Some properties have special processing:
- `class`: value will be passed to `addcls()`
- `style`: a string value will set `el.style.cssText` to given value; an object value will set each property using `setProperty()`
- any property with a function as its value will be added as an event listener, with the key as the event
- any property beginning with 'data-' will be added as an attribute of the element instead of a property

#### `addcls(el, cls)`

Adds given class(es) to element.

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Element | Target element |
| cls | array, string | Class(es) to add |

Multiple classes in single string (eg `'green big'`) will be split on spaces when adding to the element's `classList`.

#### `remcls(el, cls)`

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Element | Target element |
| cls | array, string | Class(es) to remove |

Multiple classes in single string (eg `'green big'`) will be split on spaces when removing from the element's `classList`.

#### `togcls(el, cls)`

| Param | Type | Desc |
| ----- | ---- | ---- |
| el | Element | Target element |
| cls | array, string | Class(es) to toggle |

Multiple classes in single string (eg `'green big'`) will be split on spaces when toggling on the element's `classList`.

## Element selection

#### `sel (s, l)`

Selects elements using browser-native `querySelectorAll()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| s | string | Selector string |
| l | Element | Root element to search (optional) |

#### `byid (i)`

Selects elements using browser-native `getElementById()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| i | string | Element id |

#### `bycls (c, l)`

Selects elements using browser-native `getElementsByClassName()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| c | string | Class name |
| l | Element | Root element to search (optional) |

#### `bytag (t, l)`

Selects elements using browser-native `getElementsByTagName()`.

| Param | Type | Desc |
| ----- | ---- | ---- |
| t | string | Tag name |
| l | Element | Root element to search (optional) |

## Miscellaneous utilities

#### `has (obj, prop)`
Returns `true` if `obj` has own property `prop`.

#### `makestr (s)`  
Returns empty string if `s` is `null` or `undefined`, otherwise converts `s` to string.

#### `strlike (s)`
Returns `true` if `s` is a string, number, boolean, Date, or RegExp.

#### `nodelike (n)`
Returns `true` if `n` is not falsy, and has non-falsy properties `nodeName` and `nodeType`.

