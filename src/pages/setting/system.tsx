import AttachmentSelect from '@/components/attachment';
import CollapseItem from '@/components/collaspeItem';
import NewContainer from '@/components/NewContainer';
import {
  deleteSystemFavicon,
  getSettingSystem,
  saveSettingSystem,
  saveSystemFavicon,
} from '@/services/setting';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Button, Card, Col, message, Modal, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const SettingSystemFrom: React.FC<any> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [setting, setSetting] = useState<any>({});
  const [siteLogo, setSiteLogo] = useState<string>('');
  const [site_close, setSiteClose] = useState<number>(0);
  const [extraFields, setExtraFields] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await getSettingSystem();
    let setting = res.data || { system: {}, template_names: [] };
    setSetting(setting);
    setSiteLogo(setting.system?.site_logo || '');
    setSiteClose(setting.system?.site_close || 0);
    setExtraFields(setting.system.extra_fields || []);
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
    setSiteLogo(row.logo);
    message.success(
      intl.formatMessage({ id: 'setting.system.upload-success' }),
    );
  };

  const handleRemoveLogo = (e: any) => {
    e.stopPropagation();
    setSiteLogo('');
  };

  const handleRemoveFavicon = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.system.confirm-delete-ico' }),
      onOk: () => {
        deleteSystemFavicon({}).then((res) => {
          message.info(res.msg);
          getSetting();
        });
      },
    });
  };

  const handleUploadFavicon = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSystemFavicon(formData)
      .then((res) => {
        message.success(res.msg);
        getSetting();
      })
      .finally(() => {
        hide();
      });
  };

  const onSubmit = async (values: any) => {
    values.site_logo = siteLogo;
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSettingSystem(values)
      .then(async (res) => {
        message.success(res.msg);
        const system = await initialState?.fetchSystemSetting?.();
        if (system) {
          await setInitialState((s) => ({
            ...s,
            system: system,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const getLangName = (lang: string) => {
    switch (lang) {
      case 'zh-CN':
        return '中文';
      case 'en-US':
        return 'English';
      case 'ja-JP':
        return '日本語';
      case 'ko-KR':
        return '한국어';
      case 'zh-TW':
        return '繁體中文';
      case 'fa-IR':
        return 'فارسی';
      case 'pt-BR':
        return 'Português';
      case 'ru-RU':
        return 'Русский';
      case 'id-ID':
        return 'Bahasa Indonesia';
      case 'bn-BD':
        return 'বাংলা';
      default:
        return lang;
    }
  };

  return (
    <NewContainer onTabChange={(key) => onTabChange(key)}>
      <Card key={newKey}>
        {setting.system && (
          <ProForm
            initialValues={setting.system}
            onFinish={onSubmit}
            title={intl.formatMessage({ id: 'menu.setting.system' })}
          >
            <ProFormText
              name="site_name"
              label={intl.formatMessage({ id: 'setting.system.site-name' })}
              width="lg"
              extra={intl.formatMessage({
                id: 'setting.system.site-name-description',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'setting.system.site-name-error',
                  }),
                },
              ]}
            />
            <ProFormText
              name="base_url"
              label={intl.formatMessage({ id: 'setting.system.base-url' })}
              width="lg"
              extra={intl.formatMessage({
                id: 'setting.system.base-url-description',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'setting.system.base-url-error',
                  }),
                },
              ]}
            />
            <ProFormText
              name="mobile_url"
              label={intl.formatMessage({ id: 'setting.system.mobile-url' })}
              width="lg"
              extra={intl.formatMessage({
                id: 'setting.system.mobile-url-description',
              })}
            />
            <ProFormText
              label={intl.formatMessage({ id: 'setting.system.site-logo' })}
              width="lg"
              extra={intl.formatMessage({
                id: 'setting.system.site-logo-description',
              })}
            >
              <AttachmentSelect onSelect={handleSelectLogo} open={false}>
                <div className="ant-upload-item">
                  {siteLogo ? (
                    <>
                      <img src={siteLogo} style={{ width: '100%' }} />
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
            <ProFormText
              label={intl.formatMessage({ id: 'setting.system.site-ico' })}
              extra={intl.formatMessage({
                id: 'setting.system.site-ico-description',
              })}
            >
              <Upload
                name="file"
                className="logo-uploader"
                showUploadList={false}
                accept=".jpg,.jpeg,.png,.gif,.webp,.ico,.bmp"
                customRequest={async (e) => handleUploadFavicon(e)}
              >
                <div className="ant-upload-item">
                  {setting.system?.favicon ? (
                    <>
                      <img
                        src={setting.system.favicon}
                        style={{ width: '100%' }}
                      />
                      <a className="delete" onClick={handleRemoveFavicon}>
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
              </Upload>
            </ProFormText>
            <ProFormText
              name="site_icp"
              label={intl.formatMessage({ id: 'setting.system.site-icp' })}
              width="lg"
              extra={
                <div>
                  <FormattedMessage id="setting.system.site-icp-description-before" />
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    beian.miit.gov.cn
                  </a>
                  <FormattedMessage id="setting.system.site-icp-description-after" />
                </div>
              }
            />
            <ProFormTextArea
              name="site_copyright"
              width="lg"
              label={intl.formatMessage({
                id: 'setting.system.site-copyright',
              })}
              placeholder={intl.formatMessage({
                id: 'setting.system.site-copyright-placeholder',
              })}
              extra={intl.formatMessage({
                id: 'setting.system.site-copyright-description',
              })}
            />
            <ProFormSelect
              name="language"
              width="lg"
              label={intl.formatMessage({ id: 'setting.system.language' })}
              request={async () => {
                let names = [];
                for (let item of setting.languages) {
                  names.push({ label: getLangName(item), value: item });
                }
                return names;
              }}
              extra={intl.formatMessage({
                id: 'setting.system.language-description',
              })}
            />
            <ProFormText
              name="admin_url"
              label={intl.formatMessage({ id: 'setting.system.admin-url' })}
              width="lg"
              fieldProps={{
                suffix: '/system/',
                placeholder: intl.formatMessage({
                  id: 'setting.system.admin-url-placeholder',
                }),
              }}
              extra={
                <div>
                  <div>
                    <FormattedMessage id="setting.system.admin-url-description-before" />
                  </div>
                  <div>
                    <FormattedMessage id="setting.system.admin-url-description-notice" />
                    <span className="text-red">
                      <FormattedMessage id="setting.system.admin-url-description-notice-value" />
                    </span>
                    <FormattedMessage id="setting.system.admin-url-description-after" />
                  </div>
                </div>
              }
            />
            <ProFormRadio.Group
              name="site_close"
              label={intl.formatMessage({ id: 'setting.system.site-close' })}
              extra={intl.formatMessage({
                id: 'setting.system.site-close-description',
              })}
              fieldProps={{
                onChange: (e: any) => {
                  setSiteClose(e.target.value);
                },
              }}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({ id: 'setting.system.normal' }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.system.close' }),
                },
                {
                  value: 2,
                  label: intl.formatMessage({ id: 'setting.system.spider' }),
                },
              ]}
            />
            {(site_close === 1 || site_close === 2) && (
              <ProFormTextArea
                name="site_close_tips"
                label={intl.formatMessage({
                  id: 'setting.system.site-close-tips',
                })}
                width="lg"
                extra={intl.formatMessage({
                  id: 'setting.system.site-close-tips-description',
                })}
              />
            )}
            <ProFormRadio.Group
              name="ban_spider"
              label={intl.formatMessage({
                id: 'setting.system.spider-visible',
              })}
              extra={intl.formatMessage({
                id: 'setting.system.spider-visible-description',
              })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({ id: 'setting.system.visible' }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({
                    id: 'setting.system.ban-spider',
                  }),
                },
              ]}
            />
            <CollapseItem
              className="mb-normal"
              header={intl.formatMessage({ id: 'setting.system.diy-params' })}
              showArrow
              extra={
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    extraFields.push({ name: '', value: '', remark: '' });
                    setExtraFields([].concat(extraFields));
                  }}
                >
                  <FormattedMessage id="setting.system.add-param" />
                </Button>
              }
              key="1"
            >
              {extraFields.map((_: any, index: number) => (
                <Row key={index} gutter={16}>
                  <Col span={8}>
                    <ProFormText
                      name={['extra_fields', index, 'name']}
                      label={intl.formatMessage({
                        id: 'setting.system.param-name',
                      })}
                      required={true}
                      width="lg"
                      extra={intl.formatMessage({
                        id: 'setting.system.param-name-description',
                      })}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name={['extra_fields', index, 'value']}
                      label={intl.formatMessage({
                        id: 'setting.system.param-value',
                      })}
                      required={true}
                      width="lg"
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormText
                      name={['extra_fields', index, 'remark']}
                      label={intl.formatMessage({
                        id: 'setting.system.remark',
                      })}
                      width="lg"
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{ marginTop: '30px' }}
                      onClick={() => {
                        Modal.confirm({
                          title: intl.formatMessage({
                            id: 'setting.system.confirm-delete-param',
                          }),
                          onOk: () => {
                            extraFields.splice(index, 1);
                            setExtraFields([].concat(extraFields));
                          },
                        });
                      }}
                    >
                      <FormattedMessage id="setting.system.delete" />
                    </Button>
                  </Col>
                </Row>
              ))}
            </CollapseItem>
          </ProForm>
        )}
      </Card>
    </NewContainer>
  );
};

export default SettingSystemFrom;
