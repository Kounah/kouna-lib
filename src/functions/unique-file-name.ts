import * as fs from 'fs-extra';
import * as path from 'path';

export function uniqueFileName(name: string) {
  let p = path.parse(name);
  let i = 0;
  let n = p.base;

  while(fs.existsSync(path.join(p.dir, n))) {
    n = p.name + '_' + (i++) + p.ext;
  }

  return path.join(p.dir, n);
}