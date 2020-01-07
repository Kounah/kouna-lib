const defined = require('../../fn/defined');
const WebRequest = require('../web-request.class');

/**@type {JSONRequestOptions} */
const defaultOptions = {
  encoding: 'utf-8',
  method: 'POST'
};

class JSONRequestOptions {
  /**
   * 
   * @param {JSONRequestOptions} props 
   */
  constructor(props) {
    if(typeof props !== 'object' || props === null)
      props = defaultOptions;

    /**@type {import('../../types/http-method').HTTPMethod} */
    this.method = defined(props.method, defaultOptions.method);
    /**@type {BufferEncoding} */
    this.encoding = defined(props.encoding, defaultOptions.encoding);
  }
}

/**
 * @function
 * creates and executes a JSON request, the result is parsed and resolved in the
 * returned promise
 * @template T
 * @param {string|import('url').URL} target 
 * @param {*} content 
 * @param {JSONRequestOptions} options 
 * @returns {Promise.<T>}
 */
async function jsonRequest(target, content, _options) {
  let options = new JSONRequestOptions(_options);

  let body = '';
  if(typeof content !== 'undefined')
    body = JSON.stringify(content);
  else {
    options.method = 'GET';
  }

  let req = await new WebRequest(target, {
    content: body,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json; charset=utf-8',
      'content-length': body.length,
    },
    method: options.method,
    encoding: options.encoding
  });

  let res = await req.open();
  let responseBody = await res.complete;

  if(typeof responseBody === 'object' && responseBody !== null && responseBody instanceof Error)
    throw responseBody;
  
  return JSON.parse(responseBody);
}

module.exports = jsonRequest;