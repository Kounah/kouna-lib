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
const defined_1 = require("./defined");
/**
 * function name is description enough
 * @param items the itemes to work on
 * @param fn function to work on the items
 * @param options additional options
 */
function asyncMap(items, fn, options) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let results = new Array(items.length);
        for (let i = 0; i < items.length; i++) {
            try {
                let cur = items.shift();
                if (typeof cur === 'undefined')
                    throw new TypeError('cur is undefined');
                results[i] = yield fn(cur);
                if (defined_1.defined(0, (_a = options) === null || _a === void 0 ? void 0 : _a.delay) > 0)
                    yield new Promise(resolve => { var _a; return setTimeout(() => resolve(), (_a = options) === null || _a === void 0 ? void 0 : _a.delay); });
            }
            catch (err) {
                results[i] = err;
                if (((_b = options) === null || _b === void 0 ? void 0 : _b.error) !== 'throw')
                    (_c = options) === null || _c === void 0 ? void 0 : _c.error(err);
                else
                    throw err;
            }
        }
        return results;
    });
}
exports.asyncMap = asyncMap;
