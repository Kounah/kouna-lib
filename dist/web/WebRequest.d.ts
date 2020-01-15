/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import * as events from 'events';
import { URL } from 'url';
import { IWebResponseOptions, WebResponse } from './WebResponse';
export interface IWebRequestOptions extends https.RequestOptions {
    content: string | Buffer | undefined;
    encoding: BufferEncoding;
}
export declare class WebRequest extends events.EventEmitter {
    target: URL;
    options: IWebRequestOptions;
    constructor(target: string | URL, options?: IWebRequestOptions);
    url(): string;
    exec(options?: IWebResponseOptions): Promise<WebResponse | undefined>;
    execHttp(options?: IWebResponseOptions): Promise<WebResponse>;
    execHttps(options?: IWebResponseOptions): Promise<WebResponse>;
    sendRequest(request: http.ClientRequest): void;
}
