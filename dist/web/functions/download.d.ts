/// <reference types="node" />
import { URL } from "url";
export interface DownloadOptions {
}
export declare function download(target: string | URL, options?: DownloadOptions): Promise<void>;
