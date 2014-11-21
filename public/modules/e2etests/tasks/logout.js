module.exports = function() {
  var logoutBtn = element(by.css('[ui-sref="signout"]'));
  logoutBtn.click();
}