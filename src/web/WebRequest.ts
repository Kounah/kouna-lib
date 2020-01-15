import * as http from 'http';
import * as https from 'https';
import * as events from 'events';
import { URL, format } from 'url';
import { IWebResponseOptions, WebResponse } from './WebResponse';

export interface IWebRequestOptions extends https.RequestOptions{
  content: string | Buffer | undefined,
  encoding: BufferEncoding
}

const defaultOptions: IWebRequestOptions = {
  content: undefined,
  encoding: 'utf8',
  method: 'GET',
}

export class WebRequest extends events.EventEmitter {
  target: URL;
  options: IWebRequestOptions;
  
  constructor(target: string | URL, options?: IWebRequestOptions) {
    super();

    this.target = target instanceof URL
      ? target
      : new URL(target);
    this.options = options || defaultOptions;
  }

  url() {
    if(this.target instanceof URL)
      return format(this.target);
    else return this.target;
  }

  async exec(options?: IWebResponseOptions) {
    switch(this.target.protocol) {
    case 'http:':
      return await this.execHttp(options);
    case 'https:':
      return await this.execHttps(options);
    }
  }

  async execHttp(options?: IWebResponseOptions) {
    return await new Promise<WebResponse>(resolve => {
      let req = http.request(this.url(), 
        this.options,
        res => resolve(new WebResponse(res, options)));

      this.sendRequest(req);
    });
  }

  async execHttps(options?: IWebResponseOptions) {
    return await new Promise<WebResponse>(resolve => {
      let req = https.request(this.url(),
        this.options,
        res => resolve(new WebResponse(res, options)));

      this.sendRequest(req); 
    })
  }

  sendRequest(request: http.ClientRequest) {
    if(this.options.content !== undefined) {
      if(typeof this.options.content === 'string')
        request.write(Buffer.from(this.options.content, this.options.encoding));
      else
        request.write(this.options.content);
    }
    request.end();
  }
}