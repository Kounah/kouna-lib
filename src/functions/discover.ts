import * as path from 'path';
import * as fs from 'fs-extra';
import { defined } from './defined';
import { asyncMap } from './async-map';

export interface DiscoverOptions {
  onDir: ((dir: string) => void);
  onFile: ((file: string) => void);
  excludes: RegExp[];
  useSkipResult: boolean;
}

/**
 * discovers a directory
 * @param name the path name
 */
export async function discover(name: string, options?: DiscoverOptions) {
  let stat = await fs.stat(name);

  if(!stat.isDirectory())
    throw new Error(`'${name}' is not a direcory`);

  return await discoverDir(name, options);
}

export async function discoverDir(
  name: string,
  options?: DiscoverOptions,
  base?: string) {
  return await asyncMap(await fs.readdir(name), async (cname) => {
    if(options?.excludes
      .map(pat => pat.test(cname))
      .reduce((p, c) => p || c))
      return undefined;

    let full = path.join(name, cname);
    let stat = await fs.stat(full);
    let b = defined(name, base);

    if(stat.isDirectory()) {
      options?.onDir(full);
      await discoverDir(full, options, b);
    }

    if(stat.isFile()) {
      options?.onFile(full);
      if(!options?.useSkipResult)
        return path.relative(b, full);
    }
  });
}