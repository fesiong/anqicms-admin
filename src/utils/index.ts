import config from '@/services/config';
import { message } from 'antd';
import SparkMD5 from 'spark-md5';
import { getStore } from './store';

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean => !!permits;

export const queryParams = (params: any) => {
  let _result = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let value = params[key];
      if (value && value.constructor === Array) {
        value.forEach(function (_value) {
          _result.push(key + '=' + _value);
        });
      } else {
        _result.push(key + '=' + value);
      }
    }
  }
  return _result.join('&');
};

export const showNumber = (num: number) => {
  let result: any = '';
  if (num > 100000000) {
    result = (num / 100000000).toFixed(2) + '亿';
  } else if (num > 100000) {
    result = (num / 100000).toFixed(2) + '万';
  } else {
    result = num;
  }

  return result;
};

export const sleep = async (t: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export const sizeFormat = (num: number) => {
  let result: any = '';
  if (num > 1000000) {
    result = (num / 1048576).toFixed(2) + 'MB';
  } else if (num > 500) {
    result = (num / 1024).toFixed(2) + 'KB';
  } else {
    result = num + 'B';
  }

  return result;
};

// 只支持csv，excel
export const exportFile = (
  titles: string[],
  data: any[][],
  fileType?: string,
) => {
  let type = fileType || 'csv';

  let textType = {
      csv: 'text/csv',
      xls: 'application/vnd.ms-excel',
    }[type],
    alink = document.createElement('a');

  alink.href =
    'data:' +
    textType +
    ';charset=utf-8,\ufeff' +
    encodeURIComponent(
      (function () {
        let content = '';
        if (type === 'csv') {
          content = titles.join(',') + '\r\n' + data.join('\r\n');
        } else {
          content += '<table border=1><thead><tr>';
          //表头
          for (let item of titles) {
            content += '<th>' + item + '</th>';
          }
          content += '</tr></thead>';
          //表体
          content += '<tbody>';
          for (let item of data) {
            content += '<tr>';
            for (let val of item) {
              content += '<td>' + val + '</td>';
            }
            content += '</tr>';
          }
          content += '</tbody>';
          content += '<table>';
        }

        return content;
      })(),
    );

  alink.download = 'table_' + new Date().getTime() + '.' + type;
  document.body.appendChild(alink);
  alink.click();
  document.body.removeChild(alink);
};

export const removeHtmlTag = (tag: string) => {
  let str = tag
    .replace(/<style[\S\s]+?<\/style>/g, '')
    .replace(/<script[\S\s]+?<\/script>/g, '')
    .replace(/<\/[\S\s]+?>/g, '\n')
    .replace(/<[\S\s]+?>/g, '');
  str = str
    .replaceAll(' ', ' ')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&ensp;', ' ')
    .replaceAll('&emsp;', ' ');
  str = str
    .replace(/(\n *){2,}/g, '\n')
    .replace(/[ ]{2,}/g, ' ')
    .trim();

  return str;
};

export const getWordsCount = function (str: string) {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    let ch = str.charCodeAt(i);
    if (ch > 255) {
      // 中文字符集
      n += 2;
    } else {
      n++;
    }
  }
  return n;
};

export const case2Camel = function (str: string) {
  return str
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    .replaceAll(' ', '');
};

export const downloadFile = (url: string, params?: any, newName?: string) => {
  //强制等待1秒钟
  let hide = message.loading('正在下载中');

  let headers = {
    admin: getStore('adminToken'),
    'Content-Type': 'application/json',
  };
  let fileName = newName || 'file';
  return fetch(config.baseUrl + url, {
    headers: headers,
    method: 'post',
    body: JSON.stringify(params),
  })
    .then((res: any) => {
      if (res.status !== 200) {
        message.destroy();
        message.error('文件打包失败' + res.statusText);
        return;
      }
      let tmpName = res.headers
        .get('Content-Disposition')
        ?.split(';')[1]
        ?.split('filename')[1];
      if (tmpName) {
        if (tmpName.indexOf("'") !== -1) {
          tmpName = tmpName.substring(tmpName.lastIndexOf("'") + 1);
        }
        tmpName = tmpName.substring(tmpName.lastIndexOf('=') + 1);
        fileName = tmpName;
      }
      res
        .blob()
        .then((blob: any) => {
          if (blob.type === 'application/json') {
            //json 报错了
            let reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = () => {
              let data = JSON.parse(reader.result as string);
              message.error(data.msg);
            };
            return;
          }
          let a = document.createElement('a');
          let blobUrl = window?.URL?.createObjectURL(blob);
          a.href = blobUrl;
          a.download = fileName + '';
          a.click();
          window?.URL?.revokeObjectURL(blobUrl);
        })
        .catch((err: any) => {
          console.log(err);
          message.destroy();
          message.error('文件打包失败' + err);
        });
    })
    .finally(() => {
      hide();
      return Promise.resolve({});
    });
};

export const calculateFileMd5 = (file: any) => {
  return new Promise((resolve, reject) => {
    const chunkSize = 2 * 1024 * 1024; // 每个分片大小 2MB
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(file.slice(start, end));
    };

    fileReader.onload = (e: any) => {
      spark.append(e.target.result); // 向 MD5 对象添加数据
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext(); // 继续读取下一个分片
      } else {
        const md5Value = spark.end(); // 计算最终的 MD5
        resolve(md5Value);
      }
    };

    fileReader.onerror = () => {
      reject('File reading error');
    };

    loadNext(); // 开始读取第一个分片
  });
};

