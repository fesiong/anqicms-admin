import { getSettingIndex, saveSettingIndex } from '@/services/setting';
import { PageContainer, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';

const SettingIndexFrom: React.FC<any> = (props) => {
  const [setting, setSetting] = useState<any>(null);
  const intl = useIntl();
  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await getSettingIndex();
    let setting = res.data || null;
    setSetting(setting);
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    saveSettingIndex(values)
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
            title={intl.formatMessage({ id: 'menu.setting.tdk' })}
          >
            <ProFormText
              name="seo_title"
              label={intl.formatMessage({ id: 'setting.index.title' })}
              width="lg"
            />
            <ProFormText
              name="seo_keywords"
              label={intl.formatMessage({ id: 'setting.index.keywords' })}
              width="lg"
              extra={
                <div>
                  <FormattedMessage id="setting.index.keywords.tips" />
                </div>
              }
            />
            <ProFormTextArea
              name="seo_description"
              label={intl.formatMessage({ id: 'setting.index.description' })}
              width="lg"
            />
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default SettingIndexFrom;
