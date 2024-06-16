import { pluginGetWeappConfig, pluginSaveWeappConfig } from '@/services';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Divider, message } from 'antd';
import React from 'react';

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
    <PageContainer>
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
        <Divider>默认小程序</Divider>
        <div>
          <p>
            安企CMS(AnQiCMS)默认小程序，同时支持百度智能小程序，微信小程序，QQ小程序，支付宝小程序，头条小程序。
          </p>
          <p>
            小程序使用帮助：
            <a href="https://www.anqicms.com/help-basic/3495.html" target="_blank">
              https://www.anqicms.com/help-basic/3495.html
            </a>
          </p>
          <p>小程序源码地址：https://github.com/fesiong/anqicms-app/releases</p>
        </div>
        <Button onClick={() => window.open('https://github.com/fesiong/anqicms-app/releases')}>
          下载默认小程序
        </Button>
      </Card>
    </PageContainer>
  );
};

export default PluginWeapp;
