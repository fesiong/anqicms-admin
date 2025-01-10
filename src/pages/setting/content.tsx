import AttachmentSelect from '@/components/attachment';
import NewContainer from '@/components/NewContainer';
import {
  convertImagetoWebp,
  getSettingContent,
  rebuildThumb,
  saveSettingContent,
} from '@/services/setting';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const SettingContactFrom: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [defaultThumb, setDefaultThumb] = useState<string>('');
  const [resize_image, setResizeImage] = useState<number>(0);
  const [useWebp, setUseWebp] = useState<number>(0);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await getSettingContent();
    let setting = res.data || null;
    setDefaultThumb(setting?.default_thumb || '');
    setResizeImage(setting?.resize_image || 0);
    setUseWebp(setting?.use_webp || 0);
    setSetting(setting);
  };

  const onTabChange = (key: string) => {
    getSetting().then(() => {
      setNewKey(key);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleSelectLogo = (row: any) => {
    setDefaultThumb(row.logo);
    message.success(
      intl.formatMessage({ id: 'setting.system.upload-success' }),
    );
  };

  const handleRemoveLogo = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.system.confirm-delete' }),
      onOk: async () => {
        setDefaultThumb('');
      },
    });
  };

  const handleConvertToWebp = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.content.confirm-convert-webp' }),
      content: intl.formatMessage({
        id: 'setting.content.confirm-convert-webp.content',
      }),
      onOk: () => {
        convertImagetoWebp({}).then((res) => {
          message.info(res.msg);
        });
      },
    });
  };

  const handleRebuildThumb = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.content.confirm-thumbnal' }),
      content: intl.formatMessage({
        id: 'setting.content.confirm-thumbnal.content',
      }),
      onOk: () => {
        rebuildThumb({}).then((res) => {
          message.info(res.msg);
        });
      },
    });
  };

  const onSubmit = async (values: any) => {
    values.default_thumb = defaultThumb;
    values.filter_outlink = Number(values.filter_outlink);
    values.url_token_type = Number(values.url_token_type);
    values.remote_download = Number(values.remote_download);
    values.resize_image = Number(values.resize_image);
    values.resize_width = Number(values.resize_width);
    values.thumb_crop = Number(values.thumb_crop);
    values.thumb_width = Number(values.thumb_width);
    values.thumb_height = Number(values.thumb_height);
    values.quality = Number(values.quality);
    values.use_sort = Number(values.use_sort);
    values.max_page = Number(values.max_page);
    values.max_limit = Number(values.max_limit);

    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSettingContent(values)
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <NewContainer onTabChange={(key) => onTabChange(key)}>
      <Card key={newKey}>
        {setting && (
          <ProForm
            initialValues={setting}
            onFinish={onSubmit}
            title={intl.formatMessage({ id: 'menu.setting.content' })}
          >
            <ProFormRadio.Group
              name="editor"
              label={intl.formatMessage({ id: 'setting.content.editor' })}
              options={[
                {
                  value: '',
                  label: intl.formatMessage({
                    id: 'setting.content.editor.fulltext',
                  }),
                },
                {
                  value: 'markdown',
                  label: intl.formatMessage({
                    id: 'setting.content.editor.markdown',
                  }),
                },
              ]}
              extra={intl.formatMessage({
                id: 'setting.content.editor.description',
              })}
            />
            <ProFormRadio.Group
              name="remote_download"
              label={intl.formatMessage({
                id: 'setting.content.remote-download',
              })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.notenable',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
            />
            <ProFormRadio.Group
              name="filter_outlink"
              label={intl.formatMessage({
                id: 'setting.content.outlink-filter',
              })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.outlink-filter.allow',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({
                    id: 'setting.content.outlink-filter.remove',
                  }),
                },
                {
                  value: 2,
                  label: intl.formatMessage({
                    id: 'setting.content.outlink-filter.nofollow',
                  }),
                },
              ]}
            />
            <ProFormRadio.Group
              name="url_token_type"
              label={intl.formatMessage({ id: 'setting.content.urltoken' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.urltoken.long',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({
                    id: 'setting.content.urltoken.short',
                  }),
                },
              ]}
              extra={intl.formatMessage({
                id: 'setting.content.urltoken.description',
              })}
            />
            <ProFormRadio.Group
              name="multi_category"
              label={intl.formatMessage({
                id: 'setting.content.multi-category',
              })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.notenable',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
              extra={intl.formatMessage({
                id: 'setting.content.multi-category.description',
              })}
            />
            <ProFormRadio.Group
              name="use_sort"
              label={intl.formatMessage({ id: 'setting.content.archive-sort' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.notenable',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
              extra={intl.formatMessage({
                id: 'setting.content.archive-sort.description',
              })}
            />
            <ProFormText
              name="max_page"
              label={intl.formatMessage({ id: 'setting.content.max-page' })}
              width="lg"
              placeholder={intl.formatMessage({
                id: 'setting.content.max-page.placeholder',
              })}
              fieldProps={{
                suffix: intl.formatMessage({
                  id: 'setting.content.max-page.suffix',
                }),
              }}
              extra={intl.formatMessage({
                id: 'setting.content.max-page.description',
              })}
            />
            <ProFormText
              name="max_limit"
              label={intl.formatMessage({ id: 'setting.content.max-limit' })}
              width="lg"
              placeholder={intl.formatMessage({
                id: 'setting.content.max-limit.placeholder',
              })}
              fieldProps={{
                suffix: intl.formatMessage({
                  id: 'setting.content.max-limit.suffix',
                }),
              }}
              extra={intl.formatMessage({
                id: 'setting.content.max-limit.description',
              })}
            />
            <ProFormRadio.Group
              name="use_webp"
              label={intl.formatMessage({ id: 'setting.content.use-webp' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.notenable',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
              fieldProps={{
                onChange: (e) => {
                  setUseWebp(e.target.value);
                },
              }}
              extra={
                <div>
                  <span>
                    <FormattedMessage id="setting.content.use-webp.description" />
                  </span>
                  <span>
                    <FormattedMessage id="setting.content.use-webp.description.tips" />
                    <Button size="small" onClick={handleConvertToWebp}>
                      <FormattedMessage id="setting.content.use-webp.description.convert" />
                    </Button>
                  </span>
                </div>
              }
            />
            {useWebp === 1 && (
              <ProFormRadio.Group
                name="convert_gif"
                label={intl.formatMessage({
                  id: 'setting.content.convert-gif',
                })}
                options={[
                  {
                    value: 0,
                    label: intl.formatMessage({
                      id: 'setting.content.notenable',
                    }),
                  },
                  {
                    value: 1,
                    label: intl.formatMessage({ id: 'setting.content.enable' }),
                  },
                ]}
                extra={
                  <div>
                    <span>
                      <FormattedMessage id="setting.content.convert-gif.description" />
                    </span>
                  </div>
                }
              />
            )}
            <ProFormText
              name="quality"
              label={intl.formatMessage({ id: 'setting.content.quality' })}
              width="lg"
              placeholder={intl.formatMessage({
                id: 'setting.content.quality.placeholder',
              })}
              fieldProps={{
                suffix: '%',
              }}
              extra={intl.formatMessage({
                id: 'setting.content.quality.description',
              })}
            />
            <ProFormRadio.Group
              name="resize_image"
              label={intl.formatMessage({ id: 'setting.content.resize-image' })}
              fieldProps={{
                onChange: (e: any) => {
                  setResizeImage(e.target.value);
                },
              }}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.notenable',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
            />
            {resize_image === 1 && (
              <ProFormText
                name="resize_width"
                label={intl.formatMessage({
                  id: 'setting.content.resize-width',
                })}
                width="lg"
                placeholder={intl.formatMessage({
                  id: 'setting.content.resize-width.placeholder',
                })}
                fieldProps={{
                  suffix: intl.formatMessage({
                    id: 'setting.content.resize-width.suffix',
                  }),
                }}
              />
            )}
            <ProFormRadio.Group
              name="thumb_crop"
              label={intl.formatMessage({ id: 'setting.content.thumb-crop' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({
                    id: 'setting.content.thumb-crop.bylong',
                  }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({
                    id: 'setting.content.thumb-crop.byshort',
                  }),
                },
                {
                  value: 2,
                  label: intl.formatMessage({
                    id: 'setting.content.thumb-crop.short-crop',
                  }),
                },
              ]}
            />
            <ProFormGroup
              title={intl.formatMessage({ id: 'setting.content.thumb-size' })}
            >
              <ProFormText
                name="thumb_width"
                width="sm"
                fieldProps={{
                  suffix: intl.formatMessage({
                    id: 'setting.content.thumb-size.width',
                  }),
                }}
              />
              ×
              <ProFormText
                name="thumb_height"
                width="sm"
                fieldProps={{
                  suffix: intl.formatMessage({
                    id: 'setting.content.thumb-size.height',
                  }),
                }}
              />
            </ProFormGroup>
            <div className="text-muted mb-normal">
              <span>
                <FormattedMessage id="setting.system.thumb-size.tips" />
                <Button size="small" onClick={handleRebuildThumb}>
                  <FormattedMessage id="setting.content.make-thumb" />
                </Button>
              </span>
            </div>
            <ProFormText
              label={intl.formatMessage({
                id: 'setting.content.default-thumb',
              })}
              width="lg"
              extra={intl.formatMessage({
                id: 'setting.content.default-thumb.description',
              })}
            >
              <AttachmentSelect onSelect={handleSelectLogo} open={false}>
                <div className="ant-upload-item">
                  {defaultThumb ? (
                    <>
                      <img src={defaultThumb} style={{ width: '100%' }} />
                      <a className="delete" onClick={handleRemoveLogo}>
                        <FormattedMessage id="setting.system.delete" />
                      </a>
                    </>
                  ) : (
                    <div className="add">
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        <FormattedMessage id="setting.system.upload" />
                      </div>
                    </div>
                  )}
                </div>
              </AttachmentSelect>
            </ProFormText>
          </ProForm>
        )}
      </Card>
    </NewContainer>
  );
};

export default SettingContactFrom;
