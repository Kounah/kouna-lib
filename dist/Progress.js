"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const defaultOptions = {
    maxHistoryDepth: 10,
    tick: (prog) => {
        console.log(prog.toString());
    }
};
class Progress {
    constructor(min, max, options) {
        var _a;
        this.history = [];
        this.options = defaultOptions;
        this.cur = min;
        this._min = min;
        this._max = max;
        if (typeof options !== 'undefined') {
            this.options = options;
        }
        this.tick = functions_1.defined(defaultOptions.tick, (_a = options) === null || _a === void 0 ? void 0 : _a.tick);
        let autoTickInterval = setInterval(() => {
            if (this.cur < this._max) {
                this.tick(this);
            }
            else
                clearInterval(autoTickInterval);
        });
    }
    step(value) {
        this.cur += value;
        if (this.history.length >= this.options.maxHistoryDepth)
            this.history.shift();
        this.history.push({
            cur: this.cur,
            timestamp: new Date()
        });
    }
    toString() {
        return `${this.cur} / ${this._max} (${(this.progress() * 100).toFixed(2)}) ${this.speed().toFixed(2)}/s`;
    }
    speed() {
        if (this.history.length > 0) {
            let diff = this.history.reduce((p, c) => p += c.cur, 0);
            let span = this.history[this.history.length - 1].timestamp.getTime() - this.history[0].timestamp.getTime();
            return diff / (span / 1000);
        }
        else
            return 0;
    }
    max() {
        return this.max;
    }
    progress() {
        return (this.cur - this._min) / this._max;
    }
}
exports.default = Progress;
