export interface IQueueOptions {
    /**the delay after working in milliseconds*/
    delay?: number;
    /**the delay during idle time */
    idle?: number;
    /**stores the results */
    store?: boolean;
}
export declare class QueueOptions implements IQueueOptions {
    delay?: number;
    idle?: number;
    store?: boolean;
    constructor(props?: IQueueOptions);
}
export declare class Queue<T, TOut> {
    items: T[];
    handler: ((item: T) => TOut | Promise<TOut>);
    options: QueueOptions;
    idle: Boolean;
    private terminated;
    results: TOut[];
    constructor(items: T[], handler: ((item: T) => TOut | Promise<TOut>), options?: IQueueOptions);
    step(): Promise<any>;
    start(): this;
    terminate(): void;
    stop(): this;
    resolve(): Promise<TOut[]>;
    add(...items: T[]): void;
}
