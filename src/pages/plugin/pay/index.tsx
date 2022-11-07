import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, message, Space, Upload } from 'antd';
import { pluginGetPayConfig, pluginPayUploadFile, pluginSavePayConfig } from '@/services';
import './index.less';

const PluginPay: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const getSetting = async () => {
    const res = await pluginGetPayConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSavePayConfig(Object.assign(setting, values))
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

  const handleUploadFile = (field: string, e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('name', field);
    const hide = message.loading('正在提交中', 0);
    pluginPayUploadFile(formData)
      .then((res) => {
        message.success(res.msg);
        setting[field] = res.data;
        setSetting(Object.assign({}, setting));
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        {fetched && (
          <ProForm title="支付配置" layout="vertical" initialValues={setting} onFinish={onSubmit}>
            <Space size={20} className="pay-tabs">
              <Button type={tabIndex == 0 ? 'primary' : 'default'} onClick={() => setTabIndex(0)}>
                微信支付
              </Button>
              <Button type={tabIndex == 1 ? 'primary' : 'default'} onClick={() => setTabIndex(1)}>
                支付宝支付
              </Button>
            </Space>
            <div className={'pay-tab ' + (tabIndex == 0 && 'active')}>
              <ProFormText name="wechat_app_id" label="微信服务号AppID" width="lg" />
              <ProFormText name="wechat_app_secret" label="微信服务号AppSecret" width="lg" />
              <ProFormText name="weapp_app_id" label="微信小程序AppID" width="lg" />
              <ProFormText name="weapp_app_secret" label="微信小程序AppSecret" width="lg" />
              <ProFormText name="wechat_mch_id" label="微信商户ID" width="lg" />
              <ProFormText name="wechat_api_key" label="微信商户APIKey" width="lg" />
              <ProFormText label="微信商户证书Cert">
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('wechat_cert_path', e)}
                >
                  <Button type="primary">上传文件</Button>
                </Upload>
                {setting.wechat_cert_path && (
                  <div className="upload-file">{setting.wechat_cert_path}</div>
                )}
              </ProFormText>
              <ProFormText label="微信商户证书Key">
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('wechat_key_path', e)}
                >
                  <Button type="primary">上传文件</Button>
                </Upload>
                {setting.wechat_key_path && (
                  <div className="upload-file">{setting.wechat_key_path}</div>
                )}
              </ProFormText>
            </div>
            <div className={'pay-tab ' + (tabIndex == 1 && 'active')}>
              <ProFormText name="alipay_app_id" label="支付宝AppID" width="lg" />
              <ProFormText name="alipay_private_key" label="支付宝PrivteKey" width="lg" />
              <ProFormText label="应用公钥证书">
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('alipay_cert_path', e)}
                >
                  <Button type="primary">上传文件</Button>
                </Upload>
                {setting.alipay_cert_path && (
                  <div className="upload-file">{setting.alipay_cert_path}</div>
                )}
              </ProFormText>
              <ProFormText label="支付宝根证书">
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('alipay_root_cert_path', e)}
                >
                  <Button type="primary">上传文件</Button>
                </Upload>
                {setting.alipay_root_cert_path && (
                  <div className="upload-file">{setting.alipay_root_cert_path}</div>
                )}
              </ProFormText>
              <ProFormText label="支付宝公钥证书">
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('alipay_public_cert_path', e)}
                >
                  <Button type="primary">上传文件</Button>
                </Upload>
                {setting.alipay_public_cert_path && (
                  <div className="upload-file">{setting.alipay_public_cert_path}</div>
                )}
              </ProFormText>
            </div>
          </ProForm>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginPay;
