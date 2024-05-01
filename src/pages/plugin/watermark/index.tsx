import React, { useEffect, useState } from 'react';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, message, Modal, Row, Slider, Tooltip, Upload } from 'antd';
import {
  pluginGetWatermarkConfig,
  pluginSaveWatermarkConfig,
  pluginWatermarkGenerate,
  pluginWatermarkPreview,
  pluginWatermarkUploadFile,
} from '@/services';
import './index.less';
import { ChromePicker } from 'react-color';

let loading = false;

const PluginWatermark: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<string>('');

  const getSetting = async () => {
    const res = await pluginGetWatermarkConfig();
    let tmpSetting = res.data || {};
    setSetting(tmpSetting);
    setFetched(true);
    getPreviewData();
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onChangeField = (field: string, val: any) => {
    setting[field] = val;
    setSetting(Object.assign({}, setting));
  };

  const changeOpen = (e: any) => {
    setting.open = e.target.value;
    setSetting(Object.assign({}, setting));
  };

  const changeType = (e: any) => {
    setting.type = e.target.value;
    setSetting(Object.assign({}, setting));
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    let data = Object.assign(setting, values);
    data.width = Number(data.width);
    data.height = Number(data.height);
    pluginSaveWatermarkConfig(data)
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
    pluginWatermarkUploadFile(formData)
      .then((res) => {
        message.success(res.msg);
        setting[field] = res.data;
        setSetting(Object.assign({}, setting));
      })
      .finally(() => {
        hide();
      });
  };

  const handleRemoveImage = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async () => {
        setting.image_path = '';
        setSetting(Object.assign({}, setting));
      },
    });
  };

  const handleRemoveFont = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async () => {
        setting.color = '';
        setSetting(Object.assign({}, setting));
      },
    });
  };

  const getPreviewData = () => {
    if (loading) {
      return;
    }
    loading = true;
    pluginWatermarkPreview()
      .then((res) => {
        setPreviewData(res.data);
      })
      .finally(() => {
        loading = false;
      });
  };

  const handleGenerate = () => {
    Modal.confirm({
      title: '确定要给图片库里的图片都添加上水印吗？',
      content: '已添加过水印的图片不会被重复添加。',
      onOk: async () => {
        pluginWatermarkGenerate({}).then((res) => {
          message.success(res.msg);
        });
      },
    });
  };

  const onChangeColor = (c: any) => {
    setting.font_color = c.hex;
    setSetting(Object.assign({}, setting));
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={16}>
          <Col sm={12} xs={24}>
            {fetched && (
              <ProForm
                title="图片添加水印"
                layout="vertical"
                initialValues={setting}
                onFinish={onSubmit}
              >
                <ProFormRadio.Group
                  name="open"
                  label="是否启用水印"
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
                  extra="启用后，会自动给上传的图片添加水印"
                />

                <div style={{ display: setting.open ? 'block' : 'none' }}>
                  <ProFormRadio.Group
                    name="type"
                    label="水印类型"
                    options={[
                      {
                        value: 0,
                        label: '图片水印',
                      },
                      {
                        value: 1,
                        label: '文字水印',
                      },
                    ]}
                    fieldProps={{
                      onChange: changeType,
                    }}
                  />
                  {setting.type == 0 && (
                    <ProFormText label="水印图片">
                      <Upload
                        name="file"
                        className="logo-uploader"
                        showUploadList={false}
                        accept=".jpg,.jpeg,.png,.gif,.webp,.bmp"
                        customRequest={async (e) => handleUploadFile('image_path', e)}
                      >
                        <Button>上传图片</Button>
                      </Upload>
                      {setting.image_path && (
                        <div className="upload-file">
                          <span>{setting.image_path}</span>
                          <a className="delete" onClick={handleRemoveImage}>
                            删除
                          </a>
                        </div>
                      )}
                    </ProFormText>
                  )}
                  {setting.type == 1 && (
                    <>
                      <ProFormText
                        name="text"
                        label="水印文字"
                        fieldProps={{
                          onBlur: (e) => onChangeField('text', e.target.value),
                        }}
                      />
                      <ProFormText width="sm" label="字体颜色" extra="默认白色">
                        <Tooltip
                          trigger={'click'}
                          placement="bottom"
                          color="#ffffff"
                          title={
                            <div>
                              <ChromePicker
                                color={setting.color}
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
                              background: setting.color,
                            }}
                          >
                            {setting.color || '选择'}
                          </Button>
                        </Tooltip>
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
                    </>
                  )}
                  <ProFormRadio.Group
                    name="position"
                    label="水印位置"
                    options={[
                      {
                        value: 5,
                        label: '居中',
                      },
                      {
                        value: 1,
                        label: '左上角',
                      },
                      {
                        value: 3,
                        label: '右上角',
                      },
                      {
                        value: 7,
                        label: '左下角',
                      },
                      {
                        value: 9,
                        label: '右下角',
                      },
                    ]}
                    fieldProps={{
                      onChange: (e) => {
                        onChangeField('position', e.target.value);
                      },
                    }}
                  />
                  <ProFormText label="水印大小">
                    <Slider
                      min={5}
                      max={50}
                      defaultValue={setting.size}
                      onChange={(e) => onChangeField('size', e)}
                    />
                  </ProFormText>
                  <ProFormText label="水印透明度">
                    <Slider
                      min={10}
                      max={100}
                      defaultValue={setting.opacity}
                      onChange={(e) => onChangeField('opacity', e)}
                    />
                  </ProFormText>
                  <ProFormText
                    name="min_size"
                    label="最小添加水印图片"
                    fieldProps={{
                      addonAfter: '像素',
                      onBlur: (e) => onChangeField('text', e.target.value),
                    }}
                    extra={'长宽同时小于这个尺寸的图片，不会添加水印'}
                  />
                </div>
                <p>
                  <br />
                </p>
              </ProForm>
            )}
          </Col>
          <Col sm={12} xs={24}>
            <img className="preview" src={previewData} />
            <div className="mt-normal text-center">
              <Button onClick={() => handleGenerate()}>批量给图片库的图片添加水印</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginWatermark;
