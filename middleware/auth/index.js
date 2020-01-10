const basic = require('./basic');
const basic2 = require('./basic2');

/**
 * @typedef {Object} AuthIndex
 * @prop {import('./basic').BasicFunction} basic
 * @prop {import('./basic2').Basic2Function} basic2
 */

/**@type {AuthIndex} */
module.exports = {
  basic,
  basic2
};