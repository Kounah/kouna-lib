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
const stream_1 = require("stream");
const functions_1 = require("../functions");
const Queue_1 = require("../Queue");
const Progress_1 = require("../Progress");
exports.headerPropertyPattern = /^(.*)=(.*)$/gm;
var WebResponseState;
(function (WebResponseState) {
    WebResponseState[WebResponseState["running"] = 0] = "running";
    WebResponseState[WebResponseState["paused"] = 1] = "paused";
    WebResponseState[WebResponseState["complete"] = 2] = "complete";
    WebResponseState[WebResponseState["error"] = 3] = "error";
})(WebResponseState = exports.WebResponseState || (exports.WebResponseState = {}));
exports.defaultOptions = {
    store: false,
    encoding: 'utf8'
};
class WebResponseOptions {
    constructor(props) {
        var _a;
        if (typeof props === 'undefined')
            props = exports.defaultOptions;
        this.request = (_a = props) === null || _a === void 0 ? void 0 : _a.request;
        this.pipe = functions_1.defined(exports.defaultOptions.pipe, props.pipe);
        this.mimeType = functions_1.defined(exports.defaultOptions.mimeType, props.mimeType);
        this.store = functions_1.defined(exports.defaultOptions.store, props.store);
        this.encoding = functions_1.defined(exports.defaultOptions.encoding, props.encoding);
    }
}
exports.WebResponseOptions = WebResponseOptions;
class WebResponse {
    constructor(message, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.message = message;
        this.options = new WebResponseOptions(options);
        this.store = undefined;
        if (this.options.store) {
            // store response content
            this.store = new Queue_1.Queue([], () => __awaiter(this, void 0, void 0, function* () { }));
            message.on('data', chunk => {
                var _a;
                this.progress.step(chunk.length);
                (_a = this.store) === null || _a === void 0 ? void 0 : _a.add(chunk);
            });
        }
        else {
            // don't store response content
            if (typeof ((_a = options) === null || _a === void 0 ? void 0 : _a.pipe) !== 'undefined' && ((_b = options) === null || _b === void 0 ? void 0 : _b.pipe) instanceof stream_1.Writable) {
                message.on('data', chunk => this.progress.step(chunk.length));
                message.pipe(options.pipe);
            }
            else
                try {
                    message.on('data', chunk => { var _a, _b; return (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.pipe) === null || _b === void 0 ? void 0 : _b.write(chunk); });
                }
                catch (err) {
                    console.error(err);
                }
        }
        this.status = {
            code: this.message.statusCode,
            message: this.message.statusMessage
        };
        this.state = WebResponseState.running;
        let contentType = this.header('content-type');
        let charset = ((_d = (_c = contentType) === null || _c === void 0 ? void 0 : _c.props.get('charset')) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '';
        this.mimeType = functions_1.defined('text/plain', (_e = options) === null || _e === void 0 ? void 0 : _e.mimeType, (_f = contentType) === null || _f === void 0 ? void 0 : _f.args[0]);
        this.charset = functions_1.defined(this.options.encoding, Buffer.isEncoding(charset) ? charset : undefined);
        this.contentLength = Number((_g = this.header('content-length')) === null || _g === void 0 ? void 0 : _g.args.shift());
        this.progress = new Progress_1.default(0, this.contentLength);
        this.complete = new Promise(resolve => {
            message.on('end', () => {
                this.state = WebResponseState.complete;
                resolve(true);
            });
            message.on('error', (err) => {
                this.state = WebResponseState.error;
                console.error(err);
                resolve(false);
            });
        });
    }
    pipe(target) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.store === 'undefined')
                throw new Error('store not enabled');
            this.store.handler = item => {
                target.write(item);
            };
            yield ((_a = this.store) === null || _a === void 0 ? void 0 : _a.start().stop().resolve());
        });
    }
    pause() {
        if (this.state !== WebResponseState.paused) {
            if (!this.message.isPaused()) {
                this.message.pause();
            }
            this.state = WebResponseState.paused;
        }
    }
    resume() {
        if (this.state !== WebResponseState.running) {
            if (this.message.isPaused()) {
                this.message.resume();
            }
            this.state = WebResponseState.running;
        }
    }
    header(headerName) {
        let h = this.message.headers[headerName];
        if (typeof h !== 'string')
            return undefined;
        let args = [];
        let props = new Map();
        h.split(';')
            .map(seg => seg.trim())
            .forEach(seg => {
            let m;
            if ((m = seg.match(exports.headerPropertyPattern)) !== null) {
                props.set(m[1], decodeURIComponent(m[2]));
            }
            else
                args.push(decodeURIComponent(seg));
        });
        return {
            args,
            props
        };
    }
}
exports.WebResponse = WebResponse;
