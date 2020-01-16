interface IProgressOptions {
    maxHistoryDepth: number;
    tick: ((prog: Progress) => void);
}
export default class Progress {
    cur: number;
    tick: ((prog: Progress) => void);
    private _min;
    private _max;
    private history;
    private options;
    constructor(min: number, max: number, options?: IProgressOptions);
    step(value: number): void;
    toString(): string;
    speed(): number;
    max(): () => any;
    progress(): number;
}
export {};
