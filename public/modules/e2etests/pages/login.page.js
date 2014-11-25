'use strict';

var loginPage = {
  goto : function goto() {
      browser.get('/#!/signin');
    },
  formUserName : element(by.id('username')),
  formPwd : element(by.id('password')),
  formSubmit : element(by.css('[type="submit"]'))
};

module.exports = loginPage;