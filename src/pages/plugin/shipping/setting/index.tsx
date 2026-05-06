import NewContainer from '@/components/NewContainer';
import {
  pluginGetShippingSetting,
  pluginSaveShippingSetting,
} from '@/services';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Card, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react';

const ShippingSetting: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetShippingSetting();
    let settingData = res.data || {};
    setSetting(settingData);
  };

  const onTabChange = (key: string) => {
    getSetting().then(() => {
      setNewKey(key);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    pluginSaveShippingSetting(values)
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
    <NewContainer
      onTabChange={(key) => onTabChange(key)}
      title={intl.formatMessage({ id: 'plugin.shipping.setting' })}
    >
      <Card key={newKey}>
        {setting && (
          <ProForm initialValues={setting} onFinish={onSubmit}>
            <ProFormList
              name="units"
              label={intl.formatMessage({ id: 'setting.shipping.units' })}
              min={1}
              actionRender={(items: any) => (
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    items.push({ name: '', volume_name: '', ratio: 1 });
                  }}
                >
                  {intl.formatMessage({ id: 'setting.shipping.add-unit' })}
                </Button>
              )}
              copyIconProps={false}
              deleteIconProps={false}
            >
              {(field, index, action) => (
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    marginBottom: '12px',
                    padding: '12px',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ width: '140px' }}>
                    <ProFormText
                      fieldProps={{
                        placeholder: intl.formatMessage({
                          id: 'setting.shipping.length-unit-name',
                        }),
                      }}
                      {...field}
                      name={['name']}
                      label={intl.formatMessage({
                        id: 'setting.shipping.length-unit-name',
                      })}
                      width="md"
                    />
                  </div>
                  <div style={{ width: '160px' }}>
                    <ProFormText
                      fieldProps={{
                        placeholder: intl.formatMessage({
                          id: 'setting.shipping.volume-unit-name',
                        }),
                      }}
                      {...field}
                      name={['volume_name']}
                      label={intl.formatMessage({
                        id: 'setting.shipping.volume-unit-name',
                      })}
                      width="md"
                    />
                  </div>
                  <div style={{ width: '180px' }}>
                    <ProFormDigit
                      fieldProps={{
                        min: 0,
                        step: 0.0001,
                        precision: 6,
                        placeholder: '0.01',
                        addonAfter: intl.formatMessage({
                          id: 'setting.shipping.ratio-to-m.suffix',
                        }),
                      }}
                      {...field}
                      name={['ratio']}
                      label={intl.formatMessage({
                        id: 'setting.shipping.ratio-to-m',
                      })}
                      width="md"
                    />
                  </div>
                  <div style={{ width: '80px', textAlign: 'right' }}>
                    <Tooltip
                      title={intl.formatMessage({
                        id: 'setting.system.delete',
                      })}
                    >
                      <Button
                        type="link"
                        danger
                        icon={
                          <MinusCircleOutlined style={{ fontSize: '18px' }} />
                        }
                        onClick={() => {
                          action.remove(index);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              )}
            </ProFormList>
            <ProFormList
              name="weight_units"
              label={intl.formatMessage({
                id: 'setting.shipping.weight-units',
              })}
              min={1}
              actionRender={(items: any) => (
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    items.push({ name: '', ratio: 1 });
                  }}
                >
                  {intl.formatMessage({ id: 'setting.shipping.add-unit' })}
                </Button>
              )}
              copyIconProps={false}
              deleteIconProps={false}
            >
              {(field, index, action) => (
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    marginBottom: '12px',
                    padding: '12px',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ width: '140px' }}>
                    <ProFormText
                      fieldProps={{
                        placeholder: intl.formatMessage({
                          id: 'setting.shipping.length-unit-name',
                        }),
                      }}
                      {...field}
                      name={['name']}
                      label={intl.formatMessage({
                        id: 'setting.shipping.weight-unit-name',
                      })}
                      width="md"
                    />
                  </div>
                  <div style={{ width: '180px' }}>
                    <ProFormDigit
                      fieldProps={{
                        min: 0,
                        step: 0.0001,
                        precision: 6,
                        placeholder: '0.01',
                        addonAfter: intl.formatMessage({
                          id: 'setting.shipping.ratio-to-kg.suffix',
                        }),
                      }}
                      {...field}
                      name={['ratio']}
                      label={intl.formatMessage({
                        id: 'setting.shipping.ratio-to-kg',
                      })}
                      width="md"
                    />
                  </div>
                  <div style={{ width: '80px', textAlign: 'right' }}>
                    <Tooltip
                      title={intl.formatMessage({
                        id: 'setting.system.delete',
                      })}
                    >
                      <Button
                        type="link"
                        danger
                        icon={
                          <MinusCircleOutlined style={{ fontSize: '18px' }} />
                        }
                        onClick={() => {
                          action.remove(index);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              )}
            </ProFormList>

            <ProFormDigit
              name="volumetric_divisor"
              label={intl.formatMessage({
                id: 'setting.shipping.volumetric-divisor',
              })}
              width="lg"
              fieldProps={{
                min: 0,
                step: 1,
                precision: 0,
              }}
              placeholder={intl.formatMessage({
                id: 'setting.shipping.volumetric-divisor-placeholder',
              })}
              extra={intl.formatMessage({
                id: 'setting.shipping.volumetric-divisor-description',
              })}
            />
          </ProForm>
        )}
      </Card>
    </NewContainer>
  );
};

export default ShippingSetting;
