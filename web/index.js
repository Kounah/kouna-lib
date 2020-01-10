const WebRequest = require('./web-request.class');
const WebResponse = require('./web-response.class');
/**@type {import('./functions').WebFunctionIndex} */
const fn = require('./functions');

/**@typedef {Object} WebIndex
 * @prop {import('./web-request.class').Class} WebRequest
 * @prop {import('./web-response.class').Class} WebResponse
 * @prop {import('./functions').WebFunctionIndex} fn 
 */

/**@type {WebIndex} */
module.exports = {
  WebRequest,
  WebResponse,
  fn
};