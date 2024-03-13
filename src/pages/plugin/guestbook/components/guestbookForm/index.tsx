import React, { useEffect, useState } from 'react';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { pluginGetSendmailSetting, pluginTestSendmail } from '@/services/plugin/sendmail';

import moment from 'moment';
import { Button, Image, message } from 'antd';

export type GuestbookFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  visible: boolean;
  editingGuestbook: any;
};

const GuestbookForm: React.FC<GuestbookFormProps> = (props) => {
  const [sendMailSetting, setSendMailSetting] = useState<any>({});
  const [replyVisible, setReplyVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSendMailSetting();
  }, []);

  const getSendMailSetting = async () => {
    let res = await pluginGetSendmailSetting();
    setSendMailSetting(res.data || {});
  };

  const replyEmail = () => {
    if (!sendMailSetting.recipient && !sendMailSetting.account) {
      message.error('请先进行邮件提醒设置，在功能里搜“邮件提醒”');
      return;
    }
    setReplyVisible(true);
  };

  const onSubmitReply = async (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!values.message || !values.subject) {
      setLoading(false);
      message.error('请填写邮件标题和邮件内容');
      return;
    }
    let res = await pluginTestSendmail({
      subject: values.subject,
      message: values.message,
      recipient: props.editingGuestbook.contact,
    });
    setLoading(false);
    if (res.code === 0) {
      message.success('邮件发送成功');
      setReplyVisible(false);
    } else {
      message.error(res.msg);
    }
  };

  return (
    <>
      <ModalForm
        width={600}
        title={'查看留言'}
        initialValues={props.editingGuestbook}
        visible={props.visible}
        layout="horizontal"
        onVisibleChange={(flag) => {
          if (!flag) {
            props.onCancel(flag);
          }
        }}
        onFinish={async (values) => {
          props.onCancel(false);
        }}
      >
        <ProFormText name="id" label="ID" readonly />
        <ProFormText name="user_name" label="用户名" readonly />
        <ProFormText
          name="contact"
          label="联系方式"
          readonly
          extra={
            props.editingGuestbook.contact?.indexOf('@') !== -1 && (
              <Button onClick={replyEmail}>回复邮件</Button>
            )
          }
        />
        <ProFormTextArea name="content" label="留言内容" readonly />
        {Object.keys(props.editingGuestbook.extra_data || {}).map((key: string, index: number) => (
          <ProFormText
            key={index}
            name={key}
            initialValue={props.editingGuestbook.extra_data[key]}
            label={key}
            readonly
            extra={
              props.editingGuestbook.extra_data[key]?.indexOf('http') !== -1 && (
                <a href={props.editingGuestbook.extra_data[key]} target={'_blank'}>
                  {props.editingGuestbook.extra_data[key].indexOf('.jpg') !== -1 ||
                  props.editingGuestbook.extra_data[key].indexOf('.jpeg') !== -1 ||
                  props.editingGuestbook.extra_data[key].indexOf('.png') !== -1 ||
                  props.editingGuestbook.extra_data[key].indexOf('.webp') !== -1 ||
                  props.editingGuestbook.extra_data[key].indexOf('.gif') !== -1 ? (
                    <Image width={200} src={props.editingGuestbook.extra_data[key]} />
                  ) : (
                    '点击预览'
                  )}
                </a>
              )
            }
          />
        ))}
        <ProFormText name="ip" label="IP" readonly />
        <ProFormText name="refer" label="来源" readonly />
        <ProFormText
          fieldProps={{
            value: moment(props.editingGuestbook.created_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
          }}
          label="评论时间"
          readonly
        />
      </ModalForm>
      <ModalForm
        width={550}
        title={'回复邮件'}
        visible={replyVisible}
        layout="horizontal"
        onVisibleChange={(flag) => {
          setReplyVisible(flag);
        }}
        onFinish={onSubmitReply}
      >
        <ProFormText name="subject" label="邮件标题" />
        <ProFormTextArea name="message" label="邮件内容" />
      </ModalForm>
    </>
  );
};

export default GuestbookForm;
