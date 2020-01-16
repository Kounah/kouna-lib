"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const delay_1 = require("./functions/delay");
const defaultOptions = {
    delay: 0,
    idle: 1000,
    store: false
};
class QueueOptions {
    constructor(props) {
        if (typeof props === 'undefined')
            props = defaultOptions;
        this.delay = functions_1.defined(defaultOptions.delay, props.delay);
        this.idle = functions_1.defined(defaultOptions.idle, props.idle);
        this.store = functions_1.defined(defaultOptions.store, props.store);
    }
}
exports.QueueOptions = QueueOptions;
class Queue {
    constructor(items, handler, options) {
        this.items = items;
        this.handler = handler;
        this.options = new QueueOptions(options);
        this.idle = true;
        this.terminated = false;
        this.results = [];
    }
    step() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.items.length > 0) {
                let cur = this.items.shift();
                if (typeof cur === 'undefined')
                    return;
                let result;
                try {
                    result = yield Promise.resolve(this.handler(cur));
                }
                catch (err) {
                    result = err;
                }
                if (this.options.store)
                    this.results.push(result);
                yield delay_1.delay((_a = this.options) === null || _a === void 0 ? void 0 : _a.delay);
                return result;
            }
            else
                yield delay_1.delay(this.options.idle);
        });
    }
    start() {
        Promise.resolve((() => __awaiter(this, void 0, void 0, function* () {
            while (!this.terminated) {
                yield this.step();
            }
            return this.results;
        }))());
        return this;
    }
    terminate() {
        this.terminated = true;
    }
    stop() {
        Promise.resolve((() => __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
                let stopInterval = setInterval(() => {
                    if (this.items.length <= 0) {
                        resolve();
                        clearInterval(stopInterval);
                    }
                });
            });
            yield delay_1.delay(this.options.idle);
            this.terminate();
        }))());
        return this;
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                let resolveInterval = setInterval(() => {
                    if (this.terminated) {
                        resolve(this.results);
                        clearInterval(resolveInterval);
                    }
                });
            });
        });
    }
    add(...items) {
        this.items.push(...items);
    }
}
exports.Queue = Queue;
