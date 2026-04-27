import { anqiSendFeedback, anqiUpload } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Alert, Button, Modal, Upload, message } from 'antd';
import { useState } from 'react';
import './index.less';

let loading = false;
const Footer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [aiChatVisible, setAiChatVisible] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const intl = useIntl();

  const handleFeedback = async (values: any) => {
    if (loading) {
      return;
    }
    loading = true;
    const postData = Object.assign({}, values);
    postData.images = images;
    const hide = message.loading(
      intl.formatMessage({ id: 'component.footer.submitting' }),
      0,
    );
    anqiSendFeedback(postData)
      .then((res) => {
        if (res.code === 0) {
          message.info(
            res.msg || intl.formatMessage({ id: 'component.footer.submitted' }),
          );
          setVisible(false);
        } else {
          message.info(res.msg);
        }
      })
      .finally(() => {
        loading = false;
        hide();
      });
  };

  const handleUploadImage = (e: any) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'component.footer.submitting' }),
      0,
    );

    let formData = new FormData();
    formData.append('file', e.file);
    anqiUpload(formData)
      .then((res) => {
        if (res.code !== 0) {
          message.info(res.msg);
        } else {
          message.info(
            res.msg || intl.formatMessage({ id: 'component.footer.uploaded' }),
          );
          images.push(res.data.logo);
          setImages(([] as string[]).concat(...images));
        }
      })
      .finally(() => {
        hide();
      });
  };

  const handleOpenAiChat = () => {
    setAiChatVisible(true);
  };

  return (
    <div className="anqi-footer">
      <span>
        © {currentYear} <FormattedMessage id="component.footer.copyright" />
      </span>
      <div>
        <a href="https://www.anqicms.com/help" target="_blank" rel="noreferrer">
          <FormattedMessage id="component.footer.help" />
        </a>
        <span>|</span>
        <a
          href="https://www.anqicms.com/manual"
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage id="component.footer.template-manual" />
        </a>
        <span>|</span>
        <a
          className="feedback"
          onClick={() => {
            setVisible(true);
          }}
        >
          <FormattedMessage id="component.footer.feedback" />
        </a>
      </div>
      {/* AI Chat Floating Button */}
      <div className="ai-chat" onClick={handleOpenAiChat}>
        <svg
          className="ai-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
        >
          <path
            d="M521.47 859.38c-63.86 0-127.41-8.29-189.15-24.55h-125.9c-15.16 0.1-29.61-6.37-39.51-17.78s-14.35-26.57-12.23-41.63l14.25-100.74c-22.94-37.49-36.48-96.5-40.32-176.02-10.1-183.8 109.23-349.81 286.76-398.71 39-9.9 79.22-14.85 119.43-14.65 118.52 0 217.64 37.08 286.56 107.51s107.71 176.52 106.09 294.64c-0.3 57.39-12.93 114.08-37.08 166.11-80.22 167.63-239.97 205.62-368.9 205.82z m-308.48-82.35h121.15c4.75 0 9.4 0.61 13.94 1.92 38.6 10.61 372.24 96.5 489.75-149.54 20.61-44.66 31.42-93.26 31.83-142.37 1.92-102.46-29.91-192.99-89.52-253.01s-140.45-90.74-245.23-90.74c-35.36-0.2-70.63 4.04-104.98 12.73-150.75 41.93-252 183.19-243.31 339.4 3.23 70.02 14.65 121.96 32.84 149.95 6.47 9.7 9.19 21.42 7.48 33.04l-13.95 98.62z"
            fill="#ffffff"
          ></path>
          <path
            d="M540.57 574.74l-13.14-34.76H415.18l-13.34 35.26c-3.23 9.8-7.58 19.2-13.14 27.99-4.34 5.25-11.11 7.98-17.99 7.38-7.17 0.2-14.25-2.63-19.3-7.68a23.851 23.851 0 0 1-8.08-17.58c0.1-3.94 0.71-7.78 1.92-11.62 1.31-4.04 3.23-9.7 6.16-16.77l70.83-179.45c1.92-5.25 4.45-11.42 7.17-19.3 2.32-6.37 5.36-12.33 9.09-17.99 3.23-4.85 7.48-8.79 12.53-11.62 17.48-10.41 40.01-5.36 51.53 11.42 3.23 4.65 5.96 9.6 8.08 14.85l8.49 21.42 72.25 178.44c5.05 9.4 8.29 19.7 9.7 30.31-0.1 6.77-2.93 13.14-7.88 17.78-5.05 5.15-12.02 7.98-19.3 7.88-3.94 0.1-7.78-0.71-11.42-2.32-3.03-1.52-5.76-3.64-7.88-6.37-2.83-3.84-5.05-8.08-6.77-12.53-3.32-5.44-4.73-10.49-7.26-14.74z m-110.74-77.19h82.35l-41.53-114.08-40.82 114.08z m213.8 78.91V358.82a36.171 36.171 0 0 1 7.68-25.26c4.95-5.46 11.92-8.59 19.3-8.49 7.68-0.3 15.16 2.73 20.41 8.29 5.66 7.17 8.49 16.27 7.68 25.46v217.64c0.81 9.19-2.02 18.39-7.68 25.66-5.25 5.66-12.73 8.79-20.41 8.49-7.38 0-14.35-3.03-19.3-8.49-5.66-7.27-8.39-16.36-7.68-25.66z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
      <Modal
        open={aiChatVisible}
        onCancel={() => setAiChatVisible(false)}
        title={intl.formatMessage({ id: 'component.ai-chat.title' })}
        footer={[
          <Button key="close" onClick={() => setAiChatVisible(false)}>
            <FormattedMessage id="component.close" />
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p>{intl.formatMessage({ id: 'component.ai-chat.tips' })}</p>
        </div>
      </Modal>
      <ModalForm
        open={visible}
        width={600}
        title={intl.formatMessage({ id: 'component.footer.feedback' })}
        layout="horizontal"
        onOpenChange={(flag) => {
          setVisible(flag);
        }}
        onFinish={handleFeedback}
      >
        <Alert
          className="mb-normal"
          description={
            <div>
              <FormattedMessage id="component.footer.feedback.tips-before" />
              <a
                href="https://www.anqicms.com/"
                target="_blank"
                rel="noreferrer"
              >
                AnqiCMS
              </a>
              <FormattedMessage id="component.footer.feedback.tips-after" />
            </div>
          }
        />
        <ProFormRadio.Group
          name="type"
          required
          width="lg"
          label={intl.formatMessage({ id: 'component.footer.feedback.type' })}
          valueEnum={{
            bug: intl.formatMessage({ id: 'component.footer.feedback.bug' }),
            suggest: intl.formatMessage({
              id: 'component.footer.feedback.suggest',
            }),
            consult: intl.formatMessage({
              id: 'component.footer.feedback.consult',
            }),
          }}
        />
        <ProFormText
          name="title"
          required
          label={intl.formatMessage({ id: 'component.footer.feedback.title' })}
          width="lg"
        />
        <ProFormTextArea
          name="content"
          required
          label={intl.formatMessage({
            id: 'component.footer.feedback.description',
          })}
          width="lg"
          fieldProps={{
            rows: 6,
          }}
        />
        <ProFormText
          required
          label={intl.formatMessage({
            id: 'component.footer.feedback.screenshot',
          })}
          width="lg"
        >
          <Upload
            name="file"
            multiple
            showUploadList={false}
            accept=".jpg,.jpeg,.png,.gif,.webp,.bmp"
            customRequest={(e) => {
              handleUploadImage(e);
            }}
          >
            <div className="ant-upload-item">
              <div className="add">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  <FormattedMessage id="component.footer.upload" />
                </div>
              </div>
            </div>
          </Upload>
          {images.map((item: string, index: number) => (
            <div className="ant-upload-item" key={index}>
              <img src={item} style={{ width: '100%' }} />
            </div>
          ))}
        </ProFormText>
      </ModalForm>
    </div>
  );
};

export default Footer;
