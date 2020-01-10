const defined = require('./defined');

/**@typedef {extend} ExtendFunction */

/**@typedef {Object<string, any>} More */

/**
 * @function
 * returns an object with all the properties of `base` overwritten with the
 * first not undefined value of the same property in `args`\
 * if the property is of type `object` and not null, recursively extend it's
 * properties
 * @template T
 * @param {T} base - the base object
 * @param  {...T & More} args - (inherited from T) objects to extend with
 * @returns {T}
 */
function extend(base, ...args) {
  // throw if base is not an object
  if(typeof base !== 'object' || base === null)
    throw new TypeError('param \'base\' is null or not an object');

  // filter for valid arguments
  args = args.filter(arg => typeof arg === 'object' && arg !== null);

  if(Array.isArray(base)) {
    return base.map((item, index) => defined(...(args.map(arg => arg[index])), item));
  }

  let argKeys = args.reduce((p, c) => {
    return p.concat(...(Object.keys(c)));
  }, []);

  let keys = new Set([
    ...Object.keys(base),
    ...argKeys
  ]);

  let res = Array.from(keys.values()).reduce((p, c) => {
    let baseProp = base[c];

    if(typeof baseProp === 'object' && baseProp !== null)
      p[c] = extend(baseProp, ...(args.map(arg => arg[c])));
    else
      p[c] = defined(...(args.map(arg => arg[c]).concat(baseProp)));

    return p;
  }, {});
  return res;
}

module.exports = extend;