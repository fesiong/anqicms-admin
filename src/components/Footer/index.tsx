import { anqiSendFeedback, anqiUpload } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Alert, Upload, message } from 'antd';
import { useState } from 'react';
import './index.less';

let loading = false;
const Footer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();
  const intl = useIntl();

  const handleFeedback = async (values: any) => {
    if (loading) {
      return;
    }
    loading = true;
    const postData = Object.assign({}, values);
    postData.images = images;
    const hide = message.loading(intl.formatMessage({ id: 'component.footer.submitting' }), 0);
    anqiSendFeedback(postData)
      .then((res) => {
        if (res.code === 0) {
          message.info(res.msg || intl.formatMessage({ id: 'component.footer.submitted' }));
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
    const hide = message.loading(intl.formatMessage({ id: 'component.footer.submitting' }), 0);

    let formData = new FormData();
    formData.append('file', e.file);
    anqiUpload(formData)
      .then((res) => {
        if (res.code !== 0) {
          message.info(res.msg);
        } else {
          message.info(res.msg || intl.formatMessage({ id: 'component.footer.uploaded' }));
          images.push(res.data.logo);
          setImages(([] as string[]).concat(...images));
        }
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <div className="anqi-footer">
      <span>
        © {currentYear} <FormattedMessage id="component.footer.copyright" />
      </span>
      <a href="https://www.anqicms.com/help" target="_blank" rel='noreferrer'>
        <FormattedMessage id="component.footer.help" />
      </a>
      <span>|</span>
      <a href="https://www.anqicms.com/manual" target="_blank" rel='noreferrer'>
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
              <a href="https://www.anqicms.com/" target="_blank" rel='noreferrer'>
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
            suggest: intl.formatMessage({ id: 'component.footer.feedback.suggest' }),
            consult: intl.formatMessage({ id: 'component.footer.feedback.consult' }),
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
          label={intl.formatMessage({ id: 'component.footer.feedback.description' })}
          width="lg"
          fieldProps={{
            rows: 6,
          }}
        />
        <ProFormText
          required
          label={intl.formatMessage({ id: 'component.footer.feedback.screenshot' })}
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
