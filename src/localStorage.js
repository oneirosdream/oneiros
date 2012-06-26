/*global unsafeWindow:false*/

oneiros.localStorage = {};
oneiros.localStorage.browserLS = window.localStorage || unsafeWindow.localStorage;

/**
 * @param {string} key
 * @param {string} value
 */
oneiros.localStorage.setItem = function (key, value) {
	var input_data, i, msg;
	
	input_data = {
		'key': key,
		'value': value
	};

	oneiros.forEach(input_data, function (value, key, obj) {
		if (typeof value !== "string") {
			msg = " must be a string";
			if (key === 'value') {
				msg += " - serialization using JSON is recommended";
			}
			throw new TypeError(i + msg);
		}
	});
	
	if (window.GM_setValue != null) {
		window.GM_setValue(key, value);
	} else if (this.browserLS != null) {
		this.browserLS.setItem(key, value);
	} else {
		throw oneiros.unsupported;
	}
};

/**
 * @param {string} key
 * @nosideeffects
 * @return {string} The value.
 */
oneiros.localStorage.getItem = function (key) {
	if (typeof key !== "string") {
		throw new TypeError("key must be a string");
	}	if (window.GM_setValue != null) {
		return window.GM_getValue(key);
	} else if (this.browserLS != null) {
		return this.browserLS.getItem(key);
	} else {
		throw oneiros.unsupported;
	}
};

/**
 * @param {string} key
 */
oneiros.localStorage.removeItem = function (key) {
	if (typeof key !== "string") {
		throw new TypeError("key must be a string");
	}
	if (window.GM_setValue != null) {
		window.GM_deleteValue(key);
	} else if (this.browserLS != null) {
		this.browserLS.removeItem(key);
	} else {
		throw oneiros.unsupported;
	}
};

/**
 * Depends on [GM_listValues](http://wiki.greasespot.net/GM_listValues). NOT compatible with the traditional localStorage interface.
 * @nosideeffects
 * @return {Array} The keys stored by the script.
 */
oneiros.localStorage.getKeys = function () {
	return window.GM_listValues();
};

/* Depends on oneiros.localStorage.keys.
 * @nosideeffects
 * @return {Array} The values stored by the script.
 */
oneiros.localStorage.getValues = function () {
	var values = [];
	this.getKeys().forEach(function (key, index, arr) {
		values.push(window.GM_getValue(key));
	});
	return values;
};

/* Depends on oneiros.localStorage.keys.
 * @nosideeffects
 * @return {Object} The {key: value} pairs stored by the script.
 */
oneiros.localStorage.getPairs = function () {
	var pairs = {};
	this.getKeys().forEach(function (key, index, arr) {
		pairs[key] = window.GM_getValue(key);
	});
	return pairs;
};