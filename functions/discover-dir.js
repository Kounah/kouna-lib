const defined = require('./defined');
const fs = require('fs');
const path = require('path');
const asyncQueue = require('./async-queue');

/**@type {DiscoverDirOptions} */
const defaultOptions = {
  onDir: undefined,
  onFile: undefined,
  excludes: undefined,
  noResult: false
};

class DiscoverDirOptions {
  /**
   * 
   * @param {DiscoverDirOptions} props 
   */
  constructor(props) {
    if(typeof props !== 'object' || props === null)
      props = defaultOptions;

    /**@type {(file: string) => void} */
    this.onDir = defined(props.onDir, defaultOptions.onDir);
    /**@type {(file: string) => void} */
    this.onFile = defined(props.onFile, defaultOptions.onFile);
    /**@type {Array.<RegExp>} */
    this.excludes = defined(props.excludes, defaultOptions.excludes);
    /**
     * makes the discover function run faster and use less RAM
     * @type {boolean} */
    this.noResult = defined(props.noResult, defaultOptions.noResult);
  }
}

/**@typedef {discoverDir} DiscoverDirFunction */

/**
 * discovers files and directories in a directory
 * @async
 * @function
 * @param {string} dir 
 * @param {DiscoverDirOptions} options
 * @returns {Promise.<Array.<string>>}
 */
async function discoverDir(dir, options) {
  if(typeof options !== 'object' || options === null || !(options instanceof DiscoverDirOptions))
    options = new DiscoverDirOptions(options);

  if(!await exists(dir))
    throw new Error(`no such file or directory: '${dir}'`);

  if(!(await stat(dir)).isDirectory())
    throw new Error(`not a directory: '${dir}'`);

  let useExclude = Array.isArray(options.excludes);
  let useOnFile = typeof options.onFile === 'function';
  let useOnDir = typeof options.onDir === 'function';
  let useNoResult = typeof options.noResult === 'boolean' && options.noResult;

  let base = dir;
  let queue = [];
  /**@type {Array.<string>} */
  let discovered = [];
  do {
    base = path.join(dir, queue.shift() || '');

    let items = (await readdir(base));

    if(useExclude)
      items = items.filter(name =>
        !options.excludes.map(pat =>
          pat.test(name)
        ).reduce((p, c) => p || c));
    
    let result = (await asyncQueue(items, async item => {
      let p = path.join(base, item);
        
      let s = await stat(p);
      if(s.isFile() && useOnFile) options.onFile(p);
      if(s.isDirectory()) {
        queue.push(path.relative(dir, p));
        if(useOnDir) options.onDir(p);
      }

      if(!useNoResult)
        return path.relative(dir, p);
    }));

    if(!useNoResult)
      discovered = discovered.concat(result);
  } while(queue.length > 0);

  if(!useNoResult)
    return discovered;
}

/**
 * promise-ifies fs.exists
 * @param {string} p 
 * @returns {Promise.<boolean>}
 */
async function exists(p) {
  return await new Promise(resolve => {
    fs.exists(p, exists => {
      resolve(exists);
    });
  });
}

/**
 * promise-ifies fs.readdir
 * @param {string} p 
 * @returns {Promise.<Array.<string>>}
 */
async function readdir(p) {
  return await new Promise((resolve, reject) => {
    fs.readdir(p, (err, files) => {
      if(err) return reject(err);
      resolve(files);
    });
  });
}

/**
 * promise-ifies fs.stats
 * @param {string} p 
 * @returns {Promise.<import('fs').Stats}
 */
async function stat(p) {
  return await new Promise((resolve, reject) => {
    fs.stat(p, (err, stats) => {
      if(err) return reject(err);
      resolve(stats);
    });
  });
}

module.exports = discoverDir;