import * as path from 'path';
import * as fs from 'fs-extra';
import { Queue } from '../Queue';

export interface DiscoverOptions {
  onDir: ((dir: string, stat?: fs.Stats) => void);
  onFile: ((file: string, stat?: fs.Stats) => void);
  excludes: RegExp[];
  useSkipResult: boolean;
}

export async function discover(dir: string, options?: DiscoverOptions) {
  let stat = await fs.stat(dir);
  if(!stat.isDirectory())
    return [];
  
  let sub = await fs.readdir(dir);
  let q = new Queue(sub, async (item) => {
    let full = path.join(dir, item);
    let stat = await fs.stat(full);

    if(stat.isDirectory()) {
      if(typeof options?.onDir === 'function')
        options?.onDir(full, stat);
      
      let c = (await fs.readdir(full));
      let m = c.map(p => path.relative(dir, path.join(full, p)));
      
      q.add(...m);
      return;
    }

    if(stat.isFile()) {
      if(typeof options?.onFile === 'function')
        options?.onFile(full, stat);
      
      return path.relative(dir, full);
    }
  }, {
    store: !options?.useSkipResult
  });

  return (await q.start().stop().resolve()).filter(item => item !== undefined);
}