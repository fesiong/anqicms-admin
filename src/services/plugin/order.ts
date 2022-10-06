import { get, post } from '../tools';

export async function pluginGetPayConfig(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/plugin/order/pay/config',
    params,
    options,
  });
}

export async function pluginSavePayConfig(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/pay/config',
    body,
    options,
  });
}

export async function pluginPayUploadFile(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/pay/upload',
    body,
    options,
  });
}

export async function pluginGetOrders(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/plugin/order/list',
    params,
    options,
  });
}

export async function pluginGetOrderInfo(params?: any, options?: { [key: string]: any }) {
  return get({
    url: '/plugin/order/detail',
    params,
    options,
  });
}

export async function pluginSetOrderDelivery(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/deliver',
    body,
    options,
  });
}

export async function pluginSetOrderFinished(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/finished',
    body,
    options,
  });
}

export async function pluginSetOrderCanceled(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/canceled',
    body,
    options,
  });
}

export async function pluginSetOrderRefund(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/refund',
    body,
    options,
  });
}

export async function pluginExportOrder(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/plugin/order/export',
    body,
    options,
  });
}
