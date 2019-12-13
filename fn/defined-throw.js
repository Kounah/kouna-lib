const defined = require('./defined');

function definedThrow(...args) {
  let def = defined(...args);
  if(typeof def === 'undefined')
    throw new Error('no defined arg in args');
}

module.exports = definedThrow;