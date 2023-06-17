import { get, post } from '../tools';

export async function pluginGetHtmlCache(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/plugin/htmlcache/config',
    params,
    options,
  });
}

export async function pluginSaveHtmlCache(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/htmlcache/config',
    body,
    options,
  });
}

export async function pluginBuildHtmlCache(body?: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/htmlcache/build',
    body,
    options,
  });
}

export async function pluginGetBuildHtmlCacheStatus(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/plugin/htmlcache/build/status',
    params,
    options,
  });
}

export async function pluginCleanHtmlCache(body?: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/htmlcache/clean',
    body,
    options,
  });
}
