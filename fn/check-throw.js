const check = require('./check');

/**
 * @function checkThrow
 * shortcut for check with the action option set to throw
 * @param {any} val 
 * @param {import('./check').CheckType} type 
 * @param {import('./check').CheckDisplay} display 
 * @param {Array.<import('./check').CheckValidator>} validators 
 */
function checkThrow(val, type, display, ...validators) {
  return check(val, type, {
    action: 'throw',
    display: display
  }, ...validators);
}

module.exports = checkThrow;