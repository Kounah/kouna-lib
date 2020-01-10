const fn = require('./fn');
const print = require('./print');
const mw = require('./middleware');
const web = require('./web');
const cls = require('./cls');

/**
 * @typedef {Object} KounaLib
 * @prop {import('./fn')} fn
 * @prop {import('./print')} print
 * @prop {import('./middleware')} mw
 * @prop {import('./web')} web
 * @prop {import('./cls')} cls
 */

/**@type {KounaLib} */
module.exports = {
  fn,
  print,
  mw,
  web,
  cls
};