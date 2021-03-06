  'use strict';

module.exports = {
	app: {
		title: 'Run Boaster',
		description: 'See your running stats and compare against friends',
		keywords: 'running stats, gpx files, geoJson'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/c3-0.3.0/c3.css',
        'public/lib/leaflet/dist/leaflet.css'
			],
			js: [
				'public/lib/ng-file-upload/angular-file-upload-shim.js',
				'public/lib/angular/angular.js',
				'public/lib/ng-file-upload/angular-file-upload.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        // 'public/lib/polyfill/matchmedia/media.match.min.js',
        'public/lib/polyfill/class-list/classList.js',
        'public/lib/lunar/dist/lunar.js',
        'http://cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.3/fastclick.min.js',
				// 'public/lib/lodash/dist/lodash.underscore.js',
				'public/lib/lodash/dist/lodash.js',
        'public/lib/leaflet/dist/leaflet.js',
        'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        'http://d3js.org/d3.v3.min.js',
        'http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js',
        'public/lib/c3-0.3.0/c3.js',
        'public/lib/sorttable/sorttable.min.js'
        // 'public/lib/Snap.svg-0.3.0/dist/snap.svg.js'

			]
		},
		css: [
			'public/modules/**/css/*.css',
      'public/styles/css/main.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
      // 'public/modules/*/*.js', // ORIGINAL
      // 'public/modules/*/*[!tests]*/*.js' // ORIGINAL
      'public/modules/*[!e2etests]*/*.js', // ADDED FOR PROTRACTOR
      'public/modules/*[!e2etests]*/*[!tests]*/*.js' // ADDED FOR PROTRACTOR


		],
		tests: [
      'http://d3js.org/d3.v3.min.js',
      'public/lib/leaflet/dist/leaflet.js',
			'public/lib/angular-mocks/angular-mocks.js',
      'test-files/output/mocks.module.js',
      'test-files/output/run-data-single-mock.js',
      'test-files/output/run-data-single-mock2.js',
      'test-files/output/runs-summary-mock-angular-test.js',
      'test-files/output/runs-summary-mock-2.js',
      'test-files/output/runs-summary-latest5.js',
      'test-files/output/run-summary-mock-latest10.js',
      'test-files/output/run-summary-mock-latest10-unformatted.js',
			'public/modules/*/tests/*.js'
		]
	}
};