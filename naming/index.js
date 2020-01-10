const convert = require('./convert');
const convention = require('./convention');

/**
 * @typedef {Object} NamingIndex
 * @prop {import('./convert').ConvertFunction} convert
 * @prop {import('./convention').ConventionIndex} convention
 */

/**@type {NamingIndex} */
module.exports = {
  convert,
  convention
};