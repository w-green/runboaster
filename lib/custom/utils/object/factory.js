'use strict';
var _ = require('lodash');

/**
 * @description Factory method that clones a prototype and adds properties that are specified in second parameter
 * @category Object
 * @requires lodash _.assign
 * @param {Object} [prototype] The prototype to clone
 * @param {[Object]} [properties] An object whose properties and values will be copied to the new object
 * @returns {Object} Returns a new Object with the properties and values that were passed in
 */

var factory = function factory(prototype, properties) {
  return _.assign(Object.create(prototype), properties);
};

module.exports = factory;