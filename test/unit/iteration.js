/*jshint strict:false */

module( "iteration", {
	setup: function () {
		this.TEST_VALUE = 1;
	}
} );

test( "oneiros.forEach(<Array>)", function () {
	var TEST_VALUE = this.TEST_VALUE;
	var testArray = [TEST_VALUE];
	oneiros.forEach(testArray, function (value, index, iterable) {
		equal(value, TEST_VALUE, "Correct value within callback");
		equal(index, 0, "Correct index within callback");
		equal(iterable, testArray, "Correct iterable within callback");
	}, null);
} );

test( "oneiros.forEach(<Object>)", function () {
	var TEST_VALUE = this.TEST_VALUE;
	var TEST_KEY = "a";
	var testObject = {};
	testObject[TEST_KEY] = TEST_VALUE;
	oneiros.forEach(testObject, function (value, key, iterable) {
		equal(value, TEST_VALUE, "Correct value within callback");
		equal(key, TEST_KEY, "Correct key within callback");
		equal(iterable, testObject, "Correct iterable within callback");
	}, null);
} );