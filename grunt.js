/*jshint node:true */

module.exports = function(grunt) {
	"use strict";
	var distpaths = [
		"dist/oneiros.js",
		"dist/oneiros.min.js"
	];

	// readOptionalJSON
	// by Ben Alman
	// https://gist.github.com/2876125
	function readOptionalJSON( filepath ) {
		var data = {};
		try {
			data = grunt.file.readJSON( filepath );
			grunt.verbose.write( "Reading " + filepath + "..." ).ok();
		} catch(e) {}
		return data;
	}

	grunt.initConfig({
		pkg: "<json:package.json>",
		meta: {
			minBanner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | http://goo.gl/vgDTa */",
			distBanner: "/*!\n" +
			            " * <%= pkg.name %> v<%= pkg.version %>\n" +
			            " * <%= pkg.homepage %>\n" +
			            " *\n" +
			            " * Copyright (c) 2012 PyroStorm\n" +
			            " * MIT Licensed: http://goo.gl/vgDTa\n" +
			            " */"
		},
		compare_size: {
			files: distpaths
		},
		concat: {
			dist: {
				src: [
					"<banner:meta.distBanner>",
					"src/intro.js",
					"src/core.js",
					"src/iteration.js",
					"src/localStorage.js",
					"src/exports.js",
					"src/outro.js"
				],
				dest: "dist/oneiros.js"
			}
		},
		min: {
			"dist/oneiros.min.js" : [ "<banner:meta.minBanner>", "<file_strip_banner:dist/oneiros.js>"]
		},
		lint: {
			dist: "dist/oneiros.js",
			grunt: "grunt.js",
			tests: "test/unit/*.js"
		},
		
		// Adapted from jQuery's grunt.js @ https://raw.github.com/jquery/jquery/master/grunt.js
		jshint: (function() {
              var base = readOptionalJSON(".jshintrc");
			function jshintrc( path ) {
				var i, i2, result, custom;
				result = base;
				custom = readOptionalJSON( path + ".jshintrc" ) || {};
				for (i in custom) {
					for (i2 in custom[i]) {
						result[i][i2] = custom[i][i2];
					}
				}
				return result;
			}

			return {
				options: jshintrc(),
				grunt: jshintrc(),
				dist: jshintrc( "src/" ),
				src: jshintrc( "src/" ),
				tests: jshintrc( "test/" )
			};
		})(),
		
		qunit: {
			files: "test/index.html"
		},
		
		watch: {
			files: "src/**/*.js",
			tasks: "dev"
		},
		
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'concat lint min');
};