/**
 * handels an array with an async handler function for each item
 * @template T, ResT
 * @param {Array.<T>} arr 
 * @param {(item: T) => ResT} fn 
 * @param {Object} options 
 * @param {number} options.delay
 * @param {(err: Error) => void} options.errorHandler
 * @returns {Promise.<Array.<ResT|Error>>}
 */
async function asyncQueue(arr, fn, options) {
  if(!Array.isArray(arr))
    throw new TypeError('\'arr\' is not an Array');

  if(typeof fn !== 'function')
    throw new TypeError('\'fn\' is not a function');

  /**@type {ResT} */
  let res = [];

  while(arr.length > 0) {
    let first = arr.shift();
    try {
      res.push(await Promise.resolve(fn(first)));
    } catch(err) {
      res.push(err);

      // handle errorHandler option
      if(typeof options === 'object'
      && options !== null
      && typeof options.errorHandler === 'function')
        options.errorHandler(err);
    }
    
    // handle delay option
    if(typeof options === 'object'
    && options !== null
    && typeof options.delay === 'number')
      await new Promise(resolve =>
        setTimeout(function() { resolve(); }, options.delay));
  }

  return res;
}

module.exports = asyncQueue;