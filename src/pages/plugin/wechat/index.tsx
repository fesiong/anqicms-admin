import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import { pluginGetWechatConfig, pluginSaveWechatConfig } from '@/services';

const PluginWechat: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);

  const getSetting = async () => {
    const res = await pluginGetWechatConfig();
    setSetting(res.data || null);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveWechatConfig(values)
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
        {setting && (
          <ProForm initialValues={setting} onFinish={onSubmit} title="微信服务号配置">
            <ProFormText name="app_id" label="服务号AppID" width="lg" />
            <ProFormText name="app_secret" label="服务号AppSecret" width="lg" />
            <ProFormText name="token" label="服务号Token" width="lg" />
            <ProFormText name="encoding_aes_key" label="服务号EncodingAESKey" width="lg" />
          </ProForm>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginWechat;