export const supportLanguages = [
  {
    cn: '英语',
    value: 'en',
    label: 'en',
  },
  {
    cn: '简体中文',
    value: 'zh-cn',
    label: 'zh-cn',
  },
  {
    cn: '繁体中文',
    value: 'zh-tw',
    label: 'zh-tw',
  },
  {
    cn: '越南语',
    value: 'vi',
    label: 'vi',
  },
  {
    cn: '印尼语',
    value: 'id',
    label: 'id',
  },
  {
    cn: '印地语',
    value: 'hi',
    label: 'hi',
  },
  {
    cn: '意大利语',
    value: 'it',
    label: 'it',
  },
  {
    cn: '希腊语',
    value: 'el',
    label: 'el',
  },
  {
    cn: '西班牙语',
    value: 'es',
    label: 'es',
  },
  {
    cn: '葡萄牙语',
    value: 'pt',
    label: 'pt',
  },
  {
    cn: '塞尔维亚语',
    value: 'sr',
    label: 'sr',
  },
  {
    cn: '缅甸语',
    value: 'my',
    label: 'my',
  },
  {
    cn: '孟加拉语',
    value: 'bn',
    label: 'bn',
  },
  {
    cn: '泰语',
    value: 'th',
    label: 'th',
  },
  {
    cn: '土耳其语',
    value: 'tr',
    label: 'tr',
  },
  {
    cn: '日语',
    value: 'ja',
    label: 'ja',
  },
  {
    cn: '老挝语',
    value: 'lo',
    label: 'lo',
  },
  {
    cn: '韩语',
    value: 'ko',
    label: 'ko',
  },
  {
    cn: '俄语',
    value: 'ru',
    label: 'ru',
  },
  {
    cn: '法语',
    value: 'fr',
    label: 'fr',
  },
  {
    cn: '德语',
    value: 'de',
    label: 'de',
  },
  {
    cn: '波斯语',
    value: 'fa',
    label: 'fa',
  },
  {
    cn: '阿拉伯语',
    value: 'ar',
    label: 'ar',
  },
  {
    cn: '马来语',
    value: 'ms',
    label: 'ms',
  },
  {
    cn: '爪哇语',
    value: 'jw',
    label: 'jw',
  },
  {
    cn: '泰卢固语',
    value: 'te',
    label: 'te',
  },
  {
    cn: '泰米尔语',
    value: 'ta',
    label: 'ta',
  },
  {
    cn: '马拉地语',
    value: 'mr',
    label: 'mr',
  },
  {
    cn: '乌尔都语',
    value: 'ur',
    label: 'ur',
  },
  {
    cn: '波兰语',
    value: 'pl',
    label: 'pl',
  },
  {
    cn: '乌克兰语',
    value: 'uk',
    label: 'uk',
  },
  {
    cn: '旁遮普语',
    value: 'pa',
    label: 'pa',
  },
  {
    cn: '罗马尼亚语',
    value: 'ro',
    label: 'ro',
  },
  {
    cn: '爱沙尼亚语',
    value: 'et',
    label: 'et',
  },
  {
    cn: '奥塞梯语',
    value: 'os',
    label: 'os',
  },
  {
    cn: '白俄罗斯语',
    value: 'be',
    label: 'be',
  },
  {
    cn: '保加利亚语',
    value: 'bg',
    label: 'bg',
  },
  {
    cn: '冰岛语',
    value: 'is',
    label: 'is',
  },
  {
    cn: '波斯尼亚语',
    value: 'bs',
    label: 'bs',
  },
  {
    cn: '藏语',
    value: 'bo',
    label: 'bo',
  },
  {
    cn: '丹麦语',
    value: 'da',
    label: 'da',
  },
  {
    cn: '菲律宾语',
    value: 'tl',
    label: 'tl',
  },
  {
    cn: '芬兰语',
    value: 'fi',
    label: 'fi',
  },
  {
    cn: '瑞典语',
    value: 'sv',
    label: 'sv',
  },
  {
    cn: '刚果语',
    value: 'kg',
    label: 'kg',
  },
  {
    cn: '格鲁吉亚语',
    value: 'ka',
    label: 'ka',
  },
  {
    cn: '哈萨克语',
    value: 'kk',
    label: 'kk',
  },
  {
    cn: '荷兰语',
    value: 'nl',
    label: 'nl',
  },
  {
    cn: '吉尔吉斯语',
    value: 'ky',
    label: 'ky',
  },
  {
    cn: '加利西亚语',
    value: 'gl',
    label: 'gl',
  },
  {
    cn: '加泰罗尼亚语',
    value: 'ca',
    label: 'ca',
  },
  {
    cn: '捷克语',
    value: 'cs',
    label: 'cs',
  },
  {
    cn: '卡纳达语',
    value: 'kn',
    label: 'kn',
  },
  {
    cn: '蒙古语',
    value: 'mn',
    label: 'mn',
  },
  {
    cn: '克罗地亚语',
    value: 'hr',
    label: 'hr',
  },
  {
    cn: '拉脱维亚语',
    value: 'lv',
    label: 'lv',
  },
  {
    cn: '立陶宛语',
    value: 'lt',
    label: 'lt',
  },
  {
    cn: '挪威语',
    value: 'no',
    label: 'no',
  },
  {
    cn: '尼泊尔语',
    value: 'ne',
    label: 'ne',
  },
  {
    cn: '普什图语',
    value: 'ps',
    label: 'ps',
  },
  {
    cn: '斯洛伐克语',
    value: 'sk',
    label: 'sk',
  },
  {
    cn: '土库曼语',
    value: 'tk',
    label: 'tk',
  },
  {
    cn: '乌兹别克语',
    value: 'uz',
    label: 'uz',
  },
  {
    cn: '希伯来语',
    value: 'iw',
    label: 'iw',
  },
  {
    cn: '匈牙利语',
    value: 'hu',
    label: 'hu',
  },
  {
    cn: '亚美尼亚语',
    value: 'hy',
    label: 'hy',
  },
];
