import { extend } from 'umi-request';
import config from './config';
import { getSessionStore, getStore } from '../utils/store';
import { message } from 'antd';
import { history } from 'umi';
const request = extend({
  prefix: config.baseUrl,
  timeout: 60000,
  requestType: 'json',
  //mode: 'no-cors',
});

request.use(async (ctx, next) => {
  const { req } = ctx;
  const { options } = req;

  const headers: any = {
    Origin: window.location.origin,
  };

  const adminToken = getStore('adminToken');
  if (adminToken) {
    headers.admin = adminToken;
  }
  const siteId = getSessionStore('site-id');
  if (siteId) {
    headers['Site-Id'] = siteId;
  }
  ctx.req.options = {
    ...options,
    headers: headers,
  };

  try {
    await next();
  } catch (err: any) {
    console.log(err);
  }

  const { res } = ctx;

  if (res?.code === 1001) {
    //需要登录
    message.warning({
      content: res.msg,
      key: 'error',
      style: { marginTop: '50px' },
    });
    history.push('/login');
    return Promise.reject(res);
  } else if (res?.code === 1002) {
    //需要登录
    message.warning({
      content: res.msg,
      key: 'error',
      style: { marginTop: '50px' },
    });
    return Promise.reject(res);
  }
});

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({ url = '', params = {}, options = {} }) => {
  return request
    .get(url, { params: params, ...options })
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
};

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url = '', body = {}, options = {} }) => {
  return request
    .post(url, { data: body, ...options })
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
};

export const put = ({ url = '', body = {}, options = {} }) => {
  return request
    .put(url, { data: body, ...options })
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
};
