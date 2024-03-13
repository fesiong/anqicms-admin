import React, { useEffect, useState } from 'react';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, message, Modal, Row, Tooltip, Upload } from 'antd';
import {
  pluginGetTitleImageConfig,
  pluginSaveTitleImageConfig,
  pluginTitleImagePreview,
  pluginTitleImageUploadFile,
} from '@/services';
import './index.less';
import { ChromePicker } from 'react-color';

const PluginTitleImage: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<string>('');
  let previewText = '';

  const getSetting = async () => {
    const res = await pluginGetTitleImageConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
    getPreviewData();
  }, []);

  const changeOpen = (e: any) => {
    setting.open = e.target.value;
    setSetting(Object.assign({}, setting));
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    let data = Object.assign(setting, values);
    data.width = Number(data.width);
    data.height = Number(data.height);
    pluginSaveTitleImageConfig(data)
      .then((res) => {
        message.success(res.msg);
        getPreviewData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const handleUploadFile = (field: string, e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('name', field);
    const hide = message.loading('正在提交中', 0);
    pluginTitleImageUploadFile(formData)
      .then((res) => {
        message.success(res.msg);
        setting[field] = res.data;
        setSetting(Object.assign({}, setting));
        getPreviewData();
      })
      .finally(() => {
        hide();
      });
  };

  const handleRemoveBgImage = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async () => {
        setting.bg_image = '';
        setSetting(Object.assign({}, setting));
        getPreviewData();
      },
    });
  };

  const handleRemoveFont = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async () => {
        setting.font_path = '';
        setSetting(Object.assign({}, setting));
        getPreviewData();
      },
    });
  };

  const getPreviewData = () => {
    pluginTitleImagePreview({ text: previewText }).then((res) => {
      setPreviewData(res.data);
    });
  };

  const onChangeColor = (c: any) => {
    setting.font_color = c.hex;
    setSetting(Object.assign({}, setting));
    getPreviewData();
  };

  const confirmChangeText = async (values: any) => {
    previewText = values.text;
    setVisible(false);
    getPreviewData();
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={16}>
          <Col span={12}>
            {fetched && (
              <ProForm
                title="标题自动配图配置"
                layout="vertical"
                initialValues={setting}
                onFinish={onSubmit}
              >
                <ProFormRadio.Group
                  name="open"
                  label="是否启用自动配图"
                  options={[
                    {
                      value: false,
                      label: '关闭',
                    },
                    {
                      value: true,
                      label: '开启',
                    },
                  ]}
                  fieldProps={{
                    onChange: changeOpen,
                  }}
                  extra="启用后，会在文档没有图片的时候，自动生成一张包含文档标题的图片作为文档缩略图图片"
                />
                <div style={{ display: setting.open ? 'block' : 'none' }}>
                  <ProFormRadio.Group
                    name="draw_sub"
                    label="是否生成文档二级标题配图"
                    options={[
                      {
                        value: false,
                        label: '关闭',
                      },
                      {
                        value: true,
                        label: '开启',
                      },
                    ]}
                    fieldProps={{
                      onChange: changeOpen,
                    }}
                    extra="开启后，会在文档没有图片的时候，自动给文档h2标签生成图片，并插入到文档中"
                  />
                  <ProFormGroup label="生成图片尺寸">
                    <ProFormText
                      name="width"
                      width="sm"
                      fieldProps={{
                        suffix: '像素宽',
                      }}
                      placeholder="默认800"
                    />
                    ×
                    <ProFormText
                      name="height"
                      width="sm"
                      fieldProps={{
                        suffix: '像素高',
                      }}
                      placeholder="默认600"
                    />
                  </ProFormGroup>
                  <ProFormText width="sm" label="字体颜色" extra="默认白色">
                    <Tooltip
                      trigger={'click'}
                      placement="bottom"
                      color="#ffffff"
                      title={
                        <div>
                          <ChromePicker
                            color={setting.font_color}
                            onChange={(e) => {
                              onChangeColor(e);
                            }}
                          />
                        </div>
                      }
                    >
                      <Button
                        className="color-block"
                        style={{
                          background: setting.font_color,
                        }}
                      >
                        {setting.font_color || '选择'}
                      </Button>
                    </Tooltip>
                  </ProFormText>
                  <ProFormDigit
                    name="font_size"
                    label="默认文字大小"
                    width="lg"
                    placeholder="默认32"
                  />
                  {!setting.bg_image && (
                    <ProFormRadio.Group
                      name="noise"
                      label="添加干扰斑点"
                      options={[
                        {
                          value: false,
                          label: '不添加',
                        },
                        {
                          value: true,
                          label: '添加',
                        },
                      ]}
                      extra="只有使用默认背景才生效"
                    />
                  )}
                  <ProFormText
                    label="自定义背景"
                    extra="你可以自定义背景，不上传自定义背景则系统会自动生成一个纯色背景"
                  >
                    <Upload
                      name="file"
                      className="logo-uploader"
                      showUploadList={false}
                      accept=".jpg,.jpeg,.png,.gif,.webp,.bmp"
                      customRequest={async (e) => handleUploadFile('bg_image', e)}
                    >
                      <Button>上传图片</Button>
                    </Upload>
                    {setting.bg_image && (
                      <div className="upload-file">
                        <span>{setting.bg_image}</span>
                        <a className="delete" onClick={handleRemoveBgImage}>
                          删除
                        </a>
                      </div>
                    )}
                  </ProFormText>
                  <ProFormText label="自定义字体">
                    <Upload
                      name="file"
                      className="logo-uploader"
                      showUploadList={false}
                      accept=".ttf"
                      customRequest={async (e) => handleUploadFile('font_path', e)}
                    >
                      <Button>上传.ttf字体</Button>
                    </Upload>
                    {setting.font_path && (
                      <div className="upload-file">
                        <span>{setting.font_path}</span>
                        <a className="delete" onClick={handleRemoveFont}>
                          删除
                        </a>
                      </div>
                    )}
                  </ProFormText>
                </div>
                <p>
                  <br />
                </p>
              </ProForm>
            )}
          </Col>
          <Col span={12}>
            <div className="preview-text">
              <Button
                onClick={() => {
                  setVisible(true);
                }}
              >
                修改预览文字
              </Button>
            </div>
            <img className="preview" src={previewData} />
          </Col>
        </Row>
      </Card>
      <ModalForm
        title="设置预览文字"
        visible={visible}
        modalProps={{
          onCancel: () => setVisible(false),
        }}
        onFinish={confirmChangeText}
      >
        <ProFormText name="text" />
      </ModalForm>
    </PageHeaderWrapper>
  );
};

export default PluginTitleImage;
