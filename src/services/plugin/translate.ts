import { get, post } from '../tools';

export async function pluginGetTranslateConfig(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/plugin/translate/config',
    params,
    options,
  });
}

export async function pluginTranslateLogs(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/plugin/translate/logs',
    params,
    options,
  });
}

export async function pluginSaveTranslateConfig(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/plugin/translate/config',
    body,
    options,
  });
}
