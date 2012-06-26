/*global localStorage:true*/

module( "localStorage", {
	// Called for every test
	setup: function () {
		"use strict";
		// Initializing dummy data
		this.lS = oneiros.localStorage;
		equal(this.lS.setItem("a", "b"), null, '.setItem("a", "b")');
	}
} );

test( ".getItem", function () {
	"use strict";
	equal( this.lS.getItem("a"), "b", ".getItem(\"a\") === \"b\"" );
} );

test( ".removeItem", function () {
	"use strict";
	equal( this.lS.removeItem("a"), null, '.removeItem("a")' );
	equal( this.lS.getItem("a"), null, '.getItem("a") === null');
} );

test( ".getKeys", function () {
	"use strict";
	deepEqual( this.lS.getKeys(), ['a'], ".keys === ['a']" );
} );

test( ".getValues", function () {
	"use strict";
	deepEqual( this.lS.getValues(), ['b'], ".values === ['b']" );
} );

test( ".getPairs", function () {
	"use strict";
	deepEqual( this.lS.getPairs(), {'a': 'b'}, ".pairs === {'a': 'b'}" );
} );