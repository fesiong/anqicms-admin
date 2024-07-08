import { pluginGetInterferenceConfig, pluginSaveInterferenceConfig } from '@/services';
import { PageContainer, ProForm, ProFormRadio } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import { useIntl } from '@umijs/max';

const PluginInterference: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetInterferenceConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    pluginSaveInterferenceConfig(Object.assign(setting, values))
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
        {fetched && (
          <ProForm
            title={intl.formatMessage({ id: 'menu.plugin.interference' })}
            layout="vertical"
            initialValues={setting}
            onFinish={onSubmit}
          >
            <ProFormRadio.Group
              name="open"
              label={intl.formatMessage({ id: 'plugin.interference.isopen' })}
              extra={intl.formatMessage({ id: 'plugin.interference.isopen.description' })}
              options={[
                { value: false, label: intl.formatMessage({ id: 'plugin.interference.isopen.no' }) },
                { value: true, label: intl.formatMessage({ id: 'plugin.interference.isopen.yes' }) },
              ]}
            />
            <ProFormRadio.Group
              name="mode"
              label={intl.formatMessage({ id: 'plugin.interference.mode' })}
              options={[
                { value: 0, label: intl.formatMessage({ id: 'plugin.interference.mode.class' }) },
                { value: 1, label: intl.formatMessage({ id: 'plugin.interference.mode.text' }) },
              ]}
            />
            <ProFormRadio.Group
              name="disable_selection"
              label={intl.formatMessage({ id: 'plugin.interference.disable-selection' })}
              options={[
                { value: false, label: intl.formatMessage({ id: 'plugin.interference.disable-selection.no' }) },
                { value: true, label: intl.formatMessage({ id: 'plugin.interference.disable-selection.yes' }) },
              ]}
            />
            <ProFormRadio.Group
              name="disable_copy"
              label={intl.formatMessage({ id: 'plugin.interference.disable-copy' })}
              options={[
                { value: false, label: intl.formatMessage({ id: 'plugin.interference.disable-selection.no' }) },
                { value: true, label: intl.formatMessage({ id: 'plugin.interference.disable-selection.yes' }) },
              ]}
            />
            <ProFormRadio.Group
              name="disable_right_click"
              label={intl.formatMessage({ id: 'plugin.interference.disable-right-click' })}
              options={[
                { value: false, label: intl.formatMessage({ id: 'plugin.interference.disable-selection.no' }) },
                { value: true, label: intl.formatMessage({ id: 'plugin.interference.disable-selection.yes' }) },
              ]}
            />
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default PluginInterference;
