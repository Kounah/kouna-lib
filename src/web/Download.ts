import { URL, parse } from "url";
import { WebRequest } from "./WebRequest";
import { homedir } from "os";
import * as path from 'path';
import { defined } from "../functions/defined";
import { WebResponse } from "./WebResponse";
import { Writable } from "stream";
import * as mime from 'mime';
import { createHash } from "crypto";
import * as fs from 'fs-extra';
import { uniqueFileName } from "../functions/unique-file-name";
import { delay } from "../functions";

export interface DownloadNameCallback {
  (download: Download) : (string | Promise<string>)
}

export interface IDownloadOptions {
  dir: string;
  name: string | DownloadNameCallback;
  autoExtension: boolean;
  encoding: BufferEncoding;
  writeIncomplete: boolean;
  overwrite: boolean;
}

const defaultNameFunction: DownloadNameCallback = async (download) => {
  // content-disposition
  let contentDisposition = download.response?.header('content-disposition');
  if(typeof contentDisposition !== 'undefined') {
    let n;    
    switch(contentDisposition.args.shift()) {
      case 'attachment':
        n = contentDisposition.props.get('filename');
        break;
      case 'formdata':
        n = contentDisposition.props.get('filename');
        break;
      default:
        break;
    }
    if(typeof n !== 'undefined')
      return n;
  }

  // request url
  if(typeof download.request !== 'undefined') {
    let url = download.request.url();
    let pathname = parse(url).pathname;
    if(pathname !== null) {
      let p = path.posix.parse(pathname);
      if(p.ext !== '') {
        return p.base;
      } else if(download.options.autoExtension && typeof download.response?.mimeType !== 'undefined') {
        let autoExt = mime.getExtension(download.response?.mimeType);
        if(autoExt !== null)
          p.ext = '.' + autoExt;
        return path.basename(path.format(p));
      }
    }
  }

  return 'download';
}

const defaultOptions: IDownloadOptions = {
  dir: path.join(homedir(), 'downloads'),
  encoding: 'utf8',
  autoExtension: true,
  name: defaultNameFunction,
  writeIncomplete: true,
  overwrite: false
}

export class DownloadOptions implements IDownloadOptions {
  dir: string;
  encoding: BufferEncoding;
  autoExtension: boolean;
  name: string | DownloadNameCallback;
  writeIncomplete: boolean;
  overwrite: boolean;

  constructor(props?: IDownloadOptions) {
    this.dir = defined(defaultOptions.dir, props?.dir);
    this.encoding = defined(defaultOptions.encoding, props?.encoding);
    this.autoExtension = defined(defaultOptions.autoExtension, props?.autoExtension);
    this.name = defined(defaultOptions.name, props?.name);
    this.writeIncomplete = defined(defaultOptions.writeIncomplete, props?.writeIncomplete);
    this.overwrite = defined(defaultOptions.overwrite, props?.overwrite);
  }
}

export class Download {
  request: WebRequest;
  response?: WebResponse;
  stream: Writable;
  data: Buffer;
  options: DownloadOptions;

  constructor(target: string | URL, options?: DownloadOptions) {
    this.options = new DownloadOptions(options);
    this.request = new WebRequest(target);
    this.stream = new Writable();
    this.data = Buffer.from('', this.options.encoding);
  }
  
  async exec() {
    if(this.options.writeIncomplete) {
      return await this.execIncomplete();
    } else {
      return await this.execComplete();
    }
  }

  private async execComplete() {
    this.response = await this.request.exec({
      request: this.request,
      store: true,
      encoding: this.options.encoding
    });
    
    if(await this.response?.complete) {
      // response finished successfully
      let name = await this.fileName();

      let fileStream = fs.createWriteStream(name);
      await this.response?.pipe(fileStream);
      return name;
    }

    throw new Error('Download Failed - Incomplete');
  }

  private async execIncomplete() {
    let tmpname = uniqueFileName(path.join(this.options.dir, 'download'));
    let fileStream = fs.createWriteStream(tmpname);
    this.response = await this.request.exec({
      request: this.request,
      store: false,
      pipe: fileStream,
      encoding: this.options.encoding
    });

    if(await this.response?.complete) {
      // response finished successful
      let name = await this.fileName();
      await fs.move(tmpname, name);
      return name;
    }

    await fs.remove(tmpname);
    throw Error('Download Failed - Incomplete');
  }

  private async fileName() {
    let name = 'download';

    if(typeof this.options.name === 'string') {
      name = this.options.name;
    } else if(typeof this.options.name === 'function') {
      name = await Promise.resolve(this.options.name(this));
    } else if(this.options.name as Promise<string|undefined>) {
      name = await this.options.name;
    } else {
      name = await defaultNameFunction(this);
    }

    if(!this.options.overwrite) {
      name = uniqueFileName(path.join(this.options.dir, name));
    } else {
      name = path.join(this.options.dir, name);
    }

    return name;
  }

  pause() {
    this.response?.pause();
  }

  resume() {
    this.response?.resume();
  }
}