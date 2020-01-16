import { defined } from "./functions";

interface HistoryEntry {
  timestamp: Date;
  cur: number;
}

interface IProgressOptions {
  maxHistoryDepth: number;
  tick: ((prog: Progress) => void);
}

const defaultOptions: IProgressOptions = {
  maxHistoryDepth: 10,
  tick: (prog) => {
    console.log(prog.toString());
  }
}

export default class Progress {
  cur: number;
  tick: ((prog: Progress) => void);
  private _min: number;
  private _max: number;
  private history: HistoryEntry[] = [];
  private options: IProgressOptions = defaultOptions;

  constructor(min: number, max: number, options?: IProgressOptions) {
    this.cur = min;
    this._min = min;
    this._max = max;

    if(typeof options !== 'undefined') {
      this.options = options;
    }

    this.tick = defined(defaultOptions.tick, options?.tick);

    let autoTickInterval = setInterval(() => {
      if(this.cur < this._max) {
        this.tick(this);
      } else clearInterval(autoTickInterval);
    })
  }

  step(value: number) {
    this.cur += value;
    if(this.history.length >= this.options.maxHistoryDepth)
      this.history.shift();
    this.history.push({
      cur: this.cur,
      timestamp: new Date()
    });
  }

  toString() {
    return `${this.cur} / ${this._max} (${(this.progress() * 100).toFixed(2)}) ${this.speed().toFixed(2)}/s`;
  }

  speed() {
    if(this.history.length > 0) {
      let diff = this.history.reduce((p, c) => p += c.cur, 0);
      let span = this.history[this.history.length - 1].timestamp.getTime() - this.history[0].timestamp.getTime();
      return diff / (span / 1000);
    } else return 0;
  }

  max() {
    return this.max;
  }

  progress() {
    return (this.cur - this._min) / this._max;
  }
}