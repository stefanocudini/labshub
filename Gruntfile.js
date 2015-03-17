'use strict';

module.exports = function (grunt) {

	var handlebars = require('handlebars'),
		_ = require('lodash');
	_.str = require('underscore.string');

	var pkg = grunt.file.readJSON('package.json'),
		indexTmpl = handlebars.compile( grunt.file.read('index.tmpl.html') );

	var files = grunt.file.expand({cwd: './' }, ['**/package.json','!**/node_modules/**']),
		dirs = _.map(files, function(file) {
			return file.replace('package.json','index.html');
		}),
		configs = _.map(files, function(file) {
			return grunt.file.readJSON(file);
		}),
		tags = _(configs).pluck('keywords').flatten().uniq().compact().value().sort(),
		apps = _.map(configs, function(conf) {
			return {
				name: conf.name,
				title: _.str.humanize( conf.name ),
				description: conf.description,
				url: conf.homepage || conf.name,
				tags: conf.keywords ? conf.keywords.sort() : [],
				stars: [1, 1, 0]
			};
		});

	grunt.registerTask('makeIndex', 'build new index.html', function() {

		grunt.file.write('index.html', indexTmpl({
			pkg: pkg,
			tags: tags,
			tagsjson: JSON.stringify(tags),
			apps: apps
		}) );

	});

	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: pkg,
		clean: {
			dist: {
				src: ['index.html','sitemap.xml']
			}
		},
		sitemap: {
			dist: {
				pattern: ['**/index.html','**/index.php','!**/node_modules/**'],
				siteRoot: './'
			}
		},
		watch: {
			dist: {
				options: { livereload: true },
				files: ['*'],
				tasks: ['clean','jshint']
			}		
		}
	});

	grunt.registerTask('default', [
		'clean',
		'makeIndex',
		'sitemap'
	]);

};