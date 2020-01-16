import { IncomingMessage } from "http";
import { Writable } from "stream";
import { defined } from '../functions';
import { Queue } from "../Queue";
import { HttpStatus } from "./HttpStatus";
import { WebRequest } from "./WebRequest";
import Progress from "../Progress";

export const headerPropertyPattern: RegExp = /^(.*)=(.*)$/gm;

export interface IParsedHeader {
  args: string[];
  props: Map<string, string>;
}

export enum WebResponseState {
  running,
  paused,
  complete,
  error
}

export interface IWebResponseOptions {
  request?: WebRequest,
  pipe?: Writable,
  mimeType?: string
  store: boolean,
  encoding: BufferEncoding,
}

export const defaultOptions: IWebResponseOptions = {
  store: false,
  encoding: 'utf8'
}

export class WebResponseOptions implements IWebResponseOptions {
  request?: WebRequest;
  pipe?: Writable;
  mimeType?: string;
  store: boolean;
  encoding: BufferEncoding;

  constructor(props?: IWebResponseOptions) {
    if(typeof props === 'undefined')
      props = defaultOptions;

    this.request = props?.request;
    this.pipe = defined(defaultOptions.pipe, props.pipe);
    this.mimeType = defined(defaultOptions.mimeType, props.mimeType)

    this.store = defined(defaultOptions.store, props.store);
    this.encoding = defined(defaultOptions.encoding, props.encoding);
  }
}

export class WebResponse {
  message: IncomingMessage;
  options: WebResponseOptions;
  contentLength: number;
  complete: Promise<boolean>;
  mimeType: string;
  charset: BufferEncoding;
  state: WebResponseState;
  status: HttpStatus;
  private store?: Queue<Buffer, void>;
  private writer?: Writable;
  progress: Progress;

  constructor(message: IncomingMessage, options?: WebResponseOptions) {
    this.message = message;
    this.options = new WebResponseOptions(options);
    this.store = undefined;    

    if(this.options.store) {
      // store response content
      this.store = new Queue<Buffer, void>([], async () => { });
      message.on('data', chunk => {
        this.progress.step(chunk.length);
        this.store?.add(chunk);
      });
    } else {
      // don't store response content
      if(typeof options?.pipe !== 'undefined' && options?.pipe instanceof Writable) {
        message.on('data', chunk => this.progress.step(chunk.length));
        message.pipe(options.pipe)
      } else try { message.on('data', chunk => options?.pipe?.write(chunk)); } catch (err) {
        console.error(err);
      }
    }

    this.status = {
      code: this.message.statusCode,
      message: this.message.statusMessage
    };

    this.state = WebResponseState.running;
    let contentType = this.header('content-type');
    let charset = contentType?.props.get('charset')?.toLowerCase() || '';
    this.mimeType = defined('text/plain', options?.mimeType, contentType?.args[0]);
    this.charset = defined(this.options.encoding, Buffer.isEncoding(charset) ? charset : undefined);
    this.contentLength = Number(this.header('content-length')?.args.shift());
    this.progress = new Progress(0, this.contentLength);

    this.complete = new Promise(resolve => {
      message.on('end', () => {
        this.state = WebResponseState.complete;
        resolve(true)
      });

      message.on('error', (err) => {
        this.state = WebResponseState.error;
        console.error(err);
        resolve(false);
      });
    })
  }

  async pipe(target: Writable) {
    if(typeof this.store === 'undefined')
      throw new Error('store not enabled');

    this.store.handler = item => {
      target.write(item);
    }
    await this.store?.start().stop().resolve();
  }

  pause() {
    if(this.state !== WebResponseState.paused) {
      if(!this.message.isPaused()) {
        this.message.pause();
      }
      this.state = WebResponseState.paused;
    }
  }

  resume() {
    if(this.state !== WebResponseState.running) {
      if(this.message.isPaused()) {
        this.message.resume();
      }
      this.state = WebResponseState.running;
    }
  }
  
  header(headerName: string) : IParsedHeader | undefined {  
    let h = this.message.headers[headerName];
    
    if(typeof h !== 'string')
      return undefined;

    let args: string[] = [];
    let props: Map<string, string> = new Map();

    h.split(';')
      .map(seg => seg.trim())
      .forEach(seg => {
        let m: RegExpMatchArray | null;
        if((m = seg.match(headerPropertyPattern)) !== null) {
          props.set(m[1], decodeURIComponent(m[2]));
        } else args.push(decodeURIComponent(seg));
      });

    return {
      args,
      props
    }
  }
}

