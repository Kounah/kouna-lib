/// <reference types="node" />
import * as fs from 'fs-extra';
export interface DiscoverOptions {
    onDir: ((dir: string, stat?: fs.Stats) => void);
    onFile: ((file: string, stat?: fs.Stats) => void);
    excludes: RegExp[];
    useSkipResult: boolean;
}
export declare function discover(dir: string, options?: DiscoverOptions): Promise<(string | undefined)[]>;
