import { IncomingMessage } from "http";
import { WebRequest } from "./WebRequest";

export interface IWebResponseOptions {
  request?: WebRequest
}

const defaultOptions: IWebResponseOptions = {
}

export class WebResponseOptions implements IWebResponseOptions {
  request?: WebRequest;

  constructor(props?: IWebResponseOptions) {
    if(props === undefined)
      props = defaultOptions;

    this.request = props.request;
  }
}

export class WebResponse {
  message: IncomingMessage;
  options: WebResponseOptions;

  constructor(message: IncomingMessage, options?: IWebResponseOptions) {
    this.message = message;
    this.options = new WebResponseOptions(options);
  }
}