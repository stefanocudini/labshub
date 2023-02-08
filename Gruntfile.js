'use strict';

var {dirname, basename} = require('path'),
	{compile} = require('handlebars'),
	_ = require('lodash'),
	{chain, object} = require('underscore');

_.str = require('underscore.string');

module.exports = function (grunt) {

	var Pkg = grunt.file.readJSON('package.json'),
		Conf = grunt.file.readJSON('labshub.json');

	var ignores = Conf.packagesIgnore.map( exp => '!'+exp );
	var sitemapIgnores = Conf.sitemapIgnore.map( exp => '!'+exp );

	function repoUrl(url) {
		return url && url.replace('git://','https://')
					.replace('git@github.com:','https://github.com/')
					.replace(/\.git$/,'');
	}

	function cleanPkg(pkg) {
    pkg.name = pkg.name.split('/').pop();
		return _.omit(pkg, 'devDependencies','dependencies','author','scripts');
	}

	function tagsPkgs(pkgs) {
		return chain(pkgs).pluck('keywords').flatten().uniq().compact().value().sort();
	}

	grunt.registerTask('createPages', 'build new output pages', () => {

		grunt.log.ok('searching packages...');

		var	patterns = _.union(['**/package.json'], ignores),
			pkgpaths = grunt.file.expand({cwd: './' }, patterns );

		var pkgs = pkgpaths.map( f => {
				var path = dirname(f);
				var pkg = cleanPkg( grunt.file.readJSON(f) );

				pkg = _.defaults(pkg, {
					path,
					keywords: [],
					rank: 0
				});

				pkg = _.extend(pkg, Conf.packages[ basename(path) ] );

				grunt.log.ok(path, JSON.stringify(pkg));

				return pkg;
			});

		pkgs = _.sortBy(pkgs,'rank').reverse();

		var tags = tagsPkgs(pkgs),
			activeTags = object(tags, _.fill(_.range(tags.length),0) ),
			apps = [], others = [];

		_.each(pkgs, pkg => {
			apps.push({
				name: pkg.name,
				description: pkg.description,
				title: _.str.humanize( pkg.name ),
				path: pkg.path,
				tags: pkg.keywords ? pkg.keywords.sort() : [],
				repository: pkg.repository,
				url: pkg.repository && repoUrl(pkg.repository.url),
				rank: [pkg.rank>0, pkg.rank>1, pkg.rank>2]
			});
		});

		_.each(Conf.pages, (out, tmpl) => {

			var pageTmpl = compile( grunt.file.read(tmpl) )

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
