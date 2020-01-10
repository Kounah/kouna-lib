const convention = require('./convention');

/**@typedef {convert} ConvertFunction*/

/**
 * converts a name from one convention to the other
 * @function
 * @param {string} name the name to be converted
 * @param {import('./convention').ConventionName|import('./convention').Convention} fromConvention 
 * @param {import('./convention').ConventionName|import('./convention').Convention} toConvention 
 */
function convert(name, fromConvention, toConvention) {
  if(typeof fromConvention === 'string')
    fromConvention = convention.byName(fromConvention);
  if(typeof toConvention === 'string')
    toConvention = convention.byName(toConvention);

  if(convention.Convention.isConvention(fromConvention)
  && convention.Convention.isConvention(toConvention)) {
    return toConvention.to(...fromConvention.from(name));
  } else throw new Error('either the fromConvention or toConvention are not a Convention');
}

/**@type {ConvertFunction} */
module.exports = convert;