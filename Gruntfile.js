'use strict';

module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	meta: {
		banner:
		'/* \n'+
		' * Leaflet-IconLayers v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
		' * \n'+
		' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n'+
		' * <%= pkg.author.email %> \n'+
		' * <%= pkg.author.url %> \n'+
		' * \n'+
		' * Licensed under the <%= pkg.license %> license. \n'+
		' * \n'+
		' * Demos: \n'+
		' * <%= pkg.homepage %> \n'+
		' * \n'+
		' * Source: \n'+
		' * <%= pkg.repository.url %> \n'+
		' * \n'+
		' */\n'
	},
	clean: {
		dist: {
			src: ['dist/*']
		}
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignore tabs e space warning
			"-W044": true,	//ignore regexp
			"-W033": true,
			"-W083": true   //ignore functions within a loop.
		},
		files: ['src/*.js']
	},
	concat: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/<%= pkg.name %>.src.js': ['src/iconLayers.js'],			
				'dist/<%= pkg.name %>.src.css': ['src/iconLayers.css']
			}
		}
	},
	uglify: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.src.js']
			}
		}
	},
	cssmin: {
		combine: {
			files: {
				'dist/<%= pkg.name %>.min.css': ['src/<%= pkg.name %>.css']
			}
		},
		options: {
			banner: '<%= meta.banner %>'
		},
		minify: {
			expand: true,
			cwd: 'dist/',
			files: {
				'dist/<%= pkg.name %>.min.css': ['src/<%= pkg.name %>.css']
			}
		}
	},
	watch: {
		dist: {
			options: { livereload: true },
			files: ['src/*','examples/*'],
			tasks: ['clean','concat','cssmin','jshint']
		}		
	}
});

grunt.registerTask('default', [
	'clean',
	'concat',	
	'cssmin',
	'jshint',
	'uglify'
]);

};