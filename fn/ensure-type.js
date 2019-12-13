const type_names = [
  'bigint',
  'boolean',
  'function',
  'number',
  'object',
  'string',
  'symbol',
  'undefined'
];

/**
 * @typedef {('bigint'|'boolean'|'function'|'number'|'object'|'string'|'symbol'|'undefined')} TypeName
 * any string that is a possible result of `typeof`
 */

/**
 * makes sure the passed value will resolve to a valid typename
 * @function
 * @param {any} t the type name
 * - the defined names are returned
 * - any string that is not being a TypeName returns 'string'
 * - any other value returns its typeof
 * @returns {TypeName}
 */
function ensureType(t) {
  if(typeof t  === 'string') {
    if(type_names.includes(t.toLowerCase()))
      return t.toLowerCase();
    else return 'string';
  } else return typeof t;
}

module.exports = ensureType;