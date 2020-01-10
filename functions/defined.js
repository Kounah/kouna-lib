/**@typedef {defined} DefinedFunction */

/**
 * @function
 * returns the first value out of args that is not of type `undefined`\
 * throws an error if none of the args is defined
 * @template T
 * @param {...T} args
 * @returns {T}
 */
function defined(...args) {
  for(let i = 0; i < args.length; i++) {
    if(typeof args[i] !== 'undefined')
      return args[i];
  }

  return undefined;
}

module.exports = defined;