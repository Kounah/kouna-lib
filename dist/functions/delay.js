"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(time) {
    if (typeof time === 'number' && time > 0) {
        return new Promise(resolve => setTimeout(() => resolve(), time));
    }
    else
        return new Promise(resolve => resolve());
}
exports.delay = delay;
