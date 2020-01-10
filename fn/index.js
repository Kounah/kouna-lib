const asyncQueue = require('./async-queue');
const check = require('./check');
const checkObject = require('./check-object');
const checkThrow = require('./check-throw');
const defined = require('./defined');
const definedThrow = require('./defined-throw');
const discoverDir = require('./discover-dir');
const extend = require('./extend');
const ensureType = require('./ensure-type');
const parseArgs = require('./parse-args');

/**
 * @typedef {Object} FunctionIndex
 * @prop {import('./async-queue').AsyncQueueFunction} asyncQueue
 * @prop {import('./check').CheckFunction} check
 * @prop {import('./check-object').CheckObjectFunction} checkObject
 * @prop {import('./check-throw').CheckThrowFunction} checkThrow
 * @prop {import('./defined').DefinedFunction} defined
 * @prop {import('./defined-throw').DefinedThrowFunction} definedThrow
 * @prop {import('./discover-dir').DiscoverDirFunction} discoverDir
 * @prop {import('./ensure-type').EnsureTypeFunction} ensureType
 * @prop {import('./extend').ExtendFunction} extend
 * @prop {import('./parse-args').ParseArgsFunction} parseArgs
 */

/**@type {FunctionIndex} */
module.exports = {
  asyncQueue,
  check,
  checkObject,
  checkThrow,
  defined,
  definedThrow,
  discoverDir,
  ensureType,
  extend,
  parseArgs
};
