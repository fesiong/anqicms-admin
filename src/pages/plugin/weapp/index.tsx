import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Divider, message } from 'antd';
import { pluginGetWeappConfig, pluginSaveWeappConfig } from '@/services';

const PluginWeapp: React.FC<any> = () => {
  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveWeappConfig(values)
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
        <ProForm
          request={async () => {
            const res = await pluginGetWeappConfig();
            return res.data || [];
          }}
          onFinish={onSubmit}
          title="微信小程序配置"
        >
          <ProFormText name="app_id" label="小程序AppID" width="lg" />
          <ProFormText name="app_secret" label="小程序AppSecret" width="lg" />
          <Divider>消息推送配置</Divider>
          <ProFormText name="server_url" label="服务器地址" width="lg" readonly />
          <ProFormText name="token" label="服务号Token" width="lg" />
          <ProFormText
            name="encoding_aes_key"
            label="服务号EncodingAESKey"
            width="lg"
            extra="如果消息加解密方式选择的是明文模式，请不要填写这里，否则会报错"
          />
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginWeapp;
