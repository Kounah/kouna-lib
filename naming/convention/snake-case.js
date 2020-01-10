const Convention = require('./convention.class');

/**@typedef {SnakeCase} Class */

/**
 * - underscore-separated lowercase words
 * - example `multiple_word_name`
 */
class SnakeCase extends Convention {
  constructor() {
    super();
  }

  /**
   * checks if a given name is in the snake_case naming convention
   * @param {string} name 
   */
  check(name) {
    if(super.check(name)) {
      return /^([a-z][a-z|0-9]*)(_[a-z][a-z|0-9]*)*$/gm.test(name);
    } else return false;
  }

  /**
   * converts a name to an array of words using the snake_case naming convention
   * @param {string} name 
   */
  from(name) {
    if(this.check(name)) {
      return name.split('_');
    } else throw new Error(`the name '${name}' does not match the snake_case naming convention`);
  }

  /**
   * creates a name from an array of words using the snake_case naming convention
   * @param {Array.<string>} words 
   */
  to(words) {
    return super.filter(words).join('_');
  }
}

module.exports = new SnakeCase();