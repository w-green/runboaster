// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // specs: ['./public/modules/*/tests/e2e/*.js'],
  specs: ['./public/modules/e2etests/**/*spec.js'],
  suites: {
    topNav: './public/modules/e2etests/page-tests/navigation/**/*.spec.js',
    uploadPage: './public/modules/e2etests/page-tests/upload-page/**/*.spec.js',
    tablePage: './public/modules/e2etests/page-tests/table-page/**/*.spec.js',
    mapPage: './public/modules/e2etests/page-tests/map-page/**/*.spec.js',
    services: ['./public/modules/e2etests/services/**/*.spec.js'],
    servicesGetRunById: './public/modules/e2etests/services/get-runs-by-id/**/*.spec.js',
    servicesGetRuns: './public/modules/e2etests/services/get-runs/**/*.spec.js',
    servicesGetSummaries: './public/modules/e2etests/services/get-summaries/**/*.spec.js',
    servicesGetSummariesById: './public/modules/e2etests/services/get-summaries-by-id/**/*.spec.js'

  },
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },
  onPrepare: function() {
    // Override the timeout for webdriver.
    var ptor = protractor.getInstance();
    ptor.driver.manage().timeouts().setScriptTimeout(60000);
  },
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 60000
  },
  baseUrl: 'http://localhost:3001/' // test port
}