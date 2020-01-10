const Convention = require('./convention.class');

/**@typedef {PascalCase} Class */

/**
 * - every word starts with an uppercase letter and continues lowercased
 * - example `MultipleWordName`
 */
class PascalCase extends Convention {
  constructor() {
    super();
  }

  /**
   * checks if the given name is in the convention
   * @param {string} name 
   * @returns {boolean}
   */
  check(name) {
    if(super.check(name)) {
      return /^([A-Z][0-9|a-z]*)+$/gm.test(name);
    } else return false;
  }

  /**
   * converts a Pascal_Case name into an array of words
   * @param {string} name
   * @returns {Array.<string>}
   */
  from(name) {
    if(this.check(name)) {
      return name
        .match(/([A-Z][a-z|0-9]*)+/gm)
        .map(m => m.toLowerCase());
    } else throw new Error(`the name '${name}' does not match the PascalCase naming convention`);
  }

  /**
   * creates a name from an array of words using the PascalCase naming convention
   * @param {Array.<string>} words 
   */
  to(words) {
    return super.filter(words)
      .map(seg => {
        return (function (chars) {
          return chars.shift().toUpperCase() + chars.join('').toLowerCase();
        })(Array.from(seg));
      }).join('');
  }
}

module.exports = new PascalCase();