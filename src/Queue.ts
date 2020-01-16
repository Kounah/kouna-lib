import { defined } from "./functions";
import { delay } from "./functions/delay";

export interface IQueueOptions {
  /**the delay after working in milliseconds*/
  delay?: number;
  /**the delay during idle time */
  idle?: number;
  /**stores the results */
  store?: boolean;
}

const defaultOptions: IQueueOptions = {
  delay: 0,
  idle: 1000,
  store: false
};

export class QueueOptions implements IQueueOptions {
  delay?: number;
  idle?: number;
  store?: boolean;

  constructor(props?: IQueueOptions) {
    if(typeof  props === 'undefined')
      props = defaultOptions;

    this.delay = defined(defaultOptions.delay, props.delay);
    this.idle = defined(defaultOptions.idle, props.idle);
    this.store = defined(defaultOptions.store, props.store);
  }
}

export class Queue<T, TOut> {
  items: T[];
  handler: ((item: T) => TOut | Promise<TOut>);
  options: QueueOptions;
  idle: Boolean;
  private terminated: Boolean;
  results: TOut[];  

  constructor(
    items: T[],
    handler: ((item: T) => TOut | Promise<TOut>),
    options?: IQueueOptions) {

      this.items = items;
      this.handler = handler;
      this.options = new QueueOptions(options);
      this.idle = true;
      this.terminated = false;
      this.results = [];
  }

  async step() {
    if(this.items.length > 0) {
      let cur = this.items.shift();

      if(typeof cur === 'undefined')
        return;
      
      let result;
      try {
        result = await Promise.resolve(this.handler(cur));
      } catch(err) {
        result = err;
      }
      
      if(this.options.store)
        this.results.push(result);

      await delay(this.options?.delay);
      
      return result;
    } else await delay(this.options.idle);
  }

  start() {
    Promise.resolve((async () => {
      while(!this.terminated) {
        await this.step();
      }
      return this.results;
    })());
    return this;
  }

  terminate() {
    this.terminated = true;
  }

  stop() {
    Promise.resolve((async () => {
      await new Promise(resolve => {
        let stopInterval = setInterval(() => {
          if(this.items.length <= 0) {
            resolve();
            clearInterval(stopInterval)
          }
        })
      });
      await delay(this.options.idle);
      this.terminate();
    })());
    return this;
  }

  async resolve() {
    return new Promise<TOut[]>(resolve => {
      let resolveInterval = setInterval(() => {
        if(this.terminated) {
          resolve(this.results);
          clearInterval(resolveInterval);
        }
      })
    })
  }
  
  add(...items: T[]) {
    this.items.push(...items);
  }
}