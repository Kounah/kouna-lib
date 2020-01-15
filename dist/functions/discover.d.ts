export interface DiscoverOptions {
    onDir: ((dir: string) => void);
    onFile: ((file: string) => void);
    excludes: RegExp[];
    useSkipResult: boolean;
}
/**
 * discovers a directory
 * @param name the path name
 */
export declare function discover(name: string, options?: DiscoverOptions): Promise<(string | Error | undefined)[]>;
export declare function discoverDir(name: string, options?: DiscoverOptions, base?: string): Promise<(string | Error | undefined)[]>;
