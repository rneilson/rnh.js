# rnh.js
A library for HTML creation and manipulation in Javascript (ES6)

**Please note**:
This project is a work in progress. The base API *should* remain stable as additional features are added, but it's not guaranteed.

### Overview

**rnh.js** is a library for creating, selecting, and manipulating HTML elements, written using ES6 standards. It is loosely based on [Hyperscript](https://github.com/dominictarr/hyperscript), with some additional convenience functions for selecting elements using browser-native interfaces, and adding/removing DOM nodes.

### Requirements

**rnh.js** requires Node 6.0 or higher to build, and uses rollup.js for bundling. Usage in ES5 environments requires transpliation with Babel or equivalent.

### Installation

The easiest method is simply `npm install rnh`. Manual installation is possible through `git clone https://github.com/rneilson/rnh.js.git`; however, creating the bundled library (in the `/dist` directory) requires Node to be installed, and can be built with `npm run build`.

### Importing

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

### Usage

`h (tag, ...args)`

Creates an HTMLElement node.

Params:
tag | string | Element tag to create (default 'div')

Additional params by type:
string | Class or class list to set on element (multiple args will be concantenated)
object | Properties/attributes to set on element; functions will be added as event listeners
array, element | Child nodes to insert; argument(s) passed to addchd()

`addchd (el, children, detach)`

Appends one or more child elements to given element.

Params:
el | Element | Element to append child(ren) to
children | array, stringish | Child(ren) to append; stringish (includes string, number, boolean) will be added as text nodes
detach | boolean | Detach element from DOM before appending child(ren)

`remchd (el, children, detach)`

Removes one or more child elements from given element.

Params:
el | Element | Element to remove child(ren) from
children | array, stringish | Child(ren) to remove; stringish will be selected by id
detach | boolean | Detach element from DOM before appending child(ren)

`clrchd (el, detach)`

Removes all child elements from given element.

Params:
el | Element | Element to remove child(ren) from
detach | boolean | Detach element from DOM before appending child(ren)

`brklns (str)`

Splits string on newlines, converts to text nodes, and inserts `<br>` elements in place of '\n'; returns array of nodes.

Params:
str | string | String to parse

`txt (strings, ...inserts)`

Converts/splits template string into array of elements/nodes, including converting `\n` to `<br>` where applicable. Inserted expressions will be called if a function, inserted directly if a node, or converted to text otherwise. Please note that this function is for use with template strings instead of direct calls.
```javascript
var str = 'string';
var arr = rnh.txt`This is a ${str}, which will be converted\nto an array of DOM nodes.`;
// Result:		[ text, text, text, br, text ]
// Contents:	[ 'This is a ', 'string', ', which will be converted', <br>, 'to an array of DOM nodes.' ]
// (Please note the strings above represent text nodes, not strings.)
```

`t (str)`

Creates text node.

Params:
str | stringish | Content of text node to create

`c (str)`

Creates comment node.

Params:
str | stringish | Content of comment node to create

`br ()`

Creates `<br>` element.

`a (...args)`

Equivalent to `h('a', ...args)`.

`p (...args)`

Equivalent to `h('p', ...args)`.

`div (...args)`

Equivalent to `h('div', ...args)`.

`span (...args)`

Equivalent to `h('span', ...args)`.

`ul (...args)`

Equivalent to `h('ul', ...args)`.

`li (...args)`

Equivalent to `h('li', ...args)`.

