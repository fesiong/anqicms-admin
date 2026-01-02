import { get, post } from './tools';

export async function anqiLogin(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/login',
    body,
    options,
  });
}

export async function getAnqiInfo(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/anqi/info',
    params,
    options,
  });
}

export async function checkAnqiInfo(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/anqi/check',
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

export async function anqiShareTemplate(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/template/share',
    body,
    options,
  });
}

export async function anqiDownloadTemplate(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/template/download',
    body,
    options,
  });
}

export async function anqiSendFeedback(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/feedback',
    body,
    options,
  });
}

export async function anqiRestart(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/restart',
    body,
    options,
  });
}

export async function anqiTranslateArchive(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/translate',
    body,
    options,
  });
}

export async function anqiAiPseudoArchive(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/ai/pseudo',
    body,
    options,
  });
}

export async function anqiAiGenerateStream(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/ai/stream',
    body,
    options,
  });
}

export async function anqiAiGenerateStreamData(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/anqi/ai/stream/data',
    params,
    options,
  });
}

export async function anqiAiChat(body: any, options?: { [key: string]: any }) {
  return post({
    url: '/anqi/ai/chat',
    body,
    options,
  });
}

export async function anqiAiImageGenerate(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/ai/image',
    body,
    options,
  });
}

export async function anqiAiImageConfirm(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/ai/image/confirm',
    body,
    options,
  });
}

export async function anqiAiImageHistories(
  params?: any,
  options?: { [key: string]: any },
) {
  return get({
    url: '/anqi/ai/image/histories',
    params,
    options,
  });
}

export async function anqiExtractDescription(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/extract/description',
    body,
    options,
  });
}

export async function anqiExtractKeywords(
  body: any,
  options?: { [key: string]: any },
) {
  return post({
    url: '/anqi/extract/keywords',
    body,
    options,
  });
}
