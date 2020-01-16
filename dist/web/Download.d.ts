/// <reference types="node" />
import { URL } from "url";
import { WebRequest } from "./WebRequest";
import { WebResponse } from "./WebResponse";
import { Writable } from "stream";
export interface DownloadNameCallback {
    (download: Download): (string | Promise<string>);
}
export interface IDownloadOptions {
    dir: string;
    name: string | DownloadNameCallback;
    autoExtension: boolean;
    encoding: BufferEncoding;
    writeIncomplete: boolean;
    overwrite: boolean;
}
export declare class DownloadOptions implements IDownloadOptions {
    dir: string;
    encoding: BufferEncoding;
    autoExtension: boolean;
    name: string | DownloadNameCallback;
    writeIncomplete: boolean;
    overwrite: boolean;
    constructor(props?: IDownloadOptions);
}
export declare class Download {
    request: WebRequest;
    response?: WebResponse;
    stream: Writable;
    data: Buffer;
    options: DownloadOptions;
    constructor(target: string | URL, options?: DownloadOptions);
    exec(): Promise<string>;
    private execComplete;
    private execIncomplete;
    private fileName;
    pause(): void;
    resume(): void;
}
