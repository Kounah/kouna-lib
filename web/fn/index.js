const jsonRequest = require('./json-request');

/**
 * @typedef {Object} WebFunctionIndex
 * @prop {import('./json-request').JSONRequestFunction} jsonRequest
 */

/**@type {WebFunctionIndex} */
module.exports = {
  jsonRequest
};