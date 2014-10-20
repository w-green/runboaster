'use strict';
var extend = require('./extend');

/**
 * @description Factory method that clones a prototype and adds properties that are specified in second parameter
 * @category Object
 * @requires extend - extends an object with another
 * @param {Object} [prototype] The prototype to clone
 * @param {[Object]} [properties] An object whose properties and values will be copied to the new object
 * @returns {Object} A new Object with the properties and values that were passed in
 */

var factory = function factory(prototype, properties) {
  return extend(Object.create(prototype), properties);
};

module.exports = factory;