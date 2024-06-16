import { pluginGetWechatConfig, pluginSaveWechatConfig } from '@/services';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Divider, Tag, message } from 'antd';
import React, { useState } from 'react';

const PluginWechatSetting: React.FC<any> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveWechatConfig(values)
      .then((res) => {
        message.success(res.msg);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      <ModalForm
        width={600}
        open={visible}
        request={async () => {
          const res = await pluginGetWechatConfig();
          return res.data || null;
        }}
        onOpenChange={(flag) => {
          setVisible(flag);
        }}
        onFinish={onSubmit}
        title="微信服务号配置"
      >
        <ProFormText name="server_url" label="服务器地址" width="lg" readonly />
        <ProFormText name="app_id" label="服务号AppID" width="lg" />
        <ProFormText name="app_secret" label="服务号AppSecret" width="lg" />
        <ProFormText name="token" label="服务号Token" width="lg" />
        <ProFormText
          name="encoding_aes_key"
          label="服务号EncodingAESKey"
          width="lg"
          extra="如果消息加解密方式选择的是明文模式，请不要填写这里，否则会报错"
        />
        <Divider>验证码配置</Divider>
        <ProFormText
          name="verify_key"
          label="验证码关键词"
          width="lg"
          placeholder="默认：验证码"
          extra="用户回复这个关键词就可以获得验证码"
        />
        <ProFormText
          name="verify_msg"
          label="验证码信息模板"
          width="lg"
          placeholder="默认：验证码：{code}，30分钟内有效"
          extra={
            <div>
              注意：模板需要包含<Tag>{'{code}'}</Tag>
            </div>
          }
        />
      </ModalForm>
    </>
  );
};

export default PluginWechatSetting;
