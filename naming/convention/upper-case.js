const Convention = require('./convention.class');

/**@typedef {UpperCase} Class */

/**
 * - also known as SCREAMING_SNAKE_CASE
 * - underscore-separated uppercase words
 * - example `MULTIPLE_WORD_NAME`
 */
class UpperCase extends Convention {
  constructor() { super(); }

  /**
   * checks if the given name matches the UPPER_CASE naming convention
   * @param {string} name 
   */
  check(name) {
    return super.check(name)
    && /^[A-Z][A-Z|0-9]*(_[A-Z][A-Z|0-9]*)*$/gm.test(name);
  }

  /**
   * converts a name of the UPPER_CASE naming convention to an array of words
   * @param {string} name
   * @returns {Array.<string>}
   */
  from(name) {
    if(this.check(name)) {
      return name.toLowerCase().split('_');
    } else throw new Error(`the name '${name}' does not match the UPPER_CASE naming convention`);
  }

  /**
   * creates a name from a list of words using the UPPER_CASE naming convention
   * @param  {Array.<string>} words 
   */
  to(words) {
    return words.join('_').toUpperCase();
  }
}

module.exports = new UpperCase();