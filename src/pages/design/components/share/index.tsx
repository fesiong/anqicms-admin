import React, { useRef, useState } from 'react';
import { message, Modal, Upload } from 'antd';
import {
  ModalForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { anqiShareTemplate, anqiUpload } from '@/services';
import { PlusOutlined } from '@ant-design/icons';

export type TemplateShareProps = {
  children: any;
  designInfo: any;
  canShare: boolean;
  onFinished?: () => void;
};

const TemplateShare: React.FC<TemplateShareProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [pcThumb, setPcThumb] = useState<string>('');
  const [mobileThumb, setMobileThumb] = useState<string>('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const formRef = useRef<ProFormInstance>();

  const confirmShareTemplate = async (values: any) => {
    Modal.confirm({
      title: '确定要将该模板上架到模板市场吗？',
      content: <div>如果该模板已经提交上架过了，则会更新模板市场对应模板到当前版本。</div>,
      onOk: async () => {
        const postData = values;
        postData.package = props.designInfo.package;
        postData.template_id = props.designInfo.templateId;
        postData.price = Math.floor(postData.price * 100);
        postData.auto_backup = !!postData.auto_backup;
        postData.pc_thumb = pcThumb;
        postData.mobile_thumb = mobileThumb;
        postData.preview_images = previewImages;

        anqiShareTemplate(postData).then((res) => {
          if (res.code === 0) {
            message.info(res.msg || '提交成功');
            setVisible(false);
            props.onFinished?.();
          } else {
            message.info(res.msg);
          }
        });
      },
    });
  };

  const handleUploadImage = (field: string, e: any) => {
    const hide = message.loading('正在提交中', 0);

    let formData = new FormData();
    formData.append('file', e.file);
    anqiUpload(formData)
      .then((res) => {
        if (res.code !== 0) {
          message.info(res.msg);
        } else {
          message.info(res.msg || '上传成功');
          if (field == 'pc_thumb') {
            setPcThumb(res.data.logo);
          } else if (field == 'mobile_thumb') {
            setMobileThumb(res.data.logo);
          } else {
            previewImages.push(res.data.logo);
            setPreviewImages(([] as string[]).concat(...previewImages));
          }
        }
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <>
      <div
        onClick={() => {
          if (!props.canShare) {
            message.info('请先登录AnqiCMS官网账号');
            return;
          }
          formRef.current?.setFieldsValue(props.designInfo);
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      <ModalForm
        width={800}
        title={'上架模板到设计市场'}
        visible={visible}
        formRef={formRef}
        modalProps={{
          onCancel: () => {
            setVisible(false);
          },
        }}
        layout="horizontal"
        onFinish={async (values) => {
          confirmShareTemplate(values);
        }}
      >
        <ProFormText name="name" label="模板名称" extra="例如：机械设备模板" />
        <ProFormDigit
          name="price"
          label="模板售价"
          addonAfter="元"
          extra="如免费分享，则不需设置。设置售价后，有用户购买模板，您将获得80%的实际销售收益"
        />
        <ProFormRadio.Group
          name="auto_backup"
          label="演示数据"
          options={[
            {
              value: 0,
              label: '不处理',
            },
            {
              value: 1,
              label: '自动备份演示数据',
            },
          ]}
          extra="模板携带演示数据效果更好"
        />
        <ProFormText name="author" label="模板作者" />
        <ProFormText name="homepage" label="作者主页" />
        <ProFormText name="version" label="模板版本" placeholder="如：1.0.0" />
        <ProFormTextArea fieldProps={{ rows: 10 }} name="description" label="模板介绍" />
        <ProFormText label="PC端截图">
          <Upload
            name="file"
            multiple
            showUploadList={false}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            customRequest={(e) => {
              handleUploadImage('pc_thumb', e);
            }}
          >
            <div className="ant-upload-item">
              {pcThumb ? (
                <img src={pcThumb} style={{ width: '100%' }} />
              ) : (
                <div className="add">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              )}
            </div>
          </Upload>
        </ProFormText>
        <ProFormText label="移动端截图">
          <Upload
            name="file"
            multiple
            showUploadList={false}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            customRequest={(e) => {
              handleUploadImage('mobile_thumb', e);
            }}
          >
            <div className="ant-upload-item">
              {mobileThumb ? (
                <img src={mobileThumb} style={{ width: '100%' }} />
              ) : (
                <div className="add">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              )}
            </div>
          </Upload>
        </ProFormText>
        <ProFormText label="模板预览图片" extra="建议上传模板全幅页面截图，不少于3张。">
          <Upload
            name="file"
            multiple
            showUploadList={false}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            customRequest={(e) => {
              handleUploadImage('preview_images', e);
            }}
          >
            <div className="ant-upload-item">
              <div className="add">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            </div>
          </Upload>
          {previewImages.map((item: string, index: number) => (
            <div className="ant-upload-item" key={index}>
              <img src={item} style={{ width: '100%' }} />
            </div>
          ))}
        </ProFormText>
      </ModalForm>
    </>
  );
};

export default TemplateShare;
