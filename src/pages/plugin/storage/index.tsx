import React, { useEffect, useState } from 'react';
import ProForm, { ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Button, Card, Divider, message, Upload } from 'antd';
import { pluginGetStorage, pluginSaveStorage, pluginStorageUploadFile } from '@/services';

const PluginStorage: React.FC<any> = (props) => {
  const [pushSetting, setPushSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [storageType, setStorageType] = useState<string>('local');

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await pluginGetStorage();
    let setting = res.data || {};
    setPushSetting(setting);
    setStorageType(setting.storage_type);
    setFetched(true);
  };

  const changeStorageType = (e: any) => {
    console.log(e.target.value);
    setStorageType(e.target.value);
  };

  const handleUploadFile = (field: string, e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('name', field);
    const hide = message.loading('正在提交中', 0);
    pluginStorageUploadFile(formData)
      .then((res) => {
        message.success(res.msg);
        pushSetting[field] = res.data;
        setPushSetting(Object.assign({}, pushSetting));
      })
      .finally(() => {
        hide();
      });
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveStorage(values)
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
        <Alert message="资源存储方式的切换不会自动同步之前已经上传的资源，一般不建议在使用中切换存储方式。" />
        <div className="center-mid-card">
          {fetched && (
            <ProForm onFinish={onSubmit} initialValues={pushSetting}>
              <Divider>基本配置</Divider>
              <ProFormRadio.Group
                name="storage_type"
                label="存储方式"
                fieldProps={{
                  onChange: changeStorageType,
                }}
                options={[
                  {
                    value: 'local',
                    label: '本地存储',
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
                    label: 'FTP存储',
                  },
                  {
                    value: 'ssh',
                    label: 'SFTP(SSH)存储',
                  },
                ]}
              />
              <ProFormText name="storage_url" label="资源地址" placeholder="" />
              <div className={storageType == 'local' ? 'hidden' : ''}>
                <ProFormRadio.Group
                  name="keep_local"
                  label="本地存档"
                  options={[
                    {
                      value: false,
                      label: '不保留',
                    },
                    {
                      value: true,
                      label: '保留',
                    },
                  ]}
                  extra="使用云存储的时候，可以选择保留本地存档"
                />
              </div>
              <div className={storageType != 'aliyun' ? 'hidden' : ''}>
                <Divider>阿里云存储</Divider>
                <ProFormText
                  name="aliyun_endpoint"
                  label="阿里云节点"
                  placeholder="例如：http://oss-cn-hangzhou.aliyuncs.com"
                />
                <ProFormText name="aliyun_access_key_id" label="阿里云AccessKeyId" placeholder="" />
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
                <Divider>FTP存储</Divider>
                <p>注意：经测试，宝塔自带的PureFtp无法正常使用。</p>
                <ProFormText name="ftp_host" label="FTP IP地址" placeholder="" />
                <ProFormDigit name="ftp_port" label="FTP 端口" placeholder="" />
                <ProFormText name="ftp_username" label="FTP 用户名" placeholder="" />
                <ProFormText name="ftp_password" label="FTP 密码" placeholder="" />
                <ProFormText name="ftp_webroot" label="FTP 上传根目录" placeholder="" />
              </div>
              <div className={storageType != 'ssh' ? 'hidden' : ''}>
                <Divider>SFTP(SSH)存储</Divider>
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
                  {pushSetting.ssh_private_key && (
                    <div className="upload-file">{pushSetting.ssh_private_key}</div>
                  )}
                </ProFormText>
                <ProFormText name="ssh_webroot" label="SSH 上传根目录" placeholder="" />
              </div>
            </ProForm>
          )}
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginStorage;
