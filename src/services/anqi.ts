import { get, post } from './tools';

export async function anqiLogin(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/login',
    body,
    options,
  });
}

export async function getAnqiInfo(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/anqi/info',
    params,
    options,
  });
}

export async function anqiUpload(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/upload',
    body,
    options,
  });
}

export async function anqiShareTemplate(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/template/share',
    body,
    options,
  });
}

export async function anqiDownloadTemplate(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/template/download',
    body,
    options,
  });
}
