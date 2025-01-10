import NewContainer from '@/components/NewContainer';
import { pluginGetJsonLdConfig, pluginSaveJsonLdConfig } from '@/services';
import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Alert, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Pluginjsonld: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetJsonLdConfig();
    let setting = res.data || {};
    setSetting(setting);
    setFetched(true);
  };

  const onTabChange = (key: string) => {
    getSetting().then(() => {
      setNewKey(key);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (data: any) => {
    let values = Object.assign(setting, data);
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    pluginSaveJsonLdConfig(values)
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
        <Alert
          message={
            <div>
              <p>
                <FormattedMessage id="plugin.jsonld.tips.1" />
              </p>
              <p>
                <FormattedMessage id="plugin.jsonld.tips.2" />
              </p>
            </div>
          }
        />
        <div className="mt-normal">
          {fetched && (
            <ProForm onFinish={onSubmit} initialValues={setting}>
              <ProFormRadio.Group
                name={'open'}
                label={intl.formatMessage({ id: 'plugin.jsonld.open.name' })}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'plugin.jsonld.open.false',
                    }),
                    value: false,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'plugin.jsonld.open.true',
                    }),
                    value: true,
                  },
                ]}
              />
              <ProFormText
                name="author"
                label={intl.formatMessage({
                  id: 'plugin.jsonld.author',
                })}
              />
              <ProFormText
                name="brand"
                label={intl.formatMessage({
                  id: 'plugin.jsonld.brand',
                })}
              />
            </ProForm>
          )}
        </div>
      </Card>
    </NewContainer>
  );
};

export default Pluginjsonld;
