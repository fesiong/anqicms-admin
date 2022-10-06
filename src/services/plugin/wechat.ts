import { get, post } from '../tools';

export async function pluginGetWechatConfig(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/plugin/wechat/config',
    params,
    options,
  });
}

export async function pluginSaveWechatConfig(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/wechat/config',
    body,
    options,
  });
}
