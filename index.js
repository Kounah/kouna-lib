const fn = require('./fn');
const print = require('./print');
const mw = require('./middleware');
/**@type {import('./web').Web} */
const web = require('./web');

module.exports = {
  fn,
  print,
  mw,
  web
};