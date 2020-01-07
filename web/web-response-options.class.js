const defined = require('../fn/defined');

/**@type {WebResponseOptions} */
const defaultOptions = {
  storeResponse: true,
  pipe: undefined,
  encoding: 'utf-8'
};

/**@typedef {WebResponseOptions} Class */

class WebResponseOptions {
  /**
   * @param {WebResponseOptions} props
   */
  constructor(props) {
    if(typeof props !== 'object' || props === null)
      props = defaultOptions;

    /**
     * store the response in memory, set to false to only grab the stream
     * @type {Boolean}
     */
    this.storeResponse = defined(props.storeResponse, defaultOptions.storeResponse);
    /**
     * sets a stream to pipe the response to
     * @type {import('stream').Writable} 
     */
    this.pipe = defined(props.storeResponse, defaultOptions.pipe);
    /**
     * sets the standard encoding used for this
     * @type {BufferEncoding}
     */
    this.encoding = defined(props.encoding, defaultOptions.encoding);
  }
}

module.exports = WebResponseOptions;