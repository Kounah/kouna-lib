/**@type {import('./defined').DefinedFunction} */
const defined = require('./defined');
/**@type {import('./defined-throw').DefinedThrowFunction} */
const definedThrow = require('./defined-throw');
/**@type {import('./extend').ExtendFunction} */
const extend = require('./extend');
/**@type {import('./check').CheckFunction} */
const check = require('./check');
/**@type {import('./check-throw').CheckThrowFunction} */
const checkThrow = require('./check-throw');
/**@type {import('./check-object').CheckObjectFunction} */
const checkObject = require('./check-object');
/**@type {import('./ensure-type').EnsureTypeFunction} */
const ensureType = require('./ensure-type');

/**
 * @typedef {Object} Functions
 * @prop {import('./defined').DefinedFunction} defined
 * @prop {import('./defined-throw').DefinedThrowFunction}  definedThrow
 * @prop {import('./extend').ExtendFunction} extend
 * @prop {import('./check').CheckFunction} check
 * @prop {import('./check-throw').CheckThrowFunction} checkThrow
 * @prop {import('./check-object').CheckObjectFunction} checkObject
 * @prop {import('./ensure-type').EnsureTypeFunction} ensureType
 */

/**@type {Functions} */
module.exports = { 
  defined,
  definedThrow,
  extend,
  check,
  checkThrow,
  checkObject,
  ensureType
};
