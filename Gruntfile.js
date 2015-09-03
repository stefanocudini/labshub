'use strict';

module.exports = function (grunt) {

	var handlebars = require('handlebars'),
		_ = require('lodash');
	_.str = require('underscore.string');

	var pkg = grunt.file.readJSON('package.json'),
		indexTmpl = handlebars.compile( grunt.file.read('index.tmpl.html') ),
		patterns = _.union(['**/package.json'], pkg.appsignore);

	var files = grunt.file.expand({cwd: './' }, patterns ),
		configs = _.map(files, function(file) {
			var conf = grunt.file.readJSON(file);
			conf.url = file.replace('package.json','');
			return conf;
		}),
		tags = _(configs).pluck('keywords').flatten().uniq().compact().value().sort(),
		activeTags = _.object(tags, _.fill(_.range(tags.length),0) ),
		apps = _.map(configs, function(conf) {

			if(conf.repository) {
				conf.repository.url = conf.repository.url.replace('git://','https://').replace('git@github.com:','https://github.com/').replace(/\.git$/,'');
				conf.repository.btn = "https://ghbtns.com/github-btn.html?user=stefanocudini&amp;repo="+conf.name+"&amp;count=true";
			}

			return {
				name: conf.name,
				title: _.str.humanize( conf.name ),
				description: conf.description,
				url: conf.url,
				tags: conf.keywords ? conf.keywords.sort() : [],
				stars: [1, 1, 0],
				repository: conf.repository
			};
		});

	grunt.registerTask('makeIndex', 'build new index.html', function() {


		grunt.file.write('index.html', indexTmpl({
			pkg: pkg,
			tags: tags,
			tagsjson: JSON.stringify( activeTags ),
			apps: apps
		}) );

	});

	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: pkg,
		clean: {
			index: {
				src: ['index.html']
			},
			sitemap: {
				src: ['sitemap.xml']
			}
		},
		sitemap: {
			dist: {
				pattern: ['**/index.html','**/index.php','!**/node_modules/**'],
				siteRoot: './'
			}
		},	
		watch: {
			js: {
				options: {
					livereload: true
				},
				files: ['index.tmpl.html','*.js'],
				tasks: ['clean:index','makeIndex']
			},
			css: {
				options: {
					livereload: true
				},
				files: ['index.css']
			}			
		}
	});

	grunt.registerTask('default', [
		'clean:index',
		'makeIndex'
	]);

};
