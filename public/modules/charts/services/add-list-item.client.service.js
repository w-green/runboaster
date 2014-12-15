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
        attributes : null
      };

      if(options) {
        listItem.anchorElement = options.anchorElement ? options.anchorElement : null;
        listItem.textContent = options.textContent ? options.textContent : null;
        listItem.classNm = options.classNm ? options.classNm : null;
        listItem.parentListElement = options.parentListElement ? options.parentListElement : null;
        listItem.attributes = options.attributes ? options.attributes : null;
      }


      if(listItem.anchorElement) {
        anchor = document.createElement('a');
        listItem.anchorElement.textContent ? anchor.textContent = listItem.anchorElement.textContent : '';
        li.appendChild(anchor);
      }

      if(listItem.classNm) { li.className = listItem.classNm; }
      if(listItem.attributes) {
        //test if array
        listItem.attributes.forEach(function(attr) {
          li.setAttribute(attr.name, attr.value);
        });
      }

      listItem.parentListElement.appendChild(li);

    }; // return

  }; // var addListItem

  angular.module('charts').factory('addListItem', [addListItem]);

})();