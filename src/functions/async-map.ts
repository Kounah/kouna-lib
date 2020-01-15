import { defined } from './defined';

export interface AsyncMapOptions {
  delay: number;
  error: 'throw' | ((err: Error) => void);
}

/**
 * function name is description enough
 * @param items the itemes to work on
 * @param fn function to work on the items
 * @param options additional options
 */
export async function asyncMap<T, TOut>(
  items: T[],
  fn: (item: T) => TOut | Promise<TOut>,
  options?: AsyncMapOptions) {

  let results: (TOut | Error)[] = new Array<TOut>(items.length);
  for(let i: number = 0; i < items.length; i++) {
    try {
      let cur = items.shift();
  
      if(typeof cur === 'undefined')
        throw new TypeError('cur is undefined');
  
      results[i] = await fn(cur);
  
      if(defined(0, options?.delay) > 0) await new Promise(resolve =>
        setTimeout(() => resolve(), options?.delay));
    } catch(err) {
      results[i] = err;

      if(options?.error !== 'throw')
        options?.error(err);
      else throw err;
    }
  }

  return results;
}