const defined = require('../functions/defined');
const Event = require('events');

/**@typedef {Queue} Class */

/**@type {QueueOptions} */
const defaultOptions = {
  delay: 0,
  idleInterval: 500
};

/**
 * @class
 * @template T
 */
class QueueOptions {
  /**
   * @param {QueueOptions.<T>} props
   */
  constructor(props) {
    if(typeof props !== 'object' || props === null)
      props = defaultOptions;

    /**@type {number} */
    this.delay = defined(props.delay, defaultOptions.delay);
    /**@type {number} */
    this.idleTimeout = defined(props.idleTimeout, defaultOptions.idleTimeout);
  }
}

/**@typedef {('idle'|'working'|'terminated')} QueueState*/

/**
 * @class
 * @template T
 */
class Queue extends Event {
  /**
   * @param {Array.<T>} items
   * @param {(item: T) => void} handler
   * @param {QueueOptions.<T>} props
   */
  constructor(items, handler, options) {
    super();

    this.options = new QueueOptions(options);

    if(!Array.isArray(items))
      this.items = [];
    else this.items = items;

    if(typeof handler !== 'function')
      throw new TypeError('\'handler\' is not a function');

    this.handler = handler;

    /**@type {QueueState} */
    this.state = this.items.length > 0
      ? 'working'
      : 'idle';

    this.run();
  }

  /**
   * adds an item to the queue
   * @param  {...T} items
   */
  async add(...items) {
    if(items.length > 0) {
      this.items.push(...items);
      if(this.state !== 'working') this.state = 'working';
    }
  }

  async tick() {
    switch(this.state) {
    case 'idle':
      await new Promise(resolve => setTimeout(() => resolve(), this.options.idleInterval));
      break;
    case 'working':
      await this.work();
      if(this.options.delay > 0) {
        await new Promise(resolve => setTimeout(() => resolve(), this.options.delay));
      }
      break;
    }
  }

  async work() {
    let item = this.items.shift();
    await Promise.resolve(this.handler(item));
    if(this.items.length === 0) this.emit('done');
  }

  async run() {
    while(this.state !== 'terminated') {
      await this.tick();
    }
  }

  terminate() {
    this.state = 'terminated';
  }
}

module.exports = Queue;