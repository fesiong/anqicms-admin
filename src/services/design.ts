import { get, post } from './tools';

export async function getDesignList(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/list',
    params,
    options,
  });
}

export async function getDesignInfo(
  params: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/info',
    params,
    options,
  });
}

export async function saveDesignInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/save',
    body,
    options,
  });
}

export async function activeDesignInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/use',
    body,
    options,
  });
}

export async function deleteDesignInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/delete',
    body,
    options,
  });
}

export async function checkUploadDesignInfo(
  params: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/upload/check',
    params,
    options,
  });
}

export async function UploadDesignInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/upload',
    body,
    options,
  });
}

export async function getDesignFileInfo(
  params: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/file/info',
    params,
    options,
  });
}

export async function getDesignFileHistories(
  params: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/file/histories',
    params,
    options,
  });
}

export async function getDesignFileHistoryInfo(
  params: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/file/history/info',
    params,
    options,
  });
}

export async function getDesignTemplateFiles(
  params: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/file/templates',
    params,
    options,
  });
}

export async function deleteDesignHistoryFile(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/file/history/delete',
    body,
    options,
  });
}

export async function restoreDesignFileInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/file/restore',
    body,
    options,
  });
}

export async function saveDesignFileInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/file/save',
    body,
    options,
  });
}

export async function copyDesignFileInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/file/copy',
    body,
    options,
  });
}

export async function deleteDesignFileInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/file/delete',
    body,
    options,
  });
}

export async function UploadDesignFileInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/file/upload',
    body,
    options,
  });
}

export async function getDesignDocs(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/docs',
    params,
    options,
  });
}

export async function getDesignTplHelpers(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/design/helpers',
    params,
    options,
  });
}

export async function restoreDesignData(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/data/restore',
    body,
    options,
  });
}

export async function backupDesignData(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/design/data/backup',
    body,
    options,
  });
}
