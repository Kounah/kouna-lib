export declare class AsyncParameter<TIn, TOut> {
    value: any;
    constructor(value: ((param: TIn) => TOut | Promise<TOut>));
    resolve(): Promise<TOut>;
}
