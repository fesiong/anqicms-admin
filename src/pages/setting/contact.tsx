import AttachmentSelect from '@/components/attachment';
import CollapseItem from '@/components/collaspeItem';
import NewContainer from '@/components/NewContainer';
import { getSettingContact, saveSettingContact } from '@/services/setting';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, Col, message, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';

const SettingContactFrom: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [qrcode, setQrcode] = useState<string>('');
  const [extraFields, setExtraFields] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await getSettingContact();
    let setting = res.data || null;
    setSetting(setting);
    setQrcode(setting?.qrcode || '');
    setExtraFields(setting.extra_fields || []);
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
    setQrcode(row.logo);
    message.success(
      intl.formatMessage({ id: 'setting.system.upload-success' }),
    );
  };

  const handleRemoveLogo = (e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.system.confirm-delete' }),
      onOk: async () => {
        setQrcode('');
      },
    });
  };

  const onSubmit = async (values: any) => {
    values.qrcode = qrcode;
    values.extra_fields = extraFields;
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSettingContact(values)
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
            title={intl.formatMessage({ id: 'menu.setting.contact' })}
          >
            <ProFormText
              name="user_name"
              label={intl.formatMessage({ id: 'setting.contact.username' })}
              width="lg"
            />
            <ProFormText
              name="cellphone"
              label={intl.formatMessage({ id: 'setting.contact.cellphone' })}
              width="lg"
            />
            <ProFormText
              name="address"
              label={intl.formatMessage({ id: 'setting.contact.address' })}
              width="lg"
            />
            <ProFormText
              name="email"
              label={intl.formatMessage({ id: 'setting.contact.email' })}
              width="lg"
            />
            <ProFormText
              name="wechat"
              label={intl.formatMessage({ id: 'setting.contact.wechat' })}
              width="lg"
            />
            <ProFormText
              label={intl.formatMessage({ id: 'setting.contact.qrcode' })}
              width="lg"
            >
              <AttachmentSelect onSelect={handleSelectLogo} open={false}>
                <div className="ant-upload-item">
                  {qrcode ? (
                    <>
                      <img src={qrcode} style={{ width: '100%' }} />
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

            <CollapseItem
              header={intl.formatMessage({ id: 'setting.contact.more' })}
              showArrow
              key="0"
            >
              <ProFormText name="qq" label="QQ" width="lg" />
              <ProFormText name="whats_app" label="WhatsApp" width="lg" />
              <ProFormText name="facebook" label="Facebook" width="lg" />
              <ProFormText name="twitter" label="Twitter" width="lg" />
              <ProFormText name="tiktok" label="Tiktok" width="lg" />
              <ProFormText name="pinterest" label="Pinterest" width="lg" />
              <ProFormText name="linkedin" label="Linkedin" width="lg" />
              <ProFormText name="instagram" label="Instagram" width="lg" />
              <ProFormText name="youtube" label="Youtube" width="lg" />
            </CollapseItem>

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
              {extraFields.map((row: any, index: number) => (
                <Row key={index} gutter={16}>
                  <Col sm={8} xs={12}>
                    <ProFormText
                      name={['extra_fields', index, 'name']}
                      label={intl.formatMessage({
                        id: 'setting.system.param-name',
                      })}
                      fieldProps={{
                        value: row.name,
                        onChange: (e: any) => {
                          extraFields[index].name = e.target.value;
                          setExtraFields([].concat(extraFields));
                        },
                      }}
                      required={true}
                      extra={intl.formatMessage({
                        id: 'setting.system.param-name-description',
                      })}
                    />
                  </Col>
                  <Col sm={8} xs={12}>
                    <ProFormText
                      name={['extra_fields', index, 'value']}
                      label={intl.formatMessage({
                        id: 'setting.system.param-value',
                      })}
                      fieldProps={{
                        value: row.value,
                        onChange: (e: any) => {
                          extraFields[index].value = e.target.value;
                          setExtraFields([].concat(extraFields));
                        },
                      }}
                    />
                  </Col>
                  <Col sm={6} xs={12}>
                    <ProFormText
                      name={['extra_fields', index, 'remark']}
                      label={intl.formatMessage({
                        id: 'setting.system.remark',
                      })}
                      fieldProps={{
                        value: row.remark,
                        onChange: (e: any) => {
                          extraFields[index].remark = e.target.value;
                          setExtraFields([].concat(extraFields));
                        },
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={12}>
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

export default SettingContactFrom;
