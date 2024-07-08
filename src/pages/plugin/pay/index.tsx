import { pluginGetPayConfig, pluginPayUploadFile, pluginSavePayConfig } from '@/services';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Space, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import { FormattedMessage, useIntl } from '@umijs/max';

const PluginPay: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetPayConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
    <PageContainer>
      <Card>
        {fetched && (
          <ProForm title={intl.formatMessage({ id: 'menu.plugin.pay' })} layout="vertical" initialValues={setting} onFinish={onSubmit}>
            <Space size={20} className="pay-tabs">
              <Button type={tabIndex == 0 ? 'primary' : 'default'} onClick={() => setTabIndex(0)}>
                <FormattedMessage id="plugin.pay.wechat" />
              </Button>
              <Button type={tabIndex == 1 ? 'primary' : 'default'} onClick={() => setTabIndex(1)}>
                <FormattedMessage id="plugin.pay.alipay" />
              </Button>
            </Space>
            <div className={'pay-tab ' + (tabIndex == 0 && 'active')}>
              <ProFormText name="wechat_app_id" label={intl.formatMessage({ id: 'plugin.pay.wechat.wechat.appid' })} width="lg" />
              <ProFormText name="wechat_app_secret" label={intl.formatMessage({ id: 'plugin.pay.wechat.wechat.app-secret' })} width="lg" />
              <ProFormText name="weapp_app_id" label={intl.formatMessage({ id: 'plugin.pay.wechat.weapp.appid' })} width="lg" />
              <ProFormText name="weapp_app_secret" label={intl.formatMessage({ id: 'plugin.pay.wechat.weapp.app-secret' })} width="lg" />
              <ProFormText name="wechat_mch_id" label={intl.formatMessage({ id: 'plugin.pay.wechat.mchid' })} width="lg" />
              <ProFormText name="wechat_api_key" label={intl.formatMessage({ id: 'plugin.pay.wechat.apikey' })} width="lg" />
              <ProFormText label={intl.formatMessage({ id: 'plugin.pay.wechat.cert-path' })}>
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('wechat_cert_path', e)}
                >
                  <Button type="primary"><FormattedMessage id="plugin.pay.upload" /></Button>
                </Upload>
                {setting.wechat_cert_path && (
                  <div className="upload-file">{setting.wechat_cert_path}</div>
                )}
              </ProFormText>
              <ProFormText label={intl.formatMessage({ id: 'plugin.pay.wechat.key-path' })}>
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('wechat_key_path', e)}
                >
                  <Button type="primary"><FormattedMessage id="plugin.pay.upload" /></Button>
                </Upload>
                {setting.wechat_key_path && (
                  <div className="upload-file">{setting.wechat_key_path}</div>
                )}
              </ProFormText>
            </div>
            <div className={'pay-tab ' + (tabIndex == 1 && 'active')}>
              <ProFormText name="alipay_app_id" label={intl.formatMessage({ id: 'plugin.pay.alipay.appid' })} width="lg" />
              <ProFormText name="alipay_private_key" label={intl.formatMessage({ id: 'plugin.pay.alipay.private-key' })} width="lg" />
              <ProFormText label={intl.formatMessage({ id: 'plugin.pay.alipay.cert-path' })}>
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('alipay_cert_path', e)}
                >
                  <Button type="primary"><FormattedMessage id="plugin.pay.upload" /></Button>
                </Upload>
                {setting.alipay_cert_path && (
                  <div className="upload-file">{setting.alipay_cert_path}</div>
                )}
              </ProFormText>
              <ProFormText label={intl.formatMessage({ id: 'plugin.pay.alipay.root-cert-path' })}>
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('alipay_root_cert_path', e)}
                >
                  <Button type="primary"><FormattedMessage id="plugin.pay.upload" /></Button>
                </Upload>
                {setting.alipay_root_cert_path && (
                  <div className="upload-file">{setting.alipay_root_cert_path}</div>
                )}
              </ProFormText>
              <ProFormText label={intl.formatMessage({ id: 'plugin.pay.alipay.public-cert-path' })}>
                <Upload
                  name="file"
                  className="logo-uploader"
                  showUploadList={false}
                  accept=".crt,.pem"
                  customRequest={async (e) => handleUploadFile('alipay_public_cert_path', e)}
                >
                  <Button type="primary"><FormattedMessage id="plugin.pay.upload" /></Button>
                </Upload>
                {setting.alipay_public_cert_path && (
                  <div className="upload-file">{setting.alipay_public_cert_path}</div>
                )}
              </ProFormText>
            </div>
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default PluginPay;
