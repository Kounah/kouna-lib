/**@typedef {Convention} Class*/

class Convention {
  constructor() {}

  /**
   * checks if the given name matches the naming convention
   * @param {string} name 
   */
  check(name) {
    if(typeof name !== 'string')
      throw new TypeError('\'name\' is not a string');

    return true;
  }

  /**
   * function to read words from a string with this convention
   * @param {string} name 
   * @returns {Array.<string>}
   */
  from(name) {
    if(this.check(name)) {
      return Array.from(name);
    }
  }

  /**
   * function to create a string with this convention from an array of words
   * @param {Array.<string>} words
   * @return {string}
   */
  to(words) {
    return words
      .map(word => word.toLowerCase())
      .filter(word => /^[a-z][a-z|0-9]*$/.test(word))
      .join('');
  }

  /**
   * filters words
   * @param {Array.<string>} words
   * @returns {Array.<string>}
   */
  filter(words) {
    if(!Array.isArray(words))
      throw new TypeError('\'words\' is not an Array');

    return words
      .map(word => word.toLowerCase())
      .filter(word => /^[a-z][a-z|0-9]*$/.test(word));
  }

  /**
   * 
   * @param {*} obj 
   */
  isConvention(obj) {
    return (typeof obj === 'object' 
    && obj !== null
    && obj instanceof Convention);
  }
}

module.exports = Convention;