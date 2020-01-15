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
const defined_1 = require("./defined");
const async_map_1 = require("./async-map");
/**
 * discovers a directory
 * @param name the path name
 */
function discover(name, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let stat = yield fs.stat(name);
        if (!stat.isDirectory())
            throw new Error(`'${name}' is not a direcory`);
        return yield discoverDir(name, options);
    });
}
exports.discover = discover;
function discoverDir(name, options, base) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield async_map_1.asyncMap(yield fs.readdir(name), (cname) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if ((_a = options) === null || _a === void 0 ? void 0 : _a.excludes.map(pat => pat.test(cname)).reduce((p, c) => p || c))
                return undefined;
            let full = path.join(name, cname);
            let stat = yield fs.stat(full);
            let b = defined_1.defined(name, base);
            if (stat.isDirectory()) {
                (_b = options) === null || _b === void 0 ? void 0 : _b.onDir(full);
                yield discoverDir(full, options, b);
            }
            if (stat.isFile()) {
                (_c = options) === null || _c === void 0 ? void 0 : _c.onFile(full);
                if (!((_d = options) === null || _d === void 0 ? void 0 : _d.useSkipResult))
                    return path.relative(b, full);
            }
        }));
    });
}
exports.discoverDir = discoverDir;
