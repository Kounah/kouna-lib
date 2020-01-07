const Events = require('events');
const WebResponseOptions = require('./web-response-options.class');
const defined = require('../fn/defined');
const stream = require('stream');

/**@typedef {WebResponse} Class */

/**
 * @class
 * @description is returned by the webrequest
 */
class WebResponse extends Events {
  /**
   * creates a new WebResponse
   * @param {import('http').IncomingMessage} response
   * @param {WebResponseOptions} options
   */
  constructor(response, options) {
    super();

    options = new WebResponseOptions(options);

    let contentTypeHeader = response.headers['content-type'].split(';').map(s => s.trim());

    this.type = contentTypeHeader.shift();

    /**@type {BufferEncoding} */
    this.encoding = defined(
      response.headers['content-encoding'],
      contentTypeHeader.filter(item => item.startsWith('charset=')).shift().split('=').pop().toLowerCase(),
      'utf-8');
    if(!Buffer.isEncoding(this.encoding))
      this.encoding = 'utf-8';

    this.options = new WebResponseOptions(options);
    /**@type {Buffer} */
    this.content = '';

    if(typeof options.pipe === 'object' && options.pipe !== null
    && options.pipe instanceof stream.Writable) {
      response.pipe(options.pipe, true);
    } else {
      response.on('data', chunk => {
        if(Buffer.isBuffer(chunk)) {
          if(this.options.storeResponse) this.content += chunk.toString(this.encoding.toLowerCase());
        } else if(typeof chunk === 'string') {
          if(this.options.storeResponse) this.content += chunk;
        } else throw new Error(`'chunk' was of an unhandled type ('${typeof chunk}')`);
      });
    }

    /**@type {Promise.<string|Error>} */
    this.complete = new Promise(resolve => {
      response.on('close', () => {
        resolve(this.content.toString(this.options.encoding));
      });

      response.on('error', (err) => {
        resolve(err);
      });
    });

  }
}

module.exports = WebResponse;