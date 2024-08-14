import { getSettingSafe, saveSettingSafe } from '@/services';
import {
  PageContainer,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';

const SettingSafeFrom: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const intl = useIntl();

  const getSetting = async () => {
    const res = await getSettingSafe();
    let setting = res.data || null;
    setSetting(setting);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    values.captcha = Number(values.captcha);
    values.admin_captcha_off = Number(values.admin_captcha_off);
    values.daily_limit = Number(values.daily_limit);
    values.content_limit = Number(values.content_limit);
    values.interval_limit = Number(values.interval_limit);
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    saveSettingSafe(values)
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
            title={intl.formatMessage({ id: 'menu.setting.safe' })}
          >
            <ProFormRadio.Group
              name="admin_captcha_off"
              label={intl.formatMessage({ id: 'setting.safe.admin-captcha' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.notenable' }),
                },
              ]}
              extra={intl.formatMessage({ id: 'setting.safe.admin-captcha.description' })}
            />
            <ProFormRadio.Group
              name="captcha"
              label={intl.formatMessage({ id: 'setting.safe.captcha' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({ id: 'setting.content.notenable' }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
              extra={intl.formatMessage({ id: 'setting.safe.captcha.description' })}
            />
            <ProFormText
              name="daily_limit"
              label={intl.formatMessage({ id: 'setting.safe.daily-limit' })}
              width="lg"
              fieldProps={{
                suffix: intl.formatMessage({ id: 'setting.safe.daily-limit.suffix' }),
              }}
              extra={intl.formatMessage({ id: 'setting.safe.daily-limit.description' })}
            />
            <ProFormText
              name="content_limit"
              label={intl.formatMessage({ id: 'setting.safe.content-limit' })}
              width="lg"
              fieldProps={{
                suffix: intl.formatMessage({ id: 'setting.safe.content-limit.suffix' }),
              }}
              extra={intl.formatMessage({ id: 'setting.safe.daily-limit.description' })}
            />
            <ProFormText
              name="interval_limit"
              label={intl.formatMessage({ id: 'setting.safe.interval-limit' })}
              width="lg"
              fieldProps={{
                suffix: intl.formatMessage({ id: 'setting.safe.interval-limit.suffix' }),
              }}
              extra={intl.formatMessage({ id: 'setting.safe.daily-limit.description' })}
            />
            <ProFormTextArea
              name="content_forbidden"
              label={intl.formatMessage({ id: 'setting.safe.content-forbidden' })}
              width="lg"
              extra={intl.formatMessage({ id: 'setting.safe.content-forbidden.description' })}
            />
            <ProFormTextArea
              name="ua_forbidden"
              label={intl.formatMessage({ id: 'setting.safe.ua-forbidden' })}
              width="lg"
              extra={intl.formatMessage({ id: 'setting.safe.ua-forbidden.description' })}
            />
            <ProFormTextArea
              name="ip_forbidden"
              label={intl.formatMessage({ id: 'setting.safe.ip-forbidden' })}
              width="lg"
              extra={intl.formatMessage({ id: 'setting.safe.ip-forbidden.description' })}
            />
            <ProFormRadio.Group
              name="api_open"
              label={intl.formatMessage({ id: 'setting.safe.api-open' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({ id: 'setting.content.notenable' }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.content.enable' }),
                },
              ]}
              extra={intl.formatMessage({ id: 'setting.safe.api-open.description' })}
            />
            <ProFormRadio.Group
              name="api_publish"
              label={intl.formatMessage({ id: 'setting.safe.api-publish' })}
              options={[
                {
                  value: 0,
                  label: intl.formatMessage({ id: 'setting.safe.api-publish.draft' }),
                },
                {
                  value: 1,
                  label: intl.formatMessage({ id: 'setting.safe.api-publish.normal' }),
                },
              ]}
            />
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default SettingSafeFrom;
