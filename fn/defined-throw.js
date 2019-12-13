const defined = require('./defined');

/**@typedef {definedThrow} DefinedThrowFunction */

/**
 * @function
 * works like the defined function but throws if it reaches the end
 * @template T
 * @param  {...T} args 
 * @returns {T}
 */
function definedThrow(...args) {
  let def = defined(...args);
  if(typeof def === 'undefined')
    throw new Error('no defined arg in args');
}

module.exports = definedThrow;