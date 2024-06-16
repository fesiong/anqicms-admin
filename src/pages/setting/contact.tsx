import AttachmentSelect from '@/components/attachment';
import CollapseItem from '@/components/collaspeItem';
import { getSettingContact, saveSettingContact } from '@/services/setting';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, Col, Modal, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';

const SettingContactFrom: React.FC<any> = (props) => {
  const [setting, setSetting] = useState<any>(null);
  const [qrcode, setQrcode] = useState<string>('');
  const [extraFields, setExtraFields] = useState<any[]>([]);
  const intl = useIntl();
  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await getSettingContact();
    let setting = res.data || null;
    setSetting(setting);
    setQrcode(setting?.qrcode || '');
    setExtraFields(setting.extra_fields || []);
  };

  const handleSelectLogo = (row: any) => {
    setQrcode(row.logo);
    message.success(intl.formatMessage({ id: 'setting.system.upload-success' }));
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
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
    <PageContainer>
      <Card>
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
            <ProFormText label={intl.formatMessage({ id: 'setting.contact.qrcode' })} width="lg">
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
              {extraFields.map((item: any, index: number) => (
                <Row key={index} gutter={16}>
                  <Col span={8}>
                    <ProFormText
                      name={['extra_fields', index, 'name']}
                      label={intl.formatMessage({ id: 'setting.system.param-name' })}
                      required={true}
                      width="lg"
                      extra={intl.formatMessage({ id: 'setting.system.param-name-description' })}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name={['extra_fields', index, 'value']}
                      label={intl.formatMessage({ id: 'setting.system.param-value' })}
                      required={true}
                      width="lg"
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormText
                      name={['extra_fields', index, 'remark']}
                      label={intl.formatMessage({ id: 'setting.system.remark' })}
                      width="lg"
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{ marginTop: '30px' }}
                      onClick={() => {
                        Modal.confirm({
                          title: intl.formatMessage({ id: 'setting.system.confirm-delete-param' }),
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
    </PageContainer>
  );
};

export default SettingContactFrom;
