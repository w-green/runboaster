'use strict';

/**
 * @description Merge an object with another object
 * @private
 * @param {Object} toExtend - Object to extend
 * @param {Object} options - Object that is to be merged into toExtend
 * @returns {Object} Merged values of toExtend and options
 */

var extend = function (toExtend, options ) {
  var extended = toExtend;

  for (var props in options) {
    if(options.hasOwnProperty(props)) {
      extended[props] = options[props];
    };
  };

  return extended;
};

module.exports = extend;