const Convention = require('./convention.class');

/**@typedef {CamelCase} Class */

/**
 * - first word is lowercase, and every other word starts with an uppercase letter
 * - example `multipleWordName`
 */
class CamelCase extends Convention {
  constructor() {
    super();
  }

  /**
   * checks if the given name matches the camelCase naming convention
   * @param {string} name
   */
  check(name) {
    return super.check(name)
    && /^([a-z][a-z|0-9]*)([A-Z][a-z|0-9]*)*$/gm.test(name);
  }

  /**
   * converts camel case name into array of words
   * @param {string} name camleCased name
   */
  from(name) {
    if(this.check(name)) {
      return name
        .match(/([A-Z][a-z|0-9]*)|([a-z|0-9]+)/gm)
        .map(m => m.toLowerCase());
    } else throw new Error(`the name ${name} does not match the camelCase naming convention`);
  }

  /**
   * converts array of words into camel case name
   * @param {Array.<string>} words 
   */
  to(words) {
    return super.filter(words)
      .map((seg, i) => {
        if(i > 0) {
          return (function (chars) {
            return chars.shift().toUpperCase() + chars.join('').toLowerCase();
          })(Array.from(seg));
        } else return seg.toLowerCase();
      }).join('');
  }
}

module.exports = new CamelCase();