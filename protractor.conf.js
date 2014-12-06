// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // specs: ['./public/modules/*/tests/e2e/*.js'],
  specs: ['./public/modules/e2etests/**/*spec.js'],
  suites: {
    navigation: './public/modules/e2etests/page-tests/navigation/**/*.spec.js',
    uploadPage: './public/modules/e2etests/page-tests/upload-page/**/*.spec.js',
    tablePage: './public/modules/e2etests/page-tests/table-page/**/*.spec.js',
    services: ['./public/modules/e2etests/services/**/*.spec.js']
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