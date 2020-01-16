"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
function uniqueFileName(name) {
    let p = path.parse(name);
    let i = 0;
    let n = p.base;
    while (fs.existsSync(path.join(p.dir, n))) {
        n = p.name + '_' + (i++) + p.ext;
    }
    return path.join(p.dir, n);
}
exports.uniqueFileName = uniqueFileName;
