'use strict';

module.exports = function (grunt) {

	var Path = require('path'),
		Handlebars = require('handlebars'),
		_ = require('lodash');
	
	_.str = require('underscore.string');

	function git2Web(giturl) {
		return giturl.replace('git://','https://')
					 .replace('git@github.com:','https://github.com/')
					 .replace(/\.git$/,'');
	}

	var Pkg = grunt.file.readJSON('package.json'),
		Conf = grunt.file.readJSON('config.json'),
		pageTmpl = Handlebars.compile( grunt.file.read(Conf.pageTmpl) );
		
	grunt.log.ok('searching packages...');

	var ignores = _.map(Conf.packagesIgnore, function(exp) { return '!'+exp; }),
		patterns = _.union(['**/package.json'], ignores),
		pkgpaths = grunt.file.expand({cwd: './' }, patterns );

	var pkgs = _.map(pkgpaths, function(f) {
			var pkg = grunt.file.readJSON(f);
			pkg = _.omit(pkg, 'devDependencies','dependencies','author');
			_.defaults(pkg, {
				path: Path.dirname(f),
				complexity: 1,
				keywords: []
			});
			return _.extend(pkg, Conf.packages[ pkg.name ] );
		});

	pkgs = _.sortBy(pkgs,'complexity').reverse();

	var tags = _(pkgs).pluck('keywords').flatten().uniq().compact().value().sort(),
		activeTags = _.object(tags, _.fill(_.range(tags.length),0) ),
		apps = _.map(pkgs, function(pkg) {
			return {
				name: pkg.name,
				title: _.str.humanize( pkg.name ),
				description: pkg.description,
				path: pkg.path,
				tags: pkg.keywords ? pkg.keywords.sort() : [],
				complexity: [pkg.complexity>0, pkg.complexity>1, pkg.complexity>2],
				repository: pkg.repository && git2Web(pkg.repository.url)
			};
		});

	grunt.registerTask('createPage', 'build new output page', function() {

		grunt.file.write(Conf.pageOut, pageTmpl({
			pkg: Pkg,
			tags: tags,
			tagsjson: JSON.stringify( activeTags ),
			apps: apps
		}) );

	});

	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: Pkg,
		clean: {
			page: {
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
				files: ['index.tmpl.html','*.js','*.json'],
				tasks: ['clean:page','createPage']
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
		'clean:page',
		'createPage'
	]);

};
