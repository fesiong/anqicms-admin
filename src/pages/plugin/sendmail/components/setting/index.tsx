import React, { useState } from 'react';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

import { pluginGetSendmailSetting, pluginSaveSendmailSetting } from '@/services/plugin/sendmail';
import { message } from 'antd';

export type SendmailSettingProps = {
  onCancel: (flag?: boolean) => void;
};

const SendmailSetting: React.FC<SendmailSettingProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [autoReply, setAutoReply] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    values.port = Number(values.port);
    const hide = message.loading('正在提交中', 0);
    pluginSaveSendmailSetting(values)
      .then((res) => {
        message.info(res.msg);
        setVisible(false);
        props.onCancel();
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
        title={'邮件设置'}
        request={async (params) => {
          let res = await pluginGetSendmailSetting();
          setAutoReply(res.data?.auto_reply || false);
          return res.data;
        }}
        visible={visible}
        layout="horizontal"
        onVisibleChange={(flag) => {
          setVisible(flag);
          if (!flag) {
            props.onCancel(flag);
          }
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <ProFormText name="server" required label="SMTP服务器" extra="如QQ邮箱,为smtp.qq.com" />
        <ProFormRadio.Group
          name="use_ssl"
          label="使用SSL/TLS"
          options={[
            { label: '不使用', value: 0 },
            { label: 'SSL', value: 1 },
            { label: 'TLS', value: 2 },
          ]}
        />
        <ProFormText
          name="port"
          label="SMTP端口"
          extra="默认服务器端口为 25，使用 SSL 协议默认端口为 465, TLS 协议默认端口为 587 ，详细参数请询问邮箱服务商"
        />
        <ProFormText
          name="account"
          label="SMTP帐户"
          extra="默认是邮箱账号，如您的QQ邮箱，如123456@qq.com"
        />
        <ProFormText name="password" label="SMTP密码" extra="在邮箱设置中生成的授权码。" />
        <ProFormText
          name="recipient"
          label="收件人邮箱"
          extra='默认发送给发件人，如果需要发送给其他人，请在这里填写，多个收件人请使用英文逗号","分开。'
        />
        <ProFormRadio.Group
          name="auto_reply"
          label="自动回复客户"
          options={[
            { label: '不回复', value: false },
            { label: '自动回复', value: true },
          ]}
          fieldProps={{
            onChange: (e) => {
              setAutoReply(e.target.value);
            },
          }}
          extra="如果开启了自动回复客户，则在客户留言的时候，自动给客户填写的邮箱发送一封自动回复邮件。"
        />
        {autoReply && (
          <>
            <ProFormText name="reply_subject" label="自动回复标题" extra="请填写自动回复标题" />
            <ProFormTextArea name="reply_message" label="自动回复内容" extra="请填写自动回复内容" />
          </>
        )}
        <ProFormCheckbox.Group
          name="send_type"
          label="发送场景"
          options={[
            { label: '网站有新留言', value: 1 },
            { label: '每日网站日报', value: 2 },
            { label: '网站有新订单', value: 3 },
            { label: '网站有支付订单', value: 4 },
          ]}
          extra="选定后，则会在选定的场景下发送邮件"
        />
      </ModalForm>
    </>
  );
};

export default SendmailSetting;
