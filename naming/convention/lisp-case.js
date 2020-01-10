const Convention = require('./convention.class');

/**@typedef {LispCase} Class */

/**
 * - also referred as kebab-case
 * - hyphen-separated lowercase words
 * - example `multiple-word-name`
 */
class LispCase extends Convention {
  constructor() {
    super();
  }

  /**
   * checks if the given name matches the lisp-case naming convention
   * @param {string} name 
   */
  check(name) {
    return super.check(name)
    && /^([a-z][a-z|0-9]*)(-[a-z][a-z|0-9]*)*$/gm.test(name);
  }

  /**
   * converts the given lisp-case name to an array of words
   * @param {string} name
   * @returns {Array.<string>}
   */
  from(name) {
    if(this.check(name)) {
      return name.split('-');
    } else throw new Error(`the name '${name}' does not match the lisp-case naming convention`);
  }

  /**
   * creates a lisp-case name from an array of words
   * @param  {Array.<string>} words 
   * @returns {string}
   */
  to(words) {
    return super.filter(words).join('-');
  }
}

module.exports = new LispCase();