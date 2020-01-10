const defined = require('./defined');
const naming = require('../naming');

/**@type {ParseArgsOptions} */
const defaultOptions = {
  isProperty: (arg) => arg.startsWith('--'),
  propertyNameSplitter: (arg) => arg.split('-').filter(seg => seg.length > 0),
  namingConvention: naming.convention.conventions.camelCase
};

class ParseArgsOptions {
  /**
   * creates a new instance of ParseArgsOptions
   * @param {ParseArgsOptions} props 
   */
  constructor(props) {
    if(typeof props !== 'object' || props === null)
      props = defaultOptions;

    /**@type {(arg: string) => boolean} */
    this.isProperty = defined(props.isProperty, defaultOptions.isProperty);
    /**@type {(arg: string) => Array.<string>} */
    this.propertyNameSplitter = defined(props.propertyNameSplitter, defaultOptions.propertyNameSplitter);
    /**@type {import('../naming/convention').ConventionName|import('../naming/convention').Convention} */
    this.namingConvention = defined(props.namingConvention, defaultOptions.namingConvention);
  }
}

/**@typedef {parseArgs} ParseArgsFunction */

/**
 * parses args
 * @function
 * @param {Array.<string>} args 
 * @param {ParseArgsOptions} options
 * @returns {Object<string, *>}
 */
function parseArgs(args, options) {
  if(!Array.isArray(args))
    throw new TypeError('\'args\' is not an Array');

  options = new ParseArgsOptions(options);

  let names = ['__args'];
  let data = {__args: []};
  while(args.length > 0) {
    let cur = args.shift();

    if(options.isProperty(cur)) {
      names.pop();
      let n = options.namingConvention.to(options.propertyNameSplitter(cur));
      names.push(n);
      data[n] = true;
    } else {
      let name = names.pop();
      let val;
      try {
        val = JSON.parse(cur);
      } catch(err) {
        val = cur;
      }
      if(Array.isArray(data[name])) {
        data[name].push(val);
      } else {
        data[name] = [val];
      }
      names.push(name);
    }
  }

  return Object.entries(data).map(e => {
    switch(e[1].length) {
    case 0:
      e[1] = true;
      return e;
    case 1:
      e[1] = e[1][0];
      return e;
    default:
      return e;
    }
  }).reduce((p, c) => {
    p[c[0]] = c[1];
    return p;
  }, {});
}

/**@type {ParseArgsFunction} */
module.exports = parseArgs;