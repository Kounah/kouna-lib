/// <reference types="node" />
import { IncomingMessage } from "http";
import { Writable } from "stream";
import { HttpStatus } from "./HttpStatus";
import { WebRequest } from "./WebRequest";
import Progress from "../Progress";
export declare const headerPropertyPattern: RegExp;
export interface IParsedHeader {
    args: string[];
    props: Map<string, string>;
}
export declare enum WebResponseState {
    running = 0,
    paused = 1,
    complete = 2,
    error = 3
}
export interface IWebResponseOptions {
    request?: WebRequest;
    pipe?: Writable;
    mimeType?: string;
    store: boolean;
    encoding: BufferEncoding;
}
export declare const defaultOptions: IWebResponseOptions;
export declare class WebResponseOptions implements IWebResponseOptions {
    request?: WebRequest;
    pipe?: Writable;
    mimeType?: string;
    store: boolean;
    encoding: BufferEncoding;
    constructor(props?: IWebResponseOptions);
}
export declare class WebResponse {
    message: IncomingMessage;
    options: WebResponseOptions;
    contentLength: number;
    complete: Promise<boolean>;
    mimeType: string;
    charset: BufferEncoding;
    state: WebResponseState;
    status: HttpStatus;
    private store?;
    private writer?;
    progress: Progress;
    constructor(message: IncomingMessage, options?: WebResponseOptions);
    pipe(target: Writable): Promise<void>;
    pause(): void;
    resume(): void;
    header(headerName: string): IParsedHeader | undefined;
}
