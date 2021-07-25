'use strict';

var Path = require('path'),
	Handlebars = require('handlebars'),
	_ = require('lodash'),
	__ = require('underscore');

_.str = require('underscore.string');

module.exports = function (grunt) {

	var Pkg = grunt.file.readJSON('package.json'),
		Conf = grunt.file.readJSON('labshub.json');

	var ignores = _.map(Conf.packagesIgnore, function(exp) { return '!'+exp; });
	var sitemapIgnores = _.map(Conf.sitemapIgnore, function(exp) { return '!'+exp; });

	function repo2Web(url) {
		return url && url.replace('git://','https://')
					.replace('git@github.com:','https://github.com/')
					.replace(/\.git$/,'');
	}

	grunt.registerTask('createPages', 'build new output pages', function() {

		grunt.log.ok('searching packages...');

		var	patterns = _.union(['**/package.json'], ignores),
			pkgpaths = grunt.file.expand({cwd: './' }, patterns );

		var pkgs = _.map(pkgpaths, function(f) {
				var path = Path.dirname(f);
				
				grunt.log.ok(path);

				var pkg = grunt.file.readJSON(f);
				pkg = _.omit(pkg, 'devDependencies','dependencies','author');
				_.defaults(pkg, {
					path: path,
					keywords: [],
					rank: 0
				});
				return _.extend(pkg, Conf.packages[ pkg.name ] );
			});

		pkgs = _.sortBy(pkgs,'rank').reverse();

		var tags = __.chain(pkgs).pluck('keywords').flatten().uniq().compact().value().sort(),
			activeTags = __.object(tags, _.fill(_.range(tags.length),0) ),
			apps = [], others = [];

		_.each(pkgs, function(pkg) {

			var p = {
				name: pkg.name,
				description: pkg.description,
				title: _.str.humanize( pkg.name ),
				path: pkg.path,
				tags: pkg.keywords ? pkg.keywords.sort() : [],
				repository: pkg.repository,
				url: pkg.repository && repo2Web(pkg.repository.url),
				rank: [pkg.rank>0, pkg.rank>1, pkg.rank>2]
			};

			//if(!!pkg.rank)
				apps.push(p);
			/*else
				others.push(p);*/
		});

		_.each(Conf.pages, function(out, tmpl) {

			var pageTmpl = Handlebars.compile( grunt.file.read(tmpl) )

			grunt.log.ok('create page... '+out);

			grunt.file.write(out, pageTmpl({
				pkg: Pkg,
				tags: tags,
				tagsjson: JSON.stringify( activeTags ),
				apps: apps,
				//others: others
			}) );
		});
	});

	grunt.initConfig({
		pkg: Pkg,
		sitemap: {
			dist: {
				pattern: _.concat("**/index.html","**/index.php", sitemapIgnores),
				siteRoot: './'
			}
		},	
		watch: {
			html: {
				options: {
					livereload: true
				},
				files: ['*.tmpl.html','*.json','*.css','images/*'],
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
	
	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'createPages'
	]);
};
