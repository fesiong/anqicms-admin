import { get, post } from './tools';

export async function login(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/login',
    body,
    options,
  });
}

export async function getAdminList(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/list',
    params,
    options,
  });
}

export async function getAdminInfo(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/detail',
    params,
    options,
  });
}

export async function deleteAdminInfo(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/admin/delete',
    body,
    options,
  });
}

export async function getAdminLoginLogs(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/logs/login',
    params,
    options,
  });
}

export async function getAdminActionLogs(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/logs/action',
    params,
    options,
  });
}

export async function saveAdmin(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/admin/detail',
    body,
    options,
  });
}

export async function getCaptcha(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/captcha',
    params,
    options,
  });
}

export async function getPermissionMenus(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/menus',
    params,
    options,
  });
}

export async function getAdminGroups(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/group/list',
    params,
    options,
  });
}

export async function getAdminGroupInfo(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/group/detail',
    params,
    options,
  });
}

export async function saveAdminGroupInfo(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/admin/group/detail',
    body,
    options,
  });
}

export async function deleteAdminGroupInfo(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/admin/group/delete',
    body,
    options,
  });
}
