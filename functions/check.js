const defined = require('./defined');

/**@typedef {any} CheckType*/

/**
 * @typedef {Array.<(val) => boolean>} ValidatorFunction
 * @typedef {Object} Validator
 * @prop {string} name
 * @prop
 */

/**
 * @typedef {Object} CheckOptions
 * additional options to overwrite the default
 * @prop {CheckDisplay} display
 * contains external information about the value to be displayed in case of a
 * thrown error
 * @prop {CheckDisplay} d alias for `display` property
 * @prop {CheckAction} action
 * action to be executed at the end of the check
 * `throw` will be skipped on unsuccessful check
 * @prop {CheckAction} a alias for `action` property
 * 
 * @typedef {Object} CheckDisplay
 * @prop {string} name the values name
 * @prop {string} n alias for the `name` property
 * @prop {string|Array.<string>} description an additional description for the value
 * @prop {string|Array.<string>} d alias for the `description` property
 * @prop {('property'|'parameter'|'symbol'|'variable')} kind of wich kind is the value
 * @prop {('property'|'parameter'|'symbol'|'variable')} k alias for `kind` property
 * 
 * @typedef {(val:any) => boolean} CheckValidatorFunction
 * function to determine if the value is valid
 * @typedef {Object} CheckValidatorObject
 * object containing a validator function and display stuff
 * @prop {CheckValidatorFunction} fn validator function
 * @prop {string} name name to be displayed
 * @prop {string} n alias for `name`
 * @prop {string} description description to be displayed
 * @prop {string} d alias for `description`
 * 
 * @typedef {CheckValidatorFunction|CheckValidatorObject} CheckValidator
 * 
 * @typedef {('throw'|'t'|0|'return'|'r'|1)} CheckActionName
 * named action 
 * - `'throw'` (alias `'t'`, `0`): throw an error on a unsuccessful check
 * - `'return'` (alias `'r'`, `1`) **default action**: return a boolean value indicating success
 *   of the check 
 * 
 * @typedef {Object} CheckActionData
 * @prop {('typecheck'|'validation')} reason the reason the action has been called
 * @prop {CheckType} type the type that has been checked for
 * @prop {CheckValidator} validator the validator that caused the action
 * @prop {CheckDisplay} display the display options
 * 
 * @callback CheckActionCallback
 * the action that is executed if the check was negative
 * @param {any} val
 * @param {CheckActionData} data
 * @returns {any}
 */

/**
 * @typedef {CheckActionName|CheckActionCallback} CheckAction
 */

/**@type {CheckDisplay} */
const check_defaultDisplay = {
  name: '<unnamed>',
  description: '',
  kind: 'variable'
};

/**@type {CheckActionCallback} */
let check_defaultAction_return = () => {
  return false;
};

/**@type {CheckActionCallback} */
let check_defaultAction_throw = (val, data) => {
  if(data.reason === 'typecheck') {
    let description = data.display.description 
      ? ' Description: ' + 
        typeof data.display.description === 'object' && Array.isArray(data.display.description)
        ? data.display.description.join('\n')
        : String(data.display.description)
      : '';
    throw new TypeError(`The ${data.display.kind} '${data.display.name}' is not a ${data.type}.${description}`);
  } else if(data.reason === 'validation') {
    throw new Error(`Failed to validate the ${data.display.kind} '${data.display.name}`);
  } else throw new Error('unknown reason');
};

/**
 * @function
 * checks a value for type and/or against validation function
 * @example
 * if(check(val, 'object', undefined, v => v !== null)) {
 *   // is non null object
 * }
 * @example
 * check(val, 'object', {a:0}, v => v !== null);
 * // will have thrown if it's null or not an object
 * @param {any} val the value
 * @param {CheckType} type {@link type} for type checking
 * @param {CheckOptions} options additional options
 * @param  {Array.<CheckValidator>} validators
 * validator function or objects that are executed in sequence
 * as soon as one returns `false` an error is thrown
 * @returns {boolean}
 */
function check(val, type, options, ...validators) {
  /**@type {CheckDisplay} */
  let display = check_defaultDisplay;

  /**@type {CheckActionCallback} */
  let action = check_defaultAction_return;

  /**@type {CheckActionName} */
  let actionName;

  if(typeof options === 'object' && options !== null) {
    display = defined(options.display, options.disp, options.d);

    if(typeof display !== 'undefined') {
      display.name = defined(display.n, display.name, '<unknown>');
      display.n = display.name;
      display.description = defined(display.d, display.description, '');
      display.d = display.description;
      display.kind = defined(display.k, display.kind, 'variable');
      display.k = display.kind;
    }

    /**@type {CheckAction} */
    let options_action = defined(options.a, options.action, 'r');
    if(typeof options_action !== 'undefined') {
      if(typeof options_action === 'function') {
        action = options_action;
      } else {
        if(options_action === 'throw' 
        || options.action === 't'
        || options.action === 0) {
          action = check_defaultAction_throw;
          actionName = 'throw';
        } else if(options_action === 'return'
        || options.action === 'r'
        || options.action === 1) {
          action = check_defaultAction_return;
          actionName = 'return';
        }
      }
    }
  }

  if(type !== 'ignore') {
    if(typeof type !== 'string' || type === '')
      type = typeof type;

    if(typeof val !== type)
      return action(val, {
        reason: 'typecheck',
        type,
        display
      });
  }

  if(typeof validators === 'object' && validators !== null && Array.isArray(validators)) {
    do {
      /**@type {CheckValidator} */
      let validator = validators.shift();
      /**@type {CheckValidatorFunction} */
      let fn;

      if(typeof validator === 'object')
        fn = validator.fn;
      else if(typeof validator === 'function')
        fn = validator;
      else continue;

      if(!fn(val))
        return action(val, {
          reason: 'validation',
          validator,
          display
        });
    } while(validators.length > 0);
  }

  if(typeof actionName !== 'string' || actionName === 'return')
    return true;
  else if(typeof actionName === 'string' && actionName === 'throw')
    return val;
}

/**@typedef {check} CheckFunction */

module.exports = check;