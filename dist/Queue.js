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
        if (props === undefined)
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.items.length > 0) {
                let cur = this.items.shift();
                if (cur === undefined)
                    return;
                let result = yield Promise.resolve(this.handler(cur));
                if (this.options.store)
                    this.results.push(result);
                if (this.options.delay > 0)
                    yield delay_1.delay(this.options.delay);
                return result;
            }
            else
                yield delay_1.delay(this.options.idle);
        });
    }
    start() {
        return Promise.resolve(() => __awaiter(this, void 0, void 0, function* () {
            while (!this.terminated) {
                yield this.step();
            }
            return this.results;
        }));
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
                setInterval(() => {
                    if (this.items.length < 0)
                        resolve();
                });
            });
            yield delay_1.delay(this.options.idle);
            return this.results;
        });
    }
}
exports.Queue = Queue;
