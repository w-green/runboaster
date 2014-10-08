(function(){
  'use strict';

  describe('testing homepage', function() {

    it('does basic check against title text', function(){
      browser.get('/');
      expect(browser.getTitle()).toEqual('My Running App');
    });

  });

}());