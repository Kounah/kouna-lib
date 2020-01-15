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
const http = require("http");
const https = require("https");
const events = require("events");
const url_1 = require("url");
const WebResponse_1 = require("./WebResponse");
const defaultOptions = {
    content: undefined,
    encoding: 'utf8',
    method: 'GET',
};
class WebRequest extends events.EventEmitter {
    constructor(target, options) {
        super();
        this.target = target instanceof url_1.URL
            ? target
            : new url_1.URL(target);
        this.options = options || defaultOptions;
    }
    url() {
        if (this.target instanceof url_1.URL)
            return url_1.format(this.target);
        else
            return this.target;
    }
    exec(options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.target.protocol) {
                case 'http:':
                    return yield this.execHttp(options);
                case 'https:':
                    return yield this.execHttps(options);
            }
        });
    }
    execHttp(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                let req = http.request(this.url(), this.options, res => resolve(new WebResponse_1.WebResponse(res, options)));
                this.sendRequest(req);
            });
        });
    }
    execHttps(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                let req = https.request(this.url(), this.options, res => resolve(new WebResponse_1.WebResponse(res, options)));
                this.sendRequest(req);
            });
        });
    }
    sendRequest(request) {
        if (this.options.content !== undefined) {
            if (typeof this.options.content === 'string')
                request.write(Buffer.from(this.options.content, this.options.encoding));
            else
                request.write(this.options.content);
        }
        request.end();
    }
}
exports.WebRequest = WebRequest;
