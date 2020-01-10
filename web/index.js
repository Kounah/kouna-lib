const WebRequest = require('./web-request.class');
const WebResponse = require('./web-response.class');
/**@type {import('./fn').WebFunctionIndex} */
const fn = require('./fn');

/**@typedef {Object} WebIndex
 * @prop {import('./web-request.class').Class} WebRequest
 * @prop {import('./web-response.class').Class} WebResponse
 * @prop {import('./fn').WebFunctionIndex} fn 
 */

/**@type {WebIndex} */
module.exports = {
  WebRequest,
  WebResponse,
  fn
};