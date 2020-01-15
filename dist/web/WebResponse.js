"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultOptions = {};
class WebResponseOptions {
    constructor(props) {
        if (props === undefined)
            props = defaultOptions;
        this.request = props.request;
    }
}
exports.WebResponseOptions = WebResponseOptions;
class WebResponse {
    constructor(message, options) {
        this.message = message;
        this.options = new WebResponseOptions(options);
    }
}
exports.WebResponse = WebResponse;
