const WebRequest = require('./web-request.class');
const WebResponse = require('./web-response.class');
/**@type {import('./fn').Functions} */
const fn = require('./fn');

/**@typedef {Object} Web
 * @prop {import('./web-request.class').Class} WebRequest
 * @prop {import('./web-response.class').Class} WebResponse
 * @prop {import('./fn').Functions} fn 
 */

module.exports = {
  WebRequest,
  WebResponse,
  fn
};