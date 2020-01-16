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
const path = require("path");
const fs = require("fs-extra");
const Queue_1 = require("../Queue");
function discover(dir, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let stat = yield fs.stat(dir);
        if (!stat.isDirectory())
            return [];
        let sub = yield fs.readdir(dir);
        let q = new Queue_1.Queue(sub, (item) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d, _e;
            let full = path.join(dir, item);
            let stat = yield fs.stat(full);
            if (stat.isDirectory()) {
                if (typeof ((_b = options) === null || _b === void 0 ? void 0 : _b.onDir) === 'function')
                    (_c = options) === null || _c === void 0 ? void 0 : _c.onDir(full, stat);
                let c = (yield fs.readdir(full));
                let m = c.map(p => path.relative(dir, path.join(full, p)));
                q.add(...m);
                return;
            }
            if (stat.isFile()) {
                if (typeof ((_d = options) === null || _d === void 0 ? void 0 : _d.onFile) === 'function')
                    (_e = options) === null || _e === void 0 ? void 0 : _e.onFile(full, stat);
                return path.relative(dir, full);
            }
        }), {
            store: !((_a = options) === null || _a === void 0 ? void 0 : _a.useSkipResult)
        });
        return (yield q.start().stop().resolve()).filter(item => item !== undefined);
    });
}
exports.discover = discover;
