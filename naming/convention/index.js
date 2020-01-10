/**@type {import('./convention.class').Class} */
const Convention = require('./convention.class');

/**@typedef {import('./convention.class').Class} Convention*/
/**
 * @typedef {Object} NamedConvention
 * @prop {import('./camel-case').Class} camelCase
 * @prop {import('./pascal-case').Class} pascalCase
 * @prop {import('./lisp-case').Class} lispCase
 * @prop {import('./snake-case').Class} snakeCase
 * @prop {import('./upper-case').Class} upperCase
 */
/**@typedef {('camelCase'|'pascalCase'|'lispCase'|'snakeCase'|'upperCase')} ConventionName */

const conventions = {
  camelCase: require('./camel-case'),
  pascalCase: require('./pascal-case'),
  lispCase: require('./lisp-case'),
  snakeCase: require('./snake-case'),
  upperCase: require('./upper-case')
};

/**
 * @param {ConventionName} name
 * @returns {Convention}
 */
function byName(name) {
  if(Object.keys(conventions).includes(name)) {
    return conventions[name];
  } else throw new Error('unknown name');
}

/**
 * @typedef  {Object} ConventionIndex
 * @prop {import('./convention.class').Class} Convention
 * @prop {NamedConvention} conventions
 * @prop {byName} byName
 */


/**@type {ConventionIndex} */
module.exports = {
  Convention,
  conventions,
  byName
};