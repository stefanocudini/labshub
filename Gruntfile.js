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
		Conf = grunt.file.readJSON('config.json');
		
	grunt.log.ok('searching packages...');

	var ignores = _.map(Conf.packagesIgnore, function(exp) { return '!'+exp; }),
		patterns = _.union(['**/package.json'], ignores),
		pkgpaths = grunt.file.expand({cwd: './' }, patterns );

	var pkgs = _.map(pkgpaths, function(f) {
			var pkg = grunt.file.readJSON(f);
			pkg = _.omit(pkg, 'devDependencies','dependencies','author');
			_.defaults(pkg, {
				path: Path.dirname(f),
				keywords: [],
				rank: 0
			});
			return _.extend(pkg, Conf.packages[ pkg.name ] );
		});

	pkgs = _.sortBy(pkgs,'rank').reverse();

	var tags = _(pkgs).pluck('keywords').flatten().uniq().compact().value().sort(),
		activeTags = _.object(tags, _.fill(_.range(tags.length),0) ),
		apps = _.map(pkgs, function(pkg) {
			return {
				name: pkg.name,
				description: pkg.description,
				title: _.str.humanize( pkg.name ),
				path: pkg.path,
				tags: pkg.keywords ? pkg.keywords.sort() : [],
				repository: pkg.repository && git2Web(pkg.repository.url),
				rank: [pkg.rank>0, pkg.rank>1, pkg.rank>2]
			};
		});

	grunt.registerTask('createPages', 'build new output pages', function() {

		_.each(Conf.pages, function(out, tmpl) {

			var pageTmpl = Handlebars.compile( grunt.file.read(tmpl) )

			grunt.log.ok('create page... '+out);

			grunt.file.write(out, pageTmpl({
				pkg: Pkg,
				tags: tags,
				tagsjson: JSON.stringify( activeTags ),
				apps: apps
			}) );

		});

	});

	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: Pkg,
		sitemap: {
			dist: {
				pattern: ['**/index.html','**/index.php','!**/node_modules/**'],
				siteRoot: './'
			}
		},	
		watch: {
			html: {
				options: {
					livereload: true
				},
				files: ['*.tmpl.html','*.json'],
				tasks: ['createPages']
			},
			images: {
				options: {
					livereload: true
				},
				files: ['images/*']
			},
			jscss: {
				options: {
					livereload: true
				},
				files: ['*.js','*.css']
			}			
		}
	});

	grunt.registerTask('default', [
		'createPages'
	]);

};
