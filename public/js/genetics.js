/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
;
/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;
/**
* @preserve CanvasJS HTML5 & JavaScript Charts - v1.6.2 GA- http://canvasjs.com/ 
* Copyright 2013 fenopix
*/

/*
* CanvasJS Charts follows Dual Licensing Model as mentioned below. 
* 
* ---------------------Free for Non-Commercial Use--------------------
* 
* For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
*     http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
* 
* ---------------------Commercial License--------------------
* Commercial use of CanvasJS requires you to purchase a license. Without a commercial license you can use it for evaluation purposes only. Please refer to the following link for further details.
*     http://canvasjs.com/
* 
*/


/* jshint -W099 */ //Ignore warning "Mixed Spaces and Tabs"

(function () {

    var isDebugMode = false;

    var isCanvasSupported = !!document.createElement("canvas").getContext;
    //isCanvasSupported = false;

    //Default values for all Chart Elements that can be set by the user. CanvasJSObject.setOptions looks into this while setting the default/user-defined values.
    var defaultOptions = {
        Chart: {
            width: 500,
            height: 400,
            zoomEnabled: false,
            backgroundColor: "white",
            theme: "theme1",
            animationEnabled: false,
            animationDuration: 1200,
            colorSet: "colorSet1",
            culture: "en",
            creditText: "CanvasJS.com",
            interactivityEnabled: true,
            exportEnabled: false,
            exportFileName: "Chart",
            convertIfClear: false //Converts a clear canvas to white for exporting only
        },

        Title: {
            padding: 0,
            text: null,
            verticalAlign: "top",//top, center, bottom
            horizontalAlign: "center",//left, center, right
            fontSize: 20,//in pixels
            fontFamily: "Calibri",
            fontWeight: "normal", //normal, bold, bolder, lighter,
            fontColor: "black",
            fontStyle: "normal", // normal, italic, oblique

            borderThickness: 0,
            borderColor: "black",
            cornerRadius: 0,
            backgroundColor: null,
            margin: 5
            //toolTipContent: null//string - To be implemented (TBI)
        },

        Legend: {
            name: null,
            verticalAlign: "center",
            horizontalAlign: "right",

            fontSize: 14,//in pixels
            fontFamily: "calibri",
            fontWeight: "normal", //normal, bold, bolder, lighter,
            fontColor: "black",
            fontStyle: "normal", // normal, italic, oblique

            cursor: null,
            itemmouseover: null,
            itemmouseout: null,
            itemmousemove: null,
            itemclick: null
        },

        ToolTip: {
            enabled: true,
            borderColor: null,
            shared: false,
            animationEnabled: true,
            content: null
        },

        Axis: {
            minimum: null, //Minimum value to be shown on the Axis
            maximum: null, //Minimum value to be shown on the Axis
            interval: null, // Interval for tick marks and grid lines
            intervalType: null, //number, millisecond, second, minute, hour, day, month, year

            title: null, // string
            titleFontColor: "black",
            titleFontSize: 20,
            titleFontFamily: "arial",
            titleFontWeight: "normal",
            titleFontStyle: "normal",

            labelAngle: 0,
            labelFontFamily: "arial",
            labelFontColor: "black",
            labelFontSize: 12,
            labelFontWeight: "normal",
            labelFontStyle: "normal",
            labelAutoFit: false,
            labelWrap: true,
            labelMaxWidth: null,//null for auto

            prefix: "",
            suffix: "",

            includeZero: true, //Applies only for axisY. Ignored in axisX.

            tickLength: 5,
            tickColor: "black",
            tickThickness: 1,

            lineColor: "black",
            lineThickness: 1,

            gridColor: "A0A0A0",
            gridThickness: 0,

            interlacedColor: null,

            valueFormatString: null,

            margin: 2,

            stripLines: [] // Just a placeholder. Does not have any effect on the actual number of striplines
        },

        StripLine: {
            value: null,
            startValue: null,
            endValue: null,

            color: "orange",
            thickness: 2,
            label: "",
            labelBackgroundColor: "#EEEEEE",
            labelFontFamily: "arial",
            labelFontColor: "orange",
            labelFontSize: 12,
            labelFontWeight: "normal",
            labelFontStyle: "normal"
        },

        DataSeries: {
            name: null,
            dataPoints: null,
            label: "",
            bevelEnabled: false,

            cursor: null,

            indexLabel: "",
            indexLabelPlacement: "auto",  //inside, outside, auto       
            indexLabelOrientation: "horizontal",
            indexLabelFontColor: "black",
            indexLabelFontSize: 12,
            indexLabelFontStyle: "normal", //   italic ,oblique, normal 
            indexLabelFontFamily: "Arial", 	// fx: Arial Verdana "Courier New" Serif 
            indexLabelFontWeight: "normal", 	// bold ,bolder, lighter, normal 
            indexLabelBackgroundColor: null,
            indexLabelLineColor: null,
            indexLabelLineThickness: 1,
            indexLabelMaxWidth: null,
            indexLabelWrap: true,

            lineThickness: 2,

            color: null,
            risingColor: "white",
            fillOpacity: null,

            startAngle: 0,

            type: "column", //line, column, bar, area, scatter stackedColumn, stackedBar, stackedArea, stackedColumn100, stackedBar100, stackedArea100, pie, doughnut
            xValueType: "number", //number, dateTime
            axisYType: "primary",

            xValueFormatString: null,
            yValueFormatString: null,
            zValueFormatString: null,
            percentFormatString: null,

            showInLegend: null,
            legendMarkerType: null,
            legendMarkerColor: null,
            legendText: null,
            legendMarkerBorderColor: null,
            legendMarkerBorderThickness: null,

            markerType: "circle", //none, circle, square, cross, triangle, line
            markerColor: null,
            markerSize: null,
            markerBorderColor: null,
            markerBorderThickness: null,
            //animationEnabled: true,
            mouseover: null,
            mouseout: null,
            mousemove: null,
            click: null,
            toolTipContent: null,

            visible: true
        },

        CultureInfo: {
            decimalSeparator: ".",
            digitGroupSeparator: ",",
            zoomText: "Zoom",
            panText: "Pan",
            resetText: "Reset",

            menuText: "More Options",
            saveJPGText: "Save as JPG",
            savePNGText: "Save as PNG",

            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },


        //Private
        TextBlock: {
            x: 0,
            y: 0,
            width: null,//read only
            height: null,//read only
            maxWidth: null,
            maxHeight: null,
            padding: 0,
            angle: 0,
            text: "",
            horizontalAlign: "center",//left, center, right
            fontSize: 12,//in pixels
            fontFamily: "calibri",
            fontWeight: "normal", //normal, bold, bolder, lighter,
            fontColor: "black",
            fontStyle: "normal", // normal, italic, oblique

            borderThickness: 0,
            borderColor: "black",
            cornerRadius: 0,
            backgroundColor: null,
            textBaseline: "top"
        }
    };

    //#region Cultures

    var cultures = {
        "en": {
            //Derives from the default options
        }//,
        //"es": {
        //    decimalSeparator: ",",
        //    digitGroupSeparator: ".",
        //    zoomText: "zoom",
        //    panText: "pan",
        //    resetText: "reset",
        //    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        //}
    };

    //#endregion Cultures

    //#region Themes

    var colorSets = {

        "colorSet1": [
			"#369EAD",
			"#C24642",
			"#7F6084",
			//"#96C412",
			"#86B402",
			"#A2D1CF",
			//"#D8C641",
			"#C8B631",
			"#6DBCEB",
			//"#4A4946",
			"#52514E",
			"#4F81BC",
			"#A064A1",
			"#F79647"
        ],
        "colorSet2": [
			"#4F81BC",
			"#C0504E",
			"#9BBB58",
			"#23BFAA",
			//"#FAA586",
			"#8064A1",
			"#4AACC5",
			"#F79647",
			//"#77AA33",
			//"#7F6084"
			"#33558B"
        ],
        "colorSet3": [
			"#8CA1BC",
			"#36845C",
			"#017E82",
			"#8CB9D0",
			"#708C98",
			"#94838D",
			"#F08891",
			"#0366A7",
			"#008276",
			"#EE7757",
			"#E5BA3A",
			"#F2990B",
			"#03557B",
			"#782970"
        ]//,
        //"colorSet4": [
        //    "#3698C5",
        //    "#009B8D",
        //    "#F1D691",
        //    "#F8B90C",
        //    "#0081B8",
        //    "#5B5A96",
        //    "#ACBDD1",
        //    "#88A891",
        //    "#39969D",
        //    "#AECEDD",
        //    "#A0B2BC",
        //    "#BBAEB7",
        //    "#A0C65F",
        //    "#EEA6AA",
        //    "#3798C5"
        //],
        //"colorSet5": [
        //    "#88ADBF",
        //    "#84C336",
        //    "#7B91C3",
        //    "#4661EE",
        //    "#EC5657",
        //    "#1BCDD1",
        //    "#8FAABB",
        //    "#B08BEB",
        //    "#3EA0DD",
        //    "#F5A52A",
        //    "#23BFAA",
        //    "#FAA586",
        //    "#EB8CC6"
        //]

    };

    var themes =
		{
		    "theme1": {
		        Chart:
					{
					    colorSet: "colorSet1"
					},
		        Title: {
		            fontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            fontSize: 33,
		            fontColor: "#3A3A3A",
		            fontWeight: "bold",
		            verticalAlign: "top",
		            margin: 10
		        },
		        Axis: {
		            titleFontSize: 26,
		            //titleFontColor: "rgb(98,98,98)",
		            titleFontColor: "#666666",
		            //titleFontFamily: "arial black",
		            //titleFontFamily: "Verdana, Geneva, Calibri, sans-serif",
		            titleFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //titleFontWeight: "bold",

		            //labelFontFamily: "Times New Roman, Times, serif",
		            labelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //labelFontFamily: "Helvetica Neue, Helvetica",
		            labelFontSize: 18,
		            labelFontColor: "grey",
		            //labelFontWeight: "bold",
		            tickColor: "#BBBBBB",
		            tickThickness: 2,
		            gridThickness: 2,
		            gridColor: "#BBBBBB",
		            lineThickness: 2,
		            lineColor: "#BBBBBB"
		        },
		        Legend: {
		            verticalAlign: "bottom",
		            horizontalAlign: "center",
		            fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "calibri"
		        },
		        DataSeries: {
		            //bevelEnabled: true,
		            indexLabelFontColor: "grey",
		            //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
		            indexLabelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //indexLabelFontWeight: "bold",
		            indexLabelFontSize: 18,
		            //indexLabelLineColor: "lightgrey",
		            indexLabelLineThickness: 1
		        }
		    },

		    "theme2": {
		        Chart:
					{
					    colorSet: "colorSet2"
					},
		        Title: {
		            fontFamily: "impact, charcoal, arial black, sans-serif",
		            fontSize: 32,//fontColor: "rgb(58,58,58)",
		            fontColor: "#333333",
		            //fontFamily: "arial black", fontSize: 30,//fontColor: "rgb(58,58,58)",
		            //fontFamily: "arial black",
		            //fontFamily: "Helvetica Neue, Helvetica", fontSize: 35,// fontColor: "rgb(58,58,58)",
		            //fontWeight: "bold",
		            verticalAlign: "top",
		            margin: 10
		        },
		        Axis: {
		            titleFontSize: 22,
		            titleFontColor: "rgb(98,98,98)",
		            //titleFontFamily: "arial black",
		            titleFontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "arial",
		            titleFontWeight: "bold",


		            labelFontFamily: isCanvasSupported ? "monospace, Courier New, Courier" : "arial",
		            //labelFontFamily: "Helvetica Neue, Helvetica",
		            labelFontSize: 16,
		            labelFontColor: "grey",
		            labelFontWeight: "bold",
		            tickColor: "grey",
		            tickThickness: 2,
		            gridThickness: 2,
		            gridColor: "grey",
		            lineThickness: 0
		        },
		        Legend: {
		            verticalAlign: "bottom",
		            horizontalAlign: "center",
		            fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "arial"
		        },
		        DataSeries: {
		            indexLabelFontColor: "grey",
		            //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
		            indexLabelFontFamily: isCanvasSupported ? "Courier New, Courier, monospace" : "arial",
		            indexLabelFontWeight: "bold",
		            indexLabelFontSize: 18,
		            //indexLabelLineColor: "lightgrey",
		            indexLabelLineThickness: 1
		        }
		    },

		    "theme3": {
		        Chart:
					{
					    colorSet: "colorSet1"
					},
		        Title: {
		            //fontFamily: "impact, charcoal, arial black, sans-serif", fontSize: 30,//fontColor: "rgb(58,58,58)",
		            //fontFamily: "arial black", fontSize: 30,//fontColor: "rgb(58,58,58)",
		            //fontFamily: "arial black",
		            fontFamily: isCanvasSupported ? "Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif" : "calibri",
		            fontSize: 32,
		            //fontFamily: "Palatino Linotype, Book Antiqua, Palatino, serif", fontSize: 30,
		            //fontFamily: "Lucida Sans Unicode, Lucida Grande, Trebuchet MS, sans-serif", fontSize: 30,
		            //fontColor: "rgb(68,78,58)",
		            fontColor: "#3A3A3A",
		            fontWeight: "bold",
		            verticalAlign: "top",
		            margin: 10
		        },
		        Axis: {
		            titleFontSize: 22,
		            titleFontColor: "rgb(98,98,98)",
		            //titleFontFamily: "arial black",
		            titleFontFamily: isCanvasSupported ? "Verdana, Geneva, Calibri, sans-serif" : "calibri",
		            //titleFontWeight: "bold",

		            //labelFontFamily: "Times New Roman, Times, serif",
		            labelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //labelFontFamily: "Helvetica Neue, Helvetica",
		            labelFontSize: 18,
		            labelFontColor: "grey",
		            //labelFontWeight: "bold",
		            tickColor: "grey",
		            tickThickness: 2,
		            gridThickness: 2,
		            gridColor: "grey",
		            lineThickness: 2,
		            lineColor: "grey"
		        },
		        Legend: {
		            verticalAlign: "bottom",
		            horizontalAlign: "center",
		            fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "calibri"
		        },
		        DataSeries: {
		            bevelEnabled: true,
		            indexLabelFontColor: "grey",
		            //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
		            indexLabelFontFamily: isCanvasSupported ? "Candara, Optima, Calibri, Verdana, Geneva, sans-serif" : "calibri",
		            //indexLabelFontWeight: "bold",
		            indexLabelFontSize: 18,
		            indexLabelLineColor: "lightgrey",
		            indexLabelLineThickness: 2
		        }
		    }
		};

    //#endregion Themes

    var constants = {
        numberDuration: 1,
        yearDuration: 1000 * 60 * 60 * 24 * 364,
        monthDuration: 1000 * 60 * 60 * 24 * 30,
        weekDuration: 1000 * 60 * 60 * 24 * 7,
        dayDuration: 1000 * 60 * 60 * 24,
        hourDuration: 1000 * 60 * 60,
        minuteDuration: 1000 * 60,
        secondDuration: 1000,
        millisecondDuration: 1,

        dayOfWeekFromInt: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };

    //#region Static Methods & variables

    function extend(Child, Parent) {
        Child.prototype = inherit(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.parent = Parent.prototype;
    }

    function inherit(proto) {
        function F() { }
        F.prototype = proto;
        return new F();
    }

    function addToDateTime(dateTime, num, type) {

        if (type === "millisecond")
            dateTime.setMilliseconds(dateTime.getMilliseconds() + 1 * num);
        else if (type === "second")
            dateTime.setSeconds(dateTime.getSeconds() + 1 * num);
        else if (type === "minute")
            dateTime.setMinutes(dateTime.getMinutes() + 1 * num);
        else if (type === "hour")
            dateTime.setHours(dateTime.getHours() + 1 * num);
        else if (type === "day")
            dateTime.setDate(dateTime.getDate() + 1 * num);
        else if (type === "week")
            dateTime.setDate(dateTime.getDate() + 7 * num);
        else if (type === "month")
            dateTime.setMonth(dateTime.getMonth() + 1 * num);
        else if (type === "year")
            dateTime.setFullYear(dateTime.getFullYear() + 1 * num);

        return dateTime;
    }

    function convertToNumber(num, type) {
        return constants[type + "Duration"] * num;
    }

    function pad(value, length) {
        var isNegative = false;
        if (value < 0) {
            isNegative = true;
            value *= -1;
        }

        value = "" + value;
        length = !length ? 1 : length;

        while (value.length < length) value = "0" + value;

        return isNegative ? "-" + value : value;
    }

    function trimString(str) {
        if (!str)
            return str;

        str = str.replace(/^\s\s*/, '');
        var ws = /\s/;
        var i = str.length;
        while (ws.test(str.charAt(--i))) { }
        return str.slice(0, i + 1);
    }

    function extendCtx(context) {
        context.roundRect = function (x, y, width, height, radius, borderThickness, backgroundColor, borderColor) {
            ///<signature>
            ///<summary>Creates a rounded rectangle with given fill/stroke parameters</summary>
            ///<param name="x" type="number">x value</param>
            ///<param name="y" type="number">y value</param>
            ///<param name="width" type="number">Border Width</param>
            ///<param name="height" type="number">Border Height</param>
            ///<param name="radius" type="number">Border CornerRadius</param>
            ///<param name="borderThickness" type="number">Border Thickess</param>
            ///<param name="backgroundColor" type="number">Background Color</param>
            ///<param name="borderColor" type="number">Border Color</param>
            ///</signature>

            if (backgroundColor) {
                this.fillStyle = backgroundColor;
            }

            if (borderColor) {
                this.strokeStyle = borderColor;
            }

            //if (typeof stroke == "undefined") {
            //	stroke = true;
            //}

            if (typeof radius === "undefined") {
                radius = 5;
            }

            this.lineWidth = borderThickness;

            this.beginPath();
            this.moveTo(x + radius, y);
            this.lineTo(x + width - radius, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius);
            this.lineTo(x + width, y + height - radius);
            this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            this.lineTo(x + radius, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius);
            this.lineTo(x, y + radius);
            this.quadraticCurveTo(x, y, x + radius, y);
            this.closePath();

            if (backgroundColor) {
                this.fill();
            }

            if (borderColor && borderThickness > 0) {
                this.stroke();
            }
        };
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    function compareDataPointX(dataPoint1, dataPoint2) {
        return dataPoint1.x - dataPoint2.x;
    }

    function intToHexColorString(num) {
        var r = ((num & 0xFF0000) >> 16).toString(16);
        var g = ((num & 0x00FF00) >> 8).toString(16);
        var b = ((num & 0x0000FF) >> 0).toString(16);

        r = r.length < 2 ? "0" + r : r;
        g = g.length < 2 ? "0" + g : g;
        b = b.length < 2 ? "0" + b : b;

        return "#" + r + g + b;
    }

    function RGBToInt(r, g, b) {
        var num = (r << 16) | (g << 8) | (b);

        return num;
    }

    function intToRGB(num) {
        var rgb = [];
        var r = ((num & 0xFF0000) >> 16);
        var g = ((num & 0x00FF00) >> 8);
        var b = ((num & 0x0000FF) >> 0);

        //r = r.length < 2 ? "0" + r : r;
        //g = g.length < 2 ? "0" + g : g;
        //b = b.length < 2 ? "0" + b : b;

        rgb[0] = r;
        rgb[1] = g;
        rgb[2] = b;

        return rgb;
    }

    var fontHeightInPixels = {};
    var textMeasureEl = null;
    function getFontHeightInPixels(fontFamily, fontSize, fontWeight) {

        //return fontSize;

        fontWeight = fontWeight || "normal";

        var entry = fontFamily + "_" + fontSize + "_" + fontWeight;
        var height = fontHeightInPixels[entry];

        if (isNaN(height)) {
            try {
                var style = "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;" + "font-family:" + fontFamily + "; " + "font-size:" + fontSize + "px; font-weight:" + fontWeight + ";";
                //console.log(style);
                if (!textMeasureEl) {
                    var body = document.body;
                    textMeasureEl = document.createElement("span");
                    textMeasureEl.innerHTML = "";
                    var textNode = document.createTextNode("Mpgyi");
                    textMeasureEl.appendChild(textNode);
                    body.appendChild(textMeasureEl);
                }

                textMeasureEl.style.display = "";
                textMeasureEl.setAttribute("style", style);

                height = Math.round(textMeasureEl.offsetHeight);
                textMeasureEl.style.display = "none";
                //body.removeChild(tempDiv);

                //if (window.console)
                //	window.console.log(fontSize + ": " + height);
            }
            catch (e) {
                height = Math.ceil(fontSize * 1.1);
            }

            height = Math.max(height, fontSize);

            fontHeightInPixels[entry] = height;
        }

        return height;
    }

    //userCapture is optional. Defaults to false
    function addEvent(obj, eventType, fn, useCapture) {
        if (obj.addEventListener) {
            obj.addEventListener(eventType, fn, useCapture || false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent("on" + eventType, function (e) {
                e = e || window.event;
                e.preventDefault = e.preventDefault || function () { e.returnValue = false; };
                e.stopPropagation = e.stopPropagation || function () { e.cancelBubble = true; };
                fn.call(obj, e);
            });
        } else
            return false;
    }

    //#region formatting functions/methods
    var dateFormat = function () {
        var reg = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;

        var defDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var defShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        var defMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var defShortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;

        return function (dt, formatString, cultureInfo) {

            var days = cultureInfo ? cultureInfo.days : defDays;
            var months = cultureInfo ? cultureInfo.months : defMonths;

            var shortDays = cultureInfo ? cultureInfo.shortDays : defShortDays;
            var shortMonths = cultureInfo ? cultureInfo.shortMonths : defShortMonths;

            var result = "";
            var utc = false;

            dt = dt && dt.getTime ? dt : dt ? new Date(dt) : new Date;
            if (isNaN(dt)) throw SyntaxError("invalid date");

            if (formatString.slice(0, 4) === "UTC:") {
                formatString = formatString.slice(4);
                utc = true;
            }

            var pre = utc ? "getUTC" : "get";
            var date = dt[pre + "Date"]();
            var day = dt[pre + "Day"]();
            var month = dt[pre + "Month"]();
            var year = dt[pre + "FullYear"]();
            var hours = dt[pre + "Hours"]();
            var minutes = dt[pre + "Minutes"]();
            var seconds = dt[pre + "Seconds"]();
            var milliseconds = dt[pre + "Milliseconds"]();
            var offset = utc ? 0 : dt.getTimezoneOffset();

            result = formatString.replace(reg, function (key) {

                switch (key) {

                    case "D":
                        return date;
                    case "DD":
                        return pad(date, 2);
                    case "DDD":
                        return shortDays[day];
                    case "DDDD":
                        return days[day];


                    case "M":
                        return month + 1;
                    case "MM":
                        return pad(month + 1, 2);
                    case "MMM":
                        return shortMonths[month];
                    case "MMMM":
                        return months[month];


                    case "Y":
                        return parseInt(String(year).slice(-2));
                    case "YY":
                        return pad(String(year).slice(-2), 2);
                    case "YYY":
                        return pad(String(year).slice(-3), 3);
                    case "YYYY":
                        return pad(year, 4);


                    case "h":
                        return hours % 12 || 12;
                    case "hh":
                        return pad(hours % 12 || 12, 2);


                    case "H":
                        return hours;
                    case "HH":
                        return pad(hours, 2);

                    case "m":
                        return minutes;
                    case "mm":
                        return pad(minutes, 2);


                    case "s":
                        return seconds;
                    case "ss":
                        return pad(seconds, 2);

                    case "f":
                        return String(milliseconds).slice(0, 1);
                    case "ff":
                        return pad(String(milliseconds).slice(0, 2), 2);
                    case "fff":
                        return pad(String(milliseconds).slice(0, 3), 3);


                    case "t":
                        return hours < 12 ? "a" : "p";
                    case "tt":
                        return hours < 12 ? "am" : "pm";
                    case "T":
                        return hours < 12 ? "A" : "P";
                    case "TT":
                        return hours < 12 ? "AM" : "PM";


                    case "K":
                        return utc ? "UTC" : (String(dt).match(timezone) || [""]).pop().replace(timezoneClip, ""); // Time Zone;
                    case "z":
                        return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60); // Hour Offset from UTC without padding
                    case "zz":
                        return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2); // Hour Offset from UTC with padding
                    case "zzz":
                        return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + pad(Math.abs(offset) % 60, 2); // Hour and Minute Offset from UTC with padding

                    default:
                        return key.slice(1, key.length - 1);

                }
            });

            return result;
        };
    }();


    var numberFormat = function (v, fs, cultureInfo) {
        if (v === null)
            return "";

        v = Number(v);
        var isNegative = v < 0 ? true : false;
        if (isNegative) v *= -1;

        var decimalSeparator = cultureInfo ? cultureInfo.decimalSeparator : ".";
        var digitGroupSeparator = cultureInfo ? cultureInfo.digitGroupSeparator : ",";

        var vString = "";
        fs = String(fs);
        var multiplier = 1;
        var temp;
        var result = "";

        var matches = "";
        var decimalPosition = -1;
        var fsBeforeDecimal = [];
        var fsAfterDecimal = [];
        var noPhBeforeDecimal = 0; // Number of Placeholders before Decimal
        var noPhAfterDecimal = 0; // Number of Placeholders after Decimal
        var noComma = 0;
        var isScientificNotation = false;
        var exponent = 0;

        matches = fs.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|‰|./g);
        //window.console.log(matches + " = " + matches.length);
        var match = null;

        for (var i = 0; matches && i < matches.length; i++) {
            match = matches[i];

            if (match === "." && decimalPosition < 0) {
                decimalPosition = i;
                continue;
            } else if (match === "%") {
                multiplier *= 100;
            } else if (match === "‰") {
                multiplier *= 1000;
                continue;
            } else if (match[0] === "," && match[match.length - 1] === ".") {
                multiplier /= Math.pow(1000, match.length - 1);
                decimalPosition = i + match.length - 1;
                continue;
            } else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0") {
                isScientificNotation = true;
            }

            if (decimalPosition < 0) {
                fsBeforeDecimal.push(match);
                if (match === "#" || match === "0")
                    noPhBeforeDecimal++;
                else if (match === ",")
                    noComma++;
            }
            else {
                fsAfterDecimal.push(match);
                if (match === "#" || match === "0")
                    noPhAfterDecimal++;
            }
        }

        if (isScientificNotation) {
            var integer = Math.floor(v);
            exponent = (integer === 0 ? "" : String(integer)).length - noPhBeforeDecimal;
            multiplier /= Math.pow(10, exponent);
        }

        v *= multiplier;

        if (decimalPosition < 0)
            decimalPosition = i;

        vString = v.toFixed(noPhAfterDecimal);
        var split = vString.split(".");
        //window.console.log(split);
        var vStringBeforeDecimal = (split[0] + "").split("");
        var vStringAfterDecimal = (split[1] + "").split("");

        if (vStringBeforeDecimal && vStringBeforeDecimal[0] === "0")
            vStringBeforeDecimal.shift();

        //window.console.log(fsBeforeDecimal + "<---------->" + fsAfterDecimal + " &        " + vStringBeforeDecimal + "<---------->" + vStringAfterDecimal);

        var noPhProcessed = 0;
        var noDigitsAdded = 0;
        var noCommaAdded = 0;
        var commaDistance = 0;
        var distanceFromLastComma = 0;

        while (fsBeforeDecimal.length > 0) {
            match = fsBeforeDecimal.pop();

            if (match === "#" || match === "0") {
                noPhProcessed++;

                if (noPhProcessed === noPhBeforeDecimal) {
                    var digits = vStringBeforeDecimal;
                    vStringBeforeDecimal = [];

                    if (match === "0") {
                        //var totalDigits = result.match(/[0-9]/g).length;
                        var toPad = noPhBeforeDecimal - noDigitsAdded - (digits ? digits.length : 0);

                        while (toPad > 0) {
                            digits.unshift("0");
                            toPad--;
                        }
                    }

                    while (digits.length > 0) {
                        result = digits.pop() + result;
                        distanceFromLastComma++;

                        if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && digits.length > 0)
                            result = digitGroupSeparator + result;
                    }

                    if (isNegative)
                        result = "-" + result;

                } else {
                    if (vStringBeforeDecimal.length > 0) {
                        result = vStringBeforeDecimal.pop() + result;
                        noDigitsAdded++;
                        distanceFromLastComma++;
                    }
                    else if (match === "0") {
                        result = "0" + result;
                        noDigitsAdded++;
                        distanceFromLastComma++;
                    }

                    if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && vStringBeforeDecimal.length > 0)
                        result = digitGroupSeparator + result;
                }


            } else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)) {
                if (exponent < 0)
                    match = match.replace("+", "").replace("-", "");
                else
                    match = match.replace("-", "");

                result += match.replace(/[0]+/, function ($0) {
                    return pad(exponent, $0.length);
                });


            } else {
                if (match === ",") {
                    noCommaAdded++;
                    commaDistance = distanceFromLastComma;
                    distanceFromLastComma = 0;

                    if (vStringBeforeDecimal.length > 0)
                        result = digitGroupSeparator + result;
                } else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))) {
                    result = match.slice(1, match.length - 1) + result;
                }
                else
                    result = match + result;
            }
        }

        var charCount = 0;
        var resultAfterDecimal = "";
        var addDecimalSeparator = false;

        while (fsAfterDecimal.length > 0) {
            match = fsAfterDecimal.shift();

            if (match === "#" || match === "0") {
                if (vStringAfterDecimal.length > 0 && Number(vStringAfterDecimal.join("")) !== 0) {
                    resultAfterDecimal += vStringAfterDecimal.shift();
                    addDecimalSeparator = true;
                }
                else if (match === "0") {
                    resultAfterDecimal += "0";
                    addDecimalSeparator = true;
                }
            } else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))) {
                resultAfterDecimal += match.slice(1, match.length - 1);
                //addDecimalSeparator = true;
            } else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)) {
                if (exponent < 0)
                    match = match.replace("+", "").replace("-", "");
                else
                    match = match.replace("-", "");
                resultAfterDecimal += match.replace(/[0]+/, function ($0) {
                    return pad(exponent, $0.length);
                });
            } else {
                resultAfterDecimal += match;
                //addDecimalSeparator = true;
            }
        }

        result += (addDecimalSeparator ? decimalSeparator : "") + resultAfterDecimal;
        //window.console.log(result);
        return result;
    };

    //#endregion formatting functions/methods

    function getObjectId(x, y, ctx) {
        x *= devicePixelBackingStoreRatio;
        y *= devicePixelBackingStoreRatio;
        var pixels = ctx.getImageData(x, y, 2, 2).data;
        var isObject = true;

        for (var i = 0; i < 4; i++) {

            if (pixels[i] !== pixels[i + 4] | pixels[i] !== pixels[i + 8] | pixels[i] !== pixels[i + 12]) {
                isObject = false;
                break;
            }
        }

        if (isObject) {
            return RGBToInt(pixels[0], pixels[1], pixels[2]);
        } else {
            return 0;
        }

        //window.console.log(pixels);
    }

    //extracts mouse coordinates from the event parameters
    var getMouseCoordinates = function (ev) {
        var x = 0;
        var y = 0;

        ev = ev || window.event;

        if (ev.offsetX || ev.offsetX === 0) {
            x = ev.offsetX;
            y = ev.offsetY;
        } else if (ev.layerX || ev.layerX == 0) { // Firefox
            x = ev.layerX;
            y = ev.layerY;
        }
        else {
            x = ev.pageX - ev.target.offsetLeft;
            y = ev.pageY - ev.target.offsetTop;
        }

        return { x: x, y: y };
    };

    function getFontString(prefix, object, fallbackObject) {
        var fontString = "";

        var fontStyleString = prefix ? prefix + "FontStyle" : "fontStyle";
        var fontWeightString = prefix ? prefix + "FontWeight" : "fontWeight";
        var fontSizeString = prefix ? prefix + "FontSize" : "fontSize";
        var fontFamilyString = prefix ? prefix + "FontFamily" : "fontFamily";



        fontString += object[fontStyleString] ? object[fontStyleString] + " " : (fallbackObject && fallbackObject[fontStyleString]) ? (fallbackObject[fontStyleString] + " ") : "";
        fontString += object[fontWeightString] ? object[fontWeightString] + " " : (fallbackObject && fallbackObject[fontWeightString]) ? (fallbackObject[fontWeightString] + " ") : "";
        fontString += object[fontSizeString] ? object[fontSizeString] + "px " : (fallbackObject && fallbackObject[fontSizeString]) ? (fallbackObject[fontSizeString] + "px ") : "";


        var fontFamily = object[fontFamilyString] ? object[fontFamilyString] + "" : (fallbackObject && fallbackObject[fontFamilyString]) ? (fallbackObject[fontFamilyString] + "") : "";

        if (!isCanvasSupported && fontFamily) {
            var firstFontFamily = fontFamily.split(",")[0];

            if (firstFontFamily[0] !== "'" && firstFontFamily[0] !== "\"")
                firstFontFamily = "'" + firstFontFamily + "'";

            fontString += firstFontFamily;
        } else
            fontString += fontFamily;

        return fontString;
    }

    function getProperty(propertyName, object, fallbackObject) {

        var value = propertyName in object ? object[propertyName] : fallbackObject[propertyName];

        return value;
    }

    var optimizeForHiDPI = true;
    //optimizeForHiDPI = false;

    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = 1;
    var devicePixelBackingStoreRatio = optimizeForHiDPI ? devicePixelRatio / backingStoreRatio : 1;


    function setCanvasSize(canvas, width, height) {

        if (isCanvasSupported && !!optimizeForHiDPI) {
            var ctx = canvas.getContext("2d");
            backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
								ctx.mozBackingStorePixelRatio ||
								ctx.msBackingStorePixelRatio ||
								ctx.oBackingStorePixelRatio ||
								ctx.backingStorePixelRatio || 1;


            devicePixelBackingStoreRatio = devicePixelRatio / backingStoreRatio;

            canvas.width = width * devicePixelBackingStoreRatio;
            canvas.height = height * devicePixelBackingStoreRatio;

            if (devicePixelRatio !== backingStoreRatio) {

                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';

                ctx.scale(devicePixelBackingStoreRatio, devicePixelBackingStoreRatio);

            }

            //window.alert(backingStoreRatio);
            //window.alert(devicePixelRatio);

        } else {
            canvas.width = width;
            canvas.height = height;
        }

    }


    function createCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("class", "canvasjs-chart-canvas");

        setCanvasSize(canvas, width, height);

        if (!isCanvasSupported && typeof (G_vmlCanvasManager) !== "undefined") {
            G_vmlCanvasManager.initElement(canvas);
        }

        return canvas;
    }

    function exportCanvas(canvas, format, fileName, thisObj){
        console.log("Attempting to export"); 
        if (!canvas || !format || !fileName)
            return;
        console.log("Attempting to export1");

        
        var reset = false; 
        var context = canvas.getContext('2d');
        console.log(context); 

        var org_labelFontColor  = thisObj._options.axisX.labelFontColor;
        var org_titleFontColor  = thisObj._options.axisX.titleFontColor;
        var org_gridColor       = thisObj._options.axisX.gridColor;
        var org_labelFontColor  = thisObj._options.axisY.labelFontColor;
        var org_titleFontColor  = thisObj._options.axisY.titleFontColor;
        var org_gridColor       = thisObj._options.gridColor;
        var org_backgroundColor = thisObj._options.backgroundColor;
        
        
        var black       = "rgba(0,0,0,1.0)";
        var darkGray    = "rgba(0,0,0,.70)";
        var white       = "rgba(255,255,255,1.0)";
        var lightGray   = "rgba(255, 255, 255, 0.2)";
        var clear       = "rgba(255, 255, 255, 0.0)";

        //Change the Label colors to white/black
        thisObj._options.axisX.labelFontColor = black;  
        thisObj._options.axisX.titleFontColor = black;  
        thisObj._options.axisX.gridColor      = darkGray;  
        thisObj._options.axisY.labelFontColor = black; 
        thisObj._options.axisY.titleFontColor = black;  
        thisObj._options.axisY.gridColor      = darkGray;  
        thisObj._options.backgroundColor      = white; 
        thisObj.render(thisObj._options);
        canvas = thisObj.canvas; 
        reset = true; //Reset the colors 
            
          
            
            
            
        
     




        var fullFileName = fileName + "." + (format === "jpeg" ? "jpg" : format);
        var mimeType = "image/" + format;
        var img = canvas.toDataURL(mimeType);
        console.log(img); 
        var saved = false;

        var downloadLink = document.createElement("a");
        downloadLink.download = fullFileName;
        downloadLink.href = img;
        downloadLink.target = "_blank";
        var e;


        if (typeof (Blob) !== "undefined" && !!new Blob()) {

            //alert("blob");
            var imgData = img.replace(/^data:[a-z/]*;base64,/, '');

            var byteString = atob(imgData);
            var buffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(buffer);
            for (var i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }

            var blob = new Blob([buffer], { type: "image/" + format });

            // Save the blob
            try {
                window.navigator.msSaveBlob(blob, fullFileName);
                saved = true;
            }
            catch (e) {
                downloadLink.dataset.downloadurl = [mimeType, downloadLink.download, downloadLink.href].join(':');
                downloadLink.href = window.URL.createObjectURL(blob);
            }
        }

        if (!saved) {

            try {

                event = document.createEvent("MouseEvents");

                event.initMouseEvent("click", true, false, window,
								 0, 0, 0, 0, 0, false, false, false,
								 false, 0, null);

                if (downloadLink.dispatchEvent) {
                    //alert("dispatchEvent");
                    downloadLink.dispatchEvent(event);
                }
                else if (downloadLink.fireEvent) {
                    //alert("fireEvent");
                    downloadLink.fireEvent("onclick");
                }

            } catch (e) {
                var win = window.open();
                //alert("<IE10");
                //window.console.log("IE");
                win.document.write("<img src='" + img + "'></img><div>Please right click on the image and save it to your device</div>");
                win.document.close();
            }
        }

        
        //Revert to original colors 
       
        thisObj._options.axisX.labelFontColor     = org_labelFontColor;  
        thisObj._options.axisX.titleFontColor     = org_titleFontColor;  
        thisObj._options.axisX.gridColor          = org_gridColor;  
        thisObj._options.axisY.labelFontColor     = org_labelFontColor; 
        thisObj._options.axisY.titleFontColor     = org_titleFontColor;  
        thisObj._options.axisY.gridColor          = org_gridColor;  
        thisObj._options.backgroundColor          = org_backgroundColor; 
        thisObj.render(thisObj._options);






          
          
               
          
          
                   
    }

    var base64Images = {
        reset: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAKRSURBVEiJrdY/iF1FFMfxzwnZrGISUSR/JLGIhoh/QiRNBLWxMLIWEkwbgiAoFgoW2mhlY6dgpY2IlRBRxBSKhSAKIklWJRYuMZKAhiyopAiaTY7FvRtmZ+/ed9/zHRjezLw5v/O9d86cuZGZpmURAfdn5o9DfdZNLXpjz+LziPgyIl6MiG0jPTJzZBuyDrP4BVm0P/AKbljTb4ToY/gGewYA7KyCl+1b3DUYANvwbiHw0gCAGRzBOzjTAXEOu0cC4Ch+r5x/HrpdrcZmvIDFSucMtnYCYC++6HmNDw8FKDT34ETrf639/azOr5vwRk/g5fbeuABtgC04XWk9VQLciMP4EH/3AFzErRNC7MXlQmsesSoHsGPE23hmEoBW+61K66HMXFmIMvN8myilXS36R01ub+KfYvw43ZXwYDX+AHP4BAci4pFJomfmr/ihmNofESsBImJGk7mlncrM45n5JPbhz0kAWpsv+juxaX21YIPmVJS2uNzJMS6ZNexC0d+I7fUWXLFyz2kSZlpWPvASlmqAf/FXNXf3FAF2F/1LuFifAlionB6dRuSI2IwHi6lzmXmp6xR8XY0fiIh7psAwh+3FuDkRHQVjl+a8lkXjo0kLUKH7XaV5oO86PmZ1FTzyP4K/XGl9v/zwfbW7BriiuETGCP5ch9bc9f97HF/vcFzCa5gdEPgWq+t/4v0V63oE1uF4h0DiFJ7HnSWMppDdh1dxtsPvJ2wcBNAKbsJXa0Ck5opdaBPsRNu/usba09i1KsaAVzmLt3sghrRjuK1Tf4xkegInxwy8gKf7dKMVH2QRsV5zXR/Cftyu+aKaKbbkQrsdH+PTzLzcqzkOQAVzM+7FHdiqqe2/YT4zF/t8S/sPmawyvC974vcAAAAASUVORK5CYII="
        },
        pan: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJVSURBVFiFvZe7a1RBGMV/x2hWI4JpfKCIiSBKOoOCkID/wP4BFqIIFkE02ChIiC8QDKlSiI3YqRBsBVGwUNAUdiIEUgjiAzQIIsuKJsfizsXr5t7d+8jmwLDfzHz3nLOzc7+ZxTZlGyDgZiWOCuJ9wH2gCUyuqQFgF/AGcKJNrYkBYBj40CIet+muGQi/96kM4WS7C/Tm5VUg7whJg8BkEGkCR4BDYfodsADUgP6wErO5iCtswsuJb32hdbXy8qzL5TIdmzJinHdZoZIBZcSFkGlAKs1Z3YCketZcBtouuaQNkrblMiBpBrhme7mAgU4wMCvpcFsDkq4C54DFVRTH9h+i6vlE0r5UA5ImgCuh28jB28iIs7BIVCOeStoZD64P4uPAjUTygKSx2FsK2TIwkugfk9Qkfd/E+yMWHQCeSRqx/R3gOp3LazfaS2C4B5gHDgD7U9x3E3uAH7KNpC3AHHAwTL4FHgM9GQ8vAaPA0dB/Abxqk2/gBLA9MXba9r1k/d4LfA3JtwueBeM58ucS+edXnAW23wP10N3advEi9CXizTnyN4bPS7Zn4sH/dq3t18AY4e1YLYSy3g/csj2VnFshZPuOpOeSKHCodUINuGj7YetE6je1PV9QoNPJ9StNHKodx7nRbiWrGHBGXAi5DUiqtQwtpcWK0Jubt8CltA5MEV1IfwO7+VffPwGfia5m34CT4bXujIIX0Qna1/cGMNqV/wUJE2czxD8CQ4X5Sl7Jz7SILwCDpbjKPBRMHAd+EtX4HWV5Spdc2w8kDQGPbH8py/MXMygM69/FKz4AAAAASUVORK5CYII="
        },
        zoom: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMqSURBVFiFvdfbj91TFMDxz57U6GUEMS1aYzyMtCSSDhWjCZMInpAI3khE/QHtgzdRkXgSCS8SES9epKLi0oRKNETjRahREq2KS1stdRujtDPtbA97n5zdn9+5zJxTK9k5v3POXmt991p7r71+IcaoGwkhTOIebMRqzOBTvIG3Y4zTXRmqSoyx5cAKbMJOHMFJnMZ8/jyFaXyMR7G6nb1aH22cP4BvcBxziG3GKfyTIR9D6BYg1KUghPBCDveFlb/24Av8iuUYw41YVsz5G7uxKcZ4aMEpwGt5NY3V/YbHsQ6rcAHOw/kYxigewr5CZw4fYGxBKcCLOFEYehXrMdRhr5yLETxVScsOLOkKAPfn1TYMPIvLFrShUlS2FDZm8XRHACzFAWl3R2xbqPMCYhmeLCAOYEMngAczbcTvuHYxzguIy/FesR9e6gSwU/OoPYHBHgHgviIKX2Flq7k34KhmcVnbi/PC8JX4MgMcxb118wZwdz5aISscqx7VRcox7MrPQ7i+btIAJrAkf9+bI9EPmZY2IAxiTSuAldLq4Y9+AcSUh78KP0tbAcwU35cXMD1JCIFUoGiehlqAz6TNB1f1C0DK+0h+nsNPrQC2a4bqGmlD9kOGcWt+Po6pVgDvSxfJaSkFd4UQBvoAsBYbCoB3a2flM7slA0R8iyt6rAFDeDPbm8eOTpVwGD9qVq7nLbIaZnmksPU1JtsCZMXNmpdRxFasWITzh6Xj3LCzra1OxcD2QjHiGVzdpfORnMqZio2PcF23ABdJF1Np4BPptlyPi6WzPYBzpJZtHe7A6xW9cnyP8TqA//SEIYRL8Bxul7rihvwgtVn78WcGGZXa9HGd5TDujDHuOePXNiHdKjWgZX/YbsxLx/ktqbjVzTlcjUSnvI5JrdlUVp6WesZZ6R1hRrpq9+EVTGS9jTjYAuKIouGpbcurEkIYxC051KNSamazsc+xK8b4S0VnEi/j0hqTP+M27O258egQwZuzs7pI7Mf4WQXIEDc5s9sux+5+1Py2EmP8UOq6GvWhIScxfdYjUERiAt9Jd84J6a16zf8JEKT3yCm8g1UxRv8CC4pyRhzR1uUAAAAASUVORK5CYII="
        },
        menu: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTUvMTTPsvU0AAAAP0lEQVRIie2SMQoAIBDDUvH/X667g8sJJ9KOhYYOkW0qGaU1MPdC0vGSbV19EACo3YMPAFH5BUBUjsqfAPpVXtNgGDfxEDCtAAAAAElFTkSuQmCC"
        }
    }

    function setButtonState(chart, button, state) {
        if (button.getAttribute("state") !== state) {

            button.setAttribute("state", state);
            button.setAttribute("type", 'button');
            button.style.position = "relative";
            button.style.margin = "0px 0px 0px 0px";
            button.style.padding = "3px 4px 0px 4px";
            button.style.cssFloat = "left";
            button.setAttribute("title", chart._cultureInfo[state + "Text"]);
            button.innerHTML = "<img style='height:16px;' src='" + base64Images[state].image + "' alt='" + chart._cultureInfo[state + "Text"] + "' />";
        }
    }

    function show() {

        var element = null;

        for (var i = 0; i < arguments.length; i++) {
            element = arguments[i];
            if (element.style)
                element.style.display = "inline";
        }
    }

    function hide() {

        var element = null;

        for (var i = 0; i < arguments.length; i++) {
            element = arguments[i];
            if (element && element.style)
                element.style.display = "none";
        }
    }

    //#endregion Static Methods & variables

    //#region Class Definitions

    //#region Class CanvasJSObject
    function CanvasJSObject(defaultsKey, options, theme) {
        this._defaultsKey = defaultsKey;

        var currentThemeOptions = {};

        if (theme && themes[theme] && themes[theme][defaultsKey])
            currentThemeOptions = themes[theme][defaultsKey];

        this._options = options ? options : {};
        this.setOptions(this._options, currentThemeOptions);
    }
    CanvasJSObject.prototype.setOptions = function (options, currentThemeOptions) {

        if (!defaultOptions[this._defaultsKey]) {
            if (isDebugMode && window.console)
                console.log("defaults not set");
        }
        else {
            var defaults = defaultOptions[this._defaultsKey];

            for (var prop in defaults) {
                if (options && prop in options)
                    this[prop] = options[prop];
                else if (currentThemeOptions && prop in currentThemeOptions)
                    this[prop] = currentThemeOptions[prop];
                else this[prop] = defaults[prop];

                //if (typeof this[prop] === "function") {
                //    alert("function");
                //    this[prop] = this[prop]();
                //}
            }
        }
    };

    // Update options. Returns true if changed or else false
    CanvasJSObject.prototype.updateOption = function (prop) {

        if (!defaultOptions[this._defaultsKey] && isDebugMode && window.console)
            console.log("defaults not set");

        var defaults = defaultOptions[this._defaultsKey];
        var theme = this._options.theme ? this._options.theme : (this.chart && this.chart._options.theme) ? this.chart._options.theme : "theme1";

        var currentThemeOptions = {};
        var newValue = this[prop];

        if (theme && themes[theme] && themes[theme][this._defaultsKey])
            currentThemeOptions = themes[theme][this._defaultsKey];

        if (prop in defaults) {
            if (prop in this._options)
                newValue = this._options[prop];
            else if (currentThemeOptions && prop in currentThemeOptions)
                newValue = currentThemeOptions[prop];
            else newValue = defaults[prop];
        }

        if (newValue === this[prop])
            return false;

        this[prop] = newValue;
        return true;
    }

    //Stores values in _oldOptions so that it can be tracked for any changes
    CanvasJSObject.prototype.trackChanges = function (option) {
        if (!this._options._oldOptions)
            this._options._oldOptions = {};

        this._options._oldOptions[option] = this._options[option];
    };

    CanvasJSObject.prototype.isBeingTracked = function (option) {
        if (!this._options._oldOptions)
            this._options._oldOptions = {};

        if (this._options._oldOptions[option])
            return true;
        else
            return false;
    };

    CanvasJSObject.prototype.hasOptionChanged = function (option) {
        if (!this._options._oldOptions)
            this._options._oldOptions = {};

        //if (!this._options._oldOptions[option])
        //    this._options._oldOptions[option] = null;

        var hasChanged = !(this._options._oldOptions[option] === this._options[option]);

        return hasChanged;
    };
    //#endregion Class CanvasJSObject

    //#region Class Chart
    function Chart(containerId, options, publicChartReference) {

        this._publicChartReference = publicChartReference;

        options = options || {};

        Chart.parent.constructor.call(this, "Chart", options, options.theme ? options.theme : "theme1");

        var _this = this;


        this._containerId = containerId;
        this._objectsInitialized = false;
        this.ctx = null;
        this.overlaidCanvasCtx = null;
        this._indexLabels = [];
        this._panTimerId = 0;
        this._lastTouchEventType = "";
        this._lastTouchData = null;
        this.isAnimating = false;
        this.renderCount = 0;
        this.animatedRender = false;
        this.disableToolTip = false;


        this.panEnabled = false;
        this._defaultCursor = "default";
        this.plotArea = { canvas: null, ctx: null, x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
        this._dataInRenderedOrder = [];

        this._container = typeof (this._containerId) === "string" ? document.getElementById(this._containerId) : this._containerId;

        if (!this._container) {
            if (window.console)
                window.console.log("CanvasJS Error: Chart Container with id \"" + this._containerId + "\" was not found");
            return;
        }

        this._container.innerHTML = "";

        var width = 0;
        var height = 0;

        if (this._options.width)
            width = this.width;
        else
            width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

        if (this._options.height)
            height = this.height;
        else
            height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

        this.width = width;
        this.height = height;

        this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

        this._canvasJSContainer = document.createElement("div");
        this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container");

        this._canvasJSContainer.style.position = "relative";
        this._canvasJSContainer.style.textAlign = "left";
        this._canvasJSContainer.style.cursor = "auto";
        if (!isCanvasSupported) {
            this._canvasJSContainer.style.height = "0px";//In IE6 toolTip doesn't show at proper position if not set.
        }
        this._container.appendChild(this._canvasJSContainer);


        this.canvas = createCanvas(width, height);

        this.canvas.style.position = "absolute";
        if (this.canvas.getContext) {
            //try {
            //	this.canvas.style.background = this.backgroundColor;
            //} catch (e) { }
            this._canvasJSContainer.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            this.ctx.textBaseline = "top";
            extendCtx(this.ctx);
        } else
            return;

        //this.canvas.style.cursor = "pointer";

        if (!isCanvasSupported) {
            this.plotArea.canvas = createCanvas(width, height);
            this.plotArea.canvas.style.position = "absolute";
            this.plotArea.canvas.setAttribute("class", "plotAreaCanvas");
            this._canvasJSContainer.appendChild(this.plotArea.canvas);

            this.plotArea.ctx = this.plotArea.canvas.getContext("2d");
        } else {
            this.plotArea.ctx = this.ctx;
        }

        this.overlaidCanvas = createCanvas(width, height);
        this.overlaidCanvas.style.position = "absolute";
        this._canvasJSContainer.appendChild(this.overlaidCanvas);
        this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d");
        this.overlaidCanvasCtx.textBaseline = "top";

        this._eventManager = new EventManager(this);

        addEvent(window, "resize", function () {
            //this._container.addEventListener("DOMSubtreeModified", function () {

            if (_this._updateSize())
                _this.render();
        });


        this._toolBar = document.createElement("div");
        this._toolBar.setAttribute("class", "canvasjs-chart-toolbar");
        this._toolBar.style.cssText = "position: absolute; right: 2px; top: 0px;";
        this._canvasJSContainer.appendChild(this._toolBar);


        this.bounds = { x1: 0, y1: 0, x2: this.width, y2: this.height };

        addEvent(this.overlaidCanvas, 'click', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mousemove', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mouseup', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mousedown', function (e) {
            _this._mouseEventHandler(e);
            hide(_this._dropdownMenu);
        });

        addEvent(this.overlaidCanvas, 'mouseout', function (e) {
            _this._mouseEventHandler(e);
        });


        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function (e) {
            _this._touchEventHandler(e);
        });

        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : 'touchmove', function (e) {
            _this._touchEventHandler(e);
        });

        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : 'touchend', function (e) {
            _this._touchEventHandler(e);
        });

        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : 'touchcancel', function (e) {
            _this._touchEventHandler(e);
        });

        if (!this._creditLink) {
            this._creditLink = document.createElement("a");
            this._creditLink.setAttribute("class", "canvasjs-chart-credit");
            this._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:3px;top:" + (this.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif");

            this._creditLink.setAttribute("tabIndex", -1);

            this._creditLink.setAttribute("target", "_blank");
        }

        this._toolTip = new ToolTip(this, this._options.toolTip, this.theme);

        this.layoutManager = new LayoutManager(this);
        this.data = null;
        this.axisX = null;
        this.axisY = null;
        this.axisY2 = null;



        this.sessionVariables = {
            axisX: {
                internalMinimum: null,
                internalMaximum: null
            },
            axisY: {
                internalMinimum: null,
                internalMaximum: null
            },
            axisY2: {
                internalMinimum: null,
                internalMaximum: null
            }
        };
    }

    extend(Chart, CanvasJSObject);

    //Update Chart Properties
    Chart.prototype._updateOptions = function () {
        var _this = this;

        this.updateOption("width");
        this.updateOption("height");


        this.updateOption("theme");

        if (this.updateOption("colorSet"))
            this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

        this.updateOption("backgroundColor");
        if (!this.backgroundColor)
            this.backgroundColor = "rgba(0,0,0,0)";

        this.updateOption("culture");
        this._cultureInfo = new CultureInfo(this, this._options.culture);

        this.updateOption("animationEnabled");
        this.animationEnabled = this.animationEnabled && isCanvasSupported;

        //Need to check this._options.zoomEnabled because this.zoomEnabled is used internally to keep track of state - and hence changes.
        if (this._options.zoomEnabled) {

            if (!this._zoomButton) {

                hide(this._zoomButton = document.createElement("button"));

                setButtonState(this, this._zoomButton, "pan");

                this._toolBar.appendChild(this._zoomButton);
                addEvent(this._zoomButton, "click", function () {
                    if (_this.zoomEnabled) {
                        _this.zoomEnabled = false;
                        _this.panEnabled = true;

                        setButtonState(_this, _this._zoomButton, "zoom");

                    } else {
                        _this.zoomEnabled = true;
                        _this.panEnabled = false;

                        setButtonState(_this, _this._zoomButton, "pan");
                    }

                    _this.render();
                });
            }


            if (!this._resetButton) {
                hide(this._resetButton = document.createElement("button"));
                setButtonState(this, this._resetButton, "reset");
                this._toolBar.appendChild(this._resetButton);

                addEvent(this._resetButton, "click", function () {

                    _this._toolTip.hide();

                    if (_this.zoomEnabled || _this.panEnabled) {
                        _this.zoomEnabled = true;
                        _this.panEnabled = false;
                        setButtonState(_this, _this._zoomButton, "pan");

                        _this._defaultCursor = "default";
                        _this.overlaidCanvas.style.cursor = _this._defaultCursor;
                    } else {
                        _this.zoomEnabled = false;
                        _this.panEnabled = false;
                    }

                    if (_this._options.axisX && _this._options.axisX.minimum)
                        _this.sessionVariables.axisX.internalMinimum = _this._options.axisX.minimum;
                    else
                        _this.sessionVariables.axisX.internalMinimum = null;

                    if (_this._options.axisX && _this._options.axisX.maximum)
                        _this.sessionVariables.axisX.internalMaximum = _this._options.axisX.maximum;
                    else
                        _this.sessionVariables.axisX.internalMaximum = null;

                    _this.resetOverlayedCanvas();

                    hide(_this._zoomButton, _this._resetButton);

                    _this.render();
                });

                this.overlaidCanvas.style.cursor = _this._defaultCursor;
            }

            if (!this.zoomEnabled && !this.panEnabled) {
                if (!this._zoomButton) {
                    this.zoomEnabled = true;
                    this.panEnabled = false;
                } else {

                    if (_this._zoomButton.getAttribute("state") === _this._cultureInfo.zoomText) {
                        this.panEnabled = true;
                        this.zoomEnabled = false;
                    }
                    else {
                        this.zoomEnabled = true;
                        this.panEnabled = false;
                    }

                    show(_this._zoomButton, _this._resetButton);
                }
            }



        } else {
            this.zoomEnabled = false;
            this.panEnabled = false;
        }

        // Update this.exportFileName.
        if (typeof (this._options.exportFileName) !== "undefined") {
            this.exportFileName = this._options.exportFileName;
        }
        // Update this.exportEnabled.
        if (typeof (this._options.exportEnabled) !== "undefined") {
            this.exportEnabled = this._options.exportEnabled;
        }

        if (this._menuButton) {
            if (this.exportEnabled)
                show(this._menuButton);
            else
                hide(this._menuButton);
        } else if (this.exportEnabled && isCanvasSupported) {
            this._menuButton = document.createElement("button");
            setButtonState(this, this._menuButton, "menu");
            this._toolBar.appendChild(this._menuButton);

            addEvent(this._menuButton, "click", function () {
                if (_this._dropdownMenu.style.display === "none") {

                    if (_this._dropDownCloseTime && ((new Date()).getTime() - _this._dropDownCloseTime.getTime() <= 500))
                        return;

                    _this._dropdownMenu.style.display = "block";
                    _this._menuButton.blur();
                    _this._dropdownMenu.focus();
                }

            }, true);
        }


        if (!this._dropdownMenu && this.exportEnabled && isCanvasSupported) {
            this._dropdownMenu = document.createElement("div");
            this._dropdownMenu.setAttribute("tabindex", -1);
            this._dropdownMenu.style.cssText = "position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 1px;top: 25px;min-width: 120px;outline: 0;border: 1px solid silver;font-size: 14px;font-family: Calibri, Verdana, sans-serif;padding: 5px 0px 5px 0px;text-align: left;background-color: #fff;line-height: 20px;box-shadow: 2px 2px 10px #888888;";
            _this._dropdownMenu.style.display = "none";
            this._toolBar.appendChild(this._dropdownMenu);

            addEvent(this._dropdownMenu, "blur", function () {
                hide(_this._dropdownMenu);

                _this._dropDownCloseTime = new Date();
            }, true);

            var exportOption = document.createElement("div");
            exportOption.style.cssText = "padding: 2px 15px 2px 10px"
            exportOption.innerHTML = this._cultureInfo.saveJPGText;
            this._dropdownMenu.appendChild(exportOption);

            addEvent(exportOption, "mouseover", function () {
                this.style.backgroundColor = "#EEEEEE";
            }, true);

            addEvent(exportOption, "mouseout", function () {
                this.style.backgroundColor = "transparent";
            }, true);

            addEvent(exportOption, "click", function () {
                exportCanvas(_this.canvas, "jpg", _this.exportFileName, _this);


                hide(_this._dropdownMenu);
            }, true);

            var exportOption = document.createElement("div");
            exportOption.style.cssText = "padding: 2px 15px 2px 10px"
            exportOption.innerHTML = this._cultureInfo.savePNGText;
            this._dropdownMenu.appendChild(exportOption);

            addEvent(exportOption, "mouseover", function () {
                this.style.backgroundColor = "#EEEEEE";
            }, true);

            addEvent(exportOption, "mouseout", function () {
                this.style.backgroundColor = "transparent";
            }, true);

            addEvent(exportOption, "click", function () {
                exportCanvas(_this.canvas, "png", _this.exportFileName, _this);


                hide(_this._dropdownMenu);
            }, true);
        }


        if (this._toolBar.style.display !== "none" && this._zoomButton) {

            this.panEnabled ? setButtonState(_this, _this._zoomButton, "zoom") : setButtonState(_this, _this._zoomButton, "pan");


            if (_this._resetButton.getAttribute("state") !== _this._cultureInfo.resetText)
                setButtonState(_this, _this._resetButton, "reset");
        }

        if (typeof (defaultOptions.Chart.creditHref) === "undefined") {
            this.creditHref = "";
            this.creditText = "";
        } else {
            var creditTextChanged = this.updateOption("creditText");
            var creditHrefChanged = this.updateOption("creditHref");
        }

        if (this.renderCount === 0 || (creditTextChanged || creditHrefChanged)) {
            this._creditLink.setAttribute("href", this.creditHref);
            this._creditLink.innerHTML = this.creditText;
        }

        if (this.creditHref && this.creditText) {
            if (!this._creditLink.parentElement)
                this._canvasJSContainer.appendChild(this._creditLink);
        }
        else if (this._creditLink.parentElement)
            this._canvasJSContainer.removeChild(this._creditLink);

        if (this._options.toolTip && this._toolTip._options !== this._options.toolTip)
            this._toolTip._options = this._options.toolTip

        this._toolTip.updateOption("enabled");
        this._toolTip.updateOption("shared");
        this._toolTip.updateOption("animationEnabled");
        this._toolTip.updateOption("borderColor");
        this._toolTip.updateOption("content");

    }

    Chart.prototype._updateSize = function () {
        var width = 0;
        var height = 0;

        if (this._options.width)
            width = this.width;
        else
            this.width = width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

        if (this._options.height)
            height = this.height;
        else
            this.height = height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

        if (this.canvas.width !== width * devicePixelBackingStoreRatio || this.canvas.height !== height * devicePixelBackingStoreRatio) {
            setCanvasSize(this.canvas, width, height);

            setCanvasSize(this.overlaidCanvas, width, height);
            setCanvasSize(this._eventManager.ghostCanvas, width, height);

            return true;
        }

        return false;
    }

    // initialize chart objects
    Chart.prototype._initialize = function () {
        ///<signature>
        ///<summary>Initializes Chart objects/state. Creates DataSeries class instance for each DataSeries provided by ther user. Sets the Axis Type based on the user data</summary>
        ///</signature>
        //this.width = this.width;

        if (!this._animator)
            this._animator = new Animator(this);
        else {
            this._animator.cancelAllAnimations();
        }

        this.disableToolTip = false;


        this.pieDoughnutClickHandler = null;
        //this._touchCurrentCoordinates = null;

        if (this.animationRequestId)
            this.cancelRequestAnimFrame.call(window, this.animationRequestId);

        this._updateOptions();

        this.animatedRender = isCanvasSupported && this.animationEnabled && (this.renderCount === 0);

        this._updateSize();

        //this._selectedColorSet = colorSets["colorSet2"];

        //this.ctx.clearRect(0, 0, this.width, this.height);
        this.clearCanvas();
        this.ctx.beginPath();

        this.axisX = null;
        this.axisY = null;
        this.axisY2 = null;
        this._indexLabels = [];
        this._dataInRenderedOrder = [];

        this._events = [];
        if (this._eventManager)
            this._eventManager.reset();

        this.plotInfo = {
            axisPlacement: null,
            axisXValueType: null,
            plotTypes: []//array of plotType: {type:"", axisYType: "primary", dataSeriesIndexes:[]}
        };

        this.layoutManager.reset();


        this.data = [];
        var dataSeriesIndex = 0;

        for (var series = 0; series < this._options.data.length; series++) {
            //for (series in this._options.data) {

            dataSeriesIndex++;

            if (!(!this._options.data[series].type || Chart._supportedChartTypes.indexOf(this._options.data[series].type) >= 0))
                continue;

            var dataSeries = new DataSeries(this, this._options.data[series], this.theme, dataSeriesIndex - 1, ++this._eventManager.lastObjectId);
            if (dataSeries.name === null)
                dataSeries.name = "DataSeries " + (dataSeriesIndex);

            if (dataSeries.color === null) {
                if (this._options.data.length > 1) {
                    dataSeries._colorSet = [this._selectedColorSet[dataSeries.index % this._selectedColorSet.length]];
                    dataSeries.color = this._selectedColorSet[dataSeries.index % this._selectedColorSet.length];
                } else {
                    if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area"
						|| dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
						|| dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea" || dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
                        dataSeries._colorSet = [this._selectedColorSet[0]];
                    }
                    else
                        dataSeries._colorSet = this._selectedColorSet;
                }
            } else {
                dataSeries._colorSet = [dataSeries.color];
            }

            if (dataSeries.markerSize === null) {
                if (((dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline") && dataSeries.dataPoints && dataSeries.dataPoints.length < this.width / 16) || dataSeries.type === "scatter") {
                    //if (dataSeries.type === "line") {
                    dataSeries.markerSize = 8;
                }
            }

            if ((dataSeries.type === "bubble" || dataSeries.type === "scatter") && dataSeries.dataPoints) {
                dataSeries.dataPoints.sort(compareDataPointX)
            }

            //if (dataSeries.markerBorderThickness === null && dataSeries.type === "scatter") {
            //    dataSeries.markerBorderThickness = 2;
            //}

            //if (dataSeries.markerType === null) {
            //    if (dataSeries.type === "line" & dataSeries.dataPoints.length < 500) {
            //        dataSeries.markerType = "circle";
            //    }
            //}

            this.data.push(dataSeries);

            var seriesAxisPlacement = dataSeries.axisPlacement;

            //if (isDebugMode && window.console)
            //    window.console.log(dataSeries.type);

            var errorMessage;

            if (seriesAxisPlacement === "normal") {

                if (this.plotInfo.axisPlacement === "xySwapped") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
                } else if (this.plotInfo.axisPlacement === "none") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
                } else if (this.plotInfo.axisPlacement === null)
                    this.plotInfo.axisPlacement = "normal";
            }
            else if (seriesAxisPlacement === "xySwapped") {

                if (this.plotInfo.axisPlacement === "normal") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or pie chart";
                } else if (this.plotInfo.axisPlacement === "none") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
                } else if (this.plotInfo.axisPlacement === null)
                    this.plotInfo.axisPlacement = "xySwapped";
            }
            else if (seriesAxisPlacement == "none") {

                if (this.plotInfo.axisPlacement === "normal") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or bar chart";
                } else if (this.plotInfo.axisPlacement === "xySwapped") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
                } else if (this.plotInfo.axisPlacement === null)
                    this.plotInfo.axisPlacement = "none";
            }

            if (errorMessage && window.console) {
                window.console.log(errorMessage);
                return;
            }
        }

        //if (isDebugMode && window.console) {
        //    window.console.log("xMin: " + this.plotInfo.viewPortXMin + "; xMax: " + this.plotInfo.viewPortXMax + "; yMin: " + this.plotInfo.yMin + "; yMax: " + this.plotInfo.yMax);
        //}

        this._objectsInitialized = true;
    }

    Chart._supportedChartTypes = ["line", "stepLine", "spline", "column", "area", "stepArea", "splineArea", "bar", "bubble", "scatter",
		"stackedColumn", "stackedColumn100", "stackedBar", "stackedBar100",
		"stackedArea", "stackedArea100",
		"candlestick",
		"ohlc",
		"rangeColumn",
		"rangeBar",
		"rangeArea",
		"rangeSplineArea",
		"pie", "doughnut", "funnel"
    ];

    //indexOf is not supported in IE8-
    if (!Chart._supportedChartTypes.indexOf) {
        Chart._supportedChartTypes.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
				 ? Math.ceil(from)
				 : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
					this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    Chart.prototype.render = function (options) {
        if (options)
            this._options = options;

        this._initialize();

        //Create Primary and Secondary axis and assign them to the series
        for (var i = 0; i < this.data.length; i++) {

            if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
                if (!this.data[i].axisYType || this.data[i].axisYType === "primary") {
                    if (!this.axisY) {

                        if (this.plotInfo.axisPlacement === "normal") {
                            this.axisY = new Axis(this, this._options.axisY, "axisY", "left");
                        }
                        else if (this.plotInfo.axisPlacement === "xySwapped") {
                            this.axisY = new Axis(this, this._options.axisY, "axisY", "bottom");
                        }
                    }
                    this.data[i].axisY = this.axisY;
                }
                else if (this.data[i].axisYType === "secondary") {
                    if (!this.axisY2) {
                        if (this.plotInfo.axisPlacement === "normal") {
                            this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "right");
                        }
                        else if (this.plotInfo.axisPlacement === "xySwapped") {
                            this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "top");
                        }
                    }
                    this.data[i].axisY = this.axisY2;
                }

                if (!this.axisX) {
                    if (this.plotInfo.axisPlacement === "normal") {
                        this.axisX = new Axis(this, this._options.axisX, "axisX", "bottom");
                    } else if (this.plotInfo.axisPlacement === "xySwapped") {
                        this.axisX = new Axis(this, this._options.axisX, "axisX", "left");
                    }
                }

                this.data[i].axisX = this.axisX;
            }
        }

        this._processData();// Categorises the dataSeries and calculates min, max and other values

        if (this._options.title) {
            this._title = new Title(this, this._options.title);
            this._title.render();
        }

        this.legend = new Legend(this, this._options.legend, this.theme);
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].showInLegend)
                this.legend.dataSeries.push(this.data[i]);
        }
        this.legend.render();

        //TBI: Revisit and check if the functionality is enough.
        if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
            var freeSpace = this.layoutManager.getFreeSpace();

            Axis.setLayoutAndRender(this.axisX, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
        } else if (this.plotInfo.axisPlacement === "none") {
            //In case of charts with axis this method is called inside setLayoutAndRender
            this.preparePlotArea();
        }
        else {
            return;
        }

        var animations = [];
        if (this.animatedRender) {
            var initialState = createCanvas(this.width, this.height);
            var initialStateCtx = initialState.getContext("2d");
            initialStateCtx.drawImage(this.canvas, 0, 0, this.width, this.height);
        }

        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];

            for (var j = 0; j < plotType.plotUnits.length; j++) {

                var plotUnit = plotType.plotUnits[j];
                var animationInfo = null;

                plotUnit.targetCanvas = null; //In case chart updates before the animation is complete, previous canvases need to be removed

                if (this.animatedRender) {
                    plotUnit.targetCanvas = createCanvas(this.width, this.height);
                    plotUnit.targetCanvasCtx = plotUnit.targetCanvas.getContext("2d");
                }

                if (plotUnit.type === "line")
                    animationInfo = this.renderLine(plotUnit);
                else if (plotUnit.type === "stepLine")
                    animationInfo = this.renderStepLine(plotUnit);
                else if (plotUnit.type === "spline")
                    animationInfo = this.renderSpline(plotUnit);
                else if (plotUnit.type === "column")
                    animationInfo = this.renderColumn(plotUnit);
                else if (plotUnit.type === "bar")
                    animationInfo = this.renderBar(plotUnit);
                else if (plotUnit.type === "area")
                    animationInfo = this.renderArea(plotUnit);
                else if (plotUnit.type === "stepArea")
                    animationInfo = this.renderStepArea(plotUnit);
                else if (plotUnit.type === "splineArea")
                    animationInfo = this.renderSplineArea(plotUnit);
                else if (plotUnit.type === "stackedColumn")
                    animationInfo = this.renderStackedColumn(plotUnit);
                else if (plotUnit.type === "stackedColumn100")
                    animationInfo = this.renderStackedColumn100(plotUnit);
                else if (plotUnit.type === "stackedBar")
                    animationInfo = this.renderStackedBar(plotUnit);
                else if (plotUnit.type === "stackedBar100")
                    animationInfo = this.renderStackedBar100(plotUnit);
                else if (plotUnit.type === "stackedArea")
                    animationInfo = this.renderStackedArea(plotUnit);
                else if (plotUnit.type === "stackedArea100")
                    animationInfo = this.renderStackedArea100(plotUnit);
                else if (plotUnit.type === "bubble")
                    animationInfo = animationInfo = this.renderBubble(plotUnit);
                else if (plotUnit.type === "scatter")
                    animationInfo = this.renderScatter(plotUnit);
                else if (plotUnit.type === "pie")
                    this.renderPie(plotUnit);
                else if (plotUnit.type === "doughnut")
                    this.renderPie(plotUnit);
                else if (plotUnit.type === "candlestick")
                    animationInfo = this.renderCandlestick(plotUnit);
                else if (plotUnit.type === "ohlc")
                    animationInfo = this.renderCandlestick(plotUnit);
                else if (plotUnit.type === "rangeColumn")
                    animationInfo = this.renderRangeColumn(plotUnit);
                else if (plotUnit.type === "rangeBar")
                    animationInfo = this.renderRangeBar(plotUnit);
                else if (plotUnit.type === "rangeArea")
                    animationInfo = this.renderRangeArea(plotUnit);
                else if (plotUnit.type === "rangeSplineArea")
                    animationInfo = this.renderRangeSplineArea(plotUnit);

                for (var k = 0; k < plotUnit.dataSeriesIndexes.length; k++) {
                    this._dataInRenderedOrder.push(this.data[plotUnit.dataSeriesIndexes[k]]);
                }

                if (this.animatedRender && animationInfo)
                    animations.push(animationInfo);
            }
        }

        if (this.animatedRender && this._indexLabels.length > 0) {
            var indexLabelCanvas = createCanvas(this.width, this.height);
            var indexLabelCanvasCtx = indexLabelCanvas.getContext("2d");
            animations.push(this.renderIndexLabels(indexLabelCanvasCtx));
        }

        var _this = this;

        if (animations.length > 0) {
            //var animationCount = 0;
            _this.disableToolTip = true;
            _this._animator.animate(200, _this.animationDuration, function (fractionComplete) {

                //console.log(fractionComplete);
                //animationCount++;

                _this.ctx.clearRect(0, 0, _this.width, _this.height);                
              //  _this.ctx.drawImage(initialState, 0, 0, _this.width * devicePixelBackingStoreRatio, _this.height * devicePixelBackingStoreRatio, 0, 0, _this.width, _this.height);                
                _this.ctx.drawImage(initialState, 0, 0, Math.floor(_this.width * devicePixelBackingStoreRatio), Math.floor(_this.height * devicePixelBackingStoreRatio), 0, 0, _this.width, _this.height);

                for (var l = 0; l < animations.length; l++) {

                    animationInfo = animations[l];

                    if (fractionComplete < 1 && typeof (animationInfo.startTimePercent) !== "undefined") {
                        if (fractionComplete >= animationInfo.startTimePercent) {
                            //animationInfo.animationCallback(AnimationHelper.easing.linear(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo);

                            animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo);
                        }
                    } else {

                        animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete, 0, 1, 1), animationInfo);
                    }
                }

            }, function () {

                animations = [];

                var count = 0;

                //Delete all render target canvases used for animation.
                for (var i = 0; i < _this.plotInfo.plotTypes.length; i++) {
                    var plotType = _this.plotInfo.plotTypes[i];

                    for (var j = 0; j < plotType.plotUnits.length; j++) {
                        var plotUnit = plotType.plotUnits[j];
                        plotUnit.targetCanvas = null;
                    }
                }

                initialState = null;
                _this.disableToolTip = false;
                //console.log("*********** Animation Complete - " + animationCount + " ***********");
            });
        } else {
            if (_this._indexLabels.length > 0)
                _this.renderIndexLabels();
        }

        this.attachPlotAreaEventHandlers();

        if (!this.zoomEnabled && !this.panEnabled && this._zoomButton && this._zoomButton.style.display !== "none") {
            hide(this._zoomButton, this._resetButton);
        }

        this._toolTip._updateToolTip();

        this.renderCount++;

        //if (window.console) {
        //    window.console.log(new Date().getTime() - dt);
        //}

        if (isDebugMode) {

            var _this = this;
            setTimeout(function () {
                var ghostCanvasCopy = document.getElementById("ghostCanvasCopy");

                if (ghostCanvasCopy) {
                    //console.log(ghostCanvasCopy.clientWidth);
                    setCanvasSize(ghostCanvasCopy, _this.width, _this.height);
                    var ghostCanvasCopyCtx = ghostCanvasCopy.getContext("2d");

                    //ghostCanvasCopyCtx.scale(1, 1);
                    //var imageData = this._eventManager.ghostCtx.getImageData(0, 0, this._container.clientWidth, this._container.clientHeight);
                    //this._eventManager.ghostCtx.drawImage(this._eventManager.ghostCanvas, 0, 0);
                    //this.ctx.drawImage(this._eventManager.ghostCanvas, 0, 0);

                    ghostCanvasCopyCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
                    //_this._canvasJSContainer.appendChild(_this._eventManager.ghostCanvas);
                    //_this.overlaidCanvasCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
                }
            }, 2000);
        }
    }

    Chart.prototype.attachPlotAreaEventHandlers = function () {

        //this._toolBar.style.display = "inline";

        this.attachEvent({
            context: this,
            chart: this,
            mousedown: this._plotAreaMouseDown,
            mouseup: this._plotAreaMouseUp,
            mousemove: this._plotAreaMouseMove,
            cursor: this.zoomEnabled ? "col-resize" : "move",
            cursor: this.panEnabled ? "move" : "default",
            capture: true,
            bounds: this.plotArea
        });

    }

    Chart.prototype.categoriseDataSeries = function () {
        var dataSeries = "";

        for (var i = 0; i < this.data.length; i++) {
            dataSeries = this.data[i]
            if (!dataSeries.dataPoints || dataSeries.dataPoints.length === 0 || !dataSeries.visible)
                continue;

            if (Chart._supportedChartTypes.indexOf(dataSeries.type) >= 0) {

                var plotType = null;
                var plotTypeExists = false;

                var plotUnit = null;
                var plotUnitExists = false;

                for (var j = 0; j < this.plotInfo.plotTypes.length; j++) {
                    if (this.plotInfo.plotTypes[j].type === dataSeries.type) {
                        plotTypeExists = true;
                        var plotType = this.plotInfo.plotTypes[j];
                        break;
                    }
                }

                if (!plotTypeExists) {
                    plotType = {
                        type: dataSeries.type,
                        totalDataSeries: 0,
                        plotUnits: []
                    };
                    this.plotInfo.plotTypes.push(plotType)
                }

                for (var j = 0; j < plotType.plotUnits.length; j++) {
                    if (plotType.plotUnits[j].axisYType === dataSeries.axisYType) {
                        plotUnitExists = true;
                        var plotUnit = plotType.plotUnits[j];
                        break;
                    }
                }

                if (!plotUnitExists) {
                    plotUnit = {
                        type: dataSeries.type,
                        previousDataSeriesCount: 0, //to be set next
                        index: plotType.plotUnits.length,
                        plotType: plotType,
                        axisYType: dataSeries.axisYType,
                        axisY: dataSeries.axisYType === "primary" ? this.axisY : this.axisY2,
                        axisX: this.axisX,
                        dataSeriesIndexes: [], //index of dataSeries
                        yTotals: []
                    }
                    plotType.plotUnits.push(plotUnit);
                }

                plotType.totalDataSeries++;

                plotUnit.dataSeriesIndexes.push(i);

                dataSeries.plotUnit = plotUnit;
            }
        }

        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];
            var previousDataSeriesCount = 0;

            for (var j = 0; j < plotType.plotUnits.length; j++) {

                plotType.plotUnits[j].previousDataSeriesCount = previousDataSeriesCount;

                previousDataSeriesCount += plotType.plotUnits[j].dataSeriesIndexes.length;
            }
        }
    }

    Chart.prototype.assignIdToDataPoints = function () {

        for (var i = 0; i < this.data.length; i++) {
            var dataSeries = this.data[i];

            if (!dataSeries.dataPoints)
                continue;

            var length = dataSeries.dataPoints.length;

            for (var j = 0; j < length; j++) {
                dataSeries.dataPointIds[j] = ++this._eventManager.lastObjectId;
            }
        }
    }

    Chart.prototype._processData = function () {
        this.assignIdToDataPoints();
        this.categoriseDataSeries();

        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];

            for (var j = 0; j < plotType.plotUnits.length; j++) {

                var plotUnit = plotType.plotUnits[j];

                if (plotUnit.type === "line" || plotUnit.type === "stepLine" || plotUnit.type === "spline" || plotUnit.type === "column" || plotUnit.type === "area" || plotUnit.type === "stepArea" || plotUnit.type === "splineArea" || plotUnit.type === "bar" || plotUnit.type === "bubble" || plotUnit.type === "scatter")
                    this._processMultiseriesPlotUnit(plotUnit);
                else if (plotUnit.type === "stackedColumn" || plotUnit.type === "stackedBar" || plotUnit.type === "stackedArea")
                    this._processStackedPlotUnit(plotUnit);
                else if (plotUnit.type === "stackedColumn100" || plotUnit.type === "stackedBar100" || plotUnit.type === "stackedArea100")
                    this._processStacked100PlotUnit(plotUnit);
                else if (plotUnit.type === "candlestick" || plotUnit.type === "ohlc" || plotUnit.type === "rangeColumn" || plotUnit.type === "rangeBar" || plotUnit.type === "rangeArea" || plotUnit.type === "rangeSplineArea")
                    this._processMultiYPlotUnit(plotUnit);
            }
        }

    }

    Chart.prototype._processMultiseriesPlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY;
        var isDateTime = false;


        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;


                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (dataPointY < axisYDataInfo.min)
                    axisYDataInfo.min = dataPointY;

                if (dataPointY > axisYDataInfo.max)
                    axisYDataInfo.max = dataPointY;


                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }

                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                if (dataPointY < axisYDataInfo.viewPortMin)
                    axisYDataInfo.viewPortMin = dataPointY;
                if (dataPointY > axisYDataInfo.viewPortMax)
                    axisYDataInfo.viewPortMax = dataPointY;
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }

        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
    }

    Chart.prototype._processStackedPlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;

        var dataPointX, dataPointY;
        var isDateTime = false;

        var dataPointYPositiveSums = [];
        var dataPointYNegativeSums = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                // Requird when no x values are provided 
                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;



                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }


                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                plotUnit.yTotals[dataPointX] = (!plotUnit.yTotals[dataPointX] ? 0 : plotUnit.yTotals[dataPointX]) + Math.abs(dataPointY);

                if (dataPointY >= 0) {
                    if (dataPointYPositiveSums[dataPointX])
                        dataPointYPositiveSums[dataPointX] += dataPointY;
                    else
                        dataPointYPositiveSums[dataPointX] = dataPointY;
                } else {
                    if (dataPointYNegativeSums[dataPointX])
                        dataPointYNegativeSums[dataPointX] += dataPointY;
                    else
                        dataPointYNegativeSums[dataPointX] = dataPointY;
                }
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }

        for (i in dataPointYPositiveSums) {

            if (isNaN(i)) {
                continue;
            }
            var ySum = dataPointYPositiveSums[i];

            if (ySum < axisYDataInfo.min)
                axisYDataInfo.min = ySum;

            if (ySum > axisYDataInfo.max)
                axisYDataInfo.max = ySum;

            if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
                continue;

            if (ySum < axisYDataInfo.viewPortMin)
                axisYDataInfo.viewPortMin = ySum;
            if (ySum > axisYDataInfo.viewPortMax)
                axisYDataInfo.viewPortMax = ySum;
        }

        for (i in dataPointYNegativeSums) {

            if (isNaN(i)) {
                continue;
            }

            var ySum = dataPointYNegativeSums[i];

            if (ySum < axisYDataInfo.min)
                axisYDataInfo.min = ySum;

            if (ySum > axisYDataInfo.max)
                axisYDataInfo.max = ySum;

            if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
                continue;

            if (ySum < axisYDataInfo.viewPortMin)
                axisYDataInfo.viewPortMin = ySum;
            if (ySum > axisYDataInfo.viewPortMax)
                axisYDataInfo.viewPortMax = ySum;
        }


        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

        //window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
    }

    Chart.prototype._processStacked100PlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;

        var dataPointX, dataPointY;
        var isDateTime = false;
        var containsPositiveY = false;
        var containsNegativeY = false;

        var dataPointYSums = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                // Requird when no x values are provided 
                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;



                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }

                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                plotUnit.yTotals[dataPointX] = (!plotUnit.yTotals[dataPointX] ? 0 : plotUnit.yTotals[dataPointX]) + Math.abs(dataPointY);

                if (dataPointY >= 0) {
                    containsPositiveY = true;
                } else {
                    containsNegativeY = true;
                }

                if (dataPointYSums[dataPointX])
                    dataPointYSums[dataPointX] += Math.abs(dataPointY);
                else
                    dataPointYSums[dataPointX] = Math.abs(dataPointY);
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }


        if (containsPositiveY && !containsNegativeY) {
            axisYDataInfo.max = 99;
            axisYDataInfo.min = 1;
        } else if (containsPositiveY && containsNegativeY) {
            axisYDataInfo.max = 99;
            axisYDataInfo.min = -99;
        } else if (!containsPositiveY && containsNegativeY) {
            axisYDataInfo.max = -1;
            axisYDataInfo.min = -99;
        }

        axisYDataInfo.viewPortMin = axisYDataInfo.min;
        axisYDataInfo.viewPortMax = axisYDataInfo.max;

        plotUnit.dataPointYSums = dataPointYSums;

        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

        //window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
    }

    Chart.prototype._processMultiYPlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY, dataPointYMin, dataPointYMax;
        var isDateTime = false;


        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;

                if (dataPointY && dataPointY.length) {
                    dataPointYMin = Math.min.apply(null, dataPointY);
                    dataPointYMax = Math.max.apply(null, dataPointY);
                }


                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (dataPointYMin < axisYDataInfo.min)
                    axisYDataInfo.min = dataPointYMin;

                if (dataPointYMax > axisYDataInfo.max)
                    axisYDataInfo.max = dataPointYMax;


                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }

                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                if (dataPointYMin < axisYDataInfo.viewPortMin)
                    axisYDataInfo.viewPortMin = dataPointYMin;
                if (dataPointYMax > axisYDataInfo.viewPortMax)
                    axisYDataInfo.viewPortMax = dataPointYMax;
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }

        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
    }

    //getClosest returns objects nearby and hence shouldn't be used for events like click, mouseover, mousemove, etc which require object that is exactly under the mouse.
    Chart.prototype.getDataPointAtXY = function (mouseX, mouseY, getClosest) {

        getClosest = getClosest || false;
        var results = [];

        for (var i = this._dataInRenderedOrder.length - 1; i >= 0; i--) {
            var dataSeries = this._dataInRenderedOrder[i];

            var result = null;

            result = dataSeries.getDataPointAtXY(mouseX, mouseY, getClosest);
            if (result)
                results.push(result);
        }

        var closestResult = null;
        var onlyLineAreaTypes = false;

        for (var m = 0; m < results.length; m++) {

            if (results[m].dataSeries.type === "line" || results[m].dataSeries.type === "stepLine" || results[m].dataSeries.type === "area" || results[m].dataSeries.type === "stepArea") {
                var markerSize = getProperty("markerSize", results[m].dataPoint, results[m].dataSeries) || 8;
                if (results[m].distance <= markerSize / 2) {
                    onlyLineAreaTypes = true;
                    break;
                }
            }
        }

        for (m = 0; m < results.length; m++) {

            if (onlyLineAreaTypes && results[m].dataSeries.type !== "line" && results[m].dataSeries.type !== "stepLine" && results[m].dataSeries.type !== "area" && results[m].dataSeries.type !== "stepArea")
                continue;

            if (!closestResult) {
                closestResult = results[m];
            } else if (results[m].distance <= closestResult.distance) {
                closestResult = results[m];
            }
        }

        return closestResult;
    }

    Chart.prototype.getObjectAtXY = function (mouseX, mouseY, getClosest) {
        getClosest = getClosest || false;

        var id = null;

        var dataPointInfo = this.getDataPointAtXY(mouseX, mouseY, getClosest);

        if (dataPointInfo) {
            id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
        } else if (isCanvasSupported) {//IE9+
            id = getObjectId(mouseX, mouseY, this._eventManager.ghostCtx);
        }
        else {
            for (var i = 0; i < this.legend.items.length; i++) {
                var item = this.legend.items[i];

                if (mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2) {
                    id = item.id;
                }
            }
        }

        return id;
    }

    /// <summary>Calculates Font Size based on standardSize and Chart Size</summary>
    /// <param name="standardSize" type="Number">Standard font size for a Chart with min(width,height) = 400px</param>
    /// <returns type="Number">The area.</returns>	
    Chart.prototype.getAutoFontSize = function (standardSize, width, height) {

        width = width || this.width;
        height = height || this.height;

        var fontSizeScaleFactor = standardSize / 400;

        return Math.round(Math.min(this.width, this.height) * fontSizeScaleFactor);
    }

    //#region Events

    Chart.prototype.resetOverlayedCanvas = function () {
        //var width = this.overlaidCanvas.width;
        //this.overlaidCanvas.width = 0;
        //this.overlaidCanvas.width = width;
        this.overlaidCanvasCtx.clearRect(0, 0, this.width, this.height);
    }

    Chart.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.backgroundColor) {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    Chart.prototype.attachEvent = function (param) {
        this._events.push(param);
    }

    Chart.prototype._touchEventHandler = function (ev) {
        if (!ev.changedTouches || !this.interactivityEnabled)
            return;

        var mouseEvents = [];
        var touches = ev.changedTouches;
        var first = touches ? touches[0] : ev;
        var touchCurrentCoordinates = null;

        //window.console.log(touches.length);

        switch (ev.type) {
            case "touchstart": case "MSPointerDown":
                mouseEvents = ["mousemove", "mousedown"];
                this._lastTouchData = getMouseCoordinates(first);
                this._lastTouchData.time = new Date();
                break;
            case "touchmove": case "MSPointerMove": mouseEvents = ["mousemove"]; break;
            case "touchend": case "MSPointerUp": mouseEvents = (this._lastTouchEventType === "touchstart" || this._lastTouchEventType === "MSPointerDown") ? ["mouseup", "click"] : ["mouseup"];
                break;
            default: return;
        }

        if (touches && touches.length > 1) return;


        touchCurrentCoordinates = getMouseCoordinates(first);
        touchCurrentCoordinates.time = new Date();
        try {
            var dy = touchCurrentCoordinates.y - this._lastTouchData.y;
            var dx = touchCurrentCoordinates.x - this._lastTouchData.x;
            var dt = touchCurrentCoordinates.time - this._lastTouchData.time;

            if (Math.abs(dy) > 15 && (!!this._lastTouchData.scroll || dt < 200)) {
                //this._lastTouchData.y = touchCurrentCoordinates.y;
                this._lastTouchData.scroll = true;

                var win = window.parent || window;
                if (win && win.scrollBy)
                    win.scrollBy(0, -dy);
            }
        } catch (e) { };

        this._lastTouchEventType = ev.type;

        if (!!this._lastTouchData.scroll && this.zoomEnabled) {
            if (this.isDrag)
                this.resetOverlayedCanvas();

            this.isDrag = false;
            return;
        }

        for (var i = 0; i < mouseEvents.length; i++) {

            var type = mouseEvents[i];
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1,
									  first.screenX, first.screenY,
									  first.clientX, first.clientY, false,
									  false, false, false, 0, null);

            first.target.dispatchEvent(simulatedEvent);

            if (ev.preventManipulation) {
                //alert("preventManipulation");
                ev.preventManipulation();
            }

            if (ev.preventDefault) {
                //alert("preventDefault");
                ev.preventDefault();
            }
        }
    }

    Chart.prototype._mouseEventHandler = function (ev) {

        if (!this.interactivityEnabled)
            return;

        if (this._ignoreNextEvent) {
            this._ignoreNextEvent = false;
            return;
        }

        // stop panning and zooming so we can draw
        if (ev.preventManipulation) {
            //alert("preventManipulation");
            ev.preventManipulation();
        }

        // we are handling this event
        if (ev.preventDefault) {
            //alert("preventDefault");
            ev.preventDefault();
        }

        //IE8- uses srcElement instead of target. So instead of checking this condition everytime, its better to create a reference called target.
        if (typeof (ev.target) === "undefined" && ev.srcElement)
            ev.target = ev.srcElement;

        //console.log(ev.type);

        var xy = getMouseCoordinates(ev);
        var type = ev.type;
        var eventParam;
        var rightclick;

        if (!ev) var e = window.event;
        if (ev.which) rightclick = (ev.which == 3);
        else if (ev.button) rightclick = (ev.button == 2);

        //window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);

        //if (type === "mouseout") {
        //    this._toolTip.hide();
        //}

        if (isDebugMode && window.console) {
            window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);
            if (rightclick)
                window.console.log(ev.which);

            if (type === "mouseup")
                window.console.log("mouseup");
        }

        if (rightclick)
            return;

        //if (this.plotInfo.axisPlacement === "xySwapped") {
        //    //var temp = xy.x;
        //    //xy.x = xy.y;
        //    //xy.y = temp;
        //    xy = {x: xy.y, y: xy.x};
        //}

        if (Chart.capturedEventParam) {
            eventParam = Chart.capturedEventParam;

            if (type === "mouseup") {
                Chart.capturedEventParam = null;

                if (eventParam.chart.overlaidCanvas.releaseCapture)
                    eventParam.chart.overlaidCanvas.releaseCapture();
                else
                    document.body.removeEventListener("mouseup", eventParam.chart._mouseEventHandler, false);

            }

            if (eventParam.hasOwnProperty(type))
                eventParam[type].call(eventParam.context, xy.x, xy.y);



        }
        else if (this._events) {

            for (var i = 0; i < this._events.length; i++) {
                if (!this._events[i].hasOwnProperty(type))
                    continue;

                eventParam = this._events[i];
                var bounds = eventParam.bounds;

                if (xy.x >= bounds.x1 && xy.x <= bounds.x2 && xy.y >= bounds.y1 && xy.y <= bounds.y2) {
                    eventParam[type].call(eventParam.context, xy.x, xy.y);

                    if (type === "mousedown" && eventParam.capture === true) {
                        Chart.capturedEventParam = eventParam;

                        if (this.overlaidCanvas.setCapture)
                            this.overlaidCanvas.setCapture();
                        else {
                            document.body.addEventListener("mouseup", this._mouseEventHandler, false);
                            //addEvent(document.body, "mouseup", this._mouseEventHandler);
                        }
                    } else if (type === "mouseup") {
                        if (eventParam.chart.overlaidCanvas.releaseCapture)
                            eventParam.chart.overlaidCanvas.releaseCapture();
                        else
                            document.body.removeEventListener("mouseup", this._mouseEventHandler, false);
                    }

                    break;
                }
                else
                    eventParam = null;
            }

            if (eventParam && eventParam.cursor) {
                ev.target.style.cursor = eventParam.cursor;
            }
            else
                ev.target.style.cursor = this._defaultCursor;

            //eventParam = 
        }

        if (this._toolTip && this._toolTip.enabled) {

            var plotArea = this.plotArea;

            if (xy.x < plotArea.x1 || xy.x > plotArea.x2 || xy.y < plotArea.y1 || xy.y > plotArea.y2)
                this._toolTip.hide();
        }


        if ((!this.isDrag || !this.zoomEnabled) && this._eventManager) {

            this._eventManager.mouseEventHandler(ev);
            //this._updateToolTip(ev.x, ev.y);            
        }

        //if (this._toolTip.enabled)
        //    this._toolTip.mouseMoveHandler(ev.x, ev.y);
    }

    Chart.prototype._plotAreaMouseDown = function (x, y) {
        this.isDrag = true;

        if (this.plotInfo.axisPlacement !== "none") {
            this.dragStartPoint = { x: x, y: y, xMinimum: this.axisX.minimum, xMaximum: this.axisX.maximum };
        } else {
            this.dragStartPoint = { x: x, y: y };
        }

    }

    Chart.prototype._plotAreaMouseUp = function (x, y) {

        if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
            if (this.isDrag) {

                var dragDelta = 0;
                var dragValue = 0;
                var axisXProps = this.axisX.lineCoordinates;

                if (this.plotInfo.axisPlacement === "xySwapped") {
                    dragDelta = y - this.dragStartPoint.y;
                    dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
                }
                else {
                    dragDelta = this.dragStartPoint.x - x;
                    dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
                }

                if (Math.abs(dragDelta) > 2) {
                    if (this.panEnabled) {

                        var reRender = false;
                        var overFlow = 0;

                        //If the user has panned beyond the minimum/maximum value of axisX, then take it back to minimum/maximum.
                        if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum) {

                            overFlow = this.axisX._absoluteMinimum - this.axisX.sessionVariables.internalMinimum;

                            this.axisX.sessionVariables.internalMinimum += overFlow;
                            this.axisX.sessionVariables.internalMaximum += overFlow;
                            reRender = true;
                        } else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum) {

                            overFlow = this.axisX.sessionVariables.internalMaximum - this.axisX._absoluteMaximum;
                            this.axisX.sessionVariables.internalMaximum -= overFlow;
                            this.axisX.sessionVariables.internalMinimum -= overFlow;

                            reRender = true;
                        }
                        //}


                        //this.overlaidCanvas.style.cursor = this._defaultCursor;


                        if (reRender)
                            this.render();

                    } else if (this.zoomEnabled) {

                        this.resetOverlayedCanvas();

                        //alert("mouse UP");
                        if (!this.dragStartPoint)
                            return;

                        if (this.plotInfo.axisPlacement === "xySwapped") {
                            //In Pixels
                            var selectedRegion = { y1: Math.min(this.dragStartPoint.y, y), y2: Math.max(this.dragStartPoint.y, y) };

                            if (Math.abs(selectedRegion.y1 - selectedRegion.y2) > 1) {
                                var axisXProps = this.axisX.lineCoordinates;

                                var minX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y2 - axisXProps.y1);
                                var maxX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y1 - axisXProps.y1);

                                minX = Math.max(minX, this.axisX.dataInfo.min);
                                maxX = Math.min(maxX, this.axisX.dataInfo.max);

                                if (Math.abs(maxX - minX) > 2 * Math.abs(this.axisX.dataInfo.minDiff)) {

                                    this.axisX.sessionVariables.internalMinimum = minX;
                                    this.axisX.sessionVariables.internalMaximum = maxX;

                                    this.render();
                                }
                            }
                        } else if (this.plotInfo.axisPlacement === "normal") {
                            var selectedRegion = { x1: Math.min(this.dragStartPoint.x, x), x2: Math.max(this.dragStartPoint.x, x) };

                            if (Math.abs(selectedRegion.x1 - selectedRegion.x2) > 1) {
                                var axisXProps = this.axisX.lineCoordinates;

                                var minX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x1 - axisXProps.x1) + this.axisX.minimum;
                                var maxX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x2 - axisXProps.x1) + this.axisX.minimum;

                                minX = Math.max(minX, this.axisX.dataInfo.min);
                                maxX = Math.min(maxX, this.axisX.dataInfo.max);

                                if (Math.abs(maxX - minX) > 2 * Math.abs(this.axisX.dataInfo.minDiff)) {

                                    this.axisX.sessionVariables.internalMinimum = minX;
                                    this.axisX.sessionVariables.internalMaximum = maxX;

                                    this.render();
                                }
                            }
                        }
                    }

                    this._ignoreNextEvent = true;//Required so that click event doesn't fire after zooming into a section of the chart.


                    if (this.zoomEnabled && this._zoomButton.style.display === "none") {
                        show(this._zoomButton, this._resetButton);
                        setButtonState(this, this._zoomButton, "pan");
                        setButtonState(this, this._resetButton, "reset");
                    }
                }
            }

        }

        this.isDrag = false;

        //this.dragStartPoint = null;
    }

    Chart.prototype._plotAreaMouseMove = function (x, y) {
        if (this.isDrag && this.plotInfo.axisPlacement !== "none") {

            var dragDelta = 0;
            var dragValue = 0;
            var axisXProps = this.axisX.lineCoordinates;

            if (this.plotInfo.axisPlacement === "xySwapped") {
                dragDelta = y - this.dragStartPoint.y;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
            }
            else {
                dragDelta = this.dragStartPoint.x - x;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
            }

            if (Math.abs(dragDelta) > 2 && Math.abs(dragDelta) < 8 && (this.panEnabled || this.zoomEnabled)) {
                this._toolTip.hide();
            } else if (this._toolTip.enabled && !this.panEnabled && !this.zoomEnabled) {
                this._toolTip.mouseMoveHandler(x, y);
            }

            if (Math.abs(dragDelta) > 2 && (this.panEnabled || this.zoomEnabled)) {
                if (this.panEnabled) {

                    this.axisX.sessionVariables.internalMinimum = this.dragStartPoint.xMinimum + dragValue;
                    this.axisX.sessionVariables.internalMaximum = this.dragStartPoint.xMaximum + dragValue;

                    var overFlow = 0;

                    // This is to stop the user from dragging chart beyond some limit (this.axisX._absoluteMinimum - this.axisX.interval)
                    if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)) {

                        overFlow = (this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)) - this.axisX.sessionVariables.internalMinimum;
                        this.axisX.sessionVariables.internalMinimum += overFlow;
                        this.axisX.sessionVariables.internalMaximum += overFlow;
                    } else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType)) {
                        overFlow = this.axisX.sessionVariables.internalMaximum - (this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType));
                        this.axisX.sessionVariables.internalMaximum -= overFlow;
                        this.axisX.sessionVariables.internalMinimum -= overFlow;
                    }

                    //this.dragStartPoint.x = x;

                    //this.render();
                    var _this = this;

                    clearTimeout(this._panTimerId);
                    this._panTimerId = setTimeout(function () {
                        _this.render();
                    }, 0);

                } else if (this.zoomEnabled) {
                    var plotAreaBounds = this.plotArea;

                    this.resetOverlayedCanvas();

                    var alpha = this.overlaidCanvasCtx.globalAlpha;

                    this.overlaidCanvasCtx.globalAlpha = .7;
                    this.overlaidCanvasCtx.fillStyle = "#A0ABB8";

                    if (this.plotInfo.axisPlacement === "xySwapped") {
                        this.overlaidCanvasCtx.fillRect(plotAreaBounds.x1, this.dragStartPoint.y, plotAreaBounds.x2 - plotAreaBounds.x1, y - this.dragStartPoint.y);
                    }
                    else if (this.plotInfo.axisPlacement === "normal") {
                        this.overlaidCanvasCtx.fillRect(this.dragStartPoint.x, plotAreaBounds.y1, x - this.dragStartPoint.x, plotAreaBounds.y2 - plotAreaBounds.y1);
                    }

                    this.overlaidCanvasCtx.globalAlpha = alpha;
                }
            }

            //if (dragDelta > 5) {
            //    this._toolTip.hide();
            //    return;
            //} else if (this._toolTip.enabled)
            //    this._toolTip.mouseMoveHandler(x, y);

        } else if (this._toolTip.enabled)
            this._toolTip.mouseMoveHandler(x, y);
    }


    //#endregion Events

    Chart.prototype.preparePlotArea = function () {

        var plotArea = this.plotArea;

        var yAxis = this.axisY ? this.axisY : this.axisY2;

        if (!isCanvasSupported && (plotArea.x1 > 0 || plotArea.y1 > 0)) {
            plotArea.ctx.translate(plotArea.x1, plotArea.y1);
        }

        if (this.axisX && yAxis) {
            plotArea.x1 = this.axisX.lineCoordinates.x1 < this.axisX.lineCoordinates.x2 ? this.axisX.lineCoordinates.x1 : yAxis.lineCoordinates.x1;
            plotArea.y1 = (this.axisX.lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? this.axisX.lineCoordinates.y1 : yAxis.lineCoordinates.y1);

            plotArea.x2 = (this.axisX.lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? this.axisX.lineCoordinates.x2 : yAxis.lineCoordinates.x2);
            plotArea.y2 = this.axisX.lineCoordinates.y2 > this.axisX.lineCoordinates.y1 ? this.axisX.lineCoordinates.y2 : yAxis.lineCoordinates.y2;

            plotArea.width = plotArea.x2 - plotArea.x1;
            plotArea.height = plotArea.y2 - plotArea.y1;
            //plotArea = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
        } else {
            //ToDo: @sunil
            var freeSpace = this.layoutManager.getFreeSpace();
            plotArea.x1 = freeSpace.x1;
            plotArea.x2 = freeSpace.x2;
            plotArea.y1 = freeSpace.y1;
            plotArea.y2 = freeSpace.y2;

            plotArea.width = freeSpace.width;
            plotArea.height = freeSpace.height;
        }

        if (!isCanvasSupported) {

            plotArea.canvas.width = plotArea.width;
            plotArea.canvas.height = plotArea.height;

            plotArea.canvas.style.left = plotArea.x1 + "px";
            plotArea.canvas.style.top = plotArea.y1 + "px";

            if (plotArea.x1 > 0 || plotArea.y1 > 0) {
                plotArea.ctx.translate(-plotArea.x1, -plotArea.y1);
            }
        }
    }

    Chart.prototype.getPixelCoordinatesOnPlotArea = function (x, y) {
        return { x: this.axisX.getPixelCoordinatesOnAxis(x).x, y: this.axisY.getPixelCoordinatesOnAxis(y).y }
        //return { x: 5, y: 10 };
    }

    //#region Render Methods

    Chart.prototype.renderIndexLabels = function (targetCtx) {
        var ctx = targetCtx || this.plotArea.ctx;

        ctx.textBaseline = "middle";
        var plotArea = this.plotArea;

        for (var i = 0; i < this._indexLabels.length; i++) {

            var indexLabel = this._indexLabels[i];

            var x, y, angle;

            ctx.fillStyle = getProperty("indexLabelFontColor", indexLabel.dataPoint, indexLabel.dataSeries);
            ctx.font = getFontString("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries);
            var indexLabelText = this.replaceKeywordsWithValue(getProperty("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries), indexLabel.dataPoint, indexLabel.dataSeries, null, indexLabel.indexKeyword);
            var textSize = { width: ctx.measureText(indexLabelText).width, height: getProperty("indexLabelFontSize", indexLabel.dataPoint, indexLabel.dataSeries) };
            var placement = getProperty("indexLabelPlacement", indexLabel.dataPoint, indexLabel.dataSeries);
            var orientation = getProperty("indexLabelOrientation", indexLabel.dataPoint, indexLabel.dataSeries);
            var angle = 0;

            var yMinLimit = 0;
            var yMaxLimit = 0;
            var xMinLimit = 0;
            var xMaxLimit = 0;
            var offsetX = 0, offsetY = 0;
            var direction = indexLabel.direction; // +1 for above the point and -1 for below the point

            var axisX = indexLabel.dataSeries.axisX;
            var axisY = indexLabel.dataSeries.axisY;

            if (indexLabel.dataPoint.x < axisX.minimum || indexLabel.dataPoint.x > axisX.maximum || indexLabel.dataPoint.y < axisY.minimum || indexLabel.dataPoint.y > axisY.maximum)
                continue;

            if (indexLabel.chartType === "column" || indexLabel.chartType === "stackedColumn" || indexLabel.chartType === "stackedColumn100"
				|| indexLabel.chartType === "bar" || indexLabel.chartType === "stackedBar" || indexLabel.chartType === "stackedBar100"
				|| indexLabel.chartType === "candlestick" || indexLabel.chartType === "ohlc"
				|| indexLabel.chartType === "rangeColumn" || indexLabel.chartType === "rangeBar") {

                offsetY = 5;
                offsetX = 5;
                var width = Math.abs(indexLabel.bounds.x1, indexLabel.bounds.x2)
                var height = Math.abs(indexLabel.bounds.y1, indexLabel.bounds.y2)

                if (this.plotInfo.axisPlacement === "normal") {

                    if (placement !== "inside") {	//outside or auto

                        yMinLimit = plotArea.y1;
                        yMaxLimit = plotArea.y2;

                    } else {

                        yMinLimit = indexLabel.bounds.y1;
                        yMaxLimit = indexLabel.bounds.y2;
                    }

                    if (orientation === "horizontal") {
                        x = indexLabel.point.x - textSize.width / 2;

                        if (direction >= 0) {
                            if (indexLabel.point.y - textSize.height / 2 - offsetY < yMinLimit + textSize.height / 2) {
                                if (placement === "auto")
                                    y = Math.min(Math.max(indexLabel.point.y, yMinLimit) + textSize.height / 2 + 1, yMaxLimit - textSize.height / 2 - offsetY);
                                else
                                    y = Math.min(yMinLimit + textSize.height / 2 + 1, yMaxLimit - textSize.height / 2 - offsetY);
                                //y = Math.min(indexLabel.point.y - textSize.height / 2 - offsetY + 1, yMaxLimit - textSize.height / 2 - offsetY);
                            } else {

                                y = Math.min(indexLabel.point.y - textSize.height / 2 - offsetY + 1, yMaxLimit - textSize.height / 2 - offsetY);

                            }
                        }
                        else {
                            if (indexLabel.point.y + textSize.height / 2 + offsetY > yMaxLimit - textSize.height / 2 - 1) {
                                if (placement === "auto")
                                    y = Math.max(Math.min(indexLabel.point.y, yMaxLimit) - textSize.height / 2 - 1, yMinLimit + textSize.height / 2 + offsetY);
                                else
                                    y = Math.max(yMaxLimit - textSize.height / 2 - 1, yMinLimit + textSize.height / 2 + offsetY);
                                //y = Math.max(indexLabel.point.y + textSize.height / 2 + offsetY, yMinLimit + textSize.height / 2 + offsetY);

                            } else {
                                y = Math.max(indexLabel.point.y + textSize.height / 2 + offsetY, yMinLimit + textSize.height / 2 + offsetY);
                            }
                        }

                        //y = yMinLimit;
                    }
                    else if (orientation === "vertical") {
                        x = indexLabel.point.x;
                        if (direction >= 0) {
                            if (indexLabel.point.y - offsetY < yMinLimit + textSize.width + 1) {
                                if (placement === "auto")
                                    y = Math.min(Math.max(indexLabel.point.y, yMinLimit) + textSize.width + 1, yMaxLimit);
                                else
                                    y = Math.min(yMinLimit + textSize.width + 1, yMaxLimit);
                            } else {
                                y = Math.min(indexLabel.point.y - offsetY, yMaxLimit - 1);
                            }
                        }
                        else {

                            if (indexLabel.point.y + textSize.width + offsetY > yMaxLimit - 1) {
                                if (placement === "auto")
                                    y = Math.max(Math.min(indexLabel.point.y, yMaxLimit) - offsetY, yMinLimit);
                                else
                                    y = Math.max(yMaxLimit - 1, yMinLimit);

                            } else {

                                y = Math.max(indexLabel.point.y + textSize.width + offsetY, yMinLimit);

                            }
                        }

                        angle = -90;
                    }

                } else if (this.plotInfo.axisPlacement === "xySwapped") {

                    if (placement !== "inside") {

                        xMinLimit = plotArea.x1;
                        xMaxLimit = plotArea.x2;

                    } else {

                        xMinLimit = indexLabel.bounds.x1;
                        xMaxLimit = indexLabel.bounds.x2;

                    }

                    if (orientation === "horizontal") {
                        y = indexLabel.point.y;

                        if (direction >= 0) {
                            if (indexLabel.point.x + offsetX > xMaxLimit - textSize.width) {
                                if (placement === "auto")
                                    x = Math.max(Math.min(indexLabel.point.x, xMaxLimit) - textSize.width, xMinLimit);
                                else
                                    x = Math.max(xMaxLimit - textSize.width, xMinLimit);
                            }
                            else {
                                x = Math.max(indexLabel.point.x + offsetX, xMinLimit);
                            }
                        }
                        else {
                            if (indexLabel.point.x - textSize.width - offsetX < xMinLimit) {
                                if (placement === "auto")
                                    x = Math.min(Math.max(indexLabel.point.x, xMinLimit) + 1, xMaxLimit);
                                else
                                    x = Math.min(xMinLimit + 1, xMaxLimit);
                            } else {
                                x = Math.min(indexLabel.point.x - textSize.width - offsetX, xMaxLimit);
                            }
                        }
                    }
                    else if (orientation === "vertical") {
                        y = indexLabel.point.y + textSize.width / 2;

                        if (direction >= 0) {
                            if (indexLabel.point.x + textSize.height / 2 + offsetX > xMaxLimit - textSize.height / 2) {
                                if (placement === "auto")
                                    x = Math.max(Math.min(indexLabel.point.x, xMaxLimit) - textSize.height / 2, xMinLimit);
                                else
                                    x = Math.max(xMaxLimit - textSize.height / 2, xMinLimit);
                            } else {
                                x = Math.max(indexLabel.point.x + textSize.height / 2 + offsetX, xMinLimit);
                            }
                        }
                        else {
                            if (indexLabel.point.x - textSize.height / 2 - offsetX < xMinLimit + textSize.height / 2) {
                                if (placement === "auto")
                                    x = Math.min(Math.max(indexLabel.point.x, xMinLimit) + textSize.height / 2, xMaxLimit + textSize.height / 2);
                                else
                                    x = Math.min(xMinLimit + textSize.height / 2, xMaxLimit + textSize.height / 2);

                            } else {
                                x = Math.min(indexLabel.point.x - textSize.height / 2 - offsetX, xMaxLimit + textSize.height / 2);
                            }
                        }

                        angle = -90;
                    }
                }

            } else {

                offsetY = 5;


                if (orientation === "horizontal") {

                    x = indexLabel.point.x - textSize.width / 2;

                    if (indexLabel.chartType === "bubble") {
                        offsetY = -textSize.height / 2;
                    }

                    if (direction > 0)
                        y = Math.max(indexLabel.point.y - textSize.height / 2 - offsetY, plotArea.y1 + textSize.height / 2);
                    else
                        y = Math.min(indexLabel.point.y + textSize.height / 2 + offsetY, plotArea.y2 - textSize.height / 2);

                } else if (orientation === "vertical") {

                    x = indexLabel.point.x;

                    if (indexLabel.chartType === "bubble") {
                        offsetY = -textSize.width / 2;
                    }

                    if (direction > 0)
                        y = Math.max(indexLabel.point.y - offsetY, plotArea.y1 + textSize.width);
                    else
                        y = Math.min(indexLabel.point.y + textSize.width + offsetY, plotArea.y2);

                    angle = -90;
                }

            }

            ctx.save();

            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * angle);

            ctx.fillText(indexLabelText, 0, 0);

            ctx.restore();
        }

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0, startTimePercent: .7 };
        return animationInfo;
    }

    Chart.prototype.renderLine = function (plotUnit) {

        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;
        //var ghostCtx = this.overlaidCanvasCtx;

        ctx.save();

        var plotArea = this.plotArea;

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        var markers = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            //if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
            //    dataSeries.markerSize = 8;
            ctx.beginPath();
            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                //dataSeries.noDataPointsInPlotArea = 0
                var prevDataNull = false;
                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
                        continue;

                    //if (!isFinite(dataPoints[i].y))
                    //    continue;

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {// if first dataPoint is null then no need to call stroke method
                            ctx.stroke();

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                            }
                        }


                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


                    //dataSeries.noDataPointsInPlotArea++;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);


                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 500 == 0) {
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                        }
                    }

                    //Render Marker
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);

                        //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                        //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                        //}

                        var markerColor = intToHexColorString(id);

                        //window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);

                        if (isCanvasSupported) {
                            markers.push({
                                x: x, y: y, ctx: ghostCtx,
                                type: markerProps.type,
                                size: markerProps.size,
                                color: markerColor,
                                borderColor: markerColor,
                                borderThickness: markerProps.borderThickness
                            });
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "line",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }

                }

                ctx.stroke();

                if (isCanvasSupported)
                    ghostCtx.stroke();
            }

        }


        RenderHelper.drawMarkers(markers);
        ctx.restore();

        ctx.beginPath();

        if (isCanvasSupported)
            ghostCtx.beginPath();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderStepLine = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;
        //var ghostCtx = this.overlaidCanvasCtx;

        ctx.save();

        var plotArea = this.plotArea;

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        var markers = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            //if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
            //    dataSeries.markerSize = 8;
            ctx.beginPath();
            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                //dataSeries.noDataPointsInPlotArea = 0
                var prevDataNull = false;
                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
                        continue;

                    //if (!isFinite(dataPoints[i].y))
                    //    continue;

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {// if first dataPoint is null then no need to call stroke method
                            ctx.stroke();

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                            }
                        }

                        prevDataNull = true;
                        continue;
                    }

                    var prevY = y;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


                    //dataSeries.noDataPointsInPlotArea++;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {

                        ctx.lineTo(x, prevY);
                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, prevY);

                        ctx.lineTo(x, y);
                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 500 == 0) {
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                        }
                    }

                    //Render Marker
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);

                        //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                        //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                        //}

                        var markerColor = intToHexColorString(id);

                        //window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
                        if (isCanvasSupported) {
                            markers.push({
                                x: x, y: y, ctx: ghostCtx,
                                type: markerProps.type,
                                size: markerProps.size,
                                color: markerColor,
                                borderColor: markerColor,
                                borderThickness: markerProps.borderThickness
                            });
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stepLine",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }

                }

                ctx.stroke();
                if (isCanvasSupported)
                    ghostCtx.stroke();
            }
        }


        RenderHelper.drawMarkers(markers);
        ctx.restore();

        ctx.beginPath();

        if (isCanvasSupported)
            ghostCtx.beginPath();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    function getBezierPoints(points, tension) {
        var bezierPoints = [];

        for (var i = 0; i < points.length; i++) {

            if (i == 0) {
                bezierPoints.push(points[0]);
                continue;
            }

            var i1, i2, pointIndex;

            pointIndex = i - 1;
            i1 = pointIndex === 0 ? 0 : pointIndex - 1;
            i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

            var drv1 = { x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension }
            var cp1 = { x: points[pointIndex].x + drv1.x / 3, y: points[pointIndex].y + drv1.y / 3 }
            bezierPoints[bezierPoints.length] = cp1;


            pointIndex = i;
            i1 = pointIndex === 0 ? 0 : pointIndex - 1;
            i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

            var drv2 = { x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension }
            var cp2 = { x: points[pointIndex].x - drv2.x / 3, y: points[pointIndex].y - drv2.y / 3 }
            bezierPoints[bezierPoints.length] = cp2;

            bezierPoints[bezierPoints.length] = points[i];
        }

        return bezierPoints;
    }

    Chart.prototype.renderSpline = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        ctx.save();

        var plotArea = this.plotArea;

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        var markers = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            //if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
            //    dataSeries.markerSize = 8;

            var pixels = [];

            ctx.beginPath();
            if (dataPoints.length > 0) {

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
                        continue;

                    //if (!isFinite(dataPoints[i].y))
                    //    continue;

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {// if first dataPoint is null then no need to call stroke method
                            renderBezier(pixels);
                            pixels = [];
                        }

                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


                    pixels[pixels.length] = { x: x, y: y };


                    //Add Markers
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);

                        //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                        //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                        //}

                        var markerColor = intToHexColorString(id);

                        //window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
                        if (isCanvasSupported) {
                            markers.push({
                                x: x, y: y, ctx: ghostCtx,
                                type: markerProps.type,
                                size: markerProps.size,
                                color: markerColor,
                                borderColor: markerColor,
                                borderThickness: markerProps.borderThickness
                            });
                        }
                    }

                    //Add Labels
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "spline",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }

                }
            }

            renderBezier(pixels);
        }

        RenderHelper.drawMarkers(markers);
        ctx.restore();

        ctx.beginPath();

        if (isCanvasSupported)
            ghostCtx.beginPath();

        function renderBezier(pixels) {

            var bp = getBezierPoints(pixels, 2);

            if (bp.length > 0) {
                ctx.beginPath();
                if (isCanvasSupported)
                    ghostCtx.beginPath();

                ctx.moveTo(bp[0].x, bp[0].y);
                if (isCanvasSupported)
                    ghostCtx.moveTo(bp[0].x, bp[0].y);

                for (var i = 0; i < bp.length - 3; i += 3) {

                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (isCanvasSupported)
                        ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (i > 0 && i % 3000 === 0) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(bp[i + 3].x, bp[i + 3].y);

                        if (isCanvasSupported) {
                            ghostCtx.stroke();
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(bp[i + 3].x, bp[i + 3].y);
                        }
                    }
                }

                ctx.stroke();

                if (isCanvasSupported)
                    ghostCtx.stroke();
            }
        }

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    var drawRect = function (ctx, x1, y1, x2, y2, color, borderThickness, borderColor, top, bottom, left, right, fillOpacity) {
        if (typeof (fillOpacity) === "undefined")
            fillOpacity = 1;

        borderThickness = borderThickness || 0;
        borderColor = borderColor || "black";
        //alert("top"+ top + "bottom" + bottom + " lt" + left+ "rt" + right )
        var a1 = x1, a2 = x2, b1 = y1, b2 = y2, edgeY, edgeX;
        if (x2 - x1 > 15 && y2 - y1 > 15)
            var bevelDepth = 8;
        else
            var bevelDepth = 0.35 * Math.min((x2 - x1), (y2 - y1));
        //alert(a1 + "" + a2);
        var color2 = "rgba(255, 255, 255, .4)";
        var color3 = "rgba(255, 255, 255, 0.1)";
        //color1 = "rgba(" + r + "," + g + ", " + b + ",1)";
        var color1 = color;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.save();
        ctx.fillStyle = color1;

        ctx.globalAlpha = fillOpacity;
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        ctx.globalAlpha = 1;

        if (borderThickness > 0) {
            var offset = borderThickness % 2 === 0 ? 0 : .5;
            ctx.beginPath();
            ctx.lineWidth = borderThickness;
            ctx.strokeStyle = borderColor;
            ctx.moveTo(x1, y1);
            ctx.rect(x1 - offset, y1 - offset, x2 - x1 + 2 * offset, y2 - y1 + 2 * offset);
            ctx.stroke();
        }

        ctx.restore();
        //   ctx.beginPath();
        if (top === true) {
            // alert(x1 + "" + x2 + " " + bevelDepth);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2, y1);
            ctx.closePath();
            var grd = ctx.createLinearGradient((x2 + x1) / 2, b1 + bevelDepth, (x2 + x1) / 2, b1);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
            ctx.fill();
            //              ctx.stroke();
            ctx.restore();
        }


        if (bottom === true) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            var grd = ctx.createLinearGradient((x2 + x1) / 2, b2 - bevelDepth, (x2 + x1) / 2, b2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
            //       ctx.stroke();
            ctx.fill();
            ctx.restore();
        }

        if (left === true) {
            //   alert(x1)
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1)
            ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x1, y2);
            ctx.closePath();
            var grd = ctx.createLinearGradient(a1 + bevelDepth, (y2 + y1) / 2, a1, (y2 + y1) / 2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            ctx.fill();
            //     ctx.stroke();
            ctx.restore();
        }


        if (right === true) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x2, y1)
            ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2, y2);
            var grd = ctx.createLinearGradient(a2 - bevelDepth, (y2 + y1) / 2, a2, (y2 + y1) / 2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.closePath();
            //          ctx.stroke();
            ctx.restore();
        }
        //	

    }

    Chart.prototype.renderColumn = function (plotUnit) {

        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = Math.min((this.width * .15), this.plotArea.width / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        //ctx.beginPath();

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            // Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            //var offsetX = barWidth * plotUnit.index << 0;


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var x1 = x - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;

                    if (dataPoints[i].y >= 0) {
                        y1 = y;

                        y2 = yZeroToPixel;

                        if (y1 > y2) {
                            var temp = y1;
                            y1 = y2;
                            y2 = y1;
                        }

                    } else {
                        y2 = y;

                        y1 = yZeroToPixel;

                        if (y1 > y2) {
                            var temp = y1;
                            y1 = y2;
                            y2 = y1;
                        }
                    }

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

                    //if (dataSeries.markerType && dataSeries.markerSize > 0) {
                    //    RenderHelper.drawMarker(x1 + (x2 - x1) / 2, y, ctx, dataSeries.markerType, dataSeries.markerSize, color, dataSeries.markerBorderColor, dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1);
                    //}

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };

                    color = intToHexColorString(id);
                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "column",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x1 + (x2 - x1) / 2, y: dataPoints[i].y >= 0 ? y1 : y2 },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase };
        return animationInfo;
    }

    Chart.prototype.renderStackedColumn = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;



        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            // Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum));

                    var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;


                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        y1 = y - offset;
                        y2 = yZeroToPixel - offset;

                        offsetPositiveY[dataPointX] = offset + (y2 - y1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        y2 = y + offset;
                        y1 = yZeroToPixel + offset;

                        offsetNegativeY[dataPointX] = offset + (y2 - y1);
                    }

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

                    //if (dataSeries.markerType && dataSeries.markerSize > 0) {
                    //    RenderHelper.drawMarker(x1 + (x2 - x1)/2, y1, ctx, dataSeries.markerType, dataSeries.markerSize, color, dataSeries.markerBorderColor, dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1);
                    //}

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedColumn",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: dataPoints[i].y >= 0 ? y1 : y2 },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase };
        return animationInfo;
    }

    Chart.prototype.renderStackedColumn100 = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                //ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

                    var yPercent;
                    if (plotUnit.dataPointYSums[dataPointX] !== 0)
                        yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
                    else
                        yPercent = 0;

                    //y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum));

                    var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;


                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        y1 = y - offset;
                        y2 = yZeroToPixel - offset;

                        offsetPositiveY[dataPointX] = offset + (y2 - y1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        y2 = y + offset;
                        y1 = yZeroToPixel + offset;

                        offsetNegativeY[dataPointX] = offset + (y2 - y1);
                    }


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedColumn100",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: dataPoints[i].y >= 0 ? y1 : y2 },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase };
        return animationInfo;
    }

    Chart.prototype.renderBar = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        //In case of Bar Chart, yZeroToPixel is x co-ordinate!
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        //var maxBarWidth = this.height * .15;
        var maxBarWidth = Math.min((this.height * .15), this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        //var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;

        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    //x and y are pixel co-ordinates of point and should not be confused with X and Y values
                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;


                    var y1 = (y - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;

                    if (dataPoints[i].y >= 0) {
                        x1 = yZeroToPixel;
                        x2 = x;
                    } else {
                        x1 = x;
                        x2 = yZeroToPixel;
                    }

                    //drawRect(ctx, x1, y1, plotArea.x2, y2, "#EEEEEE", 0, null, false, false, false, false);
                    //drawRect(ctx, x1, y1, plotArea.x2, y2, "#BDCED3", 0, null, false, false, false, false);

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    //color = "#1B4962";
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    this._indexLabels.push({
                        chartType: "bar",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: { x: dataPoints[i].y >= 0 ? x2 : x1, y: y1 + (y2 - y1) / 2 },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                        color: color
                    });
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase };
        return animationInfo;
    }

    Chart.prototype.renderStackedBar = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        //var maxBarWidth = this.width * .15 << 0;
        var maxBarWidth = this.height * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    //x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum));

                    //var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;

                    var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;

                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        x1 = yZeroToPixel + offset;
                        x2 = x + offset;

                        offsetPositiveY[dataPointX] = offset + (x2 - x1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        x1 = x - offset;
                        x2 = yZeroToPixel - offset;

                        offsetNegativeY[dataPointX] = offset + (x2 - x1);
                    }


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    this._indexLabels.push({
                        chartType: "stackedBar",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: { x: dataPoints[i].y >= 0 ? x2 : x1, y: y },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                        color: color
                    });
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase };
        return animationInfo;
    }

    Chart.prototype.renderStackedBar100 = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        //var maxBarWidth = this.width * .15 << 0;
        var maxBarWidth = this.height * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

                    var yPercent;
                    if (plotUnit.dataPointYSums[dataPointX] !== 0)
                        yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
                    else
                        yPercent = 0;

                    //x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum));

                    var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;


                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        x1 = yZeroToPixel + offset;
                        x2 = x + offset;

                        offsetPositiveY[dataPointX] = offset + (x2 - x1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        x1 = x - offset;
                        x2 = yZeroToPixel - offset;

                        offsetNegativeY[dataPointX] = offset + (x2 - x1);
                    }


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    this._indexLabels.push({
                        chartType: "stackedBar100",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: { x: dataPoints[i].y >= 0 ? x2 : x1, y: y },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                        color: color
                    });
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase };
        return animationInfo;
    }

    Chart.prototype.renderArea = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                var prevDataNull = true;
                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number") {
                        closeArea();

                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        startPoint = { x: x, y: y };

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    }
                    else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {
                            closeArea();
                        }
                    }


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "area",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }
                }

                closeArea();

                //startPoint = { x: x, y: y };
                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function closeArea() {

            if (!startPoint)
                return;

            if (dataSeries.lineThickness > 0)
                ctx.stroke();

            if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                baseY = yZeroToPixel;
            }
            else if (plotUnit.axisY.maximum < 0)
                baseY = axisYProps.y1;
            else if (plotUnit.axisY.minimum > 0)
                baseY = axisXProps.y2;

            ctx.lineTo(x, baseY);
            ctx.lineTo(startPoint.x, baseY);
            ctx.closePath();

            ctx.globalAlpha = dataSeries.fillOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;

            if (isCanvasSupported) {
                ghostCtx.lineTo(x, baseY);
                ghostCtx.lineTo(startPoint.x, baseY);
                ghostCtx.closePath();
                ghostCtx.fill();
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y);

            startPoint = { x: x, y: y };
        }

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderSplineArea = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            var pixels = [];

            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {
                            renderBezierArea();
                            pixels = [];
                        }
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

                    pixels[pixels.length] = { x: x, y: y };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }


                    //Render Index Labels
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "splineArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }
                }

                renderBezierArea();

                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function renderBezierArea() {
            var bp = getBezierPoints(pixels, 2);

            if (bp.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp[0].x, bp[0].y);

                if (isCanvasSupported) {
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(bp[0].x, bp[0].y);
                }


                for (var i = 0; i < bp.length - 3; i += 3) {

                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (isCanvasSupported)
                        ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                }

                if (dataSeries.lineThickness > 0)
                    ctx.stroke();

                if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                    baseY = yZeroToPixel;
                }
                else if (plotUnit.axisY.maximum < 0)
                    baseY = axisYProps.y1;
                else if (plotUnit.axisY.minimum > 0)
                    baseY = axisXProps.y2;

                startPoint = { x: bp[0].x, y: bp[0].y };

                ctx.lineTo(bp[bp.length - 1].x, baseY);
                ctx.lineTo(startPoint.x, baseY);
                ctx.closePath();

                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                if (isCanvasSupported) {
                    ghostCtx.lineTo(bp[bp.length - 1].x, baseY);
                    ghostCtx.lineTo(startPoint.x, baseY);
                    ghostCtx.closePath();
                    ghostCtx.fill();
                }
            }
        }

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderStepArea = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            var prevDataNull = false;
            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    var prevY = y;

                    if (typeof (dataPoints[i].y) !== "number") {
                        closeArea();

                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;



                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        startPoint = { x: x, y: y };

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    }
                    else {

                        ctx.lineTo(x, prevY);
                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, prevY);

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {
                            closeArea();
                        }
                    }


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stepArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }
                }

                closeArea();

                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function closeArea() {

            if (!startPoint)
                return;

            if (dataSeries.lineThickness > 0)
                ctx.stroke();

            if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                baseY = yZeroToPixel;
            }
            else if (plotUnit.axisY.maximum < 0)
                baseY = axisYProps.y1;
            else if (plotUnit.axisY.minimum > 0)
                baseY = axisXProps.y2;

            ctx.lineTo(x, baseY);
            ctx.lineTo(startPoint.x, baseY);
            ctx.closePath();

            ctx.globalAlpha = dataSeries.fillOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;

            if (isCanvasSupported) {
                ghostCtx.lineTo(x, baseY);
                ghostCtx.lineTo(startPoint.x, baseY);
                ghostCtx.closePath();
                ghostCtx.fill();
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y);

            startPoint = { x: x, y: y };
        }

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderStackedArea = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;
        var markers = [];

        var plotArea = this.plotArea;

        var offsetY = [];

        var allXValues = [];
        //var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

        var ghostCtx = this._eventManager.ghostCtx;

        if (isCanvasSupported)
            ghostCtx.beginPath();

        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        xValuePresent = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var xValue;

            dataSeries.dataPointIndexes = [];

            for (i = 0; i < dataPoints.length; i++) {
                xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                dataSeries.dataPointIndexes[xValue] = i;

                if (!xValuePresent[xValue]) {
                    allXValues.push(xValue);
                    xValuePresent[xValue] = true;
                }
            }

            allXValues.sort(compareNumbers);
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            var currentBaseValues = [];


            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;



            if (allXValues.length > 0) {

                color = dataSeries._colorSet[0];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                for (i = 0; i < allXValues.length; i++) {

                    dataPointX = allXValues[i];
                    var dataPoint = null;

                    if (dataSeries.dataPointIndexes[dataPointX] >= 0)
                        dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
                    else
                        dataPoint = { x: dataPointX, y: 0 };

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoint.y) !== "number")
                        continue;

                    var x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    //var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum));

                    var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

                    y = y - offset;
                    currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                    offsetY[dataPointX] = yZeroToPixel - y;

                    if (isFirstDataPointInPlotArea) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                    }
                    else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {

                            if (dataSeries.lineThickness > 0)
                                ctx.stroke();

                            while (currentBaseValues.length > 0) {
                                var point = currentBaseValues.pop();
                                ctx.lineTo(point.x, point.y);

                                if (isCanvasSupported)
                                    ghostCtx.lineTo(point.x, point.y);

                            }

                            ctx.closePath();

                            ctx.globalAlpha = dataSeries.fillOpacity;
                            ctx.fill();
                            ctx.globalAlpha = 1;

                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.closePath();
                                ghostCtx.fill();

                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }

                            currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                        }

                    }

                    if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
                        var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
                        this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y };
                    }

                    //Render Marker
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
                        if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {

                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoint.indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedArea",
                            dataPoint: dataPoint,
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }
                }

                if (dataSeries.lineThickness > 0)
                    ctx.stroke();

                while (currentBaseValues.length > 0) {
                    var point = currentBaseValues.pop();
                    ctx.lineTo(point.x, point.y);

                    if (isCanvasSupported)
                        ghostCtx.lineTo(point.x, point.y);
                }

                ctx.closePath();

                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                ctx.beginPath();
                ctx.moveTo(x, y);

                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(x, y);
                }
            }

            delete (dataSeries.dataPointIndexes);
        }

        RenderHelper.drawMarkers(markers);


        ctx.restore();

        if (isCanvasSupported)
            ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderStackedArea100 = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;
        var markers = [];

        var offsetY = [];

        var allXValues = [];
        //var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.


        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) * .9) << 0;

        var ghostCtx = this._eventManager.ghostCtx;

        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();


        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        xValuePresent = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var xValue;

            dataSeries.dataPointIndexes = [];

            for (i = 0; i < dataPoints.length; i++) {
                xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                dataSeries.dataPointIndexes[xValue] = i;

                if (!xValuePresent[xValue]) {
                    allXValues.push(xValue);
                    xValuePresent[xValue] = true;
                }
            }

            allXValues.sort(compareNumbers);
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;

            if (dataPoints.length == 1)
                barWidth = maxBarWidth;

            if (barWidth < 1)
                barWidth = 1;
            else if (barWidth > maxBarWidth)
                barWidth = maxBarWidth;

            var currentBaseValues = [];

            if (allXValues.length > 0) {

                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                var bevelEnabled = (barWidth > 5) ? false : false;

                //ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < allXValues.length; i++) {

                    dataPointX = allXValues[i];
                    var dataPoint = null;

                    if (dataSeries.dataPointIndexes[dataPointX] >= 0)
                        dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
                    else
                        dataPoint = { x: dataPointX, y: 0 };

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoint.y) !== "number")
                        continue;

                    var yPercent;
                    if (plotUnit.dataPointYSums[dataPointX] !== 0)
                        yPercent = dataPoint.y / plotUnit.dataPointYSums[dataPointX] * 100;
                    else
                        yPercent = 0;

                    var x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum));

                    var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

                    y = y - offset;
                    currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                    offsetY[dataPointX] = yZeroToPixel - y;

                    if (isFirstDataPointInPlotArea) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                    }
                    else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {

                            if (dataSeries.lineThickness > 0)
                                ctx.stroke();

                            while (currentBaseValues.length > 0) {
                                var point = currentBaseValues.pop();
                                ctx.lineTo(point.x, point.y);

                                if (isCanvasSupported)
                                    ghostCtx.lineTo(point.x, point.y);
                            }

                            ctx.closePath();

                            ctx.globalAlpha = dataSeries.fillOpacity;
                            ctx.fill();
                            ctx.globalAlpha = 1;

                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.closePath();
                                ghostCtx.fill();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }

                            currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                        }
                    }


                    if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
                        var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
                        this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y };
                    }

                    //Render Marker
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
                        if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoint.indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedArea100",
                            dataPoint: dataPoint,
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: dataPoints[i].y >= 0 ? 1 : -1,
                            color: color
                        });

                    }
                }

                if (dataSeries.lineThickness > 0)
                    ctx.stroke();

                while (currentBaseValues.length > 0) {
                    var point = currentBaseValues.pop();
                    ctx.lineTo(point.x, point.y);

                    if (isCanvasSupported)
                        ghostCtx.lineTo(point.x, point.y);
                }

                ctx.closePath();

                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                ctx.beginPath();
                ctx.moveTo(x, y);

                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(x, y);
                }
            }

            delete (dataSeries.dataPointIndexes);
        }

        RenderHelper.drawMarkers(markers);

        ctx.restore();

        if (isCanvasSupported)
            ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderBubble = function (plotUnit) {

        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;


        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        var maxZ = -Infinity;
        var minZ = Infinity;

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var z = 0;

            for (var i = 0; i < dataPoints.length; i++) {

                dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                    continue;
                }

                if (typeof (dataPoints[i].z) !== "undefined") {

                    z = dataPoints[i].z;

                    if (z > maxZ)
                        maxZ = z;

                    if (z < minZ)
                        minZ = z;
                }
            }
        }

        var minArea = Math.PI * 5 * 5;
        var maxArea = Math.max(Math.pow(Math.min(plotArea.height, plotArea.width) * .25 / 2, 2) * Math.PI, minArea);

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            if (dataPoints.length == 1)
                barWidth = maxBarWidth;

            if (barWidth < 1)
                barWidth = 1;
            else if (barWidth > maxBarWidth)
                barWidth = maxBarWidth;

            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);
                //var bevelEnabled = (barWidth > 5) ? false : false;

                ctx.strokeStyle = "#4572A7 ";



                for (var i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var z = dataPoints[i].z;

                    var area = (maxZ === minZ) ? maxArea / 2 : minArea + (maxArea - minArea) / (maxZ - minZ) * (z - minZ);
                    var radius = Math.max(Math.sqrt(area / Math.PI) << 0, 1);

                    var markerSize = radius * 2;
                    var markerProps = dataSeries.getMarkerProperties(i, ctx);
                    markerProps.size = markerSize;


                    ctx.globalAlpha = dataSeries.fillOpacity;
                    RenderHelper.drawMarker(x, y, ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
                    ctx.globalAlpha = 1;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y, size: markerSize };
                    var markerColor = intToHexColorString(id);
                    //RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerType, markerSize, markerColor, markerColor, dataSeries.markerBorderThickness);
                    if (isCanvasSupported)
                        RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerProps.type, markerProps.size, markerColor, markerColor, markerProps.borderThickness);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "bubble",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: 1,
                            color: color
                        });
                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderScatter = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;


        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            if (dataPoints.length == 1)
                barWidth = maxBarWidth;

            if (barWidth < 1)
                barWidth = 1;
            else if (barWidth > maxBarWidth)
                barWidth = maxBarWidth;

            if (dataPoints.length > 0) {
                //var bevelEnabled = (barWidth > 5) ? false : false;

                ctx.strokeStyle = "#4572A7 ";

                var maxArea = Math.pow(Math.min(plotArea.height, plotArea.width) * .3 / 2, 2) * Math.PI;

                var prevDataPointX = 0;
                var prevDataPointY = 0;

                for (var i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);

                    ctx.globalAlpha = dataSeries.fillOpacity;
                    RenderHelper.drawMarker(markerProps.x, markerProps.y, markerProps.ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
                    ctx.globalAlpha = 1;


                    //if (Math.abs(prevDataPointX - x) < markerProps.size / 2 && Math.abs(prevDataPointY - y) < markerProps.size / 2) {
                    //    continue;
                    //}

                    //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                    //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                    //}

                    if ((Math.sqrt((prevDataPointX - x) * (prevDataPointX - x) + (prevDataPointY - y) * (prevDataPointY - y)) < Math.min(markerProps.size, 5))
						&& dataPoints.length > (Math.min(this.plotArea.width, this.plotArea.height))) {
                        continue;
                    }

                    //Render ID on Ghost Canvas - for event handling
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };
                    var markerColor = intToHexColorString(id);

                    if (isCanvasSupported) {
                        RenderHelper.drawMarker(
								markerProps.x, markerProps.y, this._eventManager.ghostCtx,
								markerProps.type,
								markerProps.size,
								markerColor,
								markerColor,
								markerProps.borderThickness
							);
                    }
                    //markers.push();

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "scatter",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            direction: 1,
                            color: color
                        });
                    }

                    prevDataPointX = x;
                    prevDataPointY = y;
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderCandlestick = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var ghostCtx = this._eventManager.ghostCtx;

        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y1, y2, y3, y4;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        //var maxBarWidth = (this.width * .15);
        var maxBarWidth = (this.width * .015);
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) * .7) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();
        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        //ctx.beginPath();

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            // Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            //var offsetX = barWidth * plotUnit.index << 0;


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (dataPoints[i].y === null || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number"
						|| typeof (dataPoints[i].y[2]) !== "number" || typeof (dataPoints[i].y[3]) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    y2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    y3 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[2] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    y4 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[3] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var x1 = (x - barWidth / 2) << 0;
                    var x2 = (x1 + barWidth) << 0;


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[0];


                    //var borderThickness = Math.max(2, ((barWidth * .1) / 2 << 0) * 2); // Set only even numbers for border
                    var borderThickness = Math.round(Math.max(1, (barWidth * .15)));
                    //borderThickness = (borderThickness / 2 << 0) * 2;
                    //borderThickness = 2;
                    var offset = borderThickness % 2 === 0 ? 0 : .5;


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2,
                        x3: x, y3: y3, x4: x, y4: y4, borderThickness: borderThickness, color: color
                    };

                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.lineWidth = borderThickness;
                    ghostCtx.lineWidth = Math.max(borderThickness, 4);

                    if (dataSeries.type === "candlestick") {

                        ctx.moveTo(x - offset, y2);
                        ctx.lineTo(x - offset, Math.min(y1, y4));
                        ctx.stroke();
                        ctx.moveTo(x - offset, Math.max(y1, y4));
                        ctx.lineTo(x - offset, y3);
                        ctx.stroke();

                        drawRect(ctx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), dataPoints[i].y[0] <= dataPoints[i].y[3] ? dataSeries.risingColor : color, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);


                        if (isCanvasSupported) {
                            color = intToHexColorString(id);
                            ghostCtx.strokeStyle = color;

                            ghostCtx.moveTo(x - offset, y2);
                            ghostCtx.lineTo(x - offset, Math.min(y1, y4));
                            ghostCtx.stroke();
                            ghostCtx.moveTo(x - offset, Math.max(y1, y4));
                            ghostCtx.lineTo(x - offset, y3);
                            ghostCtx.stroke();
                            drawRect(ghostCtx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), color, 0, null, false, false, false, false);
                        }
                    }
                    else if (dataSeries.type === "ohlc") {

                        ctx.moveTo(x - offset, y2);
                        ctx.lineTo(x - offset, y3);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(x, y1);
                        ctx.lineTo(x1, y1);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(x, y4);
                        ctx.lineTo(x2, y4);
                        ctx.stroke();

                        if (isCanvasSupported) {

                            color = intToHexColorString(id);
                            ghostCtx.strokeStyle = color;

                            ghostCtx.moveTo(x - offset, y2);
                            ghostCtx.lineTo(x - offset, y3);
                            ghostCtx.stroke();

                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y1);
                            ghostCtx.lineTo(x1, y1);
                            ghostCtx.stroke();

                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y4);
                            ghostCtx.lineTo(x2, y4);
                            ghostCtx.stroke();
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: dataSeries.type,
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x1 + (x2 - x1) / 2, y: y2 },
                            direction: 1,
                            bounds: { x1: x1, y1: Math.min(y2, y3), x2: x2, y2: Math.max(y2, y3) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderRangeColumn = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y1, y2;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = (this.width * .03);
        //var maxBarWidth = (this.width * .015);
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        //var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) * .9) << 0;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        //ctx.beginPath();

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            // Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            //var offsetX = barWidth * plotUnit.index << 0;


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (dataPoints[i].y === null || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    y2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    //var x1 = x - barWidth / 2 << 0;
                    var x1 = x - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                    if (y1 > y2) {
                        var temp = y1;
                        y1 = y2;
                        y2 = temp;
                    }

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };

                    //var borderThickness = Math.max(1, (barWidth * .1 << 0));
                    var borderThickness = 0;

                    drawRect(ctx, x1, y1, x2, y2, color, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "rangeColumn",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: { x: x1 + (x2 - x1) / 2, y: dataPoints[i].y[1] >= dataPoints[i].y[0] ? y2 : y1 },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                        this._indexLabels.push({
                            chartType: "rangeColumn",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: { x: x1 + (x2 - x1) / 2, y: dataPoints[i].y[1] >= dataPoints[i].y[0] ? y1 : y2 },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();


        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderRangeBar = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x1, x2, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        //In case of Bar Chart, yZeroToPixel is x co-ordinate!
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        //var maxBarWidth = this.height * .15;
        var maxBarWidth = Math.min((this.height * .15), this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        //var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;

        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            //dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (dataPoints[i].y === null || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number")
                        continue;

                    //x and y are pixel co-ordinates of point and should not be confused with X and Y values
                    x1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    x2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;


                    var y1 = (y - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0;
                    var y2 = y1 + barWidth << 0;

                    if (x1 > x2) {
                        var temp = x1;
                        x1 = x2;
                        x2 = temp;
                    }

                    //drawRect(ctx, x1, y1, plotArea.x2, y2, "#EEEEEE", 0, null, false, false, false, false);
                    //drawRect(ctx, x1, y1, plotArea.x2, y2, "#BDCED3", 0, null, false, false, false, false);

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    //color = "#1B4962";
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "rangeBar",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: { x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x1 : x2, y: y1 + (y2 - y1) / 2 },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
                            bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                            color: color
                        });

                        this._indexLabels.push({
                            chartType: "rangeBar",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: { x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x2 : x1, y: y1 + (y2 - y1) / 2 },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
                            bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                            color: color
                        });
                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0 };
        return animationInfo;
    }

    Chart.prototype.renderRangeArea = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var closingPath = [];

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y1, y2;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                var prevDataNull = true;
                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (dataPoints[i].y === null || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number") {

                        closeArea();

                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

                    y1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    y2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y1);
                        startPoint = { x: x, y: y1 };
                        closingPath = [];
                        closingPath.push({ x: x, y: y2 });

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y1);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    }
                    else {

                        ctx.lineTo(x, y1);
                        closingPath.push({ x: x, y: y2 });

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y1);

                        if (i % 250 == 0) {
                            closeArea();
                        }
                    }


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y1, y2: y2 };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y2, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y2, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }

                            markerProps = dataSeries.getMarkerProperties(i, x, y1, ctx);
                            markers.push(markerProps);



                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y1, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "rangeArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: { x: x, y: y1 },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? -1 : 1,
                            color: color
                        });

                        this._indexLabels.push({
                            chartType: "rangeArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: { x: x, y: y2 },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? 1 : -1,
                            color: color
                        });

                    }

                    //alert("hi");
                }

                closeArea();

                //startPoint = { x: x, y: y };
                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function closeArea() {

            if (!startPoint)
                return;

            var point = null;

            if (dataSeries.lineThickness > 0)
                ctx.stroke();

            for (var i = closingPath.length - 1; i >= 0; i--) {
                point = closingPath[i];
                ctx.lineTo(point.x, point.y);
                ghostCtx.lineTo(point.x, point.y);
            }



            ctx.closePath();
            //ctx.lineTo(startPoint.x, startPoint.y);

            ctx.globalAlpha = dataSeries.fillOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;

            ghostCtx.fill();

            //if (isCanvasSupported) {
            //	ghostCtx.lineTo(x, baseY);
            //	ghostCtx.lineTo(startPoint.x, baseY);
            //	ghostCtx.closePath();
            //	ghostCtx.fill();
            //}

            if (dataSeries.lineThickness > 0) {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                for (var i = 0; i < closingPath.length; i++) {
                    point = closingPath[i];
                    ctx.lineTo(point.x, point.y);
                }

                ctx.stroke();
            }


            ctx.beginPath();
            ctx.moveTo(x, y1);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y1);

            startPoint = { x: x, y: y1 };
            closingPath = [];
            closingPath.push({ x: x, y: y2 });
        }

        //ctx.beginPath();
        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }


    Chart.prototype.renderRangeSplineArea = function (plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y1, y2;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            var pixelsY1 = [];
            var pixelsY2 = [];

            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;

                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (dataPoints[i].y === null || !dataPoints[i].y.length || typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number") {
                        if (i > 0) {
                            renderBezierArea();
                            pixelsY1 = [];
                            pixelsY2 = [];
                        }
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
                    y2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y1, y2: y2 };

                    pixelsY1[pixelsY1.length] = { x: x, y: y1 };
                    pixelsY2[pixelsY2.length] = { x: x, y: y2 };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y1, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y1, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }

                            var markerProps = dataSeries.getMarkerProperties(i, x, y2, ctx);
                            markers.push(markerProps);

                            //if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            //	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            //}

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y2, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }


                    //Render Index Labels
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "splineArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: { x: x, y: y1 },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? -1 : 1,
                            color: color
                        });

                        this._indexLabels.push({
                            chartType: "splineArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: { x: x, y: y2 },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? 1 : -1,
                            color: color
                        });

                    }
                }

                renderBezierArea();

                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function renderBezierArea() {
            var bp = getBezierPoints(pixelsY1, 2);

            if (bp.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp[0].x, bp[0].y);

                if (isCanvasSupported) {
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(bp[0].x, bp[0].y);
                }


                for (var i = 0; i < bp.length - 3; i += 3) {

                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (isCanvasSupported)
                        ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                }

                if (dataSeries.lineThickness > 0)
                    ctx.stroke();

                bp = getBezierPoints(pixelsY2, 2);

                ctx.lineTo(pixelsY2[pixelsY2.length - 1].x, pixelsY2[pixelsY2.length - 1].y);

                for (var i = bp.length - 1; i > 2; i -= 3) {

                    ctx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);

                    if (isCanvasSupported)
                        ghostCtx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
                }

                ctx.closePath();

                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;


                if (dataSeries.lineThickness > 0) {
                    ctx.beginPath();
                    ctx.moveTo(pixelsY2[pixelsY2.length - 1].x, pixelsY2[pixelsY2.length - 1].y);

                    for (var i = bp.length - 1; i > 2; i -= 3) {

                        ctx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);

                        if (isCanvasSupported)
                            ghostCtx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
                    }
                    ctx.stroke();
                }

                ctx.beginPath();


                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                }
            }
        }

        //source and dest would be same when animation is not enabled
        var animationInfo = { source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0 };
        return animationInfo;
    }
    //#region pieChart

    var drawSegment = function (ctx, center, radius, color, type, theta1, theta2, fillOpacity) {

        if (typeof (fillOpacity) === "undefined")
            fillOpacity = 1;

        //IE8- FIX: In IE8- segment doesn't get draw if theta2 is equal to theta1 + 2*PI.
        if (!isCanvasSupported) {
            var theta2Mod = Number((theta2 % (2 * Math.PI)).toFixed(8));
            var theta1Mod = Number((theta1 % (2 * Math.PI)).toFixed(8));
            if (theta1Mod === theta2Mod)
                theta2 -= .0001;
        }

        ctx.save();

        ctx.globalAlpha = fillOpacity;

        if (type === "pie") {
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.arc(center.x, center.y, radius, theta1, theta2, false);
            ctx.fillStyle = color;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            //    ctx.shadowOffsetX = 2;
            //    ctx.shadowOffsetY = 1;
            //     ctx.shadowBlur = 2;
            //    ctx.shadowColor = '#BFBFBF';
            ctx.closePath();
            //ctx.stroke();
            ctx.fill();
        }
        else if (type === "doughnut") {
            var widthPercentage = 0.60;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, theta1, theta2, false);
            ctx.arc(center.x, center.y, widthPercentage * radius, theta2, theta1, true);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            // shadow properties
            //     ctx.shadowOffsetX = 1;
            //    ctx.shadowOffsetY = 1;
            //     ctx.shadowBlur = 1;
            //    ctx.shadowColor = '#BFBFBF';  //grey shadow
            //ctx.stroke();
            ctx.fill();
        }

        ctx.globalAlpha = 1;

        ctx.restore();
    };

    Chart.prototype.renderPie = function (plotUnit) {

        var _this = this;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var dataSeriesIndex = plotUnit.dataSeriesIndexes[0];
        var dataSeries = this.data[dataSeriesIndex];
        var dataPoints = dataSeries.dataPoints;
        var indexLabelLineEdgeLength = 10;
        var explodeDuration = 500;

        var plotArea = this.plotArea;

        //var maxFrame = isCanvasSupported ? 300 : 4;
        var totalRecursions = 0;
        var dataPointEOs = []; //dataPoint Extension Objects Behaves like a storage place for all additional data relating to dataPoints. Requred because actual dataPoints should not be modified.

        var minDistanceBetweenLabels = 2;
        var indexLabelRadiusToRadiusRatio = 1.3;
        var poleAnglularDistance = (20 / 180) * Math.PI; //Anglular Distance from 90 & 270 to be considered pole
        var precision = 6;

        var center = { x: (plotArea.x2 + plotArea.x1) / 2, y: (plotArea.y2 + plotArea.y1) / 2 };
        var outerRadius = dataSeries.indexLabelPlacement === "inside" ? (Math.min(plotArea.width, plotArea.height) * 0.92) / 2 : (Math.min(plotArea.width, plotArea.height) * 0.8) / 2;
        var innerRadius = outerRadius * .6;

        var indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;
        var newPieRadius = outerRadius;

        var sum = 0;
        for (var j = 0; j < dataPoints.length; j++) {
            sum += Math.abs(dataPoints[j].y);
        }

        if (sum === 0)
            return;

        function initLabels() {

            if (!dataSeries || !dataPoints)
                return;


            var noDPNearSouthPole = 0;
            var noDPNearNorthPole = 0;
            var firstDPCloseToSouth = 0;
            var firstDPCloseToNorth = 0;

            for (j = 0; j < dataPoints.length; j++) {

                var dataPoint = dataPoints[j];
                var id = dataSeries.dataPointIds[j];

                var dataPointEO = { id: id, objectType: "dataPoint", dataPointIndex: j, dataSeriesIndex: 0 };
                dataPointEOs.push(dataPointEO);
                var indexLabelText = dataPoint.indexLabel ? dataPoint.indexLabel : dataSeries.indexLabel ? dataSeries.indexLabel : dataPoint.label ? dataPoint.label : dataSeries.label ? dataSeries.label : '';


                _this._eventManager.objectMap[id] = dataPointEO;

                //dataPointEO.indexLabelText = j.toString() + " " + "kingfisher: " + dataPoint.y.toString();;
                dataPointEO.center = { x: center.x, y: center.y };
                dataPointEO.y = dataPoint.y;
                dataPointEO.radius = outerRadius;
                dataPointEO.indexLabelText = _this.replaceKeywordsWithValue(indexLabelText, dataPoint, dataSeries, j);
                dataPointEO.indexLabelPlacement = dataSeries.indexLabelPlacement;
                dataPointEO.indexLabelLineColor = dataPoint.indexLabelLineColor ? dataPoint.indexLabelLineColor : dataSeries.indexLabelLineColor ? dataSeries.indexLabelLineColor : dataPoint.color ? dataPoint.color : dataSeries._colorSet[j % dataSeries._colorSet.length];
                dataPointEO.indexLabelLineThickness = dataPoint.indexLabelLineThickness ? dataPoint.indexLabelLineThickness : dataSeries.indexLabelLineThickness;
                dataPointEO.indexLabelFontColor = dataPoint.indexLabelFontColor ? dataPoint.indexLabelFontColor : dataSeries.indexLabelFontColor;
                dataPointEO.indexLabelFontStyle = dataPoint.indexLabelFontStyle ? dataPoint.indexLabelFontStyle : dataSeries.indexLabelFontStyle;
                dataPointEO.indexLabelFontWeight = dataPoint.indexLabelFontWeight ? dataPoint.indexLabelFontWeight : dataSeries.indexLabelFontWeight;
                dataPointEO.indexLabelFontSize = dataPoint.indexLabelFontSize ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
                dataPointEO.indexLabelFontFamily = dataPoint.indexLabelFontFamily ? dataPoint.indexLabelFontFamily : dataSeries.indexLabelFontFamily;
                dataPointEO.indexLabelBackgroundColor = dataPoint.indexLabelBackgroundColor ? dataPoint.indexLabelBackgroundColor : dataSeries.indexLabelBackgroundColor ? dataSeries.indexLabelBackgroundColor : null;
                dataPointEO.indexLabelMaxWidth = dataPoint.indexLabelMaxWidth ? dataPoint.indexLabelMaxWidth : dataSeries.indexLabelMaxWidth ? dataSeries.indexLabelMaxWidth : plotArea.width * .33;
                dataPointEO.indexLabelWrap = typeof (dataPoint.indexLabelWrap) !== "undefined" ? dataPoint.indexLabelWrap : dataSeries.indexLabelWrap;

                dataPointEO.startAngle = j === 0 ? dataSeries.startAngle ? (dataSeries.startAngle / 180) * Math.PI : 0 : dataPointEOs[j - 1].endAngle;

                dataPointEO.startAngle = (dataPointEO.startAngle + (2 * Math.PI)) % (2 * Math.PI);

                dataPointEO.endAngle = dataPointEO.startAngle + ((2 * Math.PI / sum) * Math.abs(dataPoint.y));

                //var midAngle = dataPointEO.startAngle + Math.abs(dataPointEO.endAngle - dataPointEO.startAngle) / 2;
                var midAngle = (dataPointEO.endAngle + dataPointEO.startAngle) / 2;

                //var midAngle = (180 / Math.PI * midAngle);

                midAngle = (midAngle + (2 * Math.PI)) % (2 * Math.PI);

                dataPointEO.midAngle = midAngle;

                if (dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {
                    if (noDPNearSouthPole === 0 || dataPointEOs[firstDPCloseToSouth].midAngle > dataPointEO.midAngle)
                        firstDPCloseToSouth = j;

                    noDPNearSouthPole++;
                }
                else if (dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {
                    if (noDPNearNorthPole === 0 || dataPointEOs[firstDPCloseToNorth].midAngle > dataPointEO.midAngle)
                        firstDPCloseToNorth = j;

                    noDPNearNorthPole++;
                }


                if (midAngle > (Math.PI / 2) && midAngle <= (3 * Math.PI / 2))
                    dataPointEO.hemisphere = "left";
                else
                    dataPointEO.hemisphere = "right";

                //dataPointEO.indexLabelText = j.toString() + "; " + dataPoint.y.toString() + "; " + midAngle.toString() + "; junk";				
                dataPointEO.indexLabelTextBlock = new TextBlock(_this.plotArea.ctx, {
                    fontSize: dataPointEO.indexLabelFontSize, fontFamily: dataPointEO.indexLabelFontFamily, fontColor: dataPointEO.indexLabelFontColor,
                    fontStyle: dataPointEO.indexLabelFontStyle, fontWeight: dataPointEO.indexLabelFontWeight,
                    horizontalAlign: "left",
                    backgroundColor: dataPointEO.indexLabelBackgroundColor,
                    maxWidth: dataPointEO.indexLabelMaxWidth, maxHeight: dataPointEO.indexLabelWrap ? dataPointEO.indexLabelFontSize * 5 : dataPointEO.indexLabelFontSize * 1.5,
                    text: dataPointEO.indexLabelText,
                    padding: 0,
                    //textBaseline: dataPointEO.indexLabelBackgroundColor ? "middle" : "top"
                    textBaseline: "top"
                });

                dataPointEO.indexLabelTextBlock.measureText();

                //dataPoint.labelWidth = ctx.measureText(j.toString() + "; " + dataPoint.label).width;

                //console.log(dataPoint.label);
            }

            var noOfDPToRightOfSouthPole = 0;
            var noOfDPToLeftOfNorthPole = 0;
            var keepSameDirection = false; // once a dataPoint's hemisphere is changed, others should follow the same so that there are no labes near pole pointing in opposite direction.

            for (j = 0; j < dataPoints.length; j++) {

                var dataPointEO = dataPointEOs[(firstDPCloseToSouth + j) % dataPoints.length];

                if (noDPNearSouthPole > 1 && dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {

                    if (noOfDPToRightOfSouthPole <= noDPNearSouthPole / 2 && !keepSameDirection) {
                        dataPointEO.hemisphere = "right";
                        noOfDPToRightOfSouthPole++;
                    }
                    else {
                        dataPointEO.hemisphere = "left";
                        keepSameDirection = true;
                    }
                }
            }

            keepSameDirection = false;
            for (j = 0; j < dataPoints.length; j++) {

                var dataPointEO = dataPointEOs[(firstDPCloseToNorth + j) % dataPoints.length];

                //if (dataPoint.hemisphere = "right")
                //	break;

                if (noDPNearNorthPole > 1 && dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {

                    if (noOfDPToLeftOfNorthPole <= noDPNearNorthPole / 2 && !keepSameDirection) {
                        dataPointEO.hemisphere = "left";
                        noOfDPToLeftOfNorthPole++;
                    }
                    else {
                        dataPointEO.hemisphere = "right";
                        keepSameDirection = true;
                    }
                }
            }
        }//End of initLabels()

        function renderLabels() {

            var ctx = _this.plotArea.ctx;
            ctx.fillStyle = "black";
            ctx.strokeStyle = "grey";
            var fontSize = 16;
            //ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            ctx.lineJoin = "round";
            var i = 0, j = 0;

            for (i = 0; i < dataPoints.length; i++) {
                var dataPointEO = dataPointEOs[i];

                if (!dataPointEO.indexLabelText)
                    continue;

                dataPointEO.indexLabelTextBlock.y -= dataPointEO.indexLabelTextBlock.height / 2;

                var xOffset = 0;

                if (dataPointEO.hemisphere === "left") {
                    var xOffset = dataSeries.indexLabelPlacement !== "inside" ? -(dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength) : -dataPointEO.indexLabelTextBlock.width / 2;
                }
                else {
                    var xOffset = dataSeries.indexLabelPlacement !== "inside" ? indexLabelLineEdgeLength : -dataPointEO.indexLabelTextBlock.width / 2;
                }

                dataPointEO.indexLabelTextBlock.x += xOffset;
                dataPointEO.indexLabelTextBlock.render(true);
                dataPointEO.indexLabelTextBlock.x -= xOffset;

                //if (i < 4)
                //	customPrompt(i + "; " + center.y + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));

                dataPointEO.indexLabelTextBlock.y += dataPointEO.indexLabelTextBlock.height / 2;

                if (dataPointEO.indexLabelPlacement !== "inside") {
                    var indexLabelLineStartX = dataPointEO.center.x + outerRadius * Math.cos(dataPointEO.midAngle);
                    var indexLabelLineStartY = dataPointEO.center.y + outerRadius * Math.sin(dataPointEO.midAngle);

                    //ctx.strokeStyle = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    ctx.strokeStyle = dataPointEO.indexLabelLineColor;
                    ctx.lineWidth = dataPointEO.indexLabelLineThickness;
                    //ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(indexLabelLineStartX, indexLabelLineStartY);
                    ctx.lineTo(dataPointEO.indexLabelTextBlock.x, dataPointEO.indexLabelTextBlock.y);
                    ctx.lineTo(dataPointEO.indexLabelTextBlock.x + (dataPointEO.hemisphere === "left" ? -indexLabelLineEdgeLength : indexLabelLineEdgeLength), dataPointEO.indexLabelTextBlock.y);
                    ctx.stroke();
                    //ctx.closePath();
                    //window.alert("contine??");
                    //animate();
                }

                ctx.lineJoin = "miter";
            }
        }

        function animate(fractionComplete) {

            var ctx = _this.plotArea.ctx;

            ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ctx.fillStyle = _this.backgroundColor;
            ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

            var maxAngle = dataPointEOs[0].startAngle + (2 * Math.PI * fractionComplete);

            for (var i = 0; i < dataPoints.length; i++) {

                var startAngle = i === 0 ? dataPointEOs[i].startAngle : endAngle;
                var endAngle = startAngle + (dataPointEOs[i].endAngle - dataPointEOs[i].startAngle);

                var shouldBreak = false;

                if (endAngle > maxAngle) {
                    endAngle = maxAngle;
                    shouldBreak = true;
                }

                var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                if (endAngle > startAngle)
                    drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle, dataSeries.fillOpacity);

                if (shouldBreak)
                    break;
            }
        }

        function explodeToggle(fractionComplete) {

            var ctx = _this.plotArea.ctx;

            ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ctx.fillStyle = _this.backgroundColor;
            ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

            for (var i = 0; i < dataPoints.length; i++) {

                var startAngle = dataPointEOs[i].startAngle;
                var endAngle = dataPointEOs[i].endAngle;

                if (endAngle > startAngle) {


                    var offsetX = (outerRadius * .07 * Math.cos(dataPointEOs[i].midAngle));
                    var offsetY = (outerRadius * .07 * Math.sin(dataPointEOs[i].midAngle));
                    var isInTransition = false;

                    if (dataPoints[i].exploded) {
                        if (Math.abs(dataPointEOs[i].center.x - (center.x + offsetX)) > 0.000000001 || Math.abs(dataPointEOs[i].center.y - (center.y + offsetY)) > 0.000000001) {

                            dataPointEOs[i].center.x = center.x + offsetX * fractionComplete;
                            dataPointEOs[i].center.y = center.y + offsetY * fractionComplete;

                            isInTransition = true;
                        }
                    } else if (Math.abs(dataPointEOs[i].center.x - center.x) > 0 || Math.abs(dataPointEOs[i].center.y - center.y) > 0) {
                        dataPointEOs[i].center.x = center.x + offsetX * (1 - fractionComplete);
                        dataPointEOs[i].center.y = center.y + offsetY * (1 - fractionComplete);

                        isInTransition = true;
                    }

                    if (isInTransition) {
                        var entry = {};
                        entry.dataSeries = dataSeries;
                        entry.dataPoint = dataSeries.dataPoints[i];
                        entry.index = i;
                        _this._toolTip.highlightObjects([entry]);
                    }

                    var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                    drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle, dataSeries.fillOpacity);
                }
            }

            //window.alert("next??");
            renderLabels();
        }

        function areDataPointsTooClose(first, second) {

            var label1 = { x1: first.indexLabelTextBlock.x, y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2, x2: first.indexLabelTextBlock.x + first.indexLabelTextBlock.width, y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2 };
            var label2 = { x1: second.indexLabelTextBlock.x, y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2, x2: second.indexLabelTextBlock.x + second.indexLabelTextBlock.width, y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2 };

            if (label1.x2 < label2.x1 - indexLabelLineEdgeLength || label1.x1 > label2.x2 + indexLabelLineEdgeLength || label1.y1 > label2.y2 + indexLabelLineEdgeLength || label1.y2 < label2.y1 - indexLabelLineEdgeLength)
                return false;

            return true;
        }

        function getVerticalDistanceBetweenLabels(first, second) {

            var distance = 0;
            var label1 = { y: first.indexLabelTextBlock.y, y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2, y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2 };
            var label2 = { y: second.indexLabelTextBlock.y, y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2, y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2 };

            if (label2.y > label1.y) {
                distance = label2.y1 - label1.y2;
            }
            else {
                distance = label1.y1 - label2.y2;
            }

            return distance;
        }

        function getNextLabelIndex(currentLabelIndex) {
            var nextLabelIndex = null;

            for (var i = 1; i < dataPoints.length; i++) {

                nextLabelIndex = (currentLabelIndex + i + dataPointEOs.length) % dataPointEOs.length;

                if (dataPointEOs[nextLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
                    nextLabelIndex = null;
                    break;
                }
                else if ((dataPointEOs[nextLabelIndex].indexLabelText) && (nextLabelIndex !== currentLabelIndex)
					&& ((getVerticalDistanceBetweenLabels(dataPointEOs[nextLabelIndex], dataPointEOs[currentLabelIndex]) < 0) || (dataPointEOs[currentLabelIndex].hemisphere === "right" ? dataPointEOs[nextLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[nextLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y)))
                    break;
                else {
                    nextLabelIndex = null;
                }
            }

            return nextLabelIndex;
        }

        function getPreviousLabelIndex(currentLabelIndex) {
            var prevLabelIndex = null;

            for (var i = 1; i < dataPoints.length; i++) {

                prevLabelIndex = (currentLabelIndex - i + dataPointEOs.length) % dataPointEOs.length;

                if (dataPointEOs[prevLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
                    prevLabelIndex = null;
                    break;
                }
                else if ((dataPointEOs[prevLabelIndex].indexLabelText) && (dataPointEOs[prevLabelIndex].hemisphere === dataPointEOs[currentLabelIndex].hemisphere) && (prevLabelIndex !== currentLabelIndex)
					&& ((getVerticalDistanceBetweenLabels(dataPointEOs[prevLabelIndex], dataPointEOs[currentLabelIndex]) < 0) || (dataPointEOs[currentLabelIndex].hemisphere === "right" ? dataPointEOs[prevLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[prevLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y)))
                    break;
                else {
                    prevLabelIndex = null;
                }

            }

            return prevLabelIndex;
        }

        function rePositionLabels(dataPointIndex, offset) {

            offset = offset || 0;

            var actualOffset = 0;

            //var labelYMin = 2;
            //var labelYMax = ctx.canvas.height - 2;
            //var labelYMin = _this.plotArea.ctx.canvas.height / 2 - indexLabelRadius * 1;
            //var labelYMax = _this.plotArea.ctx.canvas.height / 2 + indexLabelRadius * 1;

            var labelYMin = center.y - indexLabelRadius * 1;
            var labelYMax = center.y + indexLabelRadius * 1;

            //console.log(totalRecursions);

            if (dataPointIndex >= 0 && dataPointIndex < dataPoints.length) {

                var dataPointEO = dataPointEOs[dataPointIndex];

                //if (dataPointIndex === 0)
                //	customPrompt(labelYMin.toFixed(2) + "; " + labelYMax.toFixed(2) + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));

                // If label is already outside the bounds, return
                if ((offset < 0 && dataPointEO.indexLabelTextBlock.y < labelYMin) || (offset > 0 && dataPointEO.indexLabelTextBlock.y > labelYMax))
                    return 0;


                var validOffset = offset;


                //Check if the offset falls within the bounds (labelYMin, labelYMax, tangential bounds) without considering overlap. Else use the closest offset that is possible - validOffset.
                {
                    var distFromIndexLineStart = 0;
                    var indexLabelLineStartX = 0;
                    var indexLabelLineStartY = 0;
                    var indexLabelAngle = 0;
                    var indexLabelAngleWhenTangent = 0;

                    if (validOffset < 0) {
                        if (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 > labelYMin && dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset < labelYMin)
                            validOffset = -(labelYMin - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset));
                    } else {
                        if (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMin && dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset > labelYMax)
                            validOffset = (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset) - labelYMax;
                    }

                    var newlabelY = dataPointEO.indexLabelTextBlock.y + validOffset;
                    var newlabelX = 0;

                    if (dataPointEO.hemisphere === "right") {
                        newlabelX = center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));
                    }
                    else
                        newlabelX = center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));


                    indexLabelLineStartX = center.x + outerRadius * Math.cos(dataPointEO.midAngle);
                    indexLabelLineStartY = center.y + outerRadius * Math.sin(dataPointEO.midAngle);

                    distFromIndexLineStart = Math.sqrt(Math.pow(newlabelX - indexLabelLineStartX, 2) + Math.pow(newlabelY - indexLabelLineStartY, 2));

                    indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius);

                    //indexLabelAngle = Math.acos((outerRadius * outerRadius + distFromIndexLineStart * distFromIndexLineStart - indexLabelRadius * indexLabelRadius) / (2 * outerRadius * distFromIndexLineStart));
                    indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));

                    if (indexLabelAngle < indexLabelAngleWhenTangent) {
                        validOffset = newlabelY - dataPointEO.indexLabelTextBlock.y;
                        //dataPointEO.indexLabelTextBlock.x = newlabelX;
                    }
                    else {

                        validOffset = 0;

                        //dataPointEO.indexLabelTextBlock.x = newlabelX;

                        //Index Line is overlapping the pie. So lets find out the point where indexline becomes a tangent.

                        //distFromIndexLineStart = Math.sqrt(indexLabelRadius * indexLabelRadius - outerRadius * outerRadius);
                        ////distFromIndexLineStart *= offset < 0 ? -1 : 1;
                        ////indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));
                        //indexLabelAngle = Math.atan2(distFromIndexLineStart, outerRadius);

                        //newlabelX = center.x + indexLabelRadius * Math.cos(indexLabelAngle);
                        //newlabelY = center.y + indexLabelRadius * Math.sin(indexLabelAngle);

                        //actualOffset = newlabelY - dataPointEO.indexLabelTextBlock.y;

                        //dataPointEO.indexLabelTextBlock.y = newlabelY;
                        //dataPointEO.indexLabelTextBlock.x = newlabelX;

                    }
                }

                //var tempIndex = (dataPointIndex + dataPointEOs.length - 1) % dataPointEOs.length;

                //var prevDataPointIndex = dataPointEOs[tempIndex].hemisphere === dataPointEO.hemisphere ? tempIndex : null;

                var prevDataPointIndex = getPreviousLabelIndex(dataPointIndex);

                //tempIndex = (dataPointIndex + dataPointEOs.length + 1) % dataPointEOs.length;

                //var nextDataPointIndex = dataPointEOs[tempIndex].hemisphere === dataPointEO.hemisphere ? tempIndex : null;

                var nextDataPointIndex = getNextLabelIndex(dataPointIndex);

                var otherdataPointEO, otherDataPointIndex, distanceFromOtherLabel;
                var otherDataPointOffset = 0;
                var otherDataPointActualOffset = 0;


                if (validOffset < 0) {

                    otherDataPointIndex = dataPointEO.hemisphere === "right" ? prevDataPointIndex : nextDataPointIndex;

                    actualOffset = validOffset;

                    if (otherDataPointIndex !== null) {

                        //if (dataPointIndex < 4)
                        //	customPrompt("valid: " + validOffset);

                        var tempOffset = -validOffset;

                        var distanceFromOtherLabel = (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2) - (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y + dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2);

                        if (distanceFromOtherLabel - tempOffset < minDistanceBetweenLabels) {
                            otherDataPointOffset = -tempOffset;
                            totalRecursions++;
                            otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset);

                            //if (dataPointIndex < 4)
                            //	customPrompt(dataPointIndex + "; " + "offset: " + otherDataPointOffset);


                            if (+otherDataPointActualOffset.toFixed(precision) > +otherDataPointOffset.toFixed(precision)) {

                                if (distanceFromOtherLabel > minDistanceBetweenLabels)
                                    actualOffset = -(distanceFromOtherLabel - minDistanceBetweenLabels);
                                    //else
                                    //	actualOffset = 0;
                                else
                                    actualOffset = -(tempOffset - (otherDataPointActualOffset - otherDataPointOffset));
                            }

                            //if (dataPointIndex < 4)
                            //	customPrompt("actual: " + actualOffset);
                        }

                    }

                } else if (validOffset > 0) {

                    otherDataPointIndex = dataPointEO.hemisphere === "right" ? nextDataPointIndex : prevDataPointIndex;

                    actualOffset = validOffset;

                    if (otherDataPointIndex !== null) {

                        var tempOffset = validOffset;

                        var distanceFromOtherLabel = (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y - dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2) - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);

                        if (distanceFromOtherLabel - tempOffset < minDistanceBetweenLabels) {
                            otherDataPointOffset = tempOffset;
                            totalRecursions++;
                            otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset);

                            if (+otherDataPointActualOffset.toFixed(precision) < +otherDataPointOffset.toFixed(precision)) {

                                if (distanceFromOtherLabel > minDistanceBetweenLabels)
                                    actualOffset = distanceFromOtherLabel - minDistanceBetweenLabels;
                                    //else
                                    //	actualOffset = 0;
                                else
                                    actualOffset = tempOffset - (otherDataPointOffset - otherDataPointActualOffset);
                            }
                        }

                    }

                    //if (!(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + actualOffset < labelYMax)) {
                    //	if (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMax) {
                    //		actualOffset = labelYMax - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);
                    //	}
                    //	else {
                    //		actualOffset = 0;
                    //	}
                    //}

                }

                if (actualOffset) {

                    var newLabelY = dataPointEO.indexLabelTextBlock.y + actualOffset;




                    var newLabelX = 0;

                    if (dataPointEO.hemisphere === "right") {
                        newLabelX = center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));
                    }
                    else
                        newLabelX = center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));

                    if (dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {

                        var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
                        var prevDP = dataPointEOs[prevDPIndex];
                        var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];

                        if (dataPointEO.hemisphere === "left" && prevDP.hemisphere === "right" && newLabelX > prevDP.indexLabelTextBlock.x) {
                            newLabelX = prevDP.indexLabelTextBlock.x - 15;
                        } else if (dataPointEO.hemisphere === "right" && nextDP.hemisphere === "left" && newLabelX < nextDP.indexLabelTextBlock.x) {
                            newLabelX = nextDP.indexLabelTextBlock.x + 15;
                        }
                    } else if (dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {

                        var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
                        var prevDP = dataPointEOs[prevDPIndex];
                        var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];

                        if (dataPointEO.hemisphere === "right" && prevDP.hemisphere === "left" && newLabelX < prevDP.indexLabelTextBlock.x) {
                            newLabelX = prevDP.indexLabelTextBlock.x + 15;
                        } else if (dataPointEO.hemisphere === "left" && nextDP.hemisphere === "right" && newLabelX > nextDP.indexLabelTextBlock.x) {
                            newLabelX = nextDP.indexLabelTextBlock.x - 15;
                        }
                    }

                    //if (actualOffset < 0 && dataPointIndex < 4)
                    //	customPrompt(actualOffset.toFixed(2) + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2) + "; " + newLabelY.toFixed(2));

                    dataPointEO.indexLabelTextBlock.y = newLabelY;

                    dataPointEO.indexLabelTextBlock.x = newLabelX;

                    dataPointEO.indexLabelAngle = Math.atan2((dataPointEO.indexLabelTextBlock.y - center.y), (dataPointEO.indexLabelTextBlock.x - center.x));

                }


            }

            return actualOffset;
        }


        function positionLabels() {
            var ctx = _this.plotArea.ctx;

            ctx.fillStyle = "grey";
            ctx.strokeStyle = "grey";
            var fontSize = 16;
            ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            var i = 0, j = 0;
            var deltaR = 0;

            for (j = 0; j < 10 && (j < 1 || deltaR > 0) ; j++) {

                //console.log(j);
                outerRadius -= deltaR;
                //indexLabelRadius -= deltaR + deltaR;

                deltaR = 0;

                if (dataSeries.indexLabelPlacement !== "inside") {

                    indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;

                    for (i = 0; i < dataPoints.length; i++) {
                        var dataPointEO = dataPointEOs[i];

                        dataPointEO.indexLabelTextBlock.x = center.x + indexLabelRadius * Math.cos(dataPointEO.midAngle);
                        dataPointEO.indexLabelTextBlock.y = center.y + indexLabelRadius * Math.sin(dataPointEO.midAngle);

                        dataPointEO.indexLabelAngle = dataPointEO.midAngle;
                        dataPointEO.radius = outerRadius;
                        //dataPointEO.indexLabelFontSize = dataPoint.indexLabelFontSize ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
                    }

                    var currentDataPoint, nextDataPoint;
                    for (i = 0; i < dataPoints.length; i++) {

                        var dataPointEO = dataPointEOs[i];
                        //dataPointEO.lab
                        //resetAnimationFrame();
                        //animate();
                        //renderLabels();

                        //var prevDataPointIndex = (i - 1 + dataPointEOs.length) % dataPointEOs.length;

                        //var nextDataPointIndex = (i + 1 + dataPointEOs.length) % dataPointEOs.length;
                        //nextDataPointIndex = dataPointEOs[nextDataPointIndex].hemisphere === dataPointEO.hemisphere && nextDataPointIndex !== i ? nextDataPointIndex : null;

                        var nextDataPointIndex = getNextLabelIndex(i);

                        if (nextDataPointIndex === null)
                            continue;

                        currentDataPoint = dataPointEOs[i];
                        nextDataPoint = dataPointEOs[nextDataPointIndex];


                        var distanceFromNextLabel = 0;

                        //if (dataPointEO.hemisphere === "right")
                        //	distanceFromNextLabel = (nextDataPoint.indexLabelTextBlock.y - nextDataPoint.indexLabelTextBlock.height / 2) - (currentDataPoint.indexLabelTextBlock.y + currentDataPoint.indexLabelTextBlock.height / 2) - minDistanceBetweenLabels;
                        //else
                        //	distanceFromNextLabel = (currentDataPoint.indexLabelTextBlock.y - currentDataPoint.indexLabelTextBlock.height / 2) - (nextDataPoint.indexLabelTextBlock.y + nextDataPoint.indexLabelTextBlock.height / 2) - minDistanceBetweenLabels;

                        distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint) - minDistanceBetweenLabels;


                        if (distanceFromNextLabel < 0) {

                            var dataPointsAbove = 0;
                            var dataPointsBelow = 0;
                            //var indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius) / Math.PI * 180;


                            for (var k = 0; k < dataPoints.length; k++) {

                                if (k === i)
                                    continue;

                                //if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].midAngle - dataPointEO.midAngle) > 30)
                                //	continue;
                                //if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].labelAngle - dataPointEO.indexLabelAngle) > 30)
                                //	continue;
                                //if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].midAngle - dataPointEO.midAngle) > indexLabelAngleWhenTangent)
                                //	continue;
                                if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere)
                                    continue;

                                if (dataPointEOs[k].indexLabelTextBlock.y < dataPointEO.indexLabelTextBlock.y)
                                    dataPointsAbove++;
                                else
                                    dataPointsBelow++;
                            }

                            //var upWardsOffset = (distanceFromNextLabel) / dataPoints.length * (dataPointsBelow);
                            var upWardsOffset = (distanceFromNextLabel) / (dataPointsAbove + dataPointsBelow || 1) * (dataPointsBelow);
                            var downWardsOffset = -1 * (distanceFromNextLabel - upWardsOffset);

                            var actualUpwardOffset = 0;
                            var actualDownwardOffset = 0;

                            if (dataPointEO.hemisphere === "right") {
                                actualUpwardOffset = rePositionLabels(i, upWardsOffset);

                                //if (i < 4 && actualDownwardOffset !== upWardsOffset)
                                //	customPrompt(i + "; " + upWardsOffset.toFixed(2) + "; " + actualUpwardOffset.toFixed(2));


                                downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);

                                actualDownwardOffset = rePositionLabels(nextDataPointIndex, downWardsOffset);

                                //window.alert(typeof +downWardsOffset.toFixed(precision));
                                //Setting precision to make sure that they don't become not equal become of minor differences - like a difference of .000001
                                if (+actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision))
                                    rePositionLabels(i, -(downWardsOffset - actualDownwardOffset));

                            } else {
                                actualUpwardOffset = rePositionLabels(nextDataPointIndex, upWardsOffset);

                                downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);

                                actualDownwardOffset = rePositionLabels(i, downWardsOffset);

                                //Setting precision to make sure that they don't become not equal become of minor differences - like a difference of .000001
                                if (+actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision))
                                    rePositionLabels(nextDataPointIndex, -(downWardsOffset - actualDownwardOffset));
                            }
                        }


                        //resetAnimationFrame();
                        //animate();
                        //renderLabels();
                        //window.alert("next??");
                    }
                } else {
                    for (i = 0; i < dataPoints.length; i++) {

                        var dataPointEO = dataPointEOs[i];
                        indexLabelRadius = dataSeries.type === "pie" ? outerRadius * .7 : outerRadius * .8;


                        var dx = center.x + indexLabelRadius * (Math.cos((dataPointEO.midAngle)));
                        var dy = center.y + indexLabelRadius * (Math.sin((dataPointEO.midAngle)));

                        dataPointEO.indexLabelTextBlock.x = dx;
                        dataPointEO.indexLabelTextBlock.y = dy;
                    }
                }

                // Resize Pie based on the label length.
                for (i = 0; i < dataPoints.length; i++) {

                    dataPointEO = dataPointEOs[i];

                    var size = dataPointEO.indexLabelTextBlock.measureText();

                    // To make sure that null text or empty strings don't affect the radius. Required when user is not showing any labels
                    if (size.height === 0 || size.width === 0)
                        continue;

                    var xOverFlow = 0;
                    var xdr = 0;

                    if (dataPointEO.hemisphere === "right") {
                        xOverFlow = plotArea.x2 - (dataPointEO.indexLabelTextBlock.x + dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength);
                        xOverFlow *= -1;
                    } else {
                        xOverFlow = plotArea.x1 - (dataPointEO.indexLabelTextBlock.x - dataPointEO.indexLabelTextBlock.width - indexLabelLineEdgeLength);
                    }

                    if (xOverFlow > 0) {
                        if (Math.abs(dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius
							|| Math.abs(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius) {

                            xdr = xOverFlow / Math.abs(Math.cos(dataPointEO.indexLabelAngle));

                            if (xdr > 9)
                                xdr = xdr * .3;

                            if (xdr > deltaR)
                                deltaR = xdr;

                        } else {

                        }
                    }

                    var yOverFlow = 0;
                    var ydr = 0;

                    if (dataPointEO.indexLabelAngle > 0 && dataPointEO.indexLabelAngle < Math.PI) {
                        yOverFlow = plotArea.y2 - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + 5);
                        yOverFlow *= -1;
                    } else {
                        yOverFlow = plotArea.y1 - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - 5);
                    }

                    if (yOverFlow > 0) {
                        if (Math.abs(dataPointEO.indexLabelTextBlock.x - center.x) < outerRadius) {

                            ydr = yOverFlow / Math.abs(Math.sin(dataPointEO.indexLabelAngle));

                            if (ydr > 9)
                                ydr = ydr * .3;

                            if (ydr > deltaR)
                                deltaR = ydr;

                        } else {

                        }
                    } else {
                        //if (i < 4)
                        //	customPrompt(i + "; " + center.y + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));
                    }

                }

                function removeLabelsForSmallSegments(totalOverlap, startIndex, endIndex) {

                    //return;

                    var dpEOs = [];
                    var totalRemovedLabelHeight = 0;

                    for (var i = startIndex; true; i = (i + 1 + dataPoints.length) % dataPoints.length) {
                        dpEOs.push(dataPointEOs[i]);

                        if (i === endIndex)
                            break;
                    }

                    dpEOs.sort(function (entry1, entry2) {
                        return entry1.y - entry2.y;
                    });

                    for (i = 0; i < dpEOs.length; i++) {
                        var dpEO = dpEOs[i];

                        if (totalRemovedLabelHeight < totalOverlap) {
                            totalRemovedLabelHeight += dpEO.indexLabelTextBlock.height;
                            dpEO.indexLabelTextBlock.text = "";
                            dpEO.indexLabelText = "";
                            dpEO.indexLabelTextBlock.measureText();
                        } else
                            break;
                    }

                }

                //resetAnimationFrame(1);
                //animate();
                //window.alert("next??");

                var overlapStartIndex = -1;
                var overlapEndIndex = -1;
                var totalOverlap = 0;

                for (var k = 0; k < dataPoints.length; k++) {
                    currentDataPoint = dataPointEOs[k];

                    if (!currentDataPoint.indexLabelText)
                        continue;

                    var nextLabelIndex = getNextLabelIndex(k);
                    if (nextLabelIndex === null)
                        continue;

                    var nextDataPoint = dataPointEOs[nextLabelIndex];

                    distanceFromNextLabel = 0;

                    //if (nextDataPoint.indexLabelTextBlock.y > currentDataPoint.indexLabelTextBlock.y)
                    //	distanceFromNextLabel = (nextDataPoint.indexLabelTextBlock.y - (nextDataPoint.indexLabelTextBlock.height / 2)) - (currentDataPoint.indexLabelTextBlock.y + (currentDataPoint.indexLabelTextBlock.height / 2));
                    //else
                    //	distanceFromNextLabel = (currentDataPoint.indexLabelTextBlock.y - (currentDataPoint.indexLabelTextBlock.height / 2)) - (nextDataPoint.indexLabelTextBlock.y + (nextDataPoint.indexLabelTextBlock.height / 2));

                    distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint);

                    if (distanceFromNextLabel < 0 && areDataPointsTooClose(currentDataPoint, nextDataPoint)) {

                        if (overlapStartIndex < 0)
                            overlapStartIndex = k;

                        if (nextLabelIndex !== overlapStartIndex)
                            overlapEndIndex = nextLabelIndex;

                        totalOverlap += -distanceFromNextLabel;

                        //nextDataPoint.indexLabelText = "";
                        //nextDataPoint.indexLabelTextBlock.text = "";
                        //nextDataPoint.indexLabelTextBlock.measureText();
                    } else {

                        if (totalOverlap > 0) {
                            removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);

                            overlapStartIndex = -1;
                            overlapEndIndex = -1;
                            totalOverlap = 0;
                        }
                    }

                }

                if (totalOverlap > 0)
                    removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);

            }
            //window.alert("next??");


            //resetAnimationFrame(_this.animationEnabled && _this.renderCount === 0 ? isCanvasSupported ? 60 : 30 : 1);
            //animate();

            //console.log("totalRecursions: " + totalRecursions);
        }

        this.pieDoughnutClickHandler = function (e) {

            if (_this.isAnimating) {
                return;
            }

            var i = e.dataPointIndex;
            var dataPoint = e.dataPoint;
            var dataSeries = this;


            var id = dataSeries.dataPointIds[i];

            //dataPointEO = _this._eventManager.objectMap[id];

            if (dataPoint.exploded)
                dataPoint.exploded = false;
            else
                dataPoint.exploded = true;


            // So that it doesn't try to explode when there is only one segment
            if (dataSeries.dataPoints.length > 1) {
                _this._animator.animate(0, explodeDuration, function (fractionComplete) {

                    explodeToggle(fractionComplete);
                    //console.log("Explode Start");

                });
            }

            return;
        }

        initLabels();

        positionLabels();

        this.disableToolTip = true;
        this._animator.animate(0, this.animatedRender ? this.animationDuration : 0, function (fractionComplete) {

            animate(fractionComplete);

        }, function () {

            _this.disableToolTip = false;
            _this._animator.animate(0, _this.animatedRender ? explodeDuration : 0, function (fractionComplete) {

                explodeToggle(fractionComplete);

            });

            //console.log("Animation Complete");
        });

        //this.ctx.strokeRect(plotArea.x1 + 1, plotArea.y1, plotArea.width - 2, plotArea.height);
    }

    //#endregion pieChart


    //#endregion Render Methods
    Chart.prototype.animationRequestId = null;

    Chart.prototype.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
				    window.setTimeout(callback, 1000 / 60);
				};
    })();

    Chart.prototype.cancelRequestAnimFrame = (function () {
        return window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout
    })();

    //#endregion Class Chart

    //#region Class LayoutManager
    function LayoutManager(chart) {

        this._topOccupied = 0;
        this._bottomOccupied = 0;
        this._leftOccupied = 0;
        this._rightOccupied = 0;
        this.chart = chart;
    }

    LayoutManager.prototype.registerSpace = function (position, size) {
        if (position === "top") {
            this._topOccupied += size.height;
        }
        else if (position === "bottom") {
            this._bottomOccupied += size.height;
        } else if (position === "left") {
            this._leftOccupied += size.width; // this is width when seen upright/vertically
        } else if (position === "right") {
            this._rightOccupied += size.width;// this is width when seen upright/vertically
        }
    }

    LayoutManager.prototype.unRegisterSpace = function (position, size) {
        if (position === "top") {
            this._topOccupied -= size.height;
        }
        else if (position === "bottom") {
            this._bottomOccupied -= size.height;
        } else if (position === "left") {
            this._leftOccupied -= size.width;// this is width when seen upright/vertically
        } else if (position === "right") {
            this._rightOccupied -= size.width;// this is width when seen upright/vertically
        }
    }

    LayoutManager.prototype.getFreeSpace = function () {
        ///<signature>
        ///<summary>Returns available free space {x1:number, y1:number, x2:number, y2:number}</summary>
        ///</signature>

        return {
            x1: this._leftOccupied,
            y1: this._topOccupied,
            x2: this.chart.width - this._rightOccupied,
            y2: this.chart.height - this._bottomOccupied,
            width: (this.chart.width - this._rightOccupied) - this._leftOccupied,
            height: (this.chart.height - this._bottomOccupied) - this._topOccupied
        };
    }

    LayoutManager.prototype.reset = function () {
        this._topOccupied = 0;
        this._bottomOccupied = 3;//so that there is enough padding in the bottom.
        this._leftOccupied = 0;
        this._rightOccupied = 0;
    }
    //#endregion Class LayoutManager

    //#region Class TextBlock
    function TextBlock(ctx, options) {
        TextBlock.parent.constructor.call(this, "TextBlock", options);

        this.ctx = ctx;
        this._isDirty = true;
        this._wrappedText = null;
        this._lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
    }
    extend(TextBlock, CanvasJSObject);
    TextBlock.prototype.render = function (preserveContext) {
        if (preserveContext)
            this.ctx.save();

        var font = this.ctx.font;
        this.ctx.textBaseline = this.textBaseline;

        var offsetY = 0;

        if (this._isDirty)
            this.measureText(this.ctx);

        this.ctx.translate(this.x, this.y + offsetY);

        if (this.textBaseline === "middle") {
            offsetY = -this._lineHeight / 2;
        }

        this.ctx.font = this._getFontString();

        this.ctx.rotate(Math.PI / 180 * this.angle);

        var textLeft = 0;
        var textTop = this.padding;
        //var textTop = this.padding;
        var line = null;

        if ((this.borderThickness > 0 && this.borderColor) || this.backgroundColor) {
            this.ctx.roundRect(0, offsetY, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);

            //if (this.textBaseline === "middle") {
            //	//textTop += this.fontSize / 2;
            //	textTop += this._lineHeight / 2;
            //}
        }

        this.ctx.fillStyle = this.fontColor;

        for (var i = 0; i < this._wrappedText.lines.length; i++) {

            line = this._wrappedText.lines[i];
            if (this.horizontalAlign === "right")
                textLeft = this.width - line.width - this.padding;
            else if (this.horizontalAlign === "left")
                textLeft = this.padding;
            else if (this.horizontalAlign === "center")
                textLeft = (this.width - this.padding * 2) / 2 - line.width / 2 + this.padding;

            this.ctx.fillText(line.text, textLeft, textTop);

            textTop += line.height;
        }

        this.ctx.font = font;

        if (preserveContext)
            this.ctx.restore();
    }

    TextBlock.prototype.setText = function (text) {
        this.text = text;
        this._isDirty = true;
        this._wrappedText = null;
    }

    TextBlock.prototype.measureText = function () {
        if (this.maxWidth === null) {
            throw ("Please set maxWidth and height for TextBlock");
        }

        this._wrapText(this.ctx);
        this._isDirty = false;

        return { width: this.width, height: this.height }
    }

    TextBlock.prototype._getLineWithWidth = function (text, width, clipWord) {
        text = String(text);
        clipWord = clipWord || false;

        if (!text)
            return { text: "", width: 0 };

        var textWidth = 0,
			min = 0,
			max = text.length - 1,
			mid = Infinity;

        this.ctx.font = this._getFontString();

        while (min <= max) {
            mid = Math.floor((min + max) / 2);
            var tempText = text.substr(0, mid + 1);

            textWidth = this.ctx.measureText(tempText).width;

            if (textWidth < width) {
                min = mid + 1;
            } else if (textWidth > width) {
                max = mid - 1;
            } else {
                break;
            }
        }

        //edge cases
        if (textWidth > width && tempText.length > 1) {
            tempText = tempText.substr(0, tempText.length - 1);
            textWidth = this.ctx.measureText(tempText).width;
        }

        var isClipped = true;

        if (tempText.length === text.length || text[tempText.length] === " ")
            isClipped = false;

        if (isClipped) {
            var resultWords = tempText.split(" ");
            if (resultWords.length > 1)
                resultWords.pop();

            tempText = resultWords.join(" ");
            textWidth = this.ctx.measureText(tempText).width;
        }

        return { text: tempText, width: textWidth };
    }

    TextBlock.prototype._wrapText = function wrapText() {
        //this.ctx.save();
        var text = new String(trimString(this.text));
        var lines = [];
        var font = this.ctx.font; // Save the current Font
        var height = 0;
        var width = 0;

        this.ctx.font = this._getFontString();

        while (text.length > 0) {

            var maxWidth = this.maxWidth - this.padding * 2;
            var maxHeight = this.maxHeight - this.padding * 2;

            var line = this._getLineWithWidth(text, maxWidth, false);
            line.height = this._lineHeight;

            lines.push(line);

            width = Math.max(width, line.width);
            height += line.height;
            text = trimString(text.slice(line.text.length, text.length));

            if (maxHeight && height > maxHeight) {
                var line = lines.pop();
                height -= line.height;
            }
        }

        this._wrappedText = { lines: lines, width: width, height: height };
        this.width = width + this.padding * 2;
        this.height = height + this.padding * 2;

        this.ctx.font = font; // Restore the font
    }

    TextBlock.prototype._getFontString = function () {
        //return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily
        return getFontString("", this, null);
    }

    //#endregion Class TextBlock

    //#region Class Title

    function Title(chart, options) {
        Title.parent.constructor.call(this, "Title", options, chart.theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;


        if (typeof (this._options.fontSize) === "undefined") {

            this.fontSize = this.chart.getAutoFontSize(this.fontSize);

            //window.console.log("Chart Title fontSize: " + this.fontSize);
        }

        this.width = null,//read only
		this.height = null//read only
        this.bounds = { x1: null, y1: null, x2: null, y2: null };
    }

    extend(Title, CanvasJSObject);
    Title.prototype.render = function () {

        if (!this.text)
            return;

        var freespace = this.chart.layoutManager.getFreeSpace();
        var left = 0;
        var top = 0;
        var angle = 0;
        var maxWidth = 0;
        var maxHeight = 0;

        var textBlockHorizontalAlign;
        var position;

        if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
            maxWidth = freespace.width - this.margin * 2;
            maxHeight = freespace.height * .5 - this.margin * 2;
            angle = 0;
        }
        else if (this.verticalAlign === "center") {

            if (this.horizontalAlign === "left" || this.horizontalAlign === "right") {
                maxWidth = freespace.height - this.margin * 2;
                maxHeight = freespace.width * .5 - this.margin * 2;
            } else if (this.horizontalAlign === "center") {
                maxWidth = freespace.width - this.margin * 2;
                maxHeight = freespace.height * .5 - this.margin * 2;
            }
        }

        var textBlock = new TextBlock(this.ctx, {
            fontSize: this.fontSize, fontFamily: this.fontFamily, fontColor: this.fontColor,
            fontStyle: this.fontStyle, fontWeight: this.fontWeight,
            horizontalAlign: this.horizontalAlign, verticalAlign: this.verticalAlign,
            borderColor: this.borderColor, borderThickness: this.borderThickness,
            backgroundColor: this.backgroundColor,
            maxWidth: maxWidth, maxHeight: maxHeight,
            cornerRadius: this.cornerRadius,
            text: this.text,
            padding: this.padding,
            textBaseline: "top"
        });

        var textBlockSize = textBlock.measureText();

        if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {

            if (this.verticalAlign === "top") {
                top = this.margin;
                position = "top";
            }
            else if (this.verticalAlign === "bottom") {
                top = freespace.y2 - this.margin - textBlockSize.height;
                position = "bottom";
            }

            if (this.horizontalAlign === "left") {
                left = freespace.x1 + this.margin;
            }
            else if (this.horizontalAlign === "center") {
                left = freespace.x1 + (maxWidth / 2 - textBlockSize.width / 2) + this.margin;
            }
            else if (this.horizontalAlign === "right") {
                left = freespace.x2 - this.margin - textBlockSize.width;
            }

            textBlockHorizontalAlign = this.horizontalAlign;

            this.width = textBlockSize.width;
            this.height = textBlockSize.height;
        }
        else if (this.verticalAlign === "center") {

            if (this.horizontalAlign === "left") {

                left = freespace.x1 + this.margin;
                top = freespace.y2 - this.margin - (maxWidth / 2 - textBlockSize.width / 2);
                angle = -90;

                position = "left";
                this.width = textBlockSize.height;
                this.height = textBlockSize.width;
            }
            else if (this.horizontalAlign === "right") {
                left = freespace.x2 - this.margin;
                top = freespace.y1 + this.margin + (maxWidth / 2 - textBlockSize.width / 2);
                angle = 90;

                position = "right";
                this.width = textBlockSize.height;
                this.height = textBlockSize.width;
            }
            else if (this.horizontalAlign === "center") {
                top = freespace.y1 + (freespace.height / 2 - textBlockSize.height / 2);
                left = freespace.x1 + (freespace.width / 2 - textBlockSize.width / 2);

                position = "center";
                this.width = textBlockSize.width;
                this.height = textBlockSize.height;
            }

            textBlockHorizontalAlign = "center";
        }

        textBlock.x = left;
        textBlock.y = top;
        textBlock.angle = angle;
        textBlock.horizontalAlign = textBlockHorizontalAlign;
        textBlock.render(true);

        this.chart.layoutManager.registerSpace(position, { width: this.width + this.margin * 2, height: this.height + this.margin * 2 });

        this.bounds = { x1: left, y1: top, x2: left + this.width, y2: top + this.height };

        this.ctx.textBaseline = "top";
    }


    //#endregion Class Title

    //#region Legend

    //TBI: Implement Markes for Legend
    function Legend(chart, options, theme) {
        Legend.parent.constructor.call(this, "Legend", options, theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        this.ghostCtx = this.chart._eventManager.ghostCtx;
        this.items = [];

        this.width = 0,
        //this.fontSize = 12,
		this.height = 0,
		this.orientation = null,
		this.horizontalSpacing = 10;
        this.dataSeries = [];
        this.bounds = { x1: null, y1: null, x2: null, y2: null };

        if (typeof (this._options.fontSize) === "undefined") {
            this.fontSize = this.chart.getAutoFontSize(this.fontSize);
            //window.console.log("fontSize: " + this.fontSize);
        }

        this.lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
    }
    extend(Legend, CanvasJSObject);

    Legend.prototype.render = function () {
        var freeSpace = this.chart.layoutManager.getFreeSpace();
        var position = null;
        var top = 0;
        var left = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var itemMargin = 5;

        var items = [];
        var rows = [];



        //this.ctx.font = getFontString("", this, null);
        //this.ctx.fontColor = this.fontColor;

        if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
            this.orientation = "horizontal";
            position = this.verticalAlign;
            maxWidth = freeSpace.width * .9;
            maxHeight = freeSpace.height * .5;
        }
        else if (this.verticalAlign === "center") {
            this.orientation = "vertical";
            position = this.horizontalAlign;

            maxWidth = freeSpace.width * .5;
            maxHeight = freeSpace.height * .9;
        }

        for (var i = 0; i < this.dataSeries.length; i++) {
            var dataSeries = this.dataSeries[i];

            var markerType = dataSeries.legendMarkerType ? dataSeries.legendMarkerType : (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter" || dataSeries.type === "bubble") && dataSeries.markerType ? dataSeries.markerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
            var legendText = dataSeries.legendText ? dataSeries.legendText : dataSeries.name;
            var markerColor = dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataSeries.markerColor ? dataSeries.markerColor : dataSeries._colorSet[0];
            var markerSize = (!dataSeries.markerSize && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.lineHeight * .6;
            var markerBorderColor = dataSeries.legendMarkerBorderColor ? dataSeries.legendMarkerBorderColor : dataSeries.markerBorderColor;
            var markerBorderThickness = dataSeries.legendMarkerBorderThickness ? dataSeries.legendMarkerBorderThickness : dataSeries.markerBorderThickness ? Math.max(1, Math.round(markerSize * .2)) : 0;
            var lineColor = dataSeries._colorSet[0];

            if (dataSeries.type !== "pie" && dataSeries.type !== "doughnut" && dataSeries.type !== "funnel") {
                var item = {
                    markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize, lineColor: dataSeries._colorSet[0],
                    dataSeriesIndex: dataSeries.index, dataPointIndex: null, markerBorderColor: markerBorderColor, markerBorderThickness: markerBorderThickness
                };

                items.push(item);
            } else {
                for (var dataPointIndex = 0; dataPointIndex < dataSeries.dataPoints.length; dataPointIndex++) {

                    var dataPoint = dataSeries.dataPoints[dataPointIndex];

                    markerType = dataPoint.legendMarkerType ? dataPoint.legendMarkerType : dataSeries.legendMarkerType ? dataSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
                    var legendText = dataPoint.legendText ? dataPoint.legendText : dataSeries.legendText ? dataSeries.legendText : dataPoint.name ? dataPoint.name : "DataPoint: " + (dataPointIndex + 1);
                    var markerColor = dataPoint.legendMarkerColor ? dataPoint.legendMarkerColor : dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[dataPointIndex % dataSeries._colorSet.length];
                    var markerSize = ((dataPoint.markerSize === 0 || (dataSeries.markerSize === 0 && !dataPoint.markerSize))) ? 0 : this.lineHeight * .6;
                    var markerBorderColor = dataPoint.legendMarkerBorderColor ? dataPoint.legendMarkerBorderColor : dataSeries.legendMarkerBorderColor ? dataSeries.legendMarkerBorderColor : dataPoint.markerBorderColor ? dataPoint.markerBorderColor : dataSeries.markerBorderColor;
                    var markerBorderThickness = dataPoint.legendMarkerBorderThickness ? dataPoint.legendMarkerBorderThickness : dataSeries.legendMarkerBorderThickness ? dataSeries.legendMarkerBorderThickness : dataPoint.markerBorderThickness || dataSeries.markerBorderThickness ? Math.max(1, Math.round(markerSize * .2)) : 0;

                    var item = {
                        markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize,
                        dataSeriesIndex: i, dataPointIndex: dataPointIndex, markerBorderColor: markerBorderColor, markerBorderThickness: markerBorderThickness
                    };

                    items.push(item);
                }
            }

            item = null;
        }


        // Find out the required width and height of Legend and position the items relative to the container
        if (items.length > 0) {
            var row = null;
            var rowIndex = 0; // required for vertical orientation
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (this.orientation === "horizontal") {
                    item.textBlock = new TextBlock(this.ctx, {
                        x: 0,
                        y: 0,//TBI
                        maxWidth: maxWidth,
                        maxHeight: this.lineHeight, //TBI: FontSize
                        angle: 0,
                        text: item.text,
                        horizontalAlign: "left",//left, center, right
                        fontSize: this.fontSize,//in pixels
                        fontFamily: this.fontFamily,
                        fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
                        fontColor: this.fontColor,
                        fontStyle: this.fontStyle, // normal, italic, oblique
                        textBaseline: "top"
                    });
                    item.textBlock.measureText();


                    if (!row || row.width + item.textBlock.width + (row.width === 0 ? 0 : this.horizontalSpacing) > maxWidth) {
                        row = { items: [], width: 0 };
                        rows.push(row);
                        this.height = rows.length * (item.textBlock.height + 5);
                    }

                    item.textBlock.x = row.width;
                    item.textBlock.y = 0;

                    row.width += Math.round(item.textBlock.width + item.textBlock._lineHeight + (row.width === 0 ? 0 : item.textBlock._lineHeight * .5));
                    row.items.push(item);

                    this.width = Math.max(row.width, this.width);

                } else {
                    if (this.height + this.lineHeight < maxHeight) {
                        row = { items: [], width: 0 };
                        rows.push(row);
                        this.height = rows.length * (this.lineHeight);
                    } else {
                        row = rows[rowIndex];
                        rowIndex = (rowIndex + 1) % rows.length
                    }

                    item.textBlock = new TextBlock(this.ctx, {
                        x: 0,
                        y: 0,//TBI
                        maxWidth: maxWidth,
                        maxHeight: this.fontSize * 1.5, //TBI: FontSize
                        angle: 0,
                        text: item.text,
                        horizontalAlign: "left",//left, center, right
                        fontSize: this.fontSize,//in pixels
                        fontFamily: this.fontFamily,
                        fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
                        fontColor: this.fontColor,
                        fontStyle: this.fontStyle, // normal, italic, oblique
                        textBaseline: "top"
                    });

                    item.textBlock.measureText();

                    item.textBlock.x = row.width; // relative to the row
                    item.textBlock.y = 0; // relative to the row

                    row.width += item.textBlock.width + item.textBlock._lineHeight + (row.width === 0 ? 0 : item.textBlock._lineHeight * .5);
                    row.items.push(item);

                    this.width = Math.max(row.width, this.width);
                }
            }

            this.height = rows.length * (this.lineHeight);

        }

        if (this.verticalAlign === "top") {
            if (this.horizontalAlign === "left")
                left = freeSpace.x1 + 2;
            else if (this.horizontalAlign === "right")
                left = freeSpace.x2 - this.width - 2;
            else
                left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

            top = freeSpace.y1;
        } else if (this.verticalAlign === "center") {
            if (this.horizontalAlign === "left")
                left = freeSpace.x1 + 2;
            else if (this.horizontalAlign === "right")
                left = freeSpace.x2 - this.width - 2;
            else
                left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

            top = freeSpace.y1 + freeSpace.height / 2 - this.height / 2;
        } else if (this.verticalAlign === "bottom") {
            if (this.horizontalAlign === "left")
                left = freeSpace.x1 + 2;
            else if (this.horizontalAlign === "right")
                left = freeSpace.x2 - this.width - 2;
            else
                left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;


            top = freeSpace.y2 - this.height - 5;
        }

        this.items = items;

        //Assign ids to all legendItems
        for (var i = 0; i < this.items.length; i++) {

            var item = items[i];

            item.id = ++this.chart._eventManager.lastObjectId;
            this.chart._eventManager.objectMap[item.id] = {
                id: item.id, objectType: "legendItem", legendItemIndex: i, dataSeriesIndex: item.dataSeriesIndex, dataPointIndex: item.dataPointIndex
            };
            //delete item.textBlock;// Not Required anymore
        }

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            for (var itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
                var item = row.items[itemIndex];

                var legendX = item.textBlock.x + left + (itemIndex === 0 ? item.markerSize * .2 : (this.lineHeight * .4) + (item.markerSize * .2));
                var legendY = top + (i * this.lineHeight);

                var ghostX = legendX;

                if (!this.chart.data[item.dataSeriesIndex].visible)
                    this.ctx.globalAlpha = .5;

                if (item.chartType === "line" || item.chartType === "stepLine" || item.chartType === "spline") {
                    this.ctx.strokeStyle = item.lineColor;
                    this.ctx.lineWidth = Math.ceil(this.lineHeight / 8);
                    this.ctx.beginPath();
                    this.ctx.moveTo(legendX - this.lineHeight * .1, legendY + this.lineHeight / 2);
                    this.ctx.lineTo(legendX + this.lineHeight * .7, legendY + this.lineHeight / 2);
                    this.ctx.stroke();

                    ghostX -= this.lineHeight * .1;
                }

                RenderHelper.drawMarker(legendX + item.markerSize / 2, legendY + (this.lineHeight / 2), this.ctx, item.markerType, item.markerSize, item.markerColor, item.markerBorderColor, item.markerBorderThickness);

                item.textBlock.x = legendX + Math.round(this.lineHeight * .9);
                item.textBlock.y = legendY;
                item.textBlock.render(true);

                if (!this.chart.data[item.dataSeriesIndex].visible)
                    this.ctx.globalAlpha = 1;

                var hexColor = intToHexColorString(item.id);
                this.ghostCtx.fillStyle = hexColor;
                this.ghostCtx.beginPath();
                this.ghostCtx.fillRect(ghostX, item.textBlock.y, item.textBlock.x + item.textBlock.width - ghostX, item.textBlock.height);

                item.x1 = this.chart._eventManager.objectMap[item.id].x1 = ghostX;
                item.y1 = this.chart._eventManager.objectMap[item.id].y1 = item.textBlock.y;
                item.x2 = this.chart._eventManager.objectMap[item.id].x2 = item.textBlock.x + item.textBlock.width;
                item.y2 = this.chart._eventManager.objectMap[item.id].y2 = item.textBlock.y + item.textBlock.height;
            }
        }


        //this.ctx.beginPath();
        //this.ctx.lineWidth = 2;
        //this.ctx.strokeStyle = "red";
        //this.ctx.rect(left, top, this.width, this.height);
        //this.ctx.stroke();


        this.chart.layoutManager.registerSpace(position, { width: this.width + 2 + 2, height: this.height + 5 + 5 });

        this.bounds = { x1: left, y1: top, x2: left + this.width, y2: top + this.height };
    }

    //#endregion Legend

    //#region Class PlotArea
    function PlotArea(chart, options) {
        PlotArea.parent.constructor.call(this, options);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
    }
    extend(PlotArea, CanvasJSObject);

    PlotArea.prototype.render = function () {
        var freeSpace = this.chart.layoutManager.getFreeSpace();

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(freeSpace.x1, freeSpace.y1, freeSpace.x2, freeSpace.y2);
    }
    //#endregion Class PlotArea

    //#region DataSeries

    function DataSeries(chart, options, theme, index, id) {
        DataSeries.parent.constructor.call(this, "DataSeries", options, theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this._ctx = chart.canvas.ctx;
        this.index = index;
        this.noDataPointsInPlotArea = 0;
        //this.maxWidthInX = 0;
        this.id = id;
        this.chart._eventManager.objectMap[id] = { id: id, objectType: "dataSeries", dataSeriesIndex: index }
        this.dataPointIds = [];
        this.plotUnit = [];

        this.axisX = null;
        this.axisY = null;

        if (this.fillOpacity === null) {
            if (this.type.match(/area/i))
                this.fillOpacity = .7;
            else
                this.fillOpacity = 1;
        }


        this.axisPlacement = this.getDefaultAxisPlacement();

        if (typeof (this._options.indexLabelFontSize) === "undefined") {

            this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize);
        }
    }
    extend(DataSeries, CanvasJSObject);

    //Static Method that returns the axisPlacement for a given ChartType. Returns one of "normal", "xySwapped", "none"
    DataSeries.prototype.getDefaultAxisPlacement = function () {

        //if (!this.visible)
        //	return "none";

        //type = this.type.toLowerCase();
        var type = this.type;

        if (type === "column" || type === "line" || type === "stepLine" || type === "spline" || type === "area" || type === "stepArea" || type === "splineArea" || type === "stackedColumn" || type === "stackedLine" || type === "bubble" || type === "scatter"
			|| type === "stackedArea" || type === "stackedColumn100" || type === "stackedLine100" || type === "stackedArea100"
			|| type === "candlestick" || type === "ohlc" || type === "rangeColumn" || type === "rangeArea" || type === "rangeSplineArea") {
            return "normal";
        }
        else if (type === "bar" || type === "stackedBar" || type === "stackedBar100" || type === "rangeBar") {

            return "xySwapped";
        }
        else if (type === "pie" || type === "doughnut" || type === "funnel") {
            return "none";
        } else {
            window.console.log("Unknown Chart Type: " + type);
            return null;
        }
    }

    DataSeries.getDefaultLegendMarker = function (type) {

        //type = type.toLowerCase();

        if (type === "column" || type === "stackedColumn" || type === "stackedLine" || type === "bar" || type === "stackedBar" || type === "stackedBar100"
			|| type === "bubble" || type === "scatter"
			|| type === "stackedColumn100" || type === "stackedLine100" || type === "stepArea"
			|| type === "candlestick" || type === "ohlc" || type === "rangeColumn" || type === "rangeBar" || type === "rangeArea" || type === "rangeSplineArea") {
            return "square";
        }
        else if (type === "line" || type === "stepLine" || type === "spline" || type === "pie" || type === "doughnut" || type === "funnel") {
            return "circle";
        } else if (type === "area" || type === "splineArea" || type === "stackedArea" || type === "stackedArea100") {
            return "triangle"
        } else {
            window.console.log("Unknown Chart Type: " + type);
            return null;
        }
    }

    //Finds dataPoint with the given x value. If findClosest is set, finds dataPoint with closest x value. 
    //Returns searchResult object if found, else returns null
    DataSeries.prototype.getDataPointAtX = function (x, findClosest) {

        if (!this.dataPoints || this.dataPoints.length === 0) return null;

        var searchResult = { dataPoint: null, distance: Infinity, index: NaN };
        var dataPoint = null;

        var j = 0;
        var i = 0;
        var direction = 1; // +1 for foward and -1 for backward.

        var minimumXDistance = Infinity;
        var forwardMissCount = 0, backwardMissCount = 0;
        var maxMissCount = 1000;
        var searchStartIndex = 0;

        if (this.chart.plotInfo.axisPlacement !== "none") {

            //var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

            //if (xRange > 0)
            //	searchStartIndex = ((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0;
            //else
            //	searchStartIndex = 0;

            var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

            if (xRange > 0)
                searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
            else
                searchStartIndex = 0;

            //searchStartIndex = ((this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x) / this.dataPoints.length * (x - this.dataPoints[0].x)) >> 0;
        }

        while (true) {

            i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

            if (i >= 0 && i < this.dataPoints.length) {

                dataPoint = this.dataPoints[i];

                var distance = Math.abs(dataPoint.x - x);

                if (distance < searchResult.distance) {
                    searchResult.dataPoint = dataPoint;
                    searchResult.distance = distance;
                    searchResult.index = i;
                }

                var xDistance = Math.abs(dataPoint.x - x);
                if (xDistance <= minimumXDistance)
                    minimumXDistance = xDistance;
                else {
                    if (direction > 0)
                        forwardMissCount++;
                    else
                        backwardMissCount++;
                }

                if (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount)
                    break;


            } else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
                break;

            if (direction === -1) {
                j++;
                direction = 1;
            } else
                direction = -1;
        }


        if (!findClosest && searchResult.dataPoint.x === x)
            return searchResult;
        else if (findClosest && searchResult.dataPoint !== null)
            return searchResult;
        else
            return null;
    }

    // x & y should be in pixels. Can be used only after rendering the chart.
    DataSeries.prototype.getDataPointAtXY = function (x, y, getClosest) {

        if (!this.dataPoints || this.dataPoints.length === 0) return null;

        getClosest = getClosest || false;
        var results = [];
        var j = 0, i = 0;
        var direction = 1; // +1 for foward and -1 for backward.
        var foundDataPoint = false;
        var minimumXDistance = Infinity;
        var forwardMissCount = 0, backwardMissCount = 0;
        var maxMissCount = 1000;
        var searchStartIndex = 0;

        if (this.chart.plotInfo.axisPlacement !== "none") {
            var xval = this.chart.axisX.getXValueAt({ x: x, y: y });

            var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

            if (xRange > 0)
                searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (xval - this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
            else
                searchStartIndex = 0;

            //var xRange = (this.axisX._absoluteMaximum - this.axisX._absoluteMinimum);

            //if (xRange > 0)
            //	searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (xval - this.axisX._absoluteMinimum)) >> 0, 0), this.dataPoints.length);
            //else
            //	searchStartIndex = 0;
        }

        while (true) {

            //i = searchStartIndex + (j * direction);
            i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

            if (i >= 0 && i < this.dataPoints.length) {

                var id = this.dataPointIds[i];
                var visualInfo = this.chart._eventManager.objectMap[id];
                var dataPoint = this.dataPoints[i];
                var distance = null;

                if (visualInfo) {

                    switch (this.type) {

                        case "column":
                        case "stackedColumn":
                        case "stackedColumn100":
                        case "bar":
                        case "stackedBar":
                        case "stackedBar100":
                        case "rangeColumn":
                        case "rangeBar":

                            if (x >= visualInfo.x1 && x <= visualInfo.x2 && y >= visualInfo.y1 && y <= visualInfo.y2) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y1 - y), Math.abs(visualInfo.y2 - y))
                                    //distance:0
                                });

                                foundDataPoint = true;
                            }
                            break;

                        case "line":
                        case "stepLine":
                        case "spline":
                        case "area":
                        case "stepArea":
                        case "stackedArea":
                        case "stackedArea100":
                        case "splineArea":
                        case "scatter":
                            var markerSize = getProperty("markerSize", dataPoint, this) || 4;
                            var snapDistance = getClosest ? 20 : markerSize;

                            distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
                            if (distance <= snapDistance) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: distance
                                });
                            }

                            var xDistance = Math.abs(visualInfo.x1 - x);
                            if (xDistance <= minimumXDistance)
                                minimumXDistance = xDistance;
                            else {
                                if (direction > 0)
                                    forwardMissCount++;
                                else
                                    backwardMissCount++;
                            }

                            if (distance <= markerSize / 2) {
                                foundDataPoint = true;
                            }

                            break;

                        case "rangeArea":
                        case "rangeSplineArea":

                            var markerSize = getProperty("markerSize", dataPoint, this) || 4;
                            var snapDistance = getClosest ? 20 : markerSize;

                            distance = Math.min(Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2)), Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y2 - y, 2)));
                            if (distance <= snapDistance) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: distance
                                });
                            }

                            var xDistance = Math.abs(visualInfo.x1 - x);
                            if (xDistance <= minimumXDistance)
                                minimumXDistance = xDistance;
                            else {
                                if (direction > 0)
                                    forwardMissCount++;
                                else
                                    backwardMissCount++;
                            }

                            if (distance <= markerSize / 2) {
                                foundDataPoint = true;
                            }

                            break;

                        case "bubble":
                            var markerSize = visualInfo.size;
                            distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
                            if (distance <= markerSize / 2) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: distance
                                });

                                foundDataPoint = true;
                            }
                            break;

                        case "pie":
                        case "doughnut":
                            var center = visualInfo.center;
                            var innerRadius = this.type === "doughnut" ? .6 * visualInfo.radius : 0;

                            distance = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
                            if (distance < visualInfo.radius && distance > innerRadius) {

                                var deltaY = y - center.y;
                                var deltaX = x - center.x;
                                var angle = Math.atan2(deltaY, deltaX);

                                if (angle < 0)
                                    angle += Math.PI * 2;

                                angle = Number((((angle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));
                                //console.log(angle);


                                var startAngle = Number((((visualInfo.startAngle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));
                                var endAngle = Number((((visualInfo.endAngle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));

                                //So that data point is detected when there is only one dataPoint
                                if (endAngle === 0 && visualInfo.endAngle > 1) {
                                    endAngle = 360;
                                }

                                if (startAngle >= endAngle && dataPoint.y !== 0) {
                                    endAngle += 360;

                                    if (angle < startAngle)
                                        angle += 360;
                                }


                                if (angle > startAngle && angle < endAngle) {
                                    results.push({
                                        dataPoint: dataPoint,
                                        dataPointIndex: i,
                                        dataSeries: this,
                                        distance: 0
                                    });

                                    foundDataPoint = true;
                                }

                            }

                            break;

                        case "candlestick":
                            if (((x >= (visualInfo.x1 - visualInfo.borderThickness / 2)) && (x <= (visualInfo.x2 + visualInfo.borderThickness / 2))
								&& (y >= visualInfo.y2 - visualInfo.borderThickness / 2) && (y <= visualInfo.y3 + visualInfo.borderThickness / 2))
								|| (Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y1 && y <= visualInfo.y4))) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
                                    //distance:0
                                });

                                foundDataPoint = true;
                            }
                            break;

                        case "ohlc":

                            if ((Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y2 && y <= visualInfo.y3))

								|| (x >= visualInfo.x1 && (x <= (visualInfo.x2 + visualInfo.x1) / 2)
									&& (y >= visualInfo.y1 - visualInfo.borderThickness / 2) && (y <= visualInfo.y1 + visualInfo.borderThickness / 2))

								|| ((x >= (visualInfo.x1 + visualInfo.x2) / 2) && (x <= visualInfo.x2)
									&& (y >= visualInfo.y4 - visualInfo.borderThickness / 2) && (y <= visualInfo.y4 + visualInfo.borderThickness / 2))) {

                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
                                    //distance:0
                                });

                                foundDataPoint = true;
                            }
                            break;

                    }

                    if (foundDataPoint || (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount))
                        break;
                }

            } else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
                break;

            if (direction === -1) {
                j++;
                direction = 1;
            } else
                direction = -1;

        }



        var closestResult = null;

        for (var m = 0; m < results.length; m++) {
            if (!closestResult) {
                closestResult = results[m];
            } else if (results[m].distance <= closestResult.distance) {
                closestResult = results[m];
            }
        }

        //if (window.console)
        //	window.console.log("forwardMissCount: " + forwardMissCount + "; backwardMissCount: " + backwardMissCount + "; getClosest: " + getClosest);

        //if (window.console && closestResult)
        //    window.console.log(j + ": distance = " + closestResult.distance);

        return closestResult;
    }

    DataSeries.prototype.getMarkerProperties = function (index, x, y, ctx) {
        var dataPoints = this.dataPoints;
        var dataSeries = this;

        var markerColor = dataPoints[index].markerColor ? dataPoints[index].markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoints[index].color ? dataPoints[index].color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];
        var markerBorderColor = dataPoints[index].markerBorderColor ? dataPoints[index].markerBorderColor : dataSeries.markerBorderColor ? dataSeries.markerBorderColor : null;
        var markerBorderThickness = dataPoints[index].markerBorderThickness ? dataPoints[index].markerBorderThickness : dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : null;
        var markerType = dataPoints[index].markerType ? dataPoints[index].markerType : dataSeries.markerType;
        var markerSize = dataPoints[index].markerSize ? dataPoints[index].markerSize : dataSeries.markerSize;


        return {
            x: x, y: y, ctx: ctx,
            type: markerType,
            size: markerSize,
            color: markerColor,
            borderColor: markerBorderColor,
            borderThickness: markerBorderThickness
        }
    }
    //#endregion DataSeries

    //#region Axis

    function Axis(chart, options, type, position) {
        Axis.parent.constructor.call(this, "Axis", options, chart.theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = chart.ctx;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.intervalstartTimePercent = 0;
        this.labels = [];
        this._labels = null;

        //Processed information about the data that gets plotted against this axis
        this.dataInfo = {
            min: Infinity,
            max: -Infinity,
            viewPortMin: Infinity,
            viewPortMax: -Infinity,
            minDiff: Infinity // Used only in case of axisX
        };

        if (type === "axisX") {
            this.sessionVariables = this.chart.sessionVariables[type];

            if (!this._options.interval)
                this.intervalType = null;
        } else {
            if (position === "left" || position === "top")
                this.sessionVariables = this.chart.sessionVariables["axisY"];
            else {
                this.sessionVariables = this.chart.sessionVariables["axisY2"];
            }
        }



        if (typeof (this._options.titleFontSize) === "undefined") {

            this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize);

            //window.console.log("titleFontSize: " + this.titleFontSize);
        }

        if (typeof (this._options.labelFontSize) === "undefined") {

            this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize);

            //window.console.log("labelFontSize: " + this.labelFontSize);

        }

        //Axis Type : axisX, axisY
        this.type = type;
        if (type === "axisX" && (!options || typeof (options.gridThickness) === "undefined"))
            this.gridThickness = 0;

        this._position = position;

        this.lineCoordinates = { x1: null, y1: null, x2: null, y2: null, width: null };//{x1:, y1:, x2:, y2:, width:}
        //
        {
            this.labelAngle = ((this.labelAngle % 360) + 360) % 360;

            if (this.labelAngle > 90 && this.labelAngle <= 270)
                this.labelAngle -= 180;
            else if (this.labelAngle > 180 && this.labelAngle <= 270)
                this.labelAngle -= 180
            else if (this.labelAngle > 270 && this.labelAngle <= 360)
                this.labelAngle -= 360
        }

        if (this._options.stripLines && this._options.stripLines.length > 0) {

            this.stripLines = [];

            for (var i = 0; i < this._options.stripLines.length; i++) {
                this.stripLines.push(new StripLine(this.chart, this._options.stripLines[i], chart.theme, ++this.chart._eventManager.lastObjectId));
            }
        }

        this._titleTextBlock = null;
        this._absoluteMinimum = null;// Used to determine boundaries while Zooming/Panning
        this._absoluteMaximum = null;// Used to determine boundaries while Zooming/Panning

        if (this.hasOptionChanged("minimum"))
            this.sessionVariables.internalMinimum = this.minimum;

        if (this.hasOptionChanged("maximum"))
            this.sessionVariables.internalMaximum = this.maximum;

        this.trackChanges("minimum");
        this.trackChanges("maximum");
    }
    extend(Axis, CanvasJSObject);

    Axis.prototype.createLabels = function () {
        var textBlock;
        var i = 0;
        var endPoint;

        var labelMaxWidth = 0;
        var labelMaxHeight = 0;
        var intervalInPixels = 0;

        //var intervalInPixels = this.conversionParameters.pixelPerUnit * this.interval;


        if (this._position === "bottom" || this._position === "top") {
            intervalInPixels = this.lineCoordinates.width / Math.abs(this.maximum - this.minimum) * this.interval;

            if (this.labelAutoFit) {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? intervalInPixels * .9 >> 0 : this.labelMaxWidth;
            }
            else {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? this.chart.width * .7 >> 0 : this.labelMaxWidth;
            }

            labelMaxHeight = typeof (this._options.labelWrap) === "undefined" || this.labelWrap ? this.chart.height * .5 >> 0 : this.labelFontSize * 1.5;
        }
        else if (this._position === "left" || this._position === "right") {

            intervalInPixels = this.lineCoordinates.height / Math.abs(this.maximum - this.minimum) * this.interval;


            if (this.labelAutoFit) {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? this.chart.width * .3 >> 0 : this.labelMaxWidth;
            }
            else {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? this.chart.width * .5 >> 0 : this.labelMaxWidth;
            }

            labelMaxHeight = typeof (this._options.labelWrap) === "undefined" || this.labelWrap ? intervalInPixels * 2 >> 0 : this.labelFontSize * 1.5;
        }

        if (this.type === "axisX" && this.chart.plotInfo.axisXValueType === "dateTime") {
            endPoint = addToDateTime(new Date(this.maximum), this.interval, this.intervalType)
            //endPoint = this.maximum;

            for (i = this.intervalstartTimePercent; i < endPoint; addToDateTime(i, this.interval, this.intervalType)) {

                //var text = dateFormat(i, this.valueFormatString);
                var timeInMilliseconds = i.getTime();
                var text = this.type === "axisX" && this.labels[timeInMilliseconds] ? this.labels[timeInMilliseconds] : dateFormat(i, this.valueFormatString, this.chart._cultureInfo);

                textBlock = new TextBlock(this.ctx, {
                    x: 0,
                    y: 0,
                    //maxWidth: this.maxHeight,
                    //maxHeight: this.labelFontSize,
                    maxWidth: labelMaxWidth,
                    maxHeight: labelMaxHeight,
                    angle: this.labelAngle,
                    text: this.prefix + text + this.suffix,
                    horizontalAlign: "left",//left, center, right
                    fontSize: this.labelFontSize,//in pixels
                    fontFamily: this.labelFontFamily,
                    fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.labelFontColor,
                    fontStyle: this.labelFontStyle, // normal, italic, oblique
                    textBaseline: "middle"
                });

                this._labels.push({ position: i.getTime(), textBlock: textBlock, effectiveHeight: null });
            }

        }
        else {
            endPoint = this.maximum;

            //if ((Math.floor(this.interval) < this.interval && !this._options.interval) || true) {

            //Check if it should be rendered as a category axis. If yes, then ceil the interval
            if (this.labels && this.labels.length) {
                var tempInterval = Math.ceil(this.interval);
                var tempStartPoint = Math.ceil(this.intervalstartTimePercent);
                var hasAllLabels = false;
                for (i = tempStartPoint; i < this.maximum; i += tempInterval) {
                    if (this.labels[i]) {
                        hasAllLabels = true;
                    } else {
                        hasAllLabels = false;
                        break;
                    }
                }

                if (hasAllLabels) {
                    this.interval = tempInterval;
                    this.intervalstartTimePercent = tempStartPoint;
                }
            }

            //parseFloat & toPrecision are being used to avoid issues related to precision.
            for (i = this.intervalstartTimePercent; i <= endPoint; i = parseFloat((i + this.interval).toFixed(14))) {

                var text = this.type === "axisX" && this.labels[i] ? this.labels[i] : numberFormat(i, this.valueFormatString, this.chart._cultureInfo);

                textBlock = new TextBlock(this.ctx, {
                    x: 0,
                    y: 0,
                    //maxWidth: this.maxHeight,
                    //maxHeight: this.labelFontSize,
                    maxWidth: labelMaxWidth,
                    maxHeight: labelMaxHeight,
                    angle: this.labelAngle,
                    text: this.prefix + text + this.suffix,
                    horizontalAlign: "left",//left, center, right
                    fontSize: this.labelFontSize,//in pixels
                    fontFamily: this.labelFontFamily,
                    fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.labelFontColor,
                    fontStyle: this.labelFontStyle, // normal, italic, oblique
                    textBaseline: "middle",
                    borderThickness: 0
                });

                this._labels.push({ position: i, textBlock: textBlock, effectiveHeight: null });
            }
        }

        for (var i = 0; i < this.stripLines.length; i++) {

            var stripLine = this.stripLines[i];

            textBlock = new TextBlock(this.ctx, {
                x: 0,
                y: 0,
                //maxWidth: this.maxHeight,
                //maxHeight: this.labelFontSize,
                backgroundColor: stripLine.labelBackgroundColor,
                maxWidth: labelMaxWidth,
                maxHeight: labelMaxHeight,
                angle: this.labelAngle,
                text: stripLine.label,
                horizontalAlign: "left",//left, center, right
                fontSize: stripLine.labelFontSize,//in pixels
                fontFamily: stripLine.labelFontFamily,
                fontWeight: stripLine.labelFontWeight, //normal, bold, bolder, lighter,
                fontColor: stripLine.labelFontColor,
                fontStyle: stripLine.labelFontStyle, // normal, italic, oblique
                textBaseline: "middle",
                borderThickness: 0
            });

            this._labels.push({ position: stripLine.value, textBlock: textBlock, effectiveHeight: null, stripLine: stripLine });
        }

    }

    Axis.prototype.createLabelsAndCalculateWidth = function () {

        var maxLabelEffectiveWidth = 0;
        this._labels = [];

        if (this._position === "left" || this._position === "right") {

            this.createLabels();

            for (i = 0; i < this._labels.length; i++) {

                var textBlock = this._labels[i].textBlock;

                var size = textBlock.measureText();

                //var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
                //labelEffectiveWidth = hypotenuse * Math.cos(Math.abs(Math.PI / 180 * this.labelAngle) - Math.abs(Math.acos(size.width / hypotenuse)));

                var labelEffectiveWidth = 0;

                if (this.labelAngle === 0)
                    labelEffectiveWidth = size.width;
                else
                    labelEffectiveWidth = (size.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + (size.height / 2 * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));


                if (maxLabelEffectiveWidth < labelEffectiveWidth)
                    maxLabelEffectiveWidth = labelEffectiveWidth;

                this._labels[i].effectiveWidth = labelEffectiveWidth;
            }
        }



        var titleHeight = this.title ? getFontHeightInPixels(this.titleFontFamily, this.titleFontSize, this.titleFontWeight) + 2 : 0;

        var axisWidth = titleHeight + maxLabelEffectiveWidth + this.tickLength + 5;

        //if (isDebugMode && window.console) {
        //	window.console.log(this.type + "--- axisWidth: " + axisWidth);
        //}

        return axisWidth;
    }

    Axis.prototype.createLabelsAndCalculateHeight = function () {
        var maxLabelEffectiveHeight = 0;
        this._labels = [];
        var textBlock;
        var i = 0;

        this.createLabels();

        if (this._position === "bottom" || this._position === "top") {

            for (i = 0; i < this._labels.length; i++) {

                textBlock = this._labels[i].textBlock;

                var size = textBlock.measureText();
                //var diagonal = Math.sqrt(Math.pow(size.height, 2) + Math.pow(size.width, 2));

                //var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
                //var labelEffectiveHeight = hypotenuse * Math.cos(Math.PI / 2 - (Math.abs(Math.PI / 180 * this.labelAngle) + Math.abs(Math.acos(size.width / hypotenuse))));

                var labelEffectiveHeight = 0;

                if (this.labelAngle === 0)
                    labelEffectiveHeight = size.height;
                else
                    labelEffectiveHeight = (size.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + (size.height / 2 * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));

                if (maxLabelEffectiveHeight < labelEffectiveHeight)
                    maxLabelEffectiveHeight = labelEffectiveHeight;

                this._labels[i].effectiveHeight = labelEffectiveHeight;
            }
        }

        //var titleHeight = this.title ? this.titleFontSize + 5 : 0;
        var titleHeight = this.title ? getFontHeightInPixels(this.titleFontFamily, this.titleFontSize, this.titleFontWeight) + 2 : 0;

        return titleHeight + maxLabelEffectiveHeight + this.tickLength + 5;
    }

    //Static Method that co-ordinates between axisX, axisY and renders them
    Axis.setLayoutAndRender = function (axisX, axisY, axisY2, axisPlacement, freeSpace) {
        var x1, y1, x2, y2;
        var chart = axisX.chart;
        var ctx = chart.ctx;

        axisX.calculateAxisParameters();

        if (axisY)
            axisY.calculateAxisParameters();

        if (axisY2)
            axisY2.calculateAxisParameters();

        if (axisY && axisY2 && typeof (axisY._options.maximum) === "undefined" && typeof (axisY._options.minimum) === "undefined" && typeof (axisY._options.interval) === "undefined"
				&& typeof (axisY2._options.maximum) === "undefined" && typeof (axisY2._options.minimum) === "undefined" && typeof (axisY2._options.interval) === "undefined") {

            var noTicksY = (axisY.maximum - axisY.minimum) / axisY.interval;

            var noTicksY2 = (axisY2.maximum - axisY2.minimum) / axisY2.interval;

            if (noTicksY > noTicksY2) {
                axisY2.maximum = axisY2.interval * noTicksY + axisY2.minimum;
            } else if (noTicksY2 > noTicksY) {
                axisY.maximum = axisY.interval * noTicksY2 + axisY.minimum;
            }
        }

        var axisYlineThickness = axisY ? axisY.lineThickness ? axisY.lineThickness : 0 : 0;
        var axisY2lineThickness = axisY2 ? axisY2.lineThickness ? axisY2.lineThickness : 0 : 0;

        var axisYGridThickness = axisY ? axisY.gridThickness ? axisY.gridThickness : 0 : 0;
        var axisY2GridThickness = axisY2 ? axisY2.gridThickness ? axisY2.gridThickness : 0 : 0;

        var axisYMargin = axisY ? axisY.margin : 0;
        var axisY2Margin = axisY ? axisY.margin : 0;

        if (axisPlacement === "normal") {

            axisX.lineCoordinates = {};

            var axisYWidth = Math.ceil(axisY ? axisY.createLabelsAndCalculateWidth() : 0);
            x1 = Math.round(freeSpace.x1 + axisYWidth + axisYMargin);
            axisX.lineCoordinates.x1 = x1;

            var axisY2Width = Math.ceil(axisY2 ? axisY2.createLabelsAndCalculateWidth() : 0);
            x2 = Math.round(freeSpace.x2 - axisY2Width > axisX.chart.width - 10 ? axisX.chart.width - 10 : freeSpace.x2 - axisY2Width);
            axisX.lineCoordinates.x2 = x2;

            axisX.lineCoordinates.width = Math.abs(x2 - x1); // required early on inside createLabels of axisX

            var axisXHeight = Math.ceil(axisX.createLabelsAndCalculateHeight());

            // Position axisX based on the available free space, Margin and its height
            //x1 = freeSpace.x1 + axisYWidth + axisYMargin + axisYlineThickness / 2;
            y1 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);
            y2 = Math.round(freeSpace.y2 - axisX.margin);

            //axisX.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
            axisX.lineCoordinates.y1 = y1;
            axisX.lineCoordinates.y2 = y1;

            axisX.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };

            //if (isDebugMode) {
            //	axisX.ctx.rect(axisX.boundingRect.x1, axisX.boundingRect.y1, axisX.boundingRect.width, axisX.boundingRect.height);
            //	axisX.ctx.stroke();
            //}

            // Position axisY based on the available free space, Margin and its height
            if (axisY) {
                x1 = Math.round(freeSpace.x1 + axisY.margin);
                y1 = Math.round(freeSpace.y1 < 10 ? 10 : freeSpace.y1);
                x2 = Math.round(freeSpace.x1 + axisYWidth + axisY.margin);
                //y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
                y2 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);

                axisY.lineCoordinates = { x1: x2, y1: y1, x2: x2, y2: y2, height: Math.abs(y2 - y1) }

                axisY.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
            }

            //if (isDebugMode && axisY) {
            //	axisY.ctx.rect(axisY.boundingRect.x1, axisY.boundingRect.y1, axisY.boundingRect.width, axisY.boundingRect.height);
            //	axisY.ctx.stroke();
            //}

            // Position axisY2 based on the available free space, Margin and its height
            if (axisY2) {
                x1 = Math.round(axisX.lineCoordinates.x2);
                y1 = Math.round(freeSpace.y1 < 10 ? 10 : freeSpace.y1);
                x2 = Math.round(x1 + axisY2Width + axisY2.margin);
                //y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
                y2 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);

                axisY2.lineCoordinates = { x1: x1, y1: y1, x2: x1, y2: y2, height: Math.abs(y2 - y1) }

                axisY2.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
            }


            axisX.calculateValueToPixelconversionParameters();

            if (axisY)
                axisY.calculateValueToPixelconversionParameters();

            if (axisY2)
                axisY2.calculateValueToPixelconversionParameters();


            ctx.save();
            ctx.rect(5, axisX.boundingRect.y1, axisX.chart.width - 10, axisX.boundingRect.height);
            ctx.clip();

            axisX.renderLabelsTicksAndTitle();
            ctx.restore();

            if (axisY)
                axisY.renderLabelsTicksAndTitle();

            if (axisY2)
                axisY2.renderLabelsTicksAndTitle();


            chart.preparePlotArea();
            var plotArea = axisX.chart.plotArea;

            ctx.save();

            ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));

            ctx.clip();

            axisX.renderStripLinesOfThicknessType("value");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("value");

            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("value");


            axisX.renderInterlacedColors();

            if (axisY)
                axisY.renderInterlacedColors();

            if (axisY2)
                axisY2.renderInterlacedColors();

            ctx.restore();


            axisX.renderGrid();

            if (axisY)
                axisY.renderGrid();

            if (axisY2)
                axisY2.renderGrid();


            axisX.renderAxisLine();

            if (axisY)
                axisY.renderAxisLine();

            if (axisY2)
                axisY2.renderAxisLine();


            //No need to clip to plotArea because stripLines need to render on top of gridlines
            axisX.renderStripLinesOfThicknessType("pixel");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("pixel");

            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("pixel");
        }
        else {
            var axisXWidth = Math.ceil(axisX.createLabelsAndCalculateWidth());

            if (axisY) {
                axisY.lineCoordinates = {};

                x1 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
                x2 = Math.round(freeSpace.x2 > axisY.chart.width - 10 ? axisY.chart.width - 10 : freeSpace.x2);

                axisY.lineCoordinates.x1 = x1;
                axisY.lineCoordinates.x2 = x2;
                axisY.lineCoordinates.width = Math.abs(x2 - x1);
            }

            if (axisY2) {
                axisY2.lineCoordinates = {};
                x1 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
                x2 = Math.round(freeSpace.x2 > axisY2.chart.width - 10 ? axisY2.chart.width - 10 : freeSpace.x2);

                axisY2.lineCoordinates.x1 = x1;
                axisY2.lineCoordinates.x2 = x2;
                axisY2.lineCoordinates.width = Math.abs(x2 - x1);
            }



            var axisYHeight = Math.ceil(axisY ? axisY.createLabelsAndCalculateHeight() : 0);
            var axisY2Height = Math.ceil(axisY2 ? axisY2.createLabelsAndCalculateHeight() : 0);


            // Position axisY based on the available free space, Margin and its height
            if (axisY) {
                //x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
                //x2 = freeSpace.x2 > axisY.chart.width - 10 ? axisY.chart.width - 10 : freeSpace.x2;

                y1 = Math.round(freeSpace.y2 - axisYHeight - axisY.margin);
                y2 = Math.round(freeSpace.y2 - axisYMargin > axisY.chart.height - 10 ? axisY.chart.height - 10 : freeSpace.y2 - axisYMargin);

                //axisY.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
                axisY.lineCoordinates.y1 = y1;
                axisY.lineCoordinates.y2 = y1;

                axisY.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: axisYHeight };
            }

            // Position axisY based on the available free space, Margin and its height
            if (axisY2) {
                //x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
                //x2 = freeSpace.x2 > axisY2.chart.width - 10 ? axisY2.chart.width - 10 : freeSpace.x2;

                y1 = Math.round(freeSpace.y1 + axisY2.margin);
                y2 = (freeSpace.y1 + axisY2.margin + axisY2Height);

                //axisY2.lineCoordinates = { x1: x1, y1: y2, x2: x2, y2: y2, width: Math.abs(x2 - x1) }
                axisY2.lineCoordinates.y1 = y2;
                axisY2.lineCoordinates.y2 = y2;

                axisY2.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: axisY2Height };
            }

            //axisY.ctx.rect(axisY.boundingRect.x1, axisY.boundingRect.y1, axisY.boundingRect.width, axisY.boundingRect.height);
            //axisY.ctx.stroke();

            // Position axisX based on the available free space, Margin and its height
            x1 = Math.round(freeSpace.x1 + axisX.margin);
            y1 = Math.round(axisY2 ? axisY2.lineCoordinates.y2 : (freeSpace.y1 < 10 ? 10 : freeSpace.y1));
            x2 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
            y2 = Math.round(axisY ? axisY.lineCoordinates.y1 : (freeSpace.y2 - axisYMargin > axisX.chart.height - 10 ? axisX.chart.height - 10 : freeSpace.y2 - axisYMargin));


            axisX.lineCoordinates = { x1: x2, y1: y1, x2: x2, y2: y2, height: Math.abs(y2 - y1) };

            axisX.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };

            //axisX.ctx.rect(axisX.boundingRect.x1, axisX.boundingRect.y1, axisX.boundingRect.width, axisX.boundingRect.height);
            //axisX.ctx.stroke();

            axisX.calculateValueToPixelconversionParameters();

            if (axisY)
                axisY.calculateValueToPixelconversionParameters();
            if (axisY2)
                axisY2.calculateValueToPixelconversionParameters();


            //ctx.save();
            //ctx.rect(axisY.boundingRect.x1 - 30, axisY.boundingRect.y1, axisY.boundingRect.width + 60, axisY.boundingRect.height);
            //ctx.clip();

            if (axisY)
                axisY.renderLabelsTicksAndTitle();

            if (axisY2)
                axisY2.renderLabelsTicksAndTitle();

            //ctx.restore();

            axisX.renderLabelsTicksAndTitle();

            chart.preparePlotArea();
            var plotArea = axisX.chart.plotArea;

            ctx.save();
            ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));

            ctx.clip();


            //No need to clip to plotArea because stripLines need to render on top of gridlines
            axisX.renderStripLinesOfThicknessType("value");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("value");
            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("value");

            axisX.renderInterlacedColors();

            if (axisY)
                axisY.renderInterlacedColors();
            if (axisY2)
                axisY2.renderInterlacedColors();

            ctx.restore();


            axisX.renderGrid();


            if (axisY)
                axisY.renderGrid();

            if (axisY2)
                axisY2.renderGrid();


            axisX.renderAxisLine();

            if (axisY)
                axisY.renderAxisLine();

            if (axisY2)
                axisY2.renderAxisLine();


            axisX.renderStripLinesOfThicknessType("pixel");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("pixel");
            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("pixel");
        }

    }

    Axis.prototype.renderLabelsTicksAndTitle = function () {

        var skipLabels = false;
        var totalLabelWidth = 0;
        var thresholdRatio = 1;
        var labelCount = 0;

        var intervalInPixels = this.conversionParameters.pixelPerUnit * this.interval;

        if (this.labelAngle !== 0 && this.labelAngle !== 360)
            thresholdRatio = 1.2;

        //Don't skip labels when interval is explicitely set
        if (typeof (this._options.interval) === "undefined") {
            if (this._position === "bottom" || this._position === "top") {

                //thresholdRatio = .9;// More space is preferred between labels when axis is horizontally aligned

                for (i = 0; i < this._labels.length; i++) {
                    label = this._labels[i];
                    if (label.position < this.minimum || label.stripLine)// don't consider stripLine's lable
                        continue;

                    var width = label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.height * Math.sin(Math.PI / 180 * this.labelAngle);

                    totalLabelWidth += width;
                }

                if (totalLabelWidth > this.lineCoordinates.width * thresholdRatio) {
                    skipLabels = true;
                }
            } if (this._position === "left" || this._position === "right") {
                for (i = 0; i < this._labels.length; i++) {
                    label = this._labels[i];
                    if (label.position < this.minimum || label.stripLine)// don't consider stripLine's lable
                        continue;

                    var width = label.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle);

                    totalLabelWidth += width;
                }

                if (totalLabelWidth > this.lineCoordinates.height * thresholdRatio) {
                    skipLabels = true;
                }
            }
        }

        if (this._position === "bottom") {
            var i = 0;

            var label;
            var xy;

            for (i = 0; i < this._labels.length; i++) {

                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {

                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;
                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;

                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }


                    var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(tickX, xy.y << 0);
                    this.ctx.lineTo(tickX, (xy.y + this.tickLength) << 0);
                    this.ctx.stroke();
                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                if (label.textBlock.angle === 0) {
                    xy.x -= label.textBlock.width / 2;
                    //xy.y += this.tickLength + label.textBlock.height / 2;
                    xy.y += this.tickLength + label.textBlock.fontSize / 2;

                } else {
                    xy.x -= (this.labelAngle < 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
                    xy.y += this.tickLength + Math.abs((this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5));
                }
                label.textBlock.x = xy.x;
                label.textBlock.y = xy.y;

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.lineCoordinates.x1,// This is recalculated again
                    y: this.boundingRect.y2 - this.titleFontSize - 5,// This is recalculated again
                    maxWidth: this.lineCoordinates.width,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: 0,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
                this._titleTextBlock.y = this.boundingRect.y2 - this._titleTextBlock.height - 3;
                this._titleTextBlock.render(true);
            }
        }
        else if (this._position === "top") {
            var i = 0;

            var label;
            var xy;
            var stripLine;

            for (i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {


                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;

                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;

                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }

                    var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(tickX, xy.y << 0);
                    this.ctx.lineTo(tickX, (xy.y - this.tickLength) << 0);
                    this.ctx.stroke();

                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                if (label.textBlock.angle === 0) {
                    xy.x -= label.textBlock.width / 2;
                    xy.y -= this.tickLength + label.textBlock.height / 2;
                } else {
                    xy.x -= (this.labelAngle > 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
                    xy.y -= this.tickLength + Math.abs((this.labelAngle > 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5 : 5));
                }
                label.textBlock.x = xy.x;
                label.textBlock.y = xy.y;

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.lineCoordinates.x1,// This is recalculated again
                    y: this.boundingRect.y1 + 1,
                    maxWidth: this.lineCoordinates.width,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: 0,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
                this._titleTextBlock.render(true);
            }
        }
        else if (this._position === "left") {


            var label;
            var xy;
            for (var i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {

                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;

                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }

                    var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(xy.x << 0, tickY);
                    this.ctx.lineTo((xy.x - this.tickLength) << 0, tickY);
                    this.ctx.stroke();
                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                label.textBlock.x = xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5;

                if (this.labelAngle === 0) {
                    label.textBlock.y = xy.y - label.textBlock.height / 2 + this.labelFontSize / 2;
                } else
                    label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.boundingRect.x1 + 1,
                    y: this.lineCoordinates.y2,
                    maxWidth: this.lineCoordinates.height,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: -90,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                var size = this._titleTextBlock.measureText();

                //this._titleTextBlock.x -= 4;

                this._titleTextBlock.y = (this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
                this._titleTextBlock.render(true);

                //if (isDebugMode) {
                //	window.console.log("titleFontSize: " + this.titleFontSize + "; width: " + size.width + "; height: " + size.height);
                //	window.console.log("this.boundingRect.x1: " + this.boundingRect.x1);

                //	//this.ctx.rect(this._titleTextBlock.x, this._titleTextBlock.y, this._titleTextBlock.height, -this._titleTextBlock.width);
                //	//this.ctx.stroke();

                //}

            }
        }
        else if (this._position === "right") {


            var label;
            var xy;

            for (var i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {

                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;

                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }

                    var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(xy.x << 0, tickY);
                    this.ctx.lineTo((xy.x + this.tickLength) << 0, tickY);
                    this.ctx.stroke();

                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                label.textBlock.x = xy.x + this.tickLength + 5;
                //label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));
                if (this.labelAngle === 0) {
                    label.textBlock.y = xy.y - label.textBlock.height / 2 + this.labelFontSize / 2;
                }
                else
                    label.textBlock.y = xy.y;

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.boundingRect.x2 - 1,
                    y: this.lineCoordinates.y2,
                    maxWidth: this.lineCoordinates.height,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: 90,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.y = (this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
                this._titleTextBlock.render(true);

            }
        }
    }

    Axis.prototype.renderInterlacedColors = function () {
        var ctx = this.chart.plotArea.ctx;
        //return;

        var interlacedGridStartPoint;
        var interlacedGridEndPoint;
        var plotAreaCoordinates = this.chart.plotArea;
        var i = 0, renderInterlacedGrid = true;

        if ((this._position === "bottom" || this._position === "top") && this.interlacedColor) {

            ctx.fillStyle = this.interlacedColor;

            for (i = 0; i < this._labels.length; i++) {

                if (this._labels[i].stripLine)
                    continue;

                if (renderInterlacedGrid) {//So that the interlaced color alternates
                    interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                    if (i + 1 >= this._labels.length)
                        interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this.maximum);
                    else
                        interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

                    ctx.fillRect(interlacedGridStartPoint.x, plotAreaCoordinates.y1, Math.abs(interlacedGridEndPoint.x - interlacedGridStartPoint.x), Math.abs(plotAreaCoordinates.y1 - plotAreaCoordinates.y2));
                    renderInterlacedGrid = false;
                } else
                    renderInterlacedGrid = true;

            }

        } else if ((this._position === "left" || this._position === "right") && this.interlacedColor) {

            ctx.fillStyle = this.interlacedColor;

            for (i = 0; i < this._labels.length; i++) {
                if (this._labels[i].stripLine)
                    continue;

                if (renderInterlacedGrid) {//So that the interlaced color alternates

                    interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                    if (i + 1 >= this._labels.length)
                        interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this.maximum);
                    else
                        interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

                    ctx.fillRect(plotAreaCoordinates.x1, interlacedGridStartPoint.y, Math.abs(plotAreaCoordinates.x1 - plotAreaCoordinates.x2), Math.abs(interlacedGridStartPoint.y - interlacedGridEndPoint.y));
                    renderInterlacedGrid = false;
                } else
                    renderInterlacedGrid = true;
            }
            //throw "123";
        }

        ctx.beginPath();
    }

    //Renders stripLines of given thickness type.
    Axis.prototype.renderStripLinesOfThicknessType = function (thicknessType) {

        if (!(this.stripLines && this.stripLines.length > 0) || !thicknessType)
            return;

        var ctx = this.chart.plotArea.ctx;
        var ghostCtx = this.chart._eventManager.ghostCtx;


        var i = 0;
        for (i = 0; i < this.stripLines.length; i++) {

            var stripLine = this.stripLines[i];

            if (stripLine._thicknessType !== thicknessType)
                continue;


            //Should be skipped only if thicknessType is "pixel". If it is "value" then clipping is automatically applied before calling.
            if (thicknessType === "pixel" && (stripLine.value < this.minimum || stripLine.value > this.maximum))
                continue;

            var xy = this.getPixelCoordinatesOnAxis(stripLine.value);

            var lineWidth = Math.abs(thicknessType === "pixel" ? stripLine.thickness : this.conversionParameters.pixelPerUnit * stripLine.thickness);

            if (lineWidth <= 0)
                continue;

            ctx.strokeStyle = stripLine.color;
            ctx.beginPath();

            var hexColor = intToHexColorString(stripLine.id);
            //ghostCtx.strokeStyle = hexColor;
            //ghostCtx.beginPath();
            var x1, x2, y1, y2;

            //ghostCtx.lineWidth = ctx.lineWidth = Math.abs(thicknessType === "pixel" ? stripLine.thickness : this.conversionParameters.pixelPerUnit * stripLine.thickness);


            ctx.lineWidth = lineWidth

            if (this._position === "bottom" || this._position === "top") {

                var stripX = (ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

                x1 = x2 = stripX;
                y1 = this.chart.plotArea.y1;
                y2 = this.chart.plotArea.y2;
            }
            else if (this._position === "left" || this._position === "right") {
                var stripY = (ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

                y1 = y2 = stripY;
                x1 = this.chart.plotArea.x1;
                x2 = this.chart.plotArea.x2;
            }

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();


            //ghostCtx.moveTo(x1, y1);
            //ghostCtx.lineTo(x2, y2);
            //ghostCtx.stroke();

            //this.chart._eventManager.objectMap[stripLine.id] = {
            //	objectType: "stripLine", stripLine: stripLine, stripLineIndex: i, axis: this,
            //	x1: x1, y1: y1, x2: x2, y2: y2
            //};

            //{ objectType: "dat/aSeries", dataSeriesIndex: dataSeriesIndex };
        }

    }

    Axis.prototype.renderGrid = function () {

        if (!(this.gridThickness && this.gridThickness > 0))
            return;

        //var ctx = this.chart.plotArea.ctx;
        var ctx = this.chart.ctx;

        var xy;
        var plotAreaCoordinates = this.chart.plotArea;
        var stripLine;
        var tempLineWidth, tempStrokeStyle;
        //return;

        ctx.lineWidth = this.gridThickness;
        ctx.strokeStyle = this.gridColor;


        if (this._position === "bottom" || this._position === "top") {

            for (i = 0; i < this._labels.length && !this._labels[i].stripLine; i++) {

                if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum)
                    continue;

                ctx.beginPath();

                xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                var gridX = (ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

                ctx.moveTo(gridX, plotAreaCoordinates.y1 << 0);
                ctx.lineTo(gridX, plotAreaCoordinates.y2 << 0);

                ctx.stroke();
            }

        }
        else if (this._position === "left" || this._position === "right") {

            for (var i = 0; i < this._labels.length && !this._labels[i].stripLine; i++) {

                if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum)
                    continue;

                ctx.beginPath();

                xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                var gridY = (ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

                ctx.moveTo(plotAreaCoordinates.x1 << 0, gridY);
                ctx.lineTo(plotAreaCoordinates.x2 << 0, gridY);

                ctx.stroke();
            }

        }
    }

    Axis.prototype.renderAxisLine = function () {
        //var ctx = this.chart.plotArea.ctx;
        var ctx = this.chart.ctx;

        if (this._position === "bottom" || this._position === "top") {
            if (this.lineThickness) {
                ctx.lineWidth = this.lineThickness;
                ctx.strokeStyle = this.lineColor ? this.lineColor : "black";

                var lineY = (this.lineThickness % 2 === 1) ? (this.lineCoordinates.y1 << 0) + .5 : (this.lineCoordinates.y1 << 0);

                ctx.beginPath();
                ctx.moveTo(this.lineCoordinates.x1, lineY);
                ctx.lineTo(this.lineCoordinates.x2, lineY);
                ctx.stroke();
            }

        } else if (this._position === "left" || this._position === "right") {
            if (this.lineThickness) {
                ctx.lineWidth = this.lineThickness;
                ctx.strokeStyle = this.lineColor;

                var lineX = (this.lineThickness % 2 === 1) ? (this.lineCoordinates.x1 << 0) + .5 : (this.lineCoordinates.x1 << 0);

                ctx.beginPath();
                ctx.moveTo(lineX, this.lineCoordinates.y1);
                ctx.lineTo(lineX, this.lineCoordinates.y2);
                ctx.stroke();
            }

        }
    }

    Axis.prototype.getPixelCoordinatesOnAxis = function (value) {
        var xy = {};
        var width = this.lineCoordinates.width;
        var height = this.lineCoordinates.height;

        if (this._position === "bottom" || this._position === "top") {
            var pixelPerUnit = width / Math.abs(this.maximum - this.minimum);

            xy.x = this.lineCoordinates.x1 + (pixelPerUnit * (value - this.minimum));
            xy.y = this.lineCoordinates.y1;
        }
        if (this._position === "left" || this._position === "right") {
            var pixelPerUnit = height / Math.abs(this.maximum - this.minimum);

            xy.y = this.lineCoordinates.y2 - (pixelPerUnit * (value - this.minimum));
            xy.x = this.lineCoordinates.x2;
        }

        return xy;
    }

    Axis.prototype.getXValueAt = function (pixel) {
        if (!pixel)
            return null;

        var xval = null;

        if (this._position === "left") {
            xval = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * ((this.chart.axisX.lineCoordinates.y2 - pixel.y)) + this.chart.axisX.minimum;
        }
        else if (this._position === "bottom") {
            xval = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (pixel.x - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum;
        }

        return xval;
    }

    Axis.prototype.calculateValueToPixelconversionParameters = function (value) {
        var xy = {};
        var conversionParameters = { pixelPerUnit: null, minimum: null, reference: null };

        var width = this.lineCoordinates.width;
        var height = this.lineCoordinates.height;

        conversionParameters.minimum = this.minimum;

        if (this._position === "bottom" || this._position === "top") {
            conversionParameters.pixelPerUnit = width / Math.abs(this.maximum - this.minimum);
            conversionParameters.reference = this.lineCoordinates.x1;

            //xy.x = this.lineCoordinates.x1 + (pixelPerUnit * (value - this.minimum));
            //xy.y = this.lineCoordinates.y1;
        }
        if (this._position === "left" || this._position === "right") {
            conversionParameters.pixelPerUnit = -1 * height / Math.abs(this.maximum - this.minimum);
            conversionParameters.reference = this.lineCoordinates.y2;

            //xy.y = this.lineCoordinates.y2 + (pixelPerUnit * (value - this.minimum));
            //xy.x = this.lineCoordinates.x2;
        }


        this.conversionParameters = conversionParameters;
    }

    Axis.prototype.calculateAxisParameters = function () {

        var freeSpace = this.chart.layoutManager.getFreeSpace();
        var availableWidth = 0;
        var availableHeight = 0;

        if (this._position === "bottom" || this._position === "top") {
            this.maxWidth = freeSpace.width;
            this.maxHeight = freeSpace.height;
        } else {
            this.maxWidth = freeSpace.height;
            this.maxHeight = freeSpace.width;
        }

        var noTicks = this.type === "axisX" ? (this.maxWidth < 500 ? 8 : Math.max(6, Math.floor(this.maxWidth / 62))) : Math.max(Math.floor(this.maxWidth / 40), 2);
        //var noTicks = 8;
        var min, max;
        var minDiff;
        var range;
        var rangePadding = 0;

        if (this.type === "axisX") {
            min = (this.sessionVariables.internalMinimum !== null) ? this.sessionVariables.internalMinimum : this.dataInfo.viewPortMin;
            max = (this.sessionVariables.internalMaximum !== null) ? this.sessionVariables.internalMaximum : this.dataInfo.viewPortMax;

            if (max - min === 0) {
                rangePadding = typeof (this._options.interval) === "undefined" ? .4 : this._options.interval;

                max += rangePadding;
                min -= rangePadding;
            }

            if (this.dataInfo.minDiff !== Infinity)
                minDiff = this.dataInfo.minDiff;
            else if (max - min > 1) {
                minDiff = Math.abs(max - min) * .5;
            }
            else
                minDiff = 1;

        } else if (this.type === "axisY") {

            min = typeof (this._options.minimum) === "undefined" ? this.dataInfo.viewPortMin : this._options.minimum;
            max = typeof (this._options.maximum) === "undefined" ? this.dataInfo.viewPortMax : this._options.maximum;

            if (!isFinite(min) && !isFinite(max)) {
                max = typeof (this._options.interval) === "undefined" ? -Infinity : this._options.interval;
                min = 0;
            }
            else
                if (min === 0 && max === 0) {// When all dataPoints are zero
                    max += 9;
                    min = 0;
                }
                else if (max - min === 0) {// When there is only a single dataPoint or when all dataPoints have same Y Value
                    rangePadding = Math.min(Math.abs(Math.abs(max) * .01), 5);
                    max += rangePadding;
                    min -= rangePadding;
                }
                else if (min > max) {
                    rangePadding = Math.min(Math.abs(Math.abs(max - min) * .01), 5);

                    if (max >= 0)
                        min = max - rangePadding;
                    else
                        max = min + rangePadding;
                }
                else {

                    rangePadding = Math.min(Math.abs(Math.abs(max - min) * .01), .05);

                    if (max !== 0)
                        max += rangePadding;
                    if (min !== 0)
                        min -= rangePadding;
                }


            //Apply includeZero
            if (this.includeZero && typeof (this._options.minimum) === "undefined") {
                if (min > 0)
                    min = 0;
            }
            if (this.includeZero && typeof (this._options.maximum) === "undefined") {
                if (max < 0)
                    max = 0;
            }
        }

        if (this.type === "axisX" && this.chart.plotInfo.axisXValueType === "dateTime") {

            range = max - min;

            if (!this.intervalType) {

                if (range / (1 * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 5) <= noTicks) {
                    this.interval = 5;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 10) <= noTicks) {
                    this.interval = 10;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 20) <= noTicks) {
                    this.interval = 20;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 50) <= noTicks) {
                    this.interval = 50;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 100) <= noTicks) {
                    this.interval = 100;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 200) <= noTicks) {
                    this.interval = 200;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 250) <= noTicks) {
                    this.interval = 250;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 300) <= noTicks) {
                    this.interval = 300;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 400) <= noTicks) {
                    this.interval = 400;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 500) <= noTicks) {
                    this.interval = 500;
                    this.intervalType = "millisecond";
                } else if (range / (constants.secondDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 5) <= noTicks) {
                    this.interval = 5;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 10) <= noTicks) {
                    this.interval = 10;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 15) <= noTicks) {
                    this.interval = 15;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 20) <= noTicks) {
                    this.interval = 20;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 30) <= noTicks) {
                    this.interval = 30;
                    this.intervalType = "second";
                } else if (range / (constants.minuteDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 5) <= noTicks) {
                    this.interval = 5;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 10) <= noTicks) {
                    this.interval = 10;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 15) <= noTicks) {
                    this.interval = 15;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 20) <= noTicks) {
                    this.interval = 20;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 30) <= noTicks) {
                    this.interval = 30;
                    this.intervalType = "minute";
                } else if (range / (constants.hourDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "hour";
                } else if (range / (constants.hourDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "hour";
                } else if (range / (constants.hourDuration * 3) <= noTicks) {
                    this.interval = 3;
                    this.intervalType = "hour";
                } else if (range / (constants.hourDuration * 6) <= noTicks) {
                    this.interval = 6;
                    this.intervalType = "hour";
                } else if (range / (constants.dayDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "day";
                } else if (range / (constants.dayDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "day";
                } else if (range / (constants.dayDuration * 4) <= noTicks) {
                    this.interval = 4;
                    this.intervalType = "day";
                } else if (range / (constants.weekDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "week";
                } else if (range / (constants.weekDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "week";
                } else if (range / (constants.weekDuration * 3) <= noTicks) {
                    this.interval = 3;
                    this.intervalType = "week";
                } else if (range / (constants.monthDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "month";
                } else if (range / (constants.monthDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "month";
                } else if (range / (constants.monthDuration * 3) <= noTicks) {
                    this.interval = 3;
                    this.intervalType = "month";
                } else if (range / (constants.monthDuration * 6) <= noTicks) {
                    this.interval = 6;
                    this.intervalType = "month";
                } else if (range / (constants.yearDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "year";
                } else if (range / (constants.yearDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "year";
                } else if (range / (constants.yearDuration * 4) <= noTicks) {
                    this.interval = 4;
                    this.intervalType = "year";
                } else {
                    this.interval = Math.floor(Axis.getNiceNumber(range / (noTicks - 1), true) / constants.yearDuration);
                    this.intervalType = "year";
                }

            }

            if (this.sessionVariables.internalMinimum !== null)
                this.minimum = this.sessionVariables.internalMinimum;
            else {
                this.minimum = min - minDiff / 2;
            }

            if (this.sessionVariables.internalMaximum !== null)
                this.maximum = this.sessionVariables.internalMaximum;
            else
                this.maximum = max + minDiff / 2;

            if (!this.valueFormatString) {
                if (this.intervalType === "year") {
                    this.valueFormatString = "YYYY";
                } else if (this.intervalType === "month") {
                    this.valueFormatString = "MMM YYYY";
                } else if (this.intervalType === "week") {
                    this.valueFormatString = "MMM DD YYYY";
                } else if (this.intervalType === "day") {
                    this.valueFormatString = "MMM DD YYYY";
                } else if (this.intervalType === "hour") {
                    this.valueFormatString = "hh:mm TT";
                } else if (this.intervalType === "minute") {
                    this.valueFormatString = "hh:mm TT";
                } else if (this.intervalType === "second") {
                    this.valueFormatString = "hh:mm:ss TT";
                } else if (this.intervalType === "millisecond") {
                    this.valueFormatString = "fff'ms'";
                }
            }

            this.intervalstartTimePercent = this.getLabelStartPoint(new Date(this.minimum), this.intervalType, this.interval);

        } else {

            this.intervalType = "number";

            range = Axis.getNiceNumber(max - min, false);

            if (this._options && this._options.interval)
                this.interval = this._options.interval;
            else {
                this.interval = Axis.getNiceNumber(range / (noTicks - 1), true);
            }


            if (this.sessionVariables.internalMinimum !== null)
                this.minimum = this.sessionVariables.internalMinimum;
            else
                this.minimum = Math.floor(min / this.interval) * this.interval;

            if (this.sessionVariables.internalMaximum !== null)
                this.maximum = this.sessionVariables.internalMaximum;
            else
                this.maximum = Math.ceil(max / this.interval) * this.interval;

            //var nfrac = Math.max(-Math.floor(Math.log(d)/Math.LN10), 0); //number of fractional digits to show


            if (this.maximum === 0 && this.minimum === 0) {

                if (this._options.minimum === 0) {
                    this.maximum += 10;
                }
                else if (this._options.maximum === 0) {
                    this.minimum -= 10;
                }

                if (this._options && typeof (this._options.interval) === "undefined") {
                    this.interval = Axis.getNiceNumber((this.maximum - this.minimum) / (noTicks - 1), true);
                }
            }



            if (this.type === "axisX") {
                if (!(this.sessionVariables.internalMinimum !== null)) {
                    this.minimum = min - minDiff / 2;
                }
                if (!(this.sessionVariables.internalMaximum !== null)) {
                    this.maximum = max + minDiff / 2;
                }

                this.intervalstartTimePercent = Math.floor((this.minimum + (this.interval * .2)) / this.interval) * this.interval;
            } else if (this.type === "axisY") {
                this.intervalstartTimePercent = this.minimum;
            }


        }

        if (this.type === "axisX") {
            this._absoluteMinimum = this._options && typeof (this._options.minimum) !== "undefined" ? this._options.minimum : this.dataInfo.min - minDiff / 2;
            this._absoluteMaximum = this._options && typeof (this._options.maximum) !== "undefined" ? this._options.maximum : this.dataInfo.max + minDiff / 2;
        }

        //Set valueFormatString
        if (!this.valueFormatString) {
            this.valueFormatString = "#,##0.##";

            range = Math.abs(this.maximum - this.minimum);

            if (range < 1) {
                var numberOfDecimals = Math.floor(Math.abs(Math.log(range) / Math.LN10)) + 2;

                if (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals))
                    numberOfDecimals = 2;

                if (numberOfDecimals > 2) {
                    for (var i = 0; i < numberOfDecimals - 2; i++)
                        this.valueFormatString += "#";
                }
            }

        }

        //if (isDebugMode && window.console) {
        //    window.console.log(this.type + ": Min = " + this.minimum);
        //    window.console.log(this.type + ": Max = " + this.maximum);
        //    window.console.log(this.type + ": Interval = " + this.interval);
        //}
    }

    Axis.getNiceNumber = function (x, round) {

        var exp = Math.floor(Math.log(x) / Math.LN10);
        var f = x / Math.pow(10, exp);
        var nf;

        if (round) {
            if (f < 1.5)
                nf = 1;
            else if (f < 3)
                nf = 2;
            else if (f < 7)
                nf = 5;
            else
                nf = 10;
        }
        else {
            if (f <= 1)
                nf = 1;
            else if (f <= 2)
                nf = 2;
            else if (f <= 5)
                nf = 5;
            else nf = 10;
        }

        return Number((nf * Math.pow(10, exp)).toFixed(20));
    }

    Axis.prototype.getLabelStartPoint = function () {

        var intervalInMilliseconds = convertToNumber(this.interval, this.intervalType);
        var minimum = Math.floor((this.minimum) / intervalInMilliseconds) * intervalInMilliseconds;
        var dateTime = new Date(minimum);

        if (this.intervalType === "millisecond") {
            //millisecond = dateTime.getMilliSecond();
            //millisecond = Math.floor((millisecond + this.interval) / this.interval) * this.interval;
        }
        else if (this.intervalType === "second") {
            if (dateTime.getMilliseconds() > 0) {
                dateTime.setSeconds(dateTime.getSeconds() + 1);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "minute") {
            if (dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setMinutes(dateTime.getMinutes() + 1);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "hour") {
            if (dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setHours(dateTime.getHours() + 1);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "day") {
            if (dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setDate(dateTime.getDate() + 1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "week") {
            if (dateTime.getDay() > 0 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setDate(dateTime.getDate() + (7 - dateTime.getDay()));
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "month") {
            if (dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setMonth(dateTime.getMonth() + 1);
                dateTime.setDate(1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "year") {
            if (dateTime.getMonth() > 0 || dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setFullYear(dateTime.getFullYear() + 1);
                dateTime.setMonth(0);
                dateTime.setDate(1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }

        return dateTime;
    }

    //#endregion Axis

    //#region StripLine

    function StripLine(chart, options, theme, id) {
        StripLine.parent.constructor.call(this, "StripLine", options, theme);

        this._thicknessType = "pixel";

        this.id = id;

        if (this.startValue !== null && this.endValue !== null) {

            this.value = ((this.startValue.getTime ? this.startValue.getTime() : this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2;
            this.thickness = Math.max(this.endValue - this.startValue);
            this._thicknessType = "value";
        }
    }
    extend(StripLine, CanvasJSObject);

    //#endregion StripLine

    //#region ToolTip

    function ToolTip(chart, options, theme) {
        ToolTip.parent.constructor.call(this, "ToolTip", options, theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        this.currentSeriesIndex = -1;
        this.currentDataPointIndex = -1;
        this._timerId = 0;
        this._prevX = NaN;
        this._prevY = NaN;

        this._initialize();
    }
    extend(ToolTip, CanvasJSObject);

    ToolTip.prototype._initialize = function () {

        if (this.enabled) {
            this.container = document.createElement("div");
            this.container.setAttribute("class", "canvasjs-chart-tooltip");
            this.container.style.position = "absolute";
            this.container.style.height = "auto";
            this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
            this.container.style.zIndex = "1000";
            //this.container.style.pointerEvents = "none";
            this.container.style.display = "none";
            //this.container.style.whiteSpace = "no-wrap";

            var toolTipHtml = "<div style=\" width: auto;";
            toolTipHtml += "height: auto;";
            toolTipHtml += "min-width: 50px;";
            toolTipHtml += "line-height: 20px;";
            toolTipHtml += "margin: 0px 0px 0px 0px;";
            toolTipHtml += "padding: 5px;";
            toolTipHtml += "font-family: Calibri, Arial, Georgia, serif;";
            toolTipHtml += "font-weight: 400;";
            toolTipHtml += "font-style: " + (isCanvasSupported ? "italic;" : "normal;");
            toolTipHtml += "font-size: 14px;";
            toolTipHtml += "color: #000000;";
            toolTipHtml += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
            toolTipHtml += "text-align: left;";
            toolTipHtml += "border: 2px solid gray;";

            //Older browsers like IE8- don't support alpha values
            toolTipHtml += isCanvasSupported ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";

            toolTipHtml += "text-indent: 0px;";
            toolTipHtml += "white-space: nowrap;";
            //toolTipHtml += "pointer-events:none;";
            toolTipHtml += "border-radius: 5px;";

            //Disable Text Selection
            toolTipHtml += "-moz-user-select:none;";
            toolTipHtml += "-khtml-user-select: none;";
            toolTipHtml += "-webkit-user-select: none;";
            toolTipHtml += "-ms-user-select: none;";
            toolTipHtml += "user-select: none;";

            //toolTipHtml += "opacity: 0;";
            //toolTipHtml += "filter: progid: DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = '#4cffffff', endColorstr = '#4cffffff');";

            if (!isCanvasSupported) {
                //toolTipHtml += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)'";
                //-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')";
                /* For IE 5.5 - 7 */
                toolTipHtml += "filter: alpha(opacity = 90);";
                toolTipHtml += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');";
            }

            toolTipHtml += "} \"> Sample Tooltip</div>";

            this.container.innerHTML = toolTipHtml;
            this.contentDiv = this.container.firstChild;


            this.container.style.borderRadius = this.contentDiv.style.borderRadius;
            this.chart._canvasJSContainer.appendChild(this.container);
        }
    }

    ToolTip.prototype.mouseMoveHandler = function (x, y) {

        if (!(this._lastUpdated && (new Date().getTime() - this._lastUpdated) < 40)) {
            this._lastUpdated = new Date().getTime();
            this._updateToolTip(x, y);
        }
    }

    ToolTip.prototype._updateToolTip = function (mouseX, mouseY) {
        //return;

        if (!this.enabled || this.chart.disableToolTip)
            return;

        if (typeof (mouseX) === "undefined" || typeof (mouseY) === "undefined") {
            if (isNaN(this._prevX) || isNaN(this._prevY))
                return;
            else {
                mouseX = this._prevX;
                mouseY = this._prevY;
            }
        } else {
            this._prevX = mouseX;
            this._prevY = mouseY;
        }


        var dataPoint = null;
        var dataSeries = null;
        var toolTipContent = "";
        var entries = [];
        var toolTipRight;
        var toolTipBottom;
        var x = 0;

        if (this.shared && this.chart.plotInfo.axisPlacement !== "none") {
            // && this.chart.plotInfo.axisPlacement !== "none"
            if (this.chart.plotInfo.axisPlacement === "xySwapped") {
                x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * ((this.chart.axisX.lineCoordinates.y2 - mouseY)) + this.chart.axisX.minimum;
            }
            else {
                x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum;
            }

            var nearbyEntries = [];

            for (var i = 0; i < this.chart.data.length; i++) {
                var entry = this.chart.data[i].getDataPointAtX(x, true);

                if (entry && entry.index >= 0) {
                    entry.dataSeries = this.chart.data[i];

                    if (entry.dataPoint.y !== null)
                        nearbyEntries.push(entry);
                }
            }

            if (nearbyEntries.length === 0)
                return;

            nearbyEntries.sort(function (entry1, entry2) {
                return entry1.distance - entry2.distance;
            });

            var closest = nearbyEntries[0];

            for (i = 0; i < nearbyEntries.length; i++) {

                if (nearbyEntries[i].dataPoint.x.valueOf() === closest.dataPoint.x.valueOf())
                    entries.push(nearbyEntries[i]);
            }

            nearbyEntries = null;

        } else {

            var dataPointInfo = this.chart.getDataPointAtXY(mouseX, mouseY, true);
            //dataPointInfo = null;

            if (dataPointInfo) {
                this.currentDataPointIndex = dataPointInfo.dataPointIndex;
                this.currentSeriesIndex = dataPointInfo.dataSeries.index;
            } else if (isCanvasSupported) {

                var id = getObjectId(mouseX, mouseY, this.chart._eventManager.ghostCtx);
                if (id > 0 && typeof this.chart._eventManager.objectMap[id] !== "undefined") {//DataPoint/DataSeries event
                    eventObject = this.chart._eventManager.objectMap[id];

                    //if (this.currentSeriesIndex === eventObject.dataSeriesIndex && this.currentDataPointIndex === eventObject.dataPointIndex)
                    //  return;
                    //else {
                    this.currentSeriesIndex = eventObject.dataSeriesIndex;
                    this.currentDataPointIndex = eventObject.dataPointIndex >= 0 ? eventObject.dataPointIndex : -1;
                    //}

                    //window.console.log("id: " + id + "; hex: " + intToHexColorString(id));
                } else
                    this.currentDataPointIndex = -1;

            } else
                this.currentDataPointIndex = -1;


            if (this.currentSeriesIndex >= 0) {

                dataSeries = this.chart.data[this.currentSeriesIndex];

                var entry = {};

                if (this.currentDataPointIndex >= 0) {
                    dataPoint = dataSeries.dataPoints[this.currentDataPointIndex];

                    entry.dataSeries = dataSeries;
                    entry.dataPoint = dataPoint;
                    entry.index = this.currentDataPointIndex;
                    entry.distance = Math.abs(dataPoint.x - x);
                } else if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea"
                        || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
                        || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea"
                        || dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
                    var x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum.valueOf();

                    entry = dataSeries.getDataPointAtX(x, true);
                    entry.dataSeries = dataSeries;
                    this.currentDataPointIndex = entry.index;
                    dataPoint = entry.dataPoint;
                } else {
                    //this.hide();
                    return;
                }

                if (entry.dataPoint.y !== null)
                    entries.push(entry);
            }
        }


        if (entries.length > 0) {

            this.highlightObjects(entries);


            var toolTipInnerHtml = "";

            toolTipInnerHtml = this.getToolTipInnerHTML({ entries: entries });

            if (toolTipInnerHtml !== null) {
                this.contentDiv.innerHTML = toolTipInnerHtml;

                this.contentDiv.innerHTML = toolTipInnerHtml;

                var previouslyHidden = false;
                if (this.container.style.display === "none") {
                    previouslyHidden = true;
                    this.container.style.display = "block";
                }

                try {
                    this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.borderColor ? this.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[entries[0].index % entries[0].dataSeries._colorSet.length];
                } catch (e) { }

                if (entries[0].dataSeries.type === "pie" || entries[0].dataSeries.type === "doughnut" || entries[0].dataSeries.type === "funnel" || entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "rangeBar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
                    toolTipLeft = mouseX - 10 - this.container.clientWidth;
                } else {
                    toolTipLeft = (((this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.maximum - this.chart.axisX.minimum)) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.minimum)) + this.chart.axisX.lineCoordinates.x1 + .5) - this.container.clientWidth << 0;
                    toolTipLeft -= 10;
                }


                if (toolTipLeft < 0) {
                    toolTipLeft += this.container.clientWidth + 20;
                }

                if (toolTipLeft + this.container.clientWidth > this.chart._container.clientWidth)
                    toolTipLeft = Math.max(0, this.chart._container.clientWidth - this.container.clientWidth);

                toolTipLeft += "px";

                if (entries.length === 1 && !this.shared && (entries[0].dataSeries.type === "line" || entries[0].dataSeries.type === "stepLine" || entries[0].dataSeries.type === "spline" || entries[0].dataSeries.type === "area" || entries[0].dataSeries.type === "stepArea" || entries[0].dataSeries.type === "splineArea" || entries[0].dataSeries.type === "stackedArea" || entries[0].dataSeries.type === "stackedArea100")) {
                    toolTipBottom = (entries[0].dataSeries.axisY.lineCoordinates.y2 - entries[0].dataSeries.axisY.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisY.maximum - entries[0].dataSeries.axisY.minimum) * Math.abs(entries[0].dataPoint.y - entries[0].dataSeries.axisY.minimum) + .5) << 0;
                } else if (entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "rangeBar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
                    toolTipBottom = (entries[0].dataSeries.axisX.lineCoordinates.y2 - entries[0].dataSeries.axisX.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisX.maximum - entries[0].dataSeries.axisX.minimum) * Math.abs(entries[0].dataPoint.x - entries[0].dataSeries.axisX.minimum) + .5) << 0;
                }
                else {
                    toolTipBottom = mouseY;
                }

                toolTipBottom = (-toolTipBottom + 10);

                if (toolTipBottom + this.container.clientHeight + 5 > 0) {
                    toolTipBottom -= toolTipBottom + this.container.clientHeight + 5 - 0
                }

                toolTipBottom += "px";

                //this.container.style.right = toolTipRight;
                this.container.style.left = toolTipLeft;
                this.container.style.bottom = toolTipBottom;

                if (!this.animationEnabled || previouslyHidden) {
                    this.disableAnimation();
                }
                else
                    this.enableAnimation();
            } else {
                this.hide(false);
            }

            //if (isDebugMode)
            //  console.log("searchX: " + x + " x: " + searchResult.dataPoint.x + "; y: " + searchResult.dataPoint.y + "; distance: " + searchResult.distance + "; steps: " + steps);
        }
    }


    ToolTip.prototype.highlightObjects = function (entries) {

        if (!this.enabled)
            return;

        //this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
        var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
        this.chart.resetOverlayedCanvas();

        overlaidCanvasCtx.save();


        var plotArea = this.chart.plotArea;
        var offset = 0;


        for (var i = 0; i < entries.length; i++) {

            var entry = entries[i];

            var eventObject = this.chart._eventManager.objectMap[entry.dataSeries.dataPointIds[entry.index]];

            if (!eventObject || !eventObject.objectType || eventObject.objectType !== "dataPoint")
                continue;

            var dataSeries = this.chart.data[eventObject.dataSeriesIndex];
            var dataPoint = this.chart.data[eventObject.dataPointIndex];
            var index = eventObject.dataPointIndex;

            if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter"
                || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea"
                || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
                || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
                var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
                markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

                markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
                markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

                //overlaidCanvasCtx.globalAlpha = .8;
                RenderHelper.drawMarkers([markerProps]);
                //overlaidCanvasCtx.globalAlpha = .8;

                if (typeof (eventObject.y2) !== "undefined") {

                    var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y2, this.chart.overlaidCanvasCtx);
                    markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

                    markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
                    markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

                    //overlaidCanvasCtx.globalAlpha = .8;
                    RenderHelper.drawMarkers([markerProps]);
                    //overlaidCanvasCtx.globalAlpha = .8;
                }
            } else if (dataSeries.type === "bubble") {
                var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
                markerProps.size = eventObject.size;
                markerProps.color = "white";
                markerProps.borderColor = "white";
                //markerProps.borderThickness = 2;
                overlaidCanvasCtx.globalAlpha = .3;
                RenderHelper.drawMarkers([markerProps]);
                overlaidCanvasCtx.globalAlpha = 1;
            } else if (dataSeries.type === "column" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100"
                || dataSeries.type === "bar" || dataSeries.type === "rangeBar" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
                || dataSeries.type === "rangeColumn") {
                drawRect(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", 0, null, false, false, false, false, .3);
            }
            else if (dataSeries.type === "pie" || dataSeries.type === "doughnut") {
                drawSegment(overlaidCanvasCtx, eventObject.center, eventObject.radius, "white", dataSeries.type, eventObject.startAngle, eventObject.endAngle, .3);
            } else if (dataSeries.type === "candlestick") {

                overlaidCanvasCtx.globalAlpha = 1;
                overlaidCanvasCtx.strokeStyle = eventObject.color;
                overlaidCanvasCtx.lineWidth = eventObject.borderThickness * 2;
                offset = (overlaidCanvasCtx.lineWidth) % 2 === 0 ? 0 : .5;

                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
                overlaidCanvasCtx.lineTo(eventObject.x3 - offset, Math.min(eventObject.y1, eventObject.y4));
                overlaidCanvasCtx.stroke();

                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3 - offset, Math.max(eventObject.y1, eventObject.y4));
                overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
                overlaidCanvasCtx.stroke();

                drawRect(overlaidCanvasCtx, eventObject.x1, Math.min(eventObject.y1, eventObject.y4), eventObject.x2, Math.max(eventObject.y1, eventObject.y4), "transparent", eventObject.borderThickness * 2, eventObject.color, false, false, false, false);
                overlaidCanvasCtx.globalAlpha = 1;

            } else if (dataSeries.type === "ohlc") {
                overlaidCanvasCtx.globalAlpha = 1;

                overlaidCanvasCtx.strokeStyle = eventObject.color;
                overlaidCanvasCtx.lineWidth = eventObject.borderThickness * 2;

                offset = (overlaidCanvasCtx.lineWidth) % 2 === 0 ? 0 : .5;

                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
                overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
                overlaidCanvasCtx.stroke();

                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y1);
                overlaidCanvasCtx.lineTo(eventObject.x1, eventObject.y1);
                overlaidCanvasCtx.stroke();

                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y4);
                overlaidCanvasCtx.lineTo(eventObject.x2, eventObject.y4);
                overlaidCanvasCtx.stroke();

                overlaidCanvasCtx.globalAlpha = 1;
            }
        }

        overlaidCanvasCtx.globalAlpha = 1;

        overlaidCanvasCtx.beginPath();
        return;
    }

    ToolTip.prototype.getToolTipInnerHTML = function (e) {
        var entries = e.entries;
        var toolTipInnerHtml = null;
        var dataSeries = null;
        var dataPoint = null;
        var index = 0;
        var color = null;
        var toolTipContent = "";

        var isToolTipDefinedInData = true;
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].dataSeries.toolTipContent || entries[i].dataPoint.toolTipContent) {
                isToolTipDefinedInData = false;
                break;
            }
        }

        if (isToolTipDefinedInData && this.content && typeof (this.content) === "function") {

            toolTipInnerHtml = this.content({ entries: entries });

        } else {

            if (this.shared) {

                var toolTipInnerHtmlPrefix = "";

                for (var i = 0; i < entries.length; i++) {
                    dataSeries = entries[i].dataSeries;
                    dataPoint = entries[i].dataPoint;
                    index = entries[i].index;

                    toolTipContent = "";

                    if (i === 0 && isToolTipDefinedInData && !this.content) {
                        toolTipInnerHtmlPrefix += typeof (this.chart.axisX.labels[dataPoint.x]) !== "undefined" ? this.chart.axisX.labels[dataPoint.x] : "{x}";
                        toolTipInnerHtmlPrefix += "</br>";
                        toolTipInnerHtmlPrefix = this.chart.replaceKeywordsWithValue(toolTipInnerHtmlPrefix, dataPoint, dataSeries, index);
                    }

                    //Allows disabling of toolTip for individual dataPoints/dataSeries
                    if (dataPoint.toolTipContent === null || (typeof (dataPoint.toolTipContent) === "undefined" && dataSeries._options.toolTipContent === null))
                        continue;


                    if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
                    || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
                    || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}";
                    }
                    else if (dataSeries.type === "bubble") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
                    } else if (dataSeries.type === "pie" || dataSeries.type === "doughnut" || dataSeries.type === "funnel") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "&nbsp;&nbsp;{y}";
                    } else if (dataSeries.type === "rangeColumn" || dataSeries.type === "rangeBar" || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}";
                    } else if (dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>"
                                        + "<br/>Open: &nbsp;&nbsp;{y[0]}"
                                        + "<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}"
                                        + "<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}"
                                        + "<br/>Close: &nbsp;&nbsp;{y[3]}";
                    }

                    if (toolTipInnerHtml === null)
                        toolTipInnerHtml = "";

                    toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);

                    if (i < entries.length - 1)
                        toolTipInnerHtml += "</br>";
                }

                if (toolTipInnerHtml !== null)
                    toolTipInnerHtml = toolTipInnerHtmlPrefix + toolTipInnerHtml;

            } else {

                dataSeries = entries[0].dataSeries;
                dataPoint = entries[0].dataPoint;
                index = entries[0].index;

                //Allows disabling of toolTip for individual dataPoints/dataSeries
                if (dataPoint.toolTipContent === null || (typeof (dataPoint.toolTipContent) === "undefined" && dataSeries._options.toolTipContent === null))
                    return null;


                if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
                    || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
                    || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y}";
                } else if (dataSeries.type === "bubble") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
                } else if (dataSeries.type === "pie" || dataSeries.type === "doughnut" || dataSeries.type === "funnel") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : (dataPoint.name ? "{name}:&nbsp;&nbsp;" : dataPoint.label ? "{label}:&nbsp;&nbsp;" : "") + "{y}";
                } else if (dataSeries.type === "rangeColumn" || dataSeries.type === "rangeBar" || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}";
                } else if (dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + "</span>"
                        + "<br/>Open: &nbsp;&nbsp;{y[0]}"
                        + "<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}"
                        + "<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}"
                        + "<br/>Close: &nbsp;&nbsp;{y[3]}";
                }

                if (toolTipInnerHtml === null)
                    toolTipInnerHtml = "";

                toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
            }
        }

        return toolTipInnerHtml;
    }

    ToolTip.prototype.enableAnimation = function () {
        if (this.container.style.WebkitTransition)
            return;

        this.container.style.WebkitTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.MozTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.MsTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.transition = "left .2s ease-out, bottom .2s ease-out";
    }

    ToolTip.prototype.disableAnimation = function () {
        if (!this.container.style.WebkitTransition)
            return;

        this.container.style.WebkitTransition = "";
        this.container.style.MozTransition = "";
        this.container.style.MsTransition = "";
        this.container.style.transition = "";
    }

    ToolTip.prototype.hide = function (resetOverlayedCanvas) {
        if (!this.enabled)
            return;

        resetOverlayedCanvas = typeof (resetOverlayedCanvas) === "undefined" ? true : resetOverlayedCanvas;

        this.container.style.display = "none";
        this.currentSeriesIndex = -1;
        this._prevX = NaN;
        this._prevY = NaN;
        //this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
        if (resetOverlayedCanvas)
            this.chart.resetOverlayedCanvas();
    }

    Chart.prototype.replaceKeywordsWithValue = function (str, dp, ds, dpIndex, indexKeywordValue) {
        //var regex = /\{\s*[a-zA-Z]+\s*\}|"[^"]*"|'[^']*'/g;
        var regex = /\{.*?\}|"[^"]*"|'[^']*'/g;
        var chart = this;
        indexKeywordValue = typeof (indexKeywordValue) === "undefined" ? 0 : indexKeywordValue;

        if ((ds.type.indexOf("stacked") >= 0 || (ds.type === "pie" || ds.type === "doughnut")) && (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0)) {
            var percent = "#percent";
            var total = "#total";
            var dpX = null;
            if (ds.type.indexOf("stacked") >= 0) {
                total = 0;
                dpX = dp.x.getTime ? dp.x.getTime() : dp.x;
                if (dpX in ds.plotUnit.yTotals) {
                    total = ds.plotUnit.yTotals[dpX];

                    if (!isNaN(dp.y))
                        percent = (dp.y / total) * 100;
                    else
                        percent = 0;
                }
            } else if (ds.type === "pie" || ds.type === "doughnut") {
                total = 0;
                for (i = 0; i < ds.dataPoints.length; i++) {

                    if (!isNaN(ds.dataPoints[i].y))
                        total += ds.dataPoints[i].y;
                }

                if (!isNaN(dp.y))
                    percent = (dp.y / total) * 100;
                else
                    percent = 0;
            }

            do {
                var percentFormatString = "";
                if (ds.percentFormatString)
                    percentFormatString = ds.percentFormatString;
                else {
                    percentFormatString = "#,##0.";
                    var numberOfDecimals = Math.max(Math.ceil(Math.log(1 / Math.abs(percent)) / Math.LN10), 2);

                    if (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals))
                        numberOfDecimals = 2;

                    for (var n = 0; n < numberOfDecimals; n++) {
                        percentFormatString += "#";
                    }
                }

                str = str.replace("#percent", numberFormat(percent, percentFormatString, chart._cultureInfo));
                str = str.replace("#total", numberFormat(total, ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########"));
            } while (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0);
        }


        var fcn = function ($0) {
            if (($0[0] === "\"" && $0[$0.length - 1] === "\"") || ($0[0] === "\'" && $0[$0.length - 1] === "\'"))
                return $0.slice(1, $0.length - 1);

            var key = trimString($0.slice(1, $0.length - 1));
            key = key.replace("#index", indexKeywordValue);

            var index = null;

            try {
                var match = key.match(/(.*?)\s*\[\s*(.*?)\s*\]/);
                if (match && match.length > 0) {
                    index = trimString(match[2]);
                    key = trimString(match[1]);
                }
            } catch (e) { };


            var obj = null;

            if (key === "color") {
                return dp.color ? dp.color : ds.color ? ds.color : ds._colorSet[dpIndex % ds._colorSet.length];
            }

            if (dp.hasOwnProperty(key))
                obj = dp;
            else if (ds.hasOwnProperty(key))
                obj = ds;
            else return "";

            var value = obj[key];
            if (index !== null)
                value = value[index];

            if (key === "x") {
                if (chart.axisX && chart.plotInfo.axisXValueType === "dateTime")
                    return dateFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : chart.axisX && chart.axisX.valueFormatString ? chart.axisX.valueFormatString : "DD MMM YY", chart._cultureInfo);
                else
                    return numberFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : "#,##0.########", chart._cultureInfo);
            } else if (key === "y")
                return numberFormat(value, dp.yValueFormatString ? dp.yValueFormatString : ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########", chart._cultureInfo);
            else if (key === "z")
                return numberFormat(value, dp.zValueFormatString ? dp.zValueFormatString : ds.zValueFormatString ? ds.zValueFormatString : "#,##0.########", chart._cultureInfo);
            else
                return value;
        }

        return str.replace(regex, fcn);
    }


    //#endregion ToolTip

    //#region Event Manager

    function EventManager(chart) {
        this.chart = chart;
        this.lastObjectId = 0;
        var _this = this;
        this.objectMap = [];
        this.rectangularRegionEventSubscriptions = [];
        this.previousDataPointEventObject = null;
        //this.previousDataSeriesEventObject = null;

        this.ghostCanvas = createCanvas(this.chart.width, this.chart.height);
        //this.ghostCanvas.width = this.chart.width;
        //this.ghostCanvas.height = this.chart.height;

        this.ghostCtx = this.ghostCanvas.getContext("2d");

        var eventHandler = function (ev) {
            _this.mouseEventHandler.call(_this, ev);
        };

        this.mouseoveredObjectMaps = [];
        //this.chart.canvas.addEventListener("mouseover", eventHandler);
        //this.chart.canvas.addEventListener("mousemove", eventHandler);
        //this.chart.canvas.addEventListener("mouseout", eventHandler);
        //this.chart.canvas.addEventListener("click", eventHandler);
    }

    EventManager.prototype.reset = function () {
        this.lastObjectId = 0;
        this.objectMap = [];
        this.rectangularRegionEventSubscriptions = [];
        this.previousDataPointEventObject = null;

        this.eventObjects = [];
        //this.ghostCanvas.width = this.chart.width;
        //this.ghostCanvas.height = this.chart.height;

        if (isCanvasSupported) {
            this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height);
            this.ghostCtx.beginPath();
        }
    }

    EventManager.prototype.getNewObjectTrackingId = function () {
        return ++this.lastObjectId;
    }

    EventManager.prototype.mouseEventHandler = function (ev) {

        if (ev.type !== "mousemove" && ev.type !== "click")
            return;

        var eventObjectMaps = [];
        var xy = getMouseCoordinates(ev);
        var id = null;

        //var dataPointInfo = this.chart.getDataPointAtXY(xy.x, xy.y, false);

        //if (dataPointInfo) {
        //	id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
        //} else if (isCanvasSupported) {//IE9+
        //	id = getObjectId(xy.x, xy.y, this.ghostCtx);
        //}
        id = this.chart.getObjectAtXY(xy.x, xy.y, false);

        if (id && typeof (this.objectMap[id]) !== "undefined") {

            var eventObjectMap = this.objectMap[id];

            if (eventObjectMap.objectType === "dataPoint") {
                var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
                var dataPoint = dataSeries.dataPoints[eventObjectMap.dataPointIndex];
                var dataPointIndex = eventObjectMap.dataPointIndex;

                //Event Parameter should not contain reference to dataSeries directly. But to its options.
                eventObjectMap.eventParameter = {
                    x: xy.x, y: xy.y, dataPoint: dataPoint,
                    dataSeries: dataSeries._options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index,
                    chart: this.chart._publicChartReference
                };
                eventObjectMap.eventContext = { context: dataPoint, userContext: dataPoint, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };
                eventObjectMaps.push(eventObjectMap);

                //Add Dataseries too because mouse event on dataPoint also means there is an event on dataSeries. DataSeries is not present on ghost canvas
                eventObjectMap = this.objectMap[dataSeries.id];

                //Event Parameter should not contain reference to dataSeries directly. But to its options.
                eventObjectMap.eventParameter = {
                    x: xy.x, y: xy.y,
                    dataPoint: dataPoint, dataSeries: dataSeries._options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index,
                    chart: this.chart._publicChartReference
                };

                eventObjectMap.eventContext = { context: dataSeries, userContext: dataSeries._options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };
                eventObjectMaps.push(this.objectMap[dataSeries.id]);
            }
                //else if (eventObjectMap.objectType === "stripLine") {

                //	//Event Parameter should not contain reference to stripLine directly. But to its options.
                //	eventObjectMap.eventParameter = { x: xy.x, y: xy.y, stripLine: eventObjectMap.stripLine._options, axis: eventObjectMap.axis._options, stripLineIndex: eventObjectMap.stripLineIndex };
                //	eventObjectMap.eventContext = { context: eventObjectMap.stripLine, userContext: eventObjectMap.stripLine._options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };

                //	eventObjectMaps.push(eventObjectMap);
                //}
            else if (eventObjectMap.objectType === "legendItem") {

                var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
                var dataPoint = eventObjectMap.dataPointIndex !== null ? dataSeries.dataPoints[eventObjectMap.dataPointIndex] : null;

                //Event Parameter should not contain reference to DataSeries directly. But to its options.
                eventObjectMap.eventParameter = {
                    x: xy.x, y: xy.y,
                    dataSeries: dataSeries._options, dataPoint: dataPoint, dataPointIndex: eventObjectMap.dataPointIndex, dataSeriesIndex: eventObjectMap.dataSeriesIndex,
                    chart: this.chart._publicChartReference
                };
                eventObjectMap.eventContext = { context: this.chart.legend, userContext: this.chart.legend._options, mouseover: "itemmouseover", mousemove: "itemmousemove", mouseout: "itemmouseout", click: "itemclick" };
                eventObjectMaps.push(eventObjectMap);
            }
        }

        //Fire mouseout if existing mouseovered objects are not present in the objectmap.
        var mouseOutObjectMapsExcluded = [];
        for (var i = 0; i < this.mouseoveredObjectMaps.length; i++) {
            var mouseOut = true;

            for (var j = 0; j < eventObjectMaps.length; j++) {
                if (eventObjectMaps[j].id === this.mouseoveredObjectMaps[i].id) {
                    mouseOut = false;
                    break;
                }
            }

            if (mouseOut) {
                this.fireEvent(this.mouseoveredObjectMaps[i], "mouseout", ev);
            } else {
                mouseOutObjectMapsExcluded.push(this.mouseoveredObjectMaps[i]);
            }
        }

        this.mouseoveredObjectMaps = mouseOutObjectMapsExcluded;

        //Process new eventObectMaps
        //If they already don't exist, add them and fire mouseover
        //If ev.type is mousemove, then just fire mousemove
        //If ev.type is click, then fire two events - click followed by mousemove
        for (var i = 0; i < eventObjectMaps.length; i++) {

            var existing = false;

            for (var j = 0; j < this.mouseoveredObjectMaps.length; j++) {
                if (eventObjectMaps[i].id === this.mouseoveredObjectMaps[j].id) {
                    existing = true;
                    break;
                }
            }

            if (!existing) {
                this.fireEvent(eventObjectMaps[i], "mouseover", ev);
                this.mouseoveredObjectMaps.push(eventObjectMaps[i]);
            }

            if (ev.type === "click") {
                this.fireEvent(eventObjectMaps[i], "click", ev);
            } else if (ev.type === "mousemove") {
                this.fireEvent(eventObjectMaps[i], "mousemove", ev);
            }
        }
    }

    EventManager.prototype.fireEvent = function (eventObjectMap, eventType, ev) {

        if (!eventObjectMap || !eventType)
            return;

        var eventParameter = eventObjectMap.eventParameter;
        var eventContext = eventObjectMap.eventContext;
        //var context = eventObjectMap.eventContext.context;
        var userContext = eventObjectMap.eventContext.userContext

        if (userContext && eventContext && userContext[eventContext[eventType]])
            userContext[eventContext[eventType]].call(userContext, eventParameter);

        if (eventType !== "mouseout") {
            if (userContext.cursor && userContext.cursor !== ev.target.style.cursor) {
                ev.target.style.cursor = userContext.cursor;
            }
        } else {
            ev.target.style.cursor = this.chart._defaultCursor;
            delete eventObjectMap.eventParameter; // reference no longer required.
            delete eventObjectMap.eventContext; // reference no longer required.
        }

        //This is just a quick fix. Need to find a better way of calling internal event handlers.
        if (eventType === "click" && eventObjectMap.objectType === "dataPoint" && this.chart.pieDoughnutClickHandler) {
            this.chart.pieDoughnutClickHandler.call(this.chart.data[eventObjectMap.dataSeriesIndex], eventParameter);
        }
    }

    //#endregion Event Manager

    //#region Class CultureInfo

    function CultureInfo(chart, culture) {

        var cultureInfo;

        if (culture && cultures[culture])
            cultureInfo = cultures[culture];


        Title.parent.constructor.call(this, "CultureInfo", cultureInfo, chart.theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
    }

    extend(CultureInfo, CanvasJSObject);

    //#endregion Class CultureInfo

    //#region Animator


    function Animator(chart) {

        this.chart = chart;
        this.ctx = this.chart.plotArea.ctx;
        this.animations = [];
        this.animationRequestId = null;
    }

    //Animator.prototype.animate = function (duration, base, dest, source, animationCallback, onComplete) {
    Animator.prototype.animate = function (startDelay, duration, animationCallback, onComplete, easingFunction) {
        var _this = this;

        this.chart.isAnimating = true;
        easingFunction = easingFunction || AnimationHelper.easing.linear;

        if (animationCallback) {

            this.animations.push({
                startTime: (new Date()).getTime() + (startDelay ? startDelay : 0),
                duration: duration,
                animationCallback: animationCallback,
                onComplete: onComplete
            });
        }

        var remainingAnimations = [];

        while (this.animations.length > 0) {

            var animation = this.animations.shift();
            var now = (new Date()).getTime();
            var fractionComplete = 0;
            //var fractionComplete = Math.min(((new Date()).getTime() - animation.startTime) / animation.duration, 1);

            if (animation.startTime <= now) {
                fractionComplete = easingFunction(Math.min((now - animation.startTime), animation.duration), 0, 1, animation.duration);
                //var fractionComplete = AnimationHelper.easing.easeOutQuad(Math.min(((new Date()).getTime() - animation.startTime), animation.duration), 0, 1, animation.duration);

                fractionComplete = Math.min(fractionComplete, 1);

                if (isNaN(fractionComplete) || !isFinite(fractionComplete))
                    fractionComplete = 1;
            }

            if (fractionComplete < 1) {
                remainingAnimations.push(animation);
            }

            animation.animationCallback(fractionComplete);

            if (fractionComplete >= 1 && animation.onComplete)
                animation.onComplete();
        }

        this.animations = remainingAnimations;

        if (this.animations.length > 0) {
            this.animationRequestId = this.chart.requestAnimFrame.call(window, function () {
                _this.animate.call(_this);
            });
        } else {
            this.chart.isAnimating = false;
        }

    }

    Animator.prototype.cancelAllAnimations = function () {

        this.animations = [];

        if (this.animationRequestId) {
            this.chart.cancelRequestAnimFrame.call(window, this.animationRequestId);
        }

        this.animationRequestId = null;
        this.chart.isAnimating = false;
    }

    var AnimationHelper = {
        yScaleAnimation: function (fractionComplete, animationInfo) {
            if (fractionComplete === 0)
                return;

            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;
            var base = animationInfo.animationBase;

            var offsetY = (base - base * fractionComplete);

            ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, offsetY, ctx.canvas.width / devicePixelBackingStoreRatio, fractionComplete * ctx.canvas.height / devicePixelBackingStoreRatio);
        },
        xScaleAnimation: function (fractionComplete, animationInfo) {
            if (fractionComplete === 0)
                return;

            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;
            var base = animationInfo.animationBase;

            var offsetX = (base - base * fractionComplete);

            ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, offsetX, 0, fractionComplete * ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);
        },
        xClipAnimation: function (fractionComplete, animationInfo) {

            if (fractionComplete === 0)
                return;

            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;

            ctx.save();

            if (fractionComplete > 0)
                ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width * fractionComplete, sourceCanvas.height, 0, 0, sourceCanvas.width * fractionComplete / devicePixelBackingStoreRatio, sourceCanvas.height / devicePixelBackingStoreRatio);

            ctx.restore();
        },
        fadeInAnimation: function (fractionComplete, animationInfo) {

            if (fractionComplete === 0)
                return;

            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;

            ctx.save();

            ctx.globalAlpha = fractionComplete;

            ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);

            ctx.restore();
        },
        easing: {
            linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            easeOutQuad: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeOutQuart: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInQuad: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeInQuart: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            }
        }
    }

    //#endregion Animator

    //#region Render Helper

    var RenderHelper = {
        drawMarker: function (x, y, ctx, markerType, markerSize, markerColor, markerBorderColor, markerBorderThickness) {

            if (!ctx)
                return;

            var alpha = 1;

            ctx.fillStyle = markerColor ? markerColor : "#000000";
            ctx.strokeStyle = markerBorderColor ? markerBorderColor : "#000000";
            ctx.lineWidth = markerBorderThickness ? markerBorderThickness : 0;


            if (markerType === "circle") {

                ctx.moveTo(x, y);
                ctx.beginPath();
                //return;

                ctx.arc(x, y, markerSize / 2, 0, Math.PI * 2, false);

                if (markerColor)
                    ctx.fill();

                if (markerBorderThickness) {

                    if (!markerBorderColor) {
                        alpha = ctx.globalAlpha;
                        ctx.globalAlpha = .15;
                        ctx.strokeStyle = "black";
                        ctx.stroke();
                        ctx.globalAlpha = alpha;
                    } else
                        ctx.stroke();

                }
            }
            else if (markerType === "square") {

                //ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
                ctx.beginPath();
                ctx.rect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);

                if (markerColor)
                    ctx.fill();

                if (markerBorderThickness) {

                    if (!markerBorderColor) {
                        alpha = ctx.globalAlpha;
                        ctx.globalAlpha = .15;
                        ctx.strokeStyle = "black";
                        ctx.stroke();
                        ctx.globalAlpha = alpha;
                    } else
                        ctx.stroke();

                }
            } else if (markerType === "triangle") {

                ctx.beginPath();
                ctx.moveTo(x - markerSize / 2, y + markerSize / 2);
                ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
                ctx.lineTo(x, y - markerSize / 2);
                ctx.closePath();

                if (markerColor)
                    ctx.fill();

                if (markerBorderThickness) {

                    if (!markerBorderColor) {
                        alpha = ctx.globalAlpha;
                        ctx.globalAlpha = .15;
                        ctx.strokeStyle = "black";
                        ctx.stroke();
                        ctx.globalAlpha = alpha;
                    } else
                        ctx.stroke();

                }
                ctx.beginPath();
            } else if (markerType === "cross") {

                ctx.strokeStyle = markerColor;
                markerBorderThickness = markerSize / 4;
                ctx.lineWidth = markerBorderThickness;

                ctx.beginPath();
                ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
                ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
                ctx.stroke();

                ctx.moveTo(x + markerSize / 2, y - markerSize / 2);
                ctx.lineTo(x - markerSize / 2, y + markerSize / 2);
                ctx.stroke();

            }


        },
        drawMarkers: function (markers) {
            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];

                RenderHelper.drawMarker(marker.x, marker.y, marker.ctx, marker.type, marker.size, marker.color, marker.borderColor, marker.borderThickness);
            }
        }
        //,
        //draw1pxLine: function (x1, y1, x2, y2, color, ctx) {
        //	ctx.beginPath();
        //	ctx.drawRect(x1, y1, x2 - x1, y2 - y1);
        //	ctx.stroke();
        //}
    }

    //#endregion Render Helper

    //#endregion Class Definitions

    //#region Public API
    var CanvasJS = {

        Chart: function (containerId, options) {
            var _chart = new Chart(containerId, options, this);

            this.render = function () { _chart.render(this.options) };
            //console.log(_chart);
            this.options = _chart._options;
        },
        addColorSet: function (name, colorSet) {
            colorSets[name] = colorSet;
        },
        addCultureInfo: function (name, cultureInfo) {
            cultures[name] = cultureInfo;
        }
    }

    CanvasJS.Chart.version = "v1.6.2 GA";
    window.CanvasJS = CanvasJS;
    //#endregion Public API

})();;
/**
* @preserve CanvasJS jQuery Charting Plugin - http://canvasjs.com/ 
* Copyright 2013 fenopix
*/

/*
* CanvasJS Charts follows Dual Licensing Model as mentioned below. 
* 
* ---------------------Free for Non-Commercial Use--------------------
* 
* For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
*     http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
* 
* ---------------------Commercial License--------------------
* Commercial use of CanvasJS requires you to purchase a license. Without a commercial license you can use it for evaluation purposes only. Please refer to the following link for further details.
*     http://canvasjs.com/
* 
*/
(function ($, window, document, undefined) {

	$.fn.CanvasJSChart = function (options) {

		if (options) {

			var $el = this.first();
			var container = this[0];
			var chart = new CanvasJS.Chart(container, options);

			$el.children(".canvasjs-chart-container").data("canvasjsChartRef", chart);

			chart.render();

			return this;

		} else {

			return this.first().children(".canvasjs-chart-container").data("canvasjsChartRef");

		}
	}

}(jQuery, window, document));;
/*! noUiSlider - 7.0.9 - 2014-10-08 16:49:44 */

(function(){

	'use strict';

var
/** @const */ FormatOptions = [
	'decimals',
	'thousand',
	'mark',
	'prefix',
	'postfix',
	'encoder',
	'decoder',
	'negativeBefore',
	'negative',
	'edit',
	'undo'
];

// General

	// Reverse a string
	function strReverse ( a ) {
		return a.split('').reverse().join('');
	}

	// Check if a string starts with a specified prefix.
	function strStartsWith ( input, match ) {
		return input.substring(0, match.length) === match;
	}

	// Check is a string ends in a specified postfix.
	function strEndsWith ( input, match ) {
		return input.slice(-1 * match.length) === match;
	}

	// Throw an error if formatting options are incompatible.
	function throwEqualError( F, a, b ) {
		if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
			throw new Error(a);
		}
	}

	// Check if a number is finite and not NaN
	function isValidNumber ( input ) {
		return typeof input === 'number' && isFinite( input );
	}

	// Provide rounding-accurate toFixed method.
	function toFixed ( value, decimals ) {
		var scale = Math.pow(10, decimals);
		return ( Math.round(value * scale) / scale).toFixed( decimals );
	}


// Formatting

	// Accept a number as input, output formatted string.
	function formatTo ( decimals, thousand, mark, prefix, postfix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

		var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

		// Apply user encoder to the input.
		// Expected outcome: number.
		if ( encoder ) {
			input = encoder(input);
		}

		// Stop if no valid number was provided, the number is infinite or NaN.
		if ( !isValidNumber(input) ) {
			return false;
		}

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( decimals && parseFloat(input.toFixed(decimals)) === 0 ) {
			input = 0;
		}

		// Formatting is done on absolute numbers,
		// decorated by an optional negative symbol.
		if ( input < 0 ) {
			inputIsNegative = true;
			input = Math.abs(input);
		}

		// Reduce the number of decimals to the specified option.
		if ( decimals !== false ) {
			input = toFixed( input, decimals );
		}

		// Transform the number into a string, so it can be split.
		input = input.toString();

		// Break the number on the decimal separator.
		if ( input.indexOf('.') !== -1 ) {
			inputPieces = input.split('.');

			inputBase = inputPieces[0];

			if ( mark ) {
				inputDecimals = mark + inputPieces[1];
			}

		} else {

		// If it isn't split, the entire number will do.
			inputBase = input;
		}

		// Group numbers in sets of three.
		if ( thousand ) {
			inputBase = strReverse(inputBase).match(/.{1,3}/g);
			inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
		}

		// If the number is negative, prefix with negation symbol.
		if ( inputIsNegative && negativeBefore ) {
			output += negativeBefore;
		}

		// Prefix the number
		if ( prefix ) {
			output += prefix;
		}

		// Normal negative option comes after the prefix. Defaults to '-'.
		if ( inputIsNegative && negative ) {
			output += negative;
		}

		// Append the actual number.
		output += inputBase;
		output += inputDecimals;

		// Apply the postfix.
		if ( postfix ) {
			output += postfix;
		}

		// Run the output through a user-specified post-formatter.
		if ( edit ) {
			output = edit ( output, originalInput );
		}

		// All done.
		return output;
	}

	// Accept a sting as input, output decoded number.
	function formatFrom ( decimals, thousand, mark, prefix, postfix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

		var originalInput = input, inputIsNegative, output = '';

		// User defined pre-decoder. Result must be a non empty string.
		if ( undo ) {
			input = undo(input);
		}

		// Test the input. Can't be empty.
		if ( !input || typeof input !== 'string' ) {
			return false;
		}

		// If the string starts with the negativeBefore value: remove it.
		// Remember is was there, the number is negative.
		if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
			input = input.replace(negativeBefore, '');
			inputIsNegative = true;
		}

		// Repeat the same procedure for the prefix.
		if ( prefix && strStartsWith(input, prefix) ) {
			input = input.replace(prefix, '');
		}

		// And again for negative.
		if ( negative && strStartsWith(input, negative) ) {
			input = input.replace(negative, '');
			inputIsNegative = true;
		}

		// Remove the postfix.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
		if ( postfix && strEndsWith(input, postfix) ) {
			input = input.slice(0, -1 * postfix.length);
		}

		// Remove the thousand grouping.
		if ( thousand ) {
			input = input.split(thousand).join('');
		}

		// Set the decimal separator back to period.
		if ( mark ) {
			input = input.replace(mark, '.');
		}

		// Prepend the negative symbol.
		if ( inputIsNegative ) {
			output += '-';
		}

		// Add the number
		output += input;

		// Trim all non-numeric characters (allow '.' and '-');
		output = output.replace(/[^0-9\.\-.]/g, '');

		// The value contains no parse-able number.
		if ( output === '' ) {
			return false;
		}

		// Covert to number.
		output = Number(output);

		// Run the user-specified post-decoder.
		if ( decoder ) {
			output = decoder(output);
		}

		// Check is the output is valid, otherwise: return false.
		if ( !isValidNumber(output) ) {
			return false;
		}

		return output;
	}


// Framework

	// Validate formatting options
	function validate ( inputOptions ) {

		var i, optionName, optionValue,
			filteredOptions = {};

		for ( i = 0; i < FormatOptions.length; i+=1 ) {

			optionName = FormatOptions[i];
			optionValue = inputOptions[optionName];

			if ( optionValue === undefined ) {

				// Only default if negativeBefore isn't set.
				if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
					filteredOptions[optionName] = '-';
				// Don't set a default for mark when 'thousand' is set.
				} else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
					filteredOptions[optionName] = '.';
				} else {
					filteredOptions[optionName] = false;
				}

			// Floating points in JS are stable up to 7 decimals.
			} else if ( optionName === 'decimals' ) {
				if ( optionValue >= 0 && optionValue < 8 ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

			// These options, when provided, must be functions.
			} else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
				if ( typeof optionValue === 'function' ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

			// Other options are strings.
			} else {

				if ( typeof optionValue === 'string' ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}
			}
		}

		// Some values can't be extracted from a
		// string if certain combinations are present.
		throwEqualError(filteredOptions, 'mark', 'thousand');
		throwEqualError(filteredOptions, 'prefix', 'negative');
		throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

		return filteredOptions;
	}

	// Pass all options as function arguments
	function passAll ( options, method, input ) {
		var i, args = [];

		// Add all options in order of FormatOptions
		for ( i = 0; i < FormatOptions.length; i+=1 ) {
			args.push(options[FormatOptions[i]]);
		}

		// Append the input, then call the method, presenting all
		// options as arguments.
		args.push(input);
		return method.apply('', args);
	}

	/** @constructor */
	function wNumb ( options ) {

		if ( !(this instanceof wNumb) ) {
			return new wNumb ( options );
		}

		if ( typeof options !== "object" ) {
			return;
		}

		options = validate(options);

		// Call 'formatTo' with proper arguments.
		this.to = function ( input ) {
			return passAll(options, formatTo, input);
		};

		// Call 'formatFrom' with proper arguments.
		this.from = function ( input ) {
			return passAll(options, formatFrom, input);
		};
	}

	/** @export */
	window.wNumb = wNumb;

}());

/*jslint browser: true */
/*jslint white: true */

(function( $ ){

	'use strict';

// Helpers

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $.zepto && $.zepto.isZ(a) );
	}


// Link types

	function fromPrefix ( target, method ) {

		// If target is a string, a new hidden input will be created.
		if ( typeof target === 'string' && target.indexOf('-inline-') === 0 ) {

			// By default, use the 'html' method.
			this.method = method || 'html';

			// Use jQuery to create the element
			this.target = this.el = $( target.replace('-inline-', '') || '<div/>' );

			return true;
		}
	}

	function fromString ( target ) {

		// If the string doesn't begin with '-', which is reserved, add a new hidden input.
		if ( typeof target === 'string' && target.indexOf('-') !== 0 ) {

			this.method = 'val';

			var element = document.createElement('input');
				element.name = target;
				element.type = 'hidden';
			this.target = this.el = $(element);

			return true;
		}
	}

	function fromFunction ( target ) {

		// The target can also be a function, which will be called.
		if ( typeof target === 'function' ) {
			this.target = false;
			this.method = target;

			return true;
		}
	}

	function fromInstance ( target, method ) {

		if ( isInstance( target ) && !method ) {

		// If a jQuery/Zepto input element is provided, but no method is set,
		// the element can assume it needs to respond to 'change'...
			if ( target.is('input, select, textarea') ) {

				// Default to .val if this is an input element.
				this.method = 'val';

				// Fire the API changehandler when the target changes.
				this.target = target.on('change.liblink', this.changeHandler);

			} else {

				this.target = target;

				// If no method is set, and we are not auto-binding an input, default to 'html'.
				this.method = 'html';
			}

			return true;
		}
	}

	function fromInstanceMethod ( target, method ) {

		// The method must exist on the element.
		if ( isInstance( target ) &&
			(typeof method === 'function' ||
				(typeof method === 'string' && target[method]))
		) {
			this.method = method;
			this.target = target;

			return true;
		}
	}

var
/** @const */
	creationFunctions = [fromPrefix, fromString, fromFunction, fromInstance, fromInstanceMethod];


// Link Instance

/** @constructor */
	function Link ( target, method, format ) {

		var that = this, valid = false;

		// Forward calls within scope.
		this.changeHandler = function ( changeEvent ) {
			var decodedValue = that.formatInstance.from( $(this).val() );

			// If the value is invalid, stop this event, as well as it's propagation.
			if ( decodedValue === false || isNaN(decodedValue) ) {

				// Reset the value.
				$(this).val(that.lastSetValue);
				return false;
			}

			that.changeHandlerMethod.call( '', changeEvent, decodedValue );
		};

		// See if this Link needs individual targets based on its usage.
		// If so, return the element that needs to be copied by the
		// implementing interface.
		// Default the element to false.
		this.el = false;

		// Store the formatter, or use the default.
		this.formatInstance = format;

		// Try all Link types.
		/*jslint unparam: true*/
		$.each(creationFunctions, function(i, fn){
			valid = fn.call(that, target, method);
			return !valid;
		});
		/*jslint unparam: false*/

		// Nothing matched, throw error.
		if ( !valid ) {
			throw new RangeError("(Link) Invalid Link.");
		}
	}

	// Provides external items with the object value.
	Link.prototype.set = function ( value ) {

		// Ignore the value, so only the passed-on arguments remain.
		var args = Array.prototype.slice.call( arguments ),
			additionalArgs = args.slice(1);

		// Store some values. The actual, numerical value,
		// the formatted value and the parameters for use in 'resetValue'.
		// Slice additionalArgs to break the relation.
		this.lastSetValue = this.formatInstance.to( value );

		// Prepend the value to the function arguments.
		additionalArgs.unshift(
			this.lastSetValue
		);

		// When target is undefined, the target was a function.
		// In that case, provided the object as the calling scope.
		// Branch between writing to a function or an object.
		( typeof this.method === 'function' ?
			this.method :
			this.target[ this.method ] ).apply( this.target, additionalArgs );
	};


// Developer API

/** @constructor */
	function LinkAPI ( origin ) {
		this.items = [];
		this.elements = [];
		this.origin = origin;
	}

	LinkAPI.prototype.push = function( item, element ) {
		this.items.push(item);

		// Prevent 'false' elements
		if ( element ) {
			this.elements.push(element);
		}
	};

	LinkAPI.prototype.reconfirm = function ( flag ) {
		var i;
		for ( i = 0; i < this.elements.length; i += 1 ) {
			this.origin.LinkConfirm(flag, this.elements[i]);
		}
	};

	LinkAPI.prototype.remove = function ( flag ) {
		var i;
		for ( i = 0; i < this.items.length; i += 1 ) {
			this.items[i].target.off('.liblink');
		}
		for ( i = 0; i < this.elements.length; i += 1 ) {
			this.elements[i].remove();
		}
	};

	LinkAPI.prototype.change = function ( value ) {

		if ( this.origin.LinkIsEmitting ) {
			return false;
		}

		this.origin.LinkIsEmitting = true;

		var args = Array.prototype.slice.call( arguments, 1 ), i;
		args.unshift( value );

		// Write values to serialization Links.
		// Convert the value to the correct relative representation.
		for ( i = 0; i < this.items.length; i += 1 ) {
			this.items[i].set.apply(this.items[i], args);
		}

		this.origin.LinkIsEmitting = false;
	};


// jQuery plugin

	function binder ( flag, target, method, format ){

		if ( flag === 0 ) {
			flag = this.LinkDefaultFlag;
		}

		// Create a list of API's (if it didn't exist yet);
		if ( !this.linkAPI ) {
			this.linkAPI = {};
		}

		// Add an API point.
		if ( !this.linkAPI[flag] ) {
			this.linkAPI[flag] = new LinkAPI(this);
		}

		var linkInstance = new Link ( target, method, format || this.LinkDefaultFormatter );

		// Default the calling scope to the linked object.
		if ( !linkInstance.target ) {
			linkInstance.target = $(this);
		}

		// If the Link requires creation of a new element,
		// Pass the element and request confirmation to get the changehandler.
		// Set the method to be called when a Link changes.
		linkInstance.changeHandlerMethod = this.LinkConfirm( flag, linkInstance.el );

		// Store the linkInstance in the flagged list.
		this.linkAPI[flag].push( linkInstance, linkInstance.el );

		// Now that Link have been connected, request an update.
		this.LinkUpdate( flag );
	}

	/** @export */
	$.fn.Link = function( flag ){

		var that = this;

		// Delete all linkAPI
		if ( flag === false ) {

			return that.each(function(){

				// .Link(false) can be called on elements without Links.
				// When that happens, the objects can't be looped.
				if ( !this.linkAPI ) {
					return;
				}

				$.map(this.linkAPI, function(api){
					api.remove();
				});

				delete this.linkAPI;
			});
		}

		if ( flag === undefined ) {

			flag = 0;

		} else if ( typeof flag !== 'string') {

			throw new Error("Flag must be string.");
		}

		return {
			to: function( a, b, c ){
				return that.each(function(){
					binder.call(this, flag, a, b, c);
				});
			}
		};
	};

}( window.jQuery || window.Zepto ));

/*jslint browser: true */
/*jslint white: true */

(function( $ ){

	'use strict';


	// Removes duplicates from an array.
	function unique(array) {
		return $.grep(array, function(el, index) {
			return index === $.inArray(el, array);
		});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Rounds a number to 7 supported decimals.
	function accurateNumber( number ) {
		var p = Math.pow(10, 7);
		return Number((Math.round(number*p)/p).toFixed(7));
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		element.addClass(className);
		setTimeout(function(){
			element.removeClass(className);
		}, duration);
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	function asArray ( a ) {
		return $.isArray(a) ? a : [a];
	}


	var
	// Cache the document selector;
	/** @const */
	doc = $(document),
	// Make a backup of the original jQuery/Zepto .val() method.
	/** @const */
	$val = $.fn.val,
	// Namespace for binding and unbinding slider events;
	/** @const */
	namespace = '.nui',
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	/** @const */
	actions = window.navigator.pointerEnabled ? {
		start: 'pointerdown',
		move: 'pointermove',
		end: 'pointerup'
	} : window.navigator.msPointerEnabled ? {
		start: 'MSPointerDown',
		move: 'MSPointerMove',
		end: 'MSPointerUp'
	} : {
		start: 'mousedown touchstart',
		move: 'mousemove touchmove',
		end: 'mouseup touchend'
	},
	// Re-usable list of classes;
	/** @const */
	Classes = [
/*  0 */  'noUi-target'
/*  1 */ ,'noUi-base'
/*  2 */ ,'noUi-origin'
/*  3 */ ,'noUi-handle'
/*  4 */ ,'noUi-horizontal'
/*  5 */ ,'noUi-vertical'
/*  6 */ ,'noUi-background'
/*  7 */ ,'noUi-connect'
/*  8 */ ,'noUi-ltr'
/*  9 */ ,'noUi-rtl'
/* 10 */ ,'noUi-dragable'
/* 11 */ ,''
/* 12 */ ,'noUi-state-drag'
/* 13 */ ,''
/* 14 */ ,'noUi-state-tap'
/* 15 */ ,'noUi-active'
/* 16 */ ,''
/* 17 */ ,'noUi-stacking'
	];


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct ), a, b;

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			a = xPct[j-1];
			b = xPct[j];

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
			throw new Error("noUiSlider: 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider: 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([
			 that.xVal[i]
			,that.xVal[i+1]
		], n) / subRangeRatio (
			that.xPct[i],
			that.xPct[i+1] );
	}


// Interface

	// The interface to Spectrum handles all direction-based
	// conversions, so the above values are unaware.

	function Spectrum ( entry, snap, direction, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];

		this.snap = snap;
		this.direction = direction;

		var that = this, index;

		// Loop all entries.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				handleEntryPoint(index, entry[index], that);
			}
		}

		// Store the actual step values.
		that.xNumSteps = that.xSteps.slice(0);

		for ( index in that.xNumSteps ) {
			if ( that.xNumSteps.hasOwnProperty(index) ) {
				handleStepPoint(Number(index), that.xNumSteps[index], that);
			}
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {
		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return accurateNumber(fromStepping( this.xVal, this.xPct, value ));
	};

	Spectrum.prototype.getStep = function ( value ) {

		// Find the proper step for rtl sliders by search in inverse direction.
		// Fixes issue #262.
		if ( this.direction ) {
			value = 100 - value;
		}

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.getApplicableStep = function ( value ) {

		// If the value is 100%, return the negative step twice.
		var j = getJ(value, this.xPct), offset = value === 100 ? 2 : 1;
		return [this.xNumSteps[j-2], this.xVal[j-offset], this.xNumSteps[j-offset]];
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	/** @const */
	var defaultFormatter = { 'to': function( value ){
		return value.toFixed(2);
	}, 'from': Number };

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider: 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || $.isArray(entry) ) {
			throw new Error("noUiSlider: 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !$.isArray( entry ) || !entry.length || entry.length > 2 ) {
			throw new Error("noUiSlider: 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'animate' option must be a boolean.");
		}
	}

	function testConnect ( parsed, entry ) {

		if ( entry === 'lower' && parsed.handles === 1 ) {
			parsed.connect = 1;
		} else if ( entry === 'upper' && parsed.handles === 1 ) {
			parsed.connect = 2;
		} else if ( entry === true && parsed.handles === 2 ) {
			parsed.connect = 3;
		} else if ( entry === false ) {
			parsed.connect = 0;
		} else {
			throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
		}
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
		  case 'horizontal':
			parsed.ort = 0;
			break;
		  case 'vertical':
			parsed.ort = 1;
			break;
		  default:
			throw new Error("noUiSlider: 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'margin' option must be numeric.");
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit ) {
			throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
		  case 'ltr':
			parsed.dir = 0;
			break;
		  case 'rtl':
			parsed.dir = 1;
			parsed.connect = [0,2,1,3][parsed.connect];
			break;
		  default:
			throw new Error("noUiSlider: 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0,
			drag = entry.indexOf('drag') >= 0,
			fixed = entry.indexOf('fixed') >= 0,
			snap = entry.indexOf('snap') >= 0;

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap
		};
	}

	function testFormat ( parsed, entry ) {

		parsed.format = entry;

		// Any object with a to and from method is supported.
		if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
			return true;
		}

		throw new Error( "noUiSlider: 'format' requires 'to' and 'from' methods.");
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		var parsed = {
			margin: 0,
			limit: 0,
			animate: true,
			format: defaultFormatter
		}, tests;

		// Tests are executed in the order they are presented here.
		tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'behaviour': { r: true, t: testBehaviour },
			'format': { r: false, t: testFormat }
		};

		// Set defaults where applicable.
		options = $.extend({
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal'
		}, options);

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		$.each( tests, function( name, test ){

			// If the option isn't set, but it is required, throw an error.
			if ( options[name] === undefined ) {

				if ( test.r ) {
					throw new Error("noUiSlider: '" + name + "' is required.");
				}

				return true;
			}

			test.t( parsed, options[name] );
		});

		// Pre-define the styles.
		parsed.style = parsed.ort ? 'top' : 'left';

		return parsed;
	}

// Class handling

	// Delimit proposed values for handle positions.
	function getPositions ( a, b, delimit ) {

		// Add movement to current position.
		var c = a + b[0], d = a + b[1];

		// Only alter the other position on drag,
		// not on standard sliding.
		if ( delimit ) {
			if ( c < 0 ) {
				d += Math.abs(c);
			}
			if ( d > 100 ) {
				c -= ( d - 100 );
			}

			// Limit values to 0 and 100.
			return [limit(c), limit(d)];
		}

		return [c,d];
	}


// Event handling

	// Provide a clean event with standardized offset values.
	function fixEvent ( e ) {

		// Prevent scrolling and panning on touch events, while
		// attempting to slide. The tap event also depends on this.
		e.preventDefault();

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var  touch = e.type.indexOf('touch') === 0
			,mouse = e.type.indexOf('mouse') === 0
			,pointer = e.type.indexOf('pointer') === 0
			,x,y, event = e;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// Get the originalEvent, if the event has been wrapped
		// by jQuery. Zepto doesn't wrap the event.
		if ( e.originalEvent ) {
			e = e.originalEvent;
		}

		if ( touch ) {
			// noUiSlider supports one movement at a time,
			// so we can select the first 'changedTouch'.
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
		}

		if ( mouse || pointer ) {

			// Polyfill the pageXOffset and pageYOffset
			// variables for IE7 and IE8;
			if( !pointer && window.pageXOffset === undefined ){
				window.pageXOffset = document.documentElement.scrollLeft;
				window.pageYOffset = document.documentElement.scrollTop;
			}

			x = e.clientX + window.pageXOffset;
			y = e.clientY + window.pageYOffset;
		}

		event.points = [x, y];
		event.cursor = mouse;

		return event;
	}


// DOM additions

	// Append a handle to the base.
	function addHandle ( direction, index ) {

		var handle = $('<div><div/></div>').addClass( Classes[2] ),
			additions = [ '-lower', '-upper' ];

		if ( direction ) {
			additions.reverse();
		}

		handle.children().addClass(
			Classes[3] + " " + Classes[3]+additions[index]
		);

		return handle;
	}

	// Add the proper connection classes.
	function addConnection ( connect, target, handles ) {

		// Apply the required connection classes to the elements
		// that need them. Some classes are made up for several
		// segments listed in the class list, to allow easy
		// renaming and provide a minor compression benefit.
		switch ( connect ) {
			case 1:	target.addClass( Classes[7] );
					handles[0].addClass( Classes[6] );
					break;
			case 3: handles[1].addClass( Classes[6] );
					/* falls through */
			case 2: handles[0].addClass( Classes[7] );
					/* falls through */
			case 0: target.addClass(Classes[6]);
					break;
		}
	}

	// Add handles to the slider base.
	function addHandles ( nrHandles, direction, base ) {

		var index, handles = [];

		// Append handles.
		for ( index = 0; index < nrHandles; index += 1 ) {

			// Keep a list of all added handles.
			handles.push( addHandle( direction, index ).appendTo(base) );
		}

		return handles;
	}

	// Initialize a single slider.
	function addSlider ( direction, orientation, target ) {

		// Apply classes and data to the target.
		target.addClass([
			Classes[0],
			Classes[8 + direction],
			Classes[4 + orientation]
		].join(' '));

		return $('<div/>').appendTo(target).addClass( Classes[1] );
	}

function closure ( target, options, originalOptions ){

// Internal variables

	// All variables local to 'closure' are marked $.
	var $Target = $(target),
		$Locations = [-1, -1],
		$Base,
		$Handles,
		$Spectrum = options.spectrum,
		$Values = [],
	// libLink. For rtl sliders, 'lower' and 'upper' should not be inverted
	// for one-handle sliders, so trim 'upper' it that case.
		triggerPos = ['lower', 'upper'].slice(0, options.handles);

	// Invert the libLink connection for rtl sliders.
	if ( options.dir ) {
		triggerPos.reverse();
	}

// Helpers

	// Shorthand for base dimensions.
	function baseSize ( ) {
		return $Base[['width', 'height'][options.ort]]();
	}

	// External event handling
	function fireEvents ( events ) {

		// Use the external api to get the values.
		// Wrap the values in an array, as .trigger takes
		// only one additional argument.
		var index, values = [ $Target.val() ];

		for ( index = 0; index < events.length; index += 1 ){
			$Target.trigger(events[index], values);
		}
	}

	// Returns the input array, respecting the slider direction configuration.
	function inSliderOrder ( values ) {

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		if ( options.dir ) {
			return values.reverse();
		}

		return values;
	}

// libLink integration

	// Create a new function which calls .val on input change.
	function createChangeHandler ( trigger ) {
		return function ( ignore, value ){
			// Determine which array position to 'null' based on 'trigger'.
			$Target.val( [ trigger ? null : value, trigger ? value : null ], true );
		};
	}

	// Called by libLink when it wants a set of links updated.
	function linkUpdate ( flag ) {

		var trigger = $.inArray(flag, triggerPos);

		// The API might not have been set yet.
		if ( $Target[0].linkAPI && $Target[0].linkAPI[flag] ) {
			$Target[0].linkAPI[flag].change(
				$Values[trigger],
				$Handles[trigger].children(),
				$Target
			);
		}
	}

	// Called by libLink to append an element to the slider.
	function linkConfirm ( flag, element ) {

		// Find the trigger for the passed flag.
		var trigger = $.inArray(flag, triggerPos);

		// If set, append the element to the handle it belongs to.
		if ( element ) {
			element.appendTo( $Handles[trigger].children() );
		}

		// The public API is reversed for rtl sliders, so the changeHandler
		// should not be aware of the inverted trigger positions.
		// On rtl slider with one handle, 'lower' should be used.
		if ( options.dir && options.handles > 1 ) {
			trigger = trigger === 1 ? 0 : 1;
		}

		return createChangeHandler( trigger );
	}

	// Place elements back on the slider.
	function reAppendLink ( ) {

		var i, flag;

		// The API keeps a list of elements: we can re-append them on rebuild.
		for ( i = 0; i < triggerPos.length; i += 1 ) {
			if ( this.linkAPI && this.linkAPI[(flag = triggerPos[i])] ) {
				this.linkAPI[flag].reconfirm(flag);
			}
		}
	}

	target.LinkUpdate = linkUpdate;
	target.LinkConfirm = linkConfirm;
	target.LinkDefaultFormatter = options.format;
	target.LinkDefaultFlag = 'lower';

	target.reappend = reAppendLink;


	// Handler for attaching events trough a proxy.
	function attach ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.

		// Add the noUiSlider namespace to all events.
		events = events.replace( /\s/g, namespace + ' ' ) + namespace;

		// Bind a closure on the target.
		return element.on( events, function( e ){

			// jQuery and Zepto (1) handle unset attributes differently,
			// but always falsy; #208
			if ( !!$Target.attr('disabled') ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( $Target.hasClass( Classes[14] ) ) {
				return false;
			}

			e = fixEvent(e);
			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		});
	}

	// Handle movement on document for handle and range drag.
	function move ( event, data ) {

		var handles = data.handles || $Handles, positions, state = false,
			proposal = ((event.calcPoint - data.start) * 100) / baseSize(),
			h = handles[0][0] !== $Handles[0][0] ? 1 : 0;

		// Calculate relative positions for the handles.
		positions = getPositions( proposal, data.positions, handles.length > 1);

		state = setHandle ( handles[0], positions[h], handles.length === 1 );

		if ( handles.length > 1 ) {
			state = setHandle ( handles[1], positions[h?0:1], false ) || state;
		}

		// Fire the 'slide' event if any handle moved.
		if ( state ) {
			fireEvents(['slide']);
		}
	}

	// Unbind move events on document, call callbacks.
	function end ( event ) {

		// The handle is no longer active, so remove the class.
		$('.' + Classes[15]).removeClass(Classes[15]);

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			$('body').css('cursor', '').off( namespace );
		}

		// Unbind the move and end events, which are added on 'start'.
		doc.off( namespace );

		// Remove dragging class.
		$Target.removeClass(Classes[12]);

		// Fire the change and set events.
		fireEvents(['set', 'change']);
	}

	// Bind move events on document.
	function start ( event, data ) {

		// Mark the handle as 'active' so it can be styled.
		if( data.handles.length === 1 ) {
			data.handles[0].children().addClass(Classes[15]);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move event.
		attach ( actions.move, doc, move, {
			start: event.calcPoint,
			handles: data.handles,
			positions: [
				$Locations[0],
				$Locations[$Handles.length - 1]
			]
		});

		// Unbind all movement when the drag ends.
		attach ( actions.end, doc, end, null );

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			$('body').css('cursor', $(event.target).css('cursor'));

			// Mark the target with a dragging state.
			if ( $Handles.length > 1 ) {
				$Target.addClass(Classes[12]);
			}

			// Prevent text selection when dragging the handles.
			$('body').on('selectstart' + namespace, false);
		}
	}

	// Move closest handle to tapped location.
	function tap ( event ) {

		var location = event.calcPoint, total = 0, to;

		// The tap event shouldn't propagate up and cause 'edge' to run.
		event.stopPropagation();

		// Add up the handle offsets.
		$.each( $Handles, function(){
			total += this.offset()[ options.style ];
		});

		// Find the handle closest to the tapped position.
		total = ( location < total/2 || $Handles.length === 1 ) ? 0 : 1;

		location -= $Base.offset()[ options.style ];

		// Calculate the new position.
		to = ( location * 100 ) / baseSize();

		if ( !options.events.snap ) {
			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			addClassFor( $Target, Classes[14], 300 );
		}

		// Find the closest handle and calculate the tapped point.
		// The set handle to the new position.
		setHandle( $Handles[total], to );

		fireEvents(['slide', 'set', 'change']);

		if ( options.events.snap ) {
			start(event, { handles: [$Handles[total]] });
		}
	}

	// Attach events to several slider parts.
	function events ( behaviour ) {

		var i, drag;

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			for ( i = 0; i < $Handles.length; i += 1 ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, $Handles[i].children(), start, {
					handles: [ $Handles[i] ]
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {

			attach ( actions.start, $Base, tap, {
				handles: $Handles
			});
		}

		// Make the range dragable.
		if ( behaviour.drag ){

			drag = $Base.find( '.' + Classes[7] ).addClass( Classes[10] );

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				drag = drag.add($Base.children().not( drag ).children());
			}

			attach ( actions.start, drag, start, {
				handles: $Handles
			});
		}
	}


	// Test suggested values and apply margin, step.
	function setHandle ( handle, to, noLimitOption ) {

		var trigger = handle[0] !== $Handles[0][0] ? 1 : 0,
			lowerMargin = $Locations[0] + options.margin,
			upperMargin = $Locations[1] - options.margin,
			lowerLimit = $Locations[0] + options.limit,
			upperLimit = $Locations[1] - options.limit;

		// For sliders with multiple handles,
		// limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( $Handles.length > 1 ) {
			to = trigger ? Math.max( to, lowerMargin ) : Math.min( to, upperMargin );
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable. 'noLimitOption' is set to 'false'
		// for the .val() method, except for pass 4/4.
		if ( noLimitOption !== false && options.limit && $Handles.length > 1 ) {
			to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
		}

		// Handle the step option.
		to = $Spectrum.getStep( to );

		// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
		// JavaScript has some issues in its floating point implementation.
		to = limit(parseFloat(to.toFixed(7)));

		// Return false if handle can't move.
		if ( to === $Locations[trigger] ) {
			return false;
		}

		// Set the handle to the new position.
		handle.css( options.style, to + '%' );

		// Force proper handle stacking
		if ( handle.is(':first-child') ) {
			handle.toggleClass(Classes[17], to > 50 );
		}

		// Update locations.
		$Locations[trigger] = to;

		// Convert the value to the slider stepping/range.
		$Values[trigger] = $Spectrum.fromStepping( to );

		linkUpdate(triggerPos[trigger]);

		return true;
	}

	// Loop values from value method and apply them.
	function setValues ( count, values ) {

		var i, trigger, to;

		// With the limit option, we'll need another limiting pass.
		if ( options.limit ) {
			count += 1;
		}

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < count; i += 1 ) {

			trigger = i%2;

			// Get the current argument from the array.
			to = values[trigger];

			// Setting with null indicates an 'ignore'.
			// Inputting 'false' is invalid.
			if ( to !== null && to !== false ) {

				// If a formatted number was passed, attemt to decode it.
				if ( typeof to === 'number' ) {
					to = String(to);
				}

				to = options.format.from( to );

				// Request an update for all links if the value was invalid.
				// Do so too if setting the handle fails.
				if ( to === false || isNaN(to) || setHandle( $Handles[trigger], $Spectrum.toStepping( to ), i === (3 - options.dir) ) === false ) {

					linkUpdate(triggerPos[trigger]);
				}
			}
		}
	}

	// Set the slider value.
	function valueSet ( input ) {

		// LibLink: don't accept new values when currently emitting changes.
		if ( $Target[0].LinkIsEmitting ) {
			return this;
		}

		var count, values = asArray( input );

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		// Make sure the initial values where set before using animated
		// placement. (no report, unit testing);
		if ( options.animate && $Locations[0] !== -1 ) {
			addClassFor( $Target, Classes[14], 300 );
		}

		// Determine how often to set the handles.
		count = $Handles.length > 1 ? 3 : 1;

		if ( values.length === 1 ) {
			count = 1;
		}

		setValues ( count, values );

		// Fire the 'set' event. As of noUiSlider 7,
		// this is no longer optional.
		fireEvents(['set']);

		return this;
	}

	// Get the slider value.
	function valueGet ( ) {

		var i, retour = [];

		// Get the value from all handles.
		for ( i = 0; i < options.handles; i += 1 ){
			retour[i] = options.format.to( $Values[i] );
		}

		return inSliderOrder( retour );
	}

	// Destroy the slider and unbind all events.
	function destroyTarget ( ) {

		// Unbind events on the slider, remove all classes and child elements.
		$(this).off(namespace)
			.removeClass(Classes.join(' '))
			.empty();

		delete this.LinkUpdate;
		delete this.LinkConfirm;
		delete this.LinkDefaultFormatter;
		delete this.LinkDefaultFlag;
		delete this.reappend;
		delete this.vGet;
		delete this.vSet;
		delete this.getCurrentStep;
		delete this.getInfo;
		delete this.destroy;

		// Return the original options from the closure.
		return originalOptions;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		var retour = $.map($Locations, function( location, index ){

			var step = $Spectrum.getApplicableStep( location ),
				value = $Values[index],
				increment = step[2],
				decrement = (value - step[2]) >= step[1] ? step[2] : step[0];

			return [[decrement, increment]];
		});

		// Return values in the proper order.
		return inSliderOrder( retour );
	}

	// Get the original set of options.
	function getOriginalOptions ( ) {
		return originalOptions;
	}


// Initialize slider

	// Throw an error if the slider was already initialized.
	if ( $Target.hasClass(Classes[0]) ) {
		throw new Error('Slider was already initialized.');
	}

	// Create the base element, initialise HTML and set classes.
	// Add handles and links.
	$Base = addSlider( options.dir, options.ort, $Target );
	$Handles = addHandles( options.handles, options.dir, $Base );

	// Set the connect classes.
	addConnection ( options.connect, $Target, $Handles );

	// Attach user events.
	events( options.events );

// Methods

	target.vSet = valueSet;
	target.vGet = valueGet;
	target.destroy = destroyTarget;

	target.getCurrentStep = getCurrentStep;
	target.getOriginalOptions = getOriginalOptions;

	target.getInfo = function(){
		return [
			$Spectrum,
			options.style,
			options.ort
		];
	};

	// Use the public value method to set the start values.
	$Target.val( options.start );

}


	// Run the standard initializer
	function initialize ( originalOptions ) {

		// Throw error if group is empty.
		if ( !this.length ){
			throw new Error("noUiSlider: Can't initialize slider on empty selection.");
		}

		// Test the options once, not for every slider.
		var options = testOptions( originalOptions, this );

		// Loop all items, and provide a new closed-scope environment.
		return this.each(function(){
			closure(this, options, originalOptions);
		});
	}

	// Destroy the slider, then re-enter initialization.
	function rebuild ( options ) {

		return this.each(function(){

			// The rebuild flag can be used if the slider wasn't initialized yet.
			if ( !this.destroy ) {
				$(this).noUiSlider( options );
				return;
			}

			// Get the current values from the slider,
			// including the initialization options.
			var values = $(this).val(), originalOptions = this.destroy(),

				// Extend the previous options with the newly provided ones.
				newOptions = $.extend( {}, originalOptions, options );

			// Run the standard initializer.
			$(this).noUiSlider( newOptions );

			// Place Link elements back.
			this.reappend();

			// If the start option hasn't changed,
			// reset the previous values.
			if ( originalOptions.start === newOptions.start ) {
				$(this).val(values);
			}
		});
	}

	// Access the internal getting and setting methods based on argument count.
	function value ( ) {
		return this[0][ !arguments.length ? 'vGet' : 'vSet' ].apply(this[0], arguments);
	}

	// Override the .val() method. Test every element. Is it a slider? Go to
	// the slider value handling. No? Use the standard method.
	// Note how $.fn.val expects 'this' to be an instance of $. For convenience,
	// the above 'value' function does too.
	$.fn.val = function ( arg ) {

		// this === instanceof $

		function valMethod( a ){
			return a.hasClass(Classes[0]) ? value : $val;
		}

		// If no value is passed, this is 'get'.
		if ( arg === undefined ) {
			var first = $(this[0]);
			return valMethod(first).call(first);
		}

		var isFunction = $.isFunction(arg);

		// Return the set so it remains chainable. Make sure not to break
		// jQuery's .val(function( index, value ){}) signature.
		return this.each(function( i ){

			var val = arg, $t = $(this);

			if ( isFunction ) {
				val = arg.call(this, i, $t.val());
			}

			valMethod($t).call($t, val);
		});
	};

// Extend jQuery/Zepto with the noUiSlider method.
	$.fn.noUiSlider = function ( options, rebuildFlag ) {

		switch ( options ) {
			case 'step': return this[0].getCurrentStep();
			case 'options': return this[0].getOriginalOptions();
		}

		return ( rebuildFlag ? rebuild : initialize ).call(this, options);
	};

	function getGroup ( $Spectrum, mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return $Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			// Divide 0 - 100 in 'count' parts.
			var spread = ( 100 / (values-1) ), v, i = 0;
			values = [];

			// List these parts and have them handled as 'positions'.
			while ((v=i++*spread) <= 100 ) {
				values.push(v);
			}

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return $.map(values, function( value ){
				return $Spectrum.fromStepping( stepped ? $Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return $.map(values, function( value ){

					// Convert to percentage, apply step, return to value.
					return $Spectrum.fromStepping( $Spectrum.getStep( $Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( $Spectrum, density, mode, group ) {

		var originalSpectrumDirection = $Spectrum.direction,
			indexes = {},
			firstInRange = $Spectrum.xVal[0],
			lastInRange = $Spectrum.xVal[$Spectrum.xVal.length-1],
			ignoreFirst = false,
			ignoreLast = false,
			prevPct = 0;

		// This function loops the spectrum in an ltr linear fashion,
		// while the toStepping method is direction aware. Trick it into
		// believing it is ltr.
		$Spectrum.direction = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		$.each(group, function ( index ) {

			// Get the current step and the lower + upper positions.
			var step, i, q,
				low = group[index],
				high = group[index+1],
				newPct, pctDifference, pctPos, type,
				steps, realSteps, stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = $Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Find all steps in the subrange.
			for ( i = low; i <= high; i += step ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = $Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the ammount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = ($.inArray(i, group) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		// Reset the spectrum.
		$Spectrum.direction = originalSpectrumDirection;

		return indexes;
	}

	function addMarking ( CSSstyle, orientation, direction, spread, filterFunc, formatter ) {

		var style = ['horizontal', 'vertical'][orientation],
			element = $('<div/>');

		element.addClass('noUi-pips noUi-pips-'+style);

		function getSize( type, value ){
			return [ '-normal', '-large', '-sub' ][(type&&filterFunc) ? filterFunc(value, type) : type];
		}
		function getTags( offset, source, values ) {
			return 'class="' + source + ' ' +
				source + '-' + style + ' ' +
				source + getSize(values[1], values[0]) +
				'" style="' + CSSstyle + ': ' + offset + '%"';
		}
		function addSpread ( offset, values ){

			if ( direction ) {
				offset = 100 - offset;
			}

			// Add a marker for every point
			element.append('<div '+getTags(offset, 'noUi-marker', values)+'></div>');

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				element.append('<div '+getTags(offset, 'noUi-value', values)+'>' + formatter.to(values[0]) + '</div>');
			}
		}

		// Append all points.
		$.each(spread, addSpread);

		return element;
	}

	$.fn.noUiSlider_pips = function ( grid ) {

	var mode = grid.mode,
		density = grid.density || 1,
		filter = grid.filter || false,
		values = grid.values || false,
		format = grid.format || {
			to: Math.round
		},
		stepped = grid.stepped || false;

		return this.each(function(){

		var info = this.getInfo(),
			group = getGroup( info[0], mode, values, stepped ),
			spread = generateSpread( info[0], density, mode, group );

			return $(this).append(addMarking(
				info[1],
				info[2],
				info[0].direction,
				spread,
				filter,
				format
			));
		});
	};

}( window.jQuery || window.Zepto ));