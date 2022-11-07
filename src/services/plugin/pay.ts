import { get, post } from '../tools';

export async function pluginGetPayConfig(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/plugin/pay/config',
    params,
    options,
  });
}

export async function pluginSavePayConfig(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/pay/config',
    body,
    options,
  });
}

export async function pluginPayUploadFile(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/pay/upload',
    body,
    options,
  });
}
