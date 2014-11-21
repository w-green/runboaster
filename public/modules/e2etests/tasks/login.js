var loginPage = require('../pages/login.page');

var login = {
  default : function () {
    loginPage.goto();
    loginPage.formUserName.sendKeys('wgreen');
    loginPage.formPwd.sendKeys('password');
    loginPage.formSubmit.click();
  }
};

module.exports = login;