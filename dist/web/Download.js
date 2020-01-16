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
const url_1 = require("url");
const WebRequest_1 = require("./WebRequest");
const os_1 = require("os");
const path = require("path");
const defined_1 = require("../functions/defined");
const stream_1 = require("stream");
const mime = require("mime");
const fs = require("fs-extra");
const unique_file_name_1 = require("../functions/unique-file-name");
const defaultNameFunction = (download) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // content-disposition
    let contentDisposition = (_a = download.response) === null || _a === void 0 ? void 0 : _a.header('content-disposition');
    if (typeof contentDisposition !== 'undefined') {
        let n;
        switch (contentDisposition.args.shift()) {
            case 'attachment':
                n = contentDisposition.props.get('filename');
                break;
            case 'formdata':
                n = contentDisposition.props.get('filename');
                break;
            default:
                break;
        }
        if (typeof n !== 'undefined')
            return n;
    }
    // request url
    if (typeof download.request !== 'undefined') {
        let url = download.request.url();
        let pathname = url_1.parse(url).pathname;
        if (pathname !== null) {
            let p = path.posix.parse(pathname);
            if (p.ext !== '') {
                return p.base;
            }
            else if (download.options.autoExtension && typeof ((_b = download.response) === null || _b === void 0 ? void 0 : _b.mimeType) !== 'undefined') {
                let autoExt = mime.getExtension((_c = download.response) === null || _c === void 0 ? void 0 : _c.mimeType);
                if (autoExt !== null)
                    p.ext = '.' + autoExt;
                return path.basename(path.format(p));
            }
        }
    }
    return 'download';
});
const defaultOptions = {
    dir: path.join(os_1.homedir(), 'downloads'),
    encoding: 'utf8',
    autoExtension: true,
    name: defaultNameFunction,
    writeIncomplete: true,
    overwrite: false
};
class DownloadOptions {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f;
        this.dir = defined_1.defined(defaultOptions.dir, (_a = props) === null || _a === void 0 ? void 0 : _a.dir);
        this.encoding = defined_1.defined(defaultOptions.encoding, (_b = props) === null || _b === void 0 ? void 0 : _b.encoding);
        this.autoExtension = defined_1.defined(defaultOptions.autoExtension, (_c = props) === null || _c === void 0 ? void 0 : _c.autoExtension);
        this.name = defined_1.defined(defaultOptions.name, (_d = props) === null || _d === void 0 ? void 0 : _d.name);
        this.writeIncomplete = defined_1.defined(defaultOptions.writeIncomplete, (_e = props) === null || _e === void 0 ? void 0 : _e.writeIncomplete);
        this.overwrite = defined_1.defined(defaultOptions.overwrite, (_f = props) === null || _f === void 0 ? void 0 : _f.overwrite);
    }
}
exports.DownloadOptions = DownloadOptions;
class Download {
    constructor(target, options) {
        this.options = new DownloadOptions(options);
        this.request = new WebRequest_1.WebRequest(target);
        this.stream = new stream_1.Writable();
        this.data = Buffer.from('', this.options.encoding);
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.writeIncomplete) {
                return yield this.execIncomplete();
            }
            else {
                return yield this.execComplete();
            }
        });
    }
    execComplete() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.response = yield this.request.exec({
                request: this.request,
                store: true,
                encoding: this.options.encoding
            });
            if (yield ((_a = this.response) === null || _a === void 0 ? void 0 : _a.complete)) {
                // response finished successfully
                let name = yield this.fileName();
                let fileStream = fs.createWriteStream(name);
                yield ((_b = this.response) === null || _b === void 0 ? void 0 : _b.pipe(fileStream));
                return name;
            }
            throw new Error('Download Failed - Incomplete');
        });
    }
    execIncomplete() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let tmpname = unique_file_name_1.uniqueFileName(path.join(this.options.dir, 'download'));
            let fileStream = fs.createWriteStream(tmpname);
            this.response = yield this.request.exec({
                request: this.request,
                store: false,
                pipe: fileStream,
                encoding: this.options.encoding
            });
            if (yield ((_a = this.response) === null || _a === void 0 ? void 0 : _a.complete)) {
                // response finished successful
                let name = yield this.fileName();
                yield fs.move(tmpname, name);
                return name;
            }
            yield fs.remove(tmpname);
            throw Error('Download Failed - Incomplete');
        });
    }
    fileName() {
        return __awaiter(this, void 0, void 0, function* () {
            let name = 'download';
            if (typeof this.options.name === 'string') {
                name = this.options.name;
            }
            else if (typeof this.options.name === 'function') {
                name = yield Promise.resolve(this.options.name(this));
            }
            else if (this.options.name) {
                name = yield this.options.name;
            }
            else {
                name = yield defaultNameFunction(this);
            }
            if (!this.options.overwrite) {
                name = unique_file_name_1.uniqueFileName(path.join(this.options.dir, name));
            }
            else {
                name = path.join(this.options.dir, name);
            }
            return name;
        });
    }
    pause() {
        var _a;
        (_a = this.response) === null || _a === void 0 ? void 0 : _a.pause();
    }
    resume() {
        var _a;
        (_a = this.response) === null || _a === void 0 ? void 0 : _a.resume();
    }
}
exports.Download = Download;
