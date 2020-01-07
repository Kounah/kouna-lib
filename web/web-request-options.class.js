const extend = require('../fn/extend');
const defined = require('../fn/defined');

/**@type {WebRequestOptions} */
const defaultOptions = {
  headers: {
    accept: '*/*'
  },
  method: 'GET',
  content: undefined,
  timeout: 5000,
  encoding: 'utf-8'
};

/**@typedef {WebRequestOptions} Class */

class WebRequestOptions {
  /**
   * @param {WebRequestOptions} props
   */
  constructor(props) {
    if(typeof props !== 'object' || props === null)
      props = defaultOptions;

    /**@type {import('../types/http-header').HTTPHeaderObject} */
    this.headers = extend(defaultOptions.headers, props.headers);
    /**@type {import('../types/http-method').HTTPMethod} */
    this.method = defined(props.method, defaultOptions.method);
    /**@type {import('fs').ReadStream|string} */
    this.content = defined(props.content, defaultOptions.content);
    /**@type {number} */
    this.timeout = defined(props.timeout, defaultOptions.timeout);
    /**@type {BufferEncoding} */
    this.encoding = defined(props.encoding, defaultOptions.encoding);
  }
}

module.exports = WebRequestOptions;