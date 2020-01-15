import { URL } from "url";
import { WebRequest } from "../WebRequest";

export interface DownloadOptions {

}

export async function download(target: string | URL, options?: DownloadOptions) {
  let req = new WebRequest(target);
  let res = await req.exec()
}