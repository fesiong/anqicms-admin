import React, { useEffect, useState } from 'react';
import ProForm, { ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message, Divider, Modal, Button, Space, Row, Col, Upload } from 'antd';
import {
  pluginBuildHtmlCache,
  pluginCleanHtmlCache,
  pluginGetBuildHtmlCacheStatus,
  pluginGetHtmlCache,
  pluginSaveHtmlCache,
  pluginHtmlCacheUploadFile,
  pluginBuildHtmlIndexCache,
  pluginBuildHtmlCategoryCache,
  pluginBuildHtmlArchiveCache,
  pluginBuildHtmlTagCache,
  pluginHtmlCachePush,
  pluginGetHtmlCachePushStatus,
} from '@/services';
import moment from 'moment';
import HtmlPushLog from './components/pushLog';

let xhr: any = null;
let pushXhr: any = null;

const PluginHtmlCache: React.FC<any> = () => {
  const [status, setStatus] = useState<any>(null);
  const [pushStatus, setPushStatus] = useState<any>(null);
  const [setting, setSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [storageType, setStorageType] = useState<string>('local');
  const [logVisible, setLogVisible] = useState<boolean>(false);
  const [logStatus, setLogStatus] = useState<string>('');

  useEffect(() => {
    getSetting();
    getStatus();
    getPushStatus();
    return () => {
      clearInterval(xhr);
      clearInterval(pushXhr);
    };
  }, []);

  const getSetting = async () => {
    const res = await pluginGetHtmlCache();
    let setting = res.data || {};
    setSetting(setting);
    setStorageType(setting.storage_type);
    setFetched(true);
  };

  const changeStorageType = (e: any) => {
    setStorageType(e.target.value);
  };

  const getStatus = () => {
    pluginGetBuildHtmlCacheStatus().then((res) => {
      setStatus(res.data || null);
      if (!res.data || res.data.finished_time > 0) {
        clearInterval(xhr);
        startCheckPushStatus();
        return;
      }
    });
  };

  const startBuild = () => {
    Modal.confirm({
      title: '确定要生成全站的静态缓存吗？',
      onOk: () => {
        pluginBuildHtmlCache().then((res) => {
          message.info(res.msg);
          getStatus();
          xhr = setInterval(() => {
            getStatus();
          }, 1500);
        });
      },
    });
  };

  const startBuildIndex = () => {
    Modal.confirm({
      title: '确定要生成首页的静态缓存吗？',
      onOk: () => {
        pluginBuildHtmlIndexCache().then((res) => {
          message.info(res.msg);
          getStatus();
          xhr = setInterval(() => {
            getStatus();
          }, 1500);
        });
      },
    });
  };

  const startBuildCategory = () => {
    Modal.confirm({
      title: '确定要生成栏目的静态缓存吗？',
      onOk: () => {
        pluginBuildHtmlCategoryCache().then((res) => {
          message.info(res.msg);
          getStatus();
          xhr = setInterval(() => {
            getStatus();
          }, 1500);
        });
      },
    });
  };

  const startBuildArchive = () => {
    Modal.confirm({
      title: '确定要生成文档的静态缓存吗？',
      onOk: () => {
        pluginBuildHtmlArchiveCache().then((res) => {
          message.info(res.msg);
          getStatus();
          xhr = setInterval(() => {
            getStatus();
          }, 1500);
        });
      },
    });
  };

  const startBuildTag = () => {
    Modal.confirm({
      title: '确定要生成标签的静态缓存吗？',
      onOk: () => {
        pluginBuildHtmlTagCache().then((res) => {
          message.info(res.msg);
          getStatus();
          xhr = setInterval(() => {
            getStatus();
          }, 1500);
        });
      },
    });
  };

  const cleanHtmlCache = () => {
    Modal.confirm({
      title: '确定要清理全站的静态缓存吗？如果缓存文件很多，可能需要花费较长时间。',
      content: '该操作进清理服务器本地缓存文件，无法清理静态服务器文件',
      onOk: () => {
        pluginCleanHtmlCache().then((res) => {
          message.success('清理成功');
        });
      },
    });
  };

  const handleUploadFile = (field: string, e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('name', field);
    const hide = message.loading('正在提交中', 0);
    pluginHtmlCacheUploadFile(formData)
      .then((res) => {
        message.success(res.msg);
        setting[field] = res.data;
        setSetting(Object.assign({}, setting));
      })
      .finally(() => {
        hide();
      });
  };

  const startPushAll = () => {
    Modal.confirm({
      title: '确定要全量推送静态文件到静态服务器吗？',
      content:
        '仅当配置了静态服务器后可用，全量推送需要耗时较长时间，如未进行全局改动可以使用增量推送。',
      onOk: () => {
        pluginHtmlCachePush({
          all: true,
        }).then((res) => {
          message.info(res.msg);
          startCheckPushStatus();
        });
      },
    });
  };

  const startPushUpdate = () => {
    Modal.confirm({
      title: '确定要增量推送静态文件到静态服务器吗？',
      content: '仅当配置了静态服务器后可用，增量推送仅会推送更新的的静态缓存文件。',
      onOk: () => {
        pluginHtmlCachePush({
          all: false,
        }).then((res) => {
          message.info(res.msg);
          startCheckPushStatus();
        });
      },
    });
  };

  const startCheckPushStatus = () => {
    clearInterval(pushXhr);
    pushXhr = setInterval(() => {
      getPushStatus();
    }, 1500);
  };

  const getPushStatus = () => {
    pluginGetHtmlCachePushStatus().then((res) => {
      setPushStatus(res.data || null);
      if (!res.data || res.data.finished_time > 0) {
        clearInterval(pushXhr);
        return;
      }
    });
  };

  const getPushLog = () => {
    setLogStatus('');
    setLogVisible(true);
  };

  const getPushErrorLog = () => {
    setLogStatus('error');
    setLogVisible(true);
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveHtmlCache(values)
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Alert
          style={{ marginBottom: 20 }}
          description={
            <div>
              <p>
                开启静态页面缓存后，会将首页、列表页、详情页缓存起来，加快网站的打开速度，但会需要更多的服务器空间来存储缓存文件。
              </p>
              <p>
                如果需要启用静态网站，则需要模板类型为自适应模板才行。开启静态网站需要填写静态网站服务器信息，通信成功后系统会自动传输静态页面到静态网站服务器。
              </p>
              <p>
                启用静态网站前，<span className="text-red">需要先开启静态页面缓存</span>
                。启用静态网站后，搜索、留言、评论、301跳转等需要提交数据到后台的功能，均会失效，网站仅有展示效果。
              </p>
              <div>
                启用静态网站后，以下的操作不会自动重新生成，需要手动执行静态页面生成操作：
                <span className="text-red">调整了模板（修改模板、启用模板）</span>、
                <span className="text-red">
                  修改后台设置（全局设置、内容设置、联系方式、导航等）
                </span>
                、<span className="text-red">修改了伪静态规则</span>、
                <span className="text-red">其它影响全局的改动</span>
              </div>
            </div>
          }
        />
        {fetched && (
          <ProForm initialValues={setting} onFinish={onSubmit} title="静态页面缓存">
            <Row gutter={16}>
              <Col sm={10} xs={24}>
                <ProFormRadio.Group
                  name={'open'}
                  label="是否开启静态页面缓存"
                  options={[
                    { label: '关闭', value: false },
                    { label: '开启', value: true },
                  ]}
                />

                <ProFormDigit
                  name="index_cache"
                  label="首页缓存时间"
                  wrapperCol={{ span: 12 }}
                  fieldProps={{ addonAfter: '秒' }}
                  extra="如果填写0秒，则不缓存"
                />
                <ProFormDigit
                  name="category_cache"
                  label="列表缓存时间"
                  wrapperCol={{ span: 12 }}
                  fieldProps={{ addonAfter: '秒' }}
                  extra="如果填写0秒，则不缓存"
                />
                <ProFormDigit
                  name="detail_cache"
                  label="详情缓存时间"
                  wrapperCol={{ span: 12 }}
                  fieldProps={{ addonAfter: '秒' }}
                  extra="如果填写0秒，则不缓存"
                />
              </Col>
              <Col sm={10} xs={24}>
                <ProFormRadio.Group
                  name="storage_type"
                  label="静态网站服务器"
                  fieldProps={{
                    onChange: changeStorageType,
                  }}
                  options={[
                    {
                      value: '',
                      label: '关闭',
                    },
                    {
                      value: 'aliyun',
                      label: '阿里云存储',
                    },
                    {
                      value: 'tencent',
                      label: '腾讯云存储',
                    },
                    {
                      value: 'qiniu',
                      label: '七牛云存储',
                    },
                    {
                      value: 'upyun',
                      label: '又拍云存储',
                    },
                    {
                      value: 'ftp',
                      label: 'FTP传输',
                    },
                    {
                      value: 'ssh',
                      label: 'SFTP(SSH)传输',
                    },
                  ]}
                />
                <ProFormText
                  name="storage_url"
                  label="静态网站地址"
                  placeholder="如：https://www.anqicms.com"
                />
                <div className={storageType != 'aliyun' ? 'hidden' : ''}>
                  <Divider>阿里云存储</Divider>
                  <ProFormText
                    name="aliyun_endpoint"
                    label="阿里云节点"
                    placeholder="例如：http://oss-cn-hangzhou.aliyuncs.com"
                  />
                  <ProFormText
                    name="aliyun_access_key_id"
                    label="阿里云AccessKeyId"
                    placeholder=""
                  />
                  <ProFormText
                    name="aliyun_access_key_secret"
                    label="阿里云AccessKeySecret"
                    placeholder=""
                  />
                  <ProFormText name="aliyun_bucket_name" label="阿里云存储桶名称" placeholder="" />
                </div>
                <div className={storageType != 'tencent' ? 'hidden' : ''}>
                  <Divider>腾讯云存储</Divider>
                  <ProFormText name="tencent_secret_id" label="腾讯云SecretId" placeholder="" />
                  <ProFormText name="tencent_secret_key" label="腾讯云SecretKey" placeholder="" />
                  <ProFormText
                    name="tencent_bucket_url"
                    label="腾讯云存储桶地址"
                    placeholder="例如：https://aa-1257021234.cos.ap-guangzhou.myqcloud.com"
                  />
                </div>
                <div className={storageType != 'qiniu' ? 'hidden' : ''}>
                  <Divider>七牛云存储</Divider>
                  <ProFormText name="qiniu_access_key" label="七牛云AccessKey" placeholder="" />
                  <ProFormText name="qiniu_secret_key" label="七牛云SecretKey" placeholder="" />
                  <ProFormText
                    name="qiniu_bucket"
                    label="七牛云存储桶名称"
                    placeholder="例如：anqicms"
                  />
                  <ProFormRadio.Group
                    name="qiniu_region"
                    label="七牛云存储区域"
                    options={[
                      {
                        value: 'z0',
                        label: '华东',
                      },
                      {
                        value: 'z1',
                        label: '华北',
                      },
                      {
                        value: 'z2',
                        label: '华南',
                      },
                      {
                        value: 'na0',
                        label: '北美',
                      },
                      {
                        value: 'as0',
                        label: '东南亚',
                      },
                      {
                        value: 'cn-east-2',
                        label: '华东-浙江2',
                      },
                      {
                        value: 'fog-cn-east-1',
                        label: '雾存储华东区',
                      },
                    ]}
                  />
                </div>
                <div className={storageType != 'upyun' ? 'hidden' : ''}>
                  <Divider>又拍云存储</Divider>
                  <ProFormText name="upyun_operator" label="又拍云操作员" placeholder="" />
                  <ProFormText name="upyun_password" label="又拍云操作员密码" placeholder="" />
                  <ProFormText name="upyun_bucket" label="又拍云存服务名称" placeholder="" />
                </div>
                <div className={storageType != 'ftp' ? 'hidden' : ''}>
                  <Divider>FTP传输</Divider>
                  <p>注意：经测试，宝塔自带的PureFtp无法正常使用。</p>
                  <ProFormText name="ftp_host" label="FTP IP地址" placeholder="" />
                  <ProFormDigit name="ftp_port" label="FTP 端口" placeholder="" />
                  <ProFormText name="ftp_username" label="FTP 用户名" placeholder="" />
                  <ProFormText name="ftp_password" label="FTP 密码" placeholder="" />
                  <ProFormText name="ftp_webroot" label="FTP 上传根目录" placeholder="" />
                </div>
                <div className={storageType != 'ssh' ? 'hidden' : ''}>
                  <Divider>SFTP(SSH)传输</Divider>
                  <ProFormText name="ssh_host" label="SSH IP地址" placeholder="" />
                  <ProFormDigit name="ssh_port" label="SSH 端口" placeholder="" />
                  <ProFormText name="ssh_username" label="SSH 用户名" placeholder="" />
                  <ProFormText name="ssh_password" label="SSH 密码" placeholder="" />
                  <ProFormText label="或SSH 密钥" extra="如果你的SSH服务器是使用密钥登录，请上传">
                    <Upload
                      name="file"
                      className="logo-uploader"
                      showUploadList={false}
                      accept=".crt,.pem,.key"
                      customRequest={async (e) => handleUploadFile('ssh_private_key', e)}
                    >
                      <Button type="primary">上传文件</Button>
                    </Upload>
                    {setting.ssh_private_key && (
                      <div className="upload-file">{setting.ssh_private_key}</div>
                    )}
                  </ProFormText>
                  <ProFormText name="ssh_webroot" label="SSH 上传根目录" placeholder="" />
                </div>
              </Col>
            </Row>
          </ProForm>
        )}
        <Divider>生成操作</Divider>
        <div>
          <p>
            上次手动生成时间：
            {setting.last_build_time > 0
              ? moment(setting.last_build_time * 1000).format('YYYY-MM-DD')
              : '未手动生成过'}
          </p>
          <Space className="space-wrap" size={20}>
            <Button onClick={() => cleanHtmlCache()}>清理所有缓存</Button>
            <Button onClick={() => startBuild()}>手动生成所有缓存</Button>
            <Button onClick={() => startBuildIndex()}>手动生成首页缓存</Button>
            <Button onClick={() => startBuildCategory()}>手动生成栏目缓存</Button>
            <Button onClick={() => startBuildArchive()}>手动生成文档缓存</Button>
            <Button onClick={() => startBuildTag()}>手动生成标签缓存</Button>
          </Space>
        </div>
        <Divider>静态服务器操作</Divider>
        <p>
          上次手动推送时间：
          {setting.last_push_time > 0
            ? moment(setting.last_push_time * 1000).format('YYYY-MM-DD')
            : '未手动推送过'}
        </p>
        <div>
          <Space className="space-wrap" size={20}>
            <Button onClick={() => startPushAll()}>全量推送静态文件到静态服务器</Button>
            <Button onClick={() => startPushUpdate()}>仅推送更新的文件到静态服务器</Button>
            <Button onClick={() => getPushLog()}>全部推送记录</Button>
            <Button onClick={() => getPushErrorLog()}>推送错误记录</Button>
          </Space>
        </div>
        {(status || pushStatus) && (
          <Row gutter={16}>
            {status && (
              <Col sm={12} xs={24}>
                <div>
                  <Divider>生成进度</Divider>
                  <Space direction="vertical" size={10}>
                    <div className="field-item">
                      <div className="field-label">开始时间：</div>
                      <div className="field-value">
                        {moment(status.start_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">完成时间：</div>
                      <div className="field-value">
                        {status.finished_time > 0
                          ? moment(status.finished_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                          : '未完成'}
                      </div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">已发现数量：</div>
                      <div className="field-value">{status.total}</div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">已处理数量：</div>
                      <div className="field-value">{status.finished_count}</div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">当前执行任务：</div>
                      <div className="field-value">{status.current}</div>
                    </div>
                    {status.error_msg && (
                      <div className="field-item">
                        <div className="field-label">错误信息：</div>
                        <div className="field-value">{status.error_msg}</div>
                      </div>
                    )}
                  </Space>
                </div>
              </Col>
            )}
            {pushStatus && (
              <Col sm={12} xs={24}>
                <div>
                  <Divider>推送进度</Divider>
                  <Space direction="vertical" size={10}>
                    <div className="field-item">
                      <div className="field-label">开始时间：</div>
                      <div className="field-value">
                        {moment(pushStatus.start_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">完成时间：</div>
                      <div className="field-value">
                        {pushStatus.finished_time > 0
                          ? moment(pushStatus.finished_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                          : '未完成'}
                      </div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">已发现数量：</div>
                      <div className="field-value">{pushStatus.total}</div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">已处理数量：</div>
                      <div className="field-value">{pushStatus.finished_count}</div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">错误数量：</div>
                      <div className="field-value">{pushStatus.error_count}</div>
                    </div>
                    <div className="field-item">
                      <div className="field-label">当前执行任务：</div>
                      <div className="field-value">{pushStatus.current}</div>
                    </div>
                    {pushStatus.error_msg && (
                      <div className="field-item">
                        <div className="field-label">错误信息：</div>
                        <div className="field-value">{pushStatus.error_msg}</div>
                      </div>
                    )}
                  </Space>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Card>
      {logVisible && (
        <HtmlPushLog
          visible={logVisible}
          status={logStatus}
          storageUrl={setting.storage_url}
          onCancel={() => {
            setLogVisible(false);
          }}
        />
      )}
    </PageHeaderWrapper>
  );
};

export default PluginHtmlCache;
