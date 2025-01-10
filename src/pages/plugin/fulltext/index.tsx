import NewContainer from '@/components/NewContainer';
import {
  getModules,
  pluginGetFulltextConfig,
  pluginSaveFulltextConfig,
} from '@/services';
import {
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Alert, Card, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';

const PluginFulltext: React.FC<any> = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await getModules();
    const data = res.data || [];
    const tmpData = [];
    // eslint-disable-next-line guard-for-in
    for (let i in data) {
      tmpData.push({ label: data[i].name, value: data[i].id });
    }
    setModules(tmpData);
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
    <NewContainer onTabChange={(key) => onTabChange(key)}>
      <Card key={newKey}>
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
              {
                label: intl.formatMessage({ id: 'plugin.fulltext.open.false' }),
                value: false,
              },
              {
                label: intl.formatMessage({ id: 'plugin.fulltext.open.true' }),
                value: true,
              },
            ]}
          />
          <ProFormRadio.Group
            name={'use_content'}
            label={intl.formatMessage({
              id: 'plugin.fulltext.use_content.name',
            })}
            options={[
              {
                label: intl.formatMessage({
                  id: 'plugin.fulltext.use_content.false',
                }),
                value: false,
              },
              {
                label: intl.formatMessage({
                  id: 'plugin.fulltext.use_content.true',
                }),
                value: true,
              },
            ]}
          />
          <ProFormCheckbox.Group
            name={'modules'}
            label={intl.formatMessage({ id: 'plugin.fulltext.modules.name' })}
            options={modules}
          />
          <ProFormCheckbox.Group
            label={intl.formatMessage({ id: 'plugin.fulltext.search.name' })}
          >
            <Space>
              <ProFormCheckbox
                name={'use_archive'}
                disabled
                initialValue={true}
              >
                <FormattedMessage id="plugin.fulltext.search.archive" />
              </ProFormCheckbox>
              <ProFormCheckbox name={'use_category'}>
                <FormattedMessage id="plugin.fulltext.search.category" />
              </ProFormCheckbox>
              <ProFormCheckbox name={'use_tag'}>
                <FormattedMessage id="plugin.fulltext.search.tag" />
              </ProFormCheckbox>
            </Space>
          </ProFormCheckbox.Group>
        </ProForm>
      </Card>
    </NewContainer>
  );
};

export default PluginFulltext;
