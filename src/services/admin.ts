import { get, post } from './tools';

export async function login(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/login',
    body,
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

export async function getPermissionGroups(params?: any, options?: { [key: string]: any }) {
  return [
    { key: 'setting', name: '后台设置' },
    { key: 'archive', name: '内容管理' },
    { key: 'content', name: '页面资源' },
    { key: 'plugin', name: '功能资源' },
    { key: 'design', name: '模板设计' },
    { key: 'statistic', name: '数据统计' },
    { key: 'account', name: '管理员' },
    { key: 'tool', name: '系统功能' },
  ];
}

export async function getPermissions(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/admin/permissions',
    params,
    options,
  });
}
