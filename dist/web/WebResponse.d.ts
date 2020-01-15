/// <reference types="node" />
import { IncomingMessage } from "http";
import { WebRequest } from "./WebRequest";
export interface IWebResponseOptions {
    request?: WebRequest;
}
export declare class WebResponseOptions implements IWebResponseOptions {
    request?: WebRequest;
    constructor(props?: IWebResponseOptions);
}
export declare class WebResponse {
    message: IncomingMessage;
    options: WebResponseOptions;
    constructor(message: IncomingMessage, options?: IWebResponseOptions);
}
