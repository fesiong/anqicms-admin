// 配置文件

let host = '/system/api';
if (process.env.NODE_ENV === 'development') {
  host = 'http://127.0.0.1:8888/system/api';
}

const config = {
  baseUrl: host,
};

export default config;
