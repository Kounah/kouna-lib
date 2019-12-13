const check = require('check');

/**@typedef {checkObject} CheckObjectFunction */

/**
 * @function
 * check but it will only check objects
 * @param {*} val 
 * @param {import('./check').CheckDisplay} display
 * @param {boolean} allowNull 
 * @param {function} instance 
 */
function checkObject(val, display, allowNull, instance) {
  /**@type {Array.<import('./check').CheckValidator>} */
  let validators = [];

  if(!allowNull)
    validators.push(v => v !== null);

  if(instance)
    validators.push(v => v instanceof instance);

  return check(val, 'object', {
    d: display,
    a: 'throw'
  }, ...validators);
}

module.exports = checkObject;