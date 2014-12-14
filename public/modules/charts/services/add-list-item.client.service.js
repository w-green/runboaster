'use strict';

(function() {

  var addListItem = function() {

    return function addListItem(options) {
      var li = document.createElement('li');
      var anchor;
      var listItem = {
        anchorElement : null,
        textContent : null,
        className : null,
        parentListElement : null,
      };

      if(options) {
        listItem.anchorElement = options.anchorElement ? options.anchorElement : null;
        listItem.textContent = options.textContent ? options.textContent : null;
        listItem.classNm = options.classNm ? options.classNm : null;
        listItem.parentListElement = options.parentListElement ? options.parentListElement : null;
      }


      if(listItem.anchorElement) {
        anchor = document.createElement('a');
        listItem.anchorElement.textContent ? anchor.textContent = listItem.anchorElement.textContent : '';
        li.appendChild(anchor);
      }

      if(listItem.classNm) { li.className = listItem.classNm; }

      listItem.parentListElement.appendChild(li);

    }; // return

  }; // var addListItem

  angular.module('charts').factory('addListItem', [addListItem]);

})();