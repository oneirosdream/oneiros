// Based on https://github.com/jquery/jquery/blob/master/src/exports.js and https://github.com/umdjs/umd/blob/master/returnExports.js
/*global define:false, module:false */

window.oneiros = oneiros;

(function (root, factory) {
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define("oneiros", [], factory);
	} else {
		// Browser globals
		root.returnExports = factory();
	}
}(window, function () {
	return oneiros;
}));
