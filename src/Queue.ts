import { defined } from "./functions";
import { delay } from "./functions/delay";

export interface IQueueOptions {
  /**the delay after working in milliseconds*/
  delay: number;
  /**the delay during idle time */
  idle: number;
  /**stores the results */
  store: boolean;
}

const defaultOptions: IQueueOptions = {
  delay: 0,
  idle: 1000,
  store: false
};

export class QueueOptions implements IQueueOptions {
  delay: number;
  idle: number;
  store: boolean;

  constructor(props?: IQueueOptions) {
    if(props === undefined)
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

      if(cur === undefined)
        return;
      
      let result = await Promise.resolve(this.handler(cur));
      
      if(this.options.store)
        this.results.push(result);

      if(this.options.delay > 0)
        await delay(this.options.delay);
      
      return result;
    } else await delay(this.options.idle);
  }

  start() {
    return Promise.resolve(async () => {
      while(!this.terminated) {
        await this.step();
      }
      return this.results;
    });
  }

  async stop() {
    await new Promise(resolve => {
      setInterval(() => {
        if(this.items.length < 0)
          resolve();
      })
    });
    await delay(this.options.idle);
    return this.results;
  }
}