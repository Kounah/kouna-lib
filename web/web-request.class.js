const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const Events = require('events');
const WebRequestOptions = require('./web-request-options.class');
const WebResponse = require('./web-response.class');

/**@typedef {WebRequest} Class */

class WebRequest extends Events {
  /**
   * @param {(string|import('url').URL)} target
   * @param {WebRequestOptions} options
   */
  constructor (target, options) {
    super();

    if(typeof target === 'string') {
      this.target = url.parse(target);
    } else if(typeof target === 'object' && target !== null) {
      this.target = target;
    }

    this.options = new WebRequestOptions(options);
  }

  /**
   * @returns {Promise.<WebResponse>}
   */
  async open() {
    return await new Promise((resolve => {
      /**@type {import('http')} */
      let h = http;
      if(this.target.protocol === 'https:')
        h = https;

      let req = h.request(url.format(this.target), {
        method: this.options.method,
        headers: this.options.headers,
        timeout: this.options.timeout
      }, res => {
        resolve(new WebResponse(res));
      });

      if(typeof this.options.content === 'string') {
        req.write(this.options.content);
      } else if(typeof this.options.content === 'object' && this.options.content !== null && this.options.content instanceof fs.ReadStream) {
        this.options.content.pipe(req);
      } else {
        req.write('');
      }
    }).bind(this));
  }
}

module.exports = WebRequest;