export interface AsyncMapOptions {
    delay: number;
    error: 'throw' | ((err: Error) => void);
}
/**
 * function name is description enough
 * @param items the itemes to work on
 * @param fn function to work on the items
 * @param options additional options
 */
export declare function asyncMap<T, TOut>(items: T[], fn: (item: T) => TOut | Promise<TOut>, options?: AsyncMapOptions): Promise<(Error | TOut)[]>;
