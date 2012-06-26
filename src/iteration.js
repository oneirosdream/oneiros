/*global StopIteration:false*/

/**
 * @param {Object} iterable
 * @param {function} callback
 * @param {*} context The value of `this` provided for the call to the `callback`.
 */
oneiros.each = oneiros.forEach = function(iterable, callback, context) {
	if (iterable == null) {
		return;
	}
	if (typeof iterable.forEach === "function") {
		iterable.forEach(callback, context);
	} else if (iterable.length === +iterable.length) {
		var _i, _len;
		for (_i = 0, _len = iterable.length; _i < _len; _i++) {
			try {
				callback.call(context, iterable[_i], _i, iterable);
			} catch (e) {
				if (e === StopIteration) {
					break;
				} else {
					throw e; // Throw it back up the call stack
				}
			}
		}
	} else {
		var key;
		for (key in iterable) {
			if (iterable.hasOwnProperty(key)) { // http://yuiblog.com/blog/2006/09/26/for-in-intrigue/
				try {
					callback.call(context, iterable[key], key, iterable);
				} catch (e) {
					if (e === StopIteration) {
						break;
					} else {
						throw e; // Throw it back up the call stack
					}
				}
			}
		}
	}
};