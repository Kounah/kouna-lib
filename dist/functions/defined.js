"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defined(defaultValue, ...args) {
    while (args.length > 0) {
        let cur = args.shift();
        if (typeof cur !== 'undefined')
            return cur;
    }
    return defaultValue;
}
exports.defined = defined;
