const auth = require('./auth');

/**
 * @typedef {Object} MiddlewareIndex
 * @prop {import('./auth')} auth
 */

/**@type {MiddlewareIndex} */
module.exports = {
  auth
};