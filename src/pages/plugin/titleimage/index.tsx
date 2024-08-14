import {
  pluginGetTitleImageConfig,
  pluginSaveTitleImageConfig,
  pluginTitleImagePreview,
  pluginTitleImageUploadFile,
} from '@/services';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, Col, ColorPicker, Modal, Row, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const PluginTitleImage: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<string>('');
  let previewText = '';
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetTitleImageConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  const getPreviewData = () => {
    pluginTitleImagePreview({ text: previewText }).then((res) => {
      setPreviewData(res.data);
    });
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
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
      title: intl.formatMessage({ id: 'setting.system.confirm-delete' }),
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
      title: intl.formatMessage({ id: 'setting.system.confirm-delete' }),
      onOk: async () => {
        setting.font_path = '';
        setSetting(Object.assign({}, setting));
        getPreviewData();
      },
    });
  };

  const onChangeColor = (c: any) => {
    setting.font_color = c.toHex();
    setSetting(Object.assign({}, setting));
    getPreviewData();
  };

  const confirmChangeText = async (values: any) => {
    previewText = values.text;
    setVisible(false);
    getPreviewData();
  };

  return (
    <PageContainer>
      <Card>
        <Row gutter={16}>
          <Col span={12}>
            {fetched && (
              <ProForm
                title={intl.formatMessage({ id: 'menu.plugin.titleimage' })}
                layout="vertical"
                initialValues={setting}
                onFinish={onSubmit}
              >
                <ProFormRadio.Group
                  name="open"
                  label={intl.formatMessage({ id: 'plugin.titleimage.open' })}
                  options={[
                    {
                      value: false,
                      label: intl.formatMessage({ id: 'plugin.titleimage.open.no' }),
                    },
                    {
                      value: true,
                      label: intl.formatMessage({ id: 'plugin.titleimage.open.yes' }),
                    },
                  ]}
                  fieldProps={{
                    onChange: changeOpen,
                  }}
                  extra={intl.formatMessage({ id: 'plugin.titleimage.open.description' })}
                />
                <div style={{ display: setting.open ? 'block' : 'none' }}>
                  <ProFormRadio.Group
                    name="draw_sub"
                    label={intl.formatMessage({ id: 'plugin.titleimage.draw-sub' })}
                    options={[
                      {
                        value: false,
                        label: intl.formatMessage({ id: 'plugin.titleimage.open.no' }),
                      },
                      {
                        value: true,
                        label: intl.formatMessage({ id: 'plugin.titleimage.open.yes' }),
                      },
                    ]}
                    extra={intl.formatMessage({ id: 'plugin.titleimage.draw-sub.description' })}
                  />
                  <ProFormGroup title={intl.formatMessage({ id: 'plugin.titleimage.size' })}>
                    <ProFormText
                      name="width"
                      width="sm"
                      fieldProps={{
                        suffix: intl.formatMessage({ id: 'plugin.titleimage.width' }),
                      }}
                      placeholder={intl.formatMessage({
                        id: 'plugin.titleimage.width.placeholder',
                      })}
                    />
                    ×
                    <ProFormText
                      name="height"
                      width="sm"
                      fieldProps={{
                        suffix: intl.formatMessage({ id: 'plugin.titleimage.height' }),
                      }}
                      placeholder={intl.formatMessage({
                        id: 'plugin.titleimage.height.placeholder',
                      })}
                    />
                  </ProFormGroup>
                  <ProFormText
                    width="sm"
                    label={intl.formatMessage({ id: 'plugin.titleimage.color' })}
                    extra={intl.formatMessage({ id: 'plugin.titleimage.color.default' })}
                  >
                    <ColorPicker
                      showText
                      value={setting.font_color}
                      onChange={(e) => {
                        onChangeColor(e);
                      }}
                    />
                  </ProFormText>
                  <ProFormDigit
                    name="font_size"
                    label={intl.formatMessage({ id: 'plugin.titleimage.font-size' })}
                    width="lg"
                    placeholder={intl.formatMessage({
                      id: 'plugin.titleimage.font-size.placeholder',
                    })}
                  />
                  {!setting.bg_image && (
                    <ProFormRadio.Group
                      name="noise"
                      label={intl.formatMessage({ id: 'plugin.titleimage.noise' })}
                      options={[
                        {
                          value: false,
                          label: intl.formatMessage({ id: 'plugin.titleimage.noise.no' }),
                        },
                        {
                          value: true,
                          label: intl.formatMessage({ id: 'plugin.titleimage.noise.yes' }),
                        },
                      ]}
                      extra={intl.formatMessage({ id: 'plugin.titleimage.noise.description' })}
                    />
                  )}
                  <ProFormText
                    label={intl.formatMessage({ id: 'plugin.titleimage.bg-image' })}
                    extra={intl.formatMessage({ id: 'plugin.titleimage.bg-image.description' })}
                  >
                    <Upload
                      name="file"
                      className="logo-uploader"
                      showUploadList={false}
                      accept=".jpg,.jpeg,.png,.gif,.webp,.bmp"
                      customRequest={async (e) => handleUploadFile('bg_image', e)}
                    >
                      <Button>
                        <FormattedMessage id="plugin.titleimage.bg-image.upload" />
                      </Button>
                    </Upload>
                    {setting.bg_image && (
                      <div className="upload-file">
                        <span>{setting.bg_image}</span>
                        <a className="delete" onClick={handleRemoveBgImage}>
                          <FormattedMessage id="setting.system.delete" />
                        </a>
                      </div>
                    )}
                  </ProFormText>
                  <ProFormText label={intl.formatMessage({ id: 'plugin.titleimage.font' })}>
                    <Upload
                      name="file"
                      className="logo-uploader"
                      showUploadList={false}
                      accept=".ttf"
                      customRequest={async (e) => handleUploadFile('font_path', e)}
                    >
                      <Button>
                        <FormattedMessage id="plugin.titleimage.font.upload" />
                      </Button>
                    </Upload>
                    {setting.font_path && (
                      <div className="upload-file">
                        <span>{setting.font_path}</span>
                        <a className="delete" onClick={handleRemoveFont}>
                          <FormattedMessage id="setting.system.delete" />
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
                <FormattedMessage id="plugin.titleimage.preview.text.edit" />
              </Button>
            </div>
            <img className="preview" src={previewData} />
          </Col>
        </Row>
      </Card>
      <ModalForm
        title={intl.formatMessage({ id: 'plugin.titleimage.preview.text' })}
        open={visible}
        modalProps={{
          onCancel: () => setVisible(false),
        }}
        onFinish={confirmChangeText}
      >
        <ProFormText name="text" />
      </ModalForm>
    </PageContainer>
  );
};

export default PluginTitleImage;
