'use strict';

module.exports = function (grunt) {

	var Path = require('path'),
		Handlebars = require('handlebars'),
		_ = require('lodash');
	
	_.str = require('underscore.string');

	function repo2Web(url) {
		return url && url.replace('git://','https://')
					 .replace('git@github.com:','https://github.com/')
					 .replace(/\.git$/,'');
	}

	var Pkg = grunt.file.readJSON('package.json'),
		Conf = grunt.file.readJSON('labshub.json');
		
	grunt.log.ok('searching packages...');

	var ignores = _.map(Conf.packagesIgnore, function(exp) { return '!'+exp; }),
		patterns = _.union(['**/package.json'], ignores),
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

	var tags = _(pkgs).pluck('keywords').flatten().uniq().compact().value().sort(),
		activeTags = _.object(tags, _.fill(_.range(tags.length),0) ),
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

	grunt.registerTask('createPages', 'build new output pages', function() {

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

	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: Pkg,
		sitemap: {
			dist: {
				pattern: ['**/index.html','**/index.php','!**/node_modules/**','!js/**','!portfolio/**'],
				siteRoot: './'
			}
		},	
		watch: {
			html: {
				options: {
					livereload: true
				},
				files: ['*.tmpl.html','*.json','*.css'],
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
