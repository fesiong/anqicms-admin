import { anqiSendFeedback, anqiUpload } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Alert, message, Upload } from 'antd';
import { useState } from 'react';
import './index.less';

let loading = false;
const Footer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();

  const handleFeedback = async (values: any) => {
    if (loading) {
      return;
    }
    loading = true;
    const postData = Object.assign({}, values);
    postData.images = images;
    const hide = message.loading('正在提交', 0);
    anqiSendFeedback(postData)
      .then((res) => {
        if (res.code === 0) {
          message.info(res.msg || '已提交');
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
    const hide = message.loading('正在提交中', 0);

    let formData = new FormData();
    formData.append('file', e.file);
    anqiUpload(formData)
      .then((res) => {
        if (res.code !== 0) {
          message.info(res.msg);
        } else {
          message.info(res.msg || '上传成功');
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
      <span>© {currentYear} 安企CMS(anqicms.com)</span>
      <a href="https://www.anqicms.com/help" target="_blank">
        使用帮助
      </a>
      <span>|</span>
      <a href="https://www.anqicms.com/manual" target="_blank">
        模板标签手册
      </a>
      <span>|</span>
      <a
        className="feedback"
        onClick={() => {
          setVisible(true);
        }}
      >
        意见反馈&需求提议
      </a>
      <ModalForm
        visible={visible}
        width={600}
        title="意见反馈&需求提议"
        layout="horizontal"
        onVisibleChange={(flag) => {
          setVisible(flag);
        }}
        onFinish={handleFeedback}
      >
        <Alert
          className="mb-normal"
          description={
            <div>
              系统会将您所反馈的内容创建为一个社区帖子，您可以从{' '}
              <a href="https://www.anqicms.com/" target="_blank">
                AnqiCMS
              </a>{' '}
              网站上查看我们的回复。
            </div>
          }
        />
        <ProFormRadio.Group
          name="type"
          required
          width="lg"
          label="反馈类型"
          valueEnum={{
            BUG: 'BUG',
            建议: '建议',
            咨询: '咨询',
          }}
        />
        <ProFormText name="title" required label="标题" width="lg" />
        <ProFormTextArea
          name="content"
          required
          label="问题描述"
          width="lg"
          fieldProps={{
            rows: 6,
          }}
        />
        <ProFormText required label="问题截图" width="lg">
          <Upload
            name="file"
            multiple
            showUploadList={false}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            customRequest={(e) => {
              handleUploadImage(e);
            }}
          >
            <div className="ant-upload-item">
              <div className="add">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
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
