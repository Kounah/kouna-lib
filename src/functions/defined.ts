export function defined<T>(defaultValue: T, ...args: (T | undefined)[]) {
  
  while(args.length > 0) {
    let cur = args.shift();
    if(typeof cur !== 'undefined')
      return cur;
  }

  return defaultValue;
}