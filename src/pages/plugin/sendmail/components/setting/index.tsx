import {
  pluginGetSendmailSetting,
  pluginSaveSendmailSetting,
} from '@/services/plugin/sendmail';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';

export type SendmailSettingProps = {
  onCancel: (flag?: boolean) => void;
  children?: React.ReactNode;
};

const SendmailSetting: React.FC<SendmailSettingProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [autoReply, setAutoReply] = useState<boolean>(false);
  const [signupVerify, setSignupVerify] = useState<boolean>(false);
  const intl = useIntl();

  const handleSubmit = async (values: any) => {
    values.port = Number(values.port);
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
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
        title={intl.formatMessage({ id: 'plugin.sendmail.setting' })}
        request={async () => {
          let res = await pluginGetSendmailSetting();
          setAutoReply(res.data?.auto_reply || false);
          setSignupVerify(res.data?.signup_verify || false);
          return res.data;
        }}
        open={visible}
        layout="horizontal"
        onOpenChange={(flag) => {
          setVisible(flag);
          if (!flag) {
            props.onCancel(flag);
          }
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <ProFormText
          name="server"
          required
          label={intl.formatMessage({ id: 'plugin.sendmail.server' })}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.server.description',
          })}
        />
        <ProFormRadio.Group
          name="use_ssl"
          label={intl.formatMessage({ id: 'plugin.sendmail.use-ssl' })}
          options={[
            {
              label: intl.formatMessage({ id: 'plugin.sendmail.use-ssl.no' }),
              value: 0,
            },
            { label: 'SSL', value: 1 },
            { label: 'TLS', value: 2 },
          ]}
        />
        <ProFormText
          name="port"
          label={intl.formatMessage({ id: 'plugin.sendmail.port' })}
          extra={intl.formatMessage({ id: 'plugin.sendmail.port.description' })}
        />
        <ProFormText
          name="account"
          label={intl.formatMessage({ id: 'plugin.sendmail.account' })}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.account.description',
          })}
        />
        <ProFormText
          name="password"
          label={intl.formatMessage({ id: 'plugin.sendmail.password' })}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.password.description',
          })}
        />
        <ProFormText
          name="recipient"
          label={intl.formatMessage({ id: 'plugin.sendmail.recipient' })}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.recipient.description',
          })}
        />
        <ProFormRadio.Group
          name="auto_reply"
          label={intl.formatMessage({ id: 'plugin.sendmail.auto-reply' })}
          options={[
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.auto-reply.no',
              }),
              value: false,
            },
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.auto-reply.yes',
              }),
              value: true,
            },
          ]}
          fieldProps={{
            onChange: (e) => {
              setAutoReply(e.target.value);
            },
          }}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.auto-reply.description',
          })}
        />
        {autoReply && (
          <>
            <ProFormText
              name="reply_subject"
              label={intl.formatMessage({
                id: 'plugin.sendmail.auto-reply.title',
              })}
              extra={intl.formatMessage({
                id: 'plugin.sendmail.auto-reply.title.description',
              })}
            />
            <ProFormTextArea
              name="reply_message"
              label={intl.formatMessage({
                id: 'plugin.sendmail.auto-reply.message',
              })}
              extra={intl.formatMessage({
                id: 'plugin.sendmail.auto-reply.message.description',
              })}
            />
          </>
        )}
        <ProFormCheckbox.Group
          name="send_type"
          label={intl.formatMessage({ id: 'plugin.sendmail.send-type' })}
          options={[
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.send-type.guestbook',
              }),
              value: 1,
            },
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.send-type.report',
              }),
              value: 2,
            },
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.send-type.new-order',
              }),
              value: 3,
            },
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.send-type.pay-order',
              }),
              value: 4,
            },
          ]}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.send-type.description',
          })}
        />
        <ProFormRadio.Group
          name="signup_verify"
          label={intl.formatMessage({ id: 'plugin.sendmail.signup-verify' })}
          options={[
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.signup-verify.no',
              }),
              value: false,
            },
            {
              label: intl.formatMessage({
                id: 'plugin.sendmail.signup-verify.yes',
              }),
              value: true,
            },
          ]}
          fieldProps={{
            onChange: (e) => {
              setSignupVerify(e.target.value);
            },
          }}
          extra={intl.formatMessage({
            id: 'plugin.sendmail.signup-verify.description',
          })}
        />
        {signupVerify && (
          <>
            <ProFormText
              name="verify_subject"
              label={intl.formatMessage({
                id: 'plugin.sendmail.signup-verify.title',
              })}
              extra={intl.formatMessage({
                id: 'plugin.sendmail.signup-verify.title.description',
              })}
            />
            <ProFormTextArea
              name="verify_message"
              label={intl.formatMessage({
                id: 'plugin.sendmail.signup-verify.message',
              })}
              extra={intl.formatMessage({
                id: 'plugin.sendmail.signup-verify.message.description',
              })}
            />
          </>
        )}
      </ModalForm>
    </>
  );
};

export default SendmailSetting;
