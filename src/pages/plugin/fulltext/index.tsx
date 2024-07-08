import { getModules, pluginGetFulltextConfig, pluginSaveFulltextConfig } from '@/services';
import { PageContainer, ProForm, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';

const PluginFulltext: React.FC<any> = () => {
  const [modules, setModules] = useState<any[]>([]);
  const intl = useIntl();

  useEffect(() => {
    getModules().then((res) => {
      const data = res.data || [];
      const tmpData = [];
      for (let i in data) {
        tmpData.push({ label: data[i].title, value: data[i].id });
      }
      setModules(tmpData);
    });
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    pluginSaveFulltextConfig(values)
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
        <Alert
          style={{ marginBottom: 20 }}
          description={intl.formatMessage({ id: 'plugin.fulltext.tips' })}
        />
        <ProForm
          request={async () => {
            const res = await pluginGetFulltextConfig();
            return res.data || [];
          }}
          onFinish={onSubmit}
          title={intl.formatMessage({ id: 'menu.plugin.fulltext' })}
        >
          <ProFormRadio.Group
            name={'open'}
            label={intl.formatMessage({ id: 'plugin.fulltext.open.name' })}
            options={[
              { label: intl.formatMessage({ id: 'plugin.fulltext.open.false' }), value: false },
              { label: intl.formatMessage({ id: 'plugin.fulltext.open.true' }), value: true },
            ]}
          />
          <ProFormRadio.Group
            name={'use_content'}
            label={intl.formatMessage({ id: 'plugin.fulltext.use_content.name' })}
            options={[
              { label: intl.formatMessage({ id: 'plugin.fulltext.use_content.false' }), value: false },
              { label: intl.formatMessage({ id: 'plugin.fulltext.use_content.true' }), value: true },
            ]}
          />
          <ProFormCheckbox.Group name={'modules'} label={intl.formatMessage({ id: 'plugin.fulltext.modules.name' })} options={modules} />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default PluginFulltext;
