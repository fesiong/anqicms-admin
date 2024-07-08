import { getCategories, getModules } from '@/services';
import { pluginBuildSitemap, pluginGetSitemap, pluginSaveSitemap } from '@/services/plugin/sitemap';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Alert, Button, Card, Space, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const PluginSitemap: React.FC<any> = (props) => {
  const formRef = React.createRef<ProFormInstance>();
  const [sitemapSetting, setSitemapSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetSitemap();
    let setting = res.data || {};
    setSitemapSetting(setting);
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    pluginSaveSitemap(values)
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

  const rebuildSitemap = () => {
    let values = formRef.current?.getFieldsValue();
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    pluginBuildSitemap(values)
      .then((res) => {
        message.info(res.msg);
        if (res.code === 0) {
          setSitemapSetting(res.data);
        }
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <PageContainer>
      <Card>
        <Alert
          message={
            <div>
              <div>
                <FormattedMessage id="plugin.sitemap.tips1" />
              </div>
              <div>
                <FormattedMessage id="plugin.sitemap.tips2" />
              </div>
            </div>
          }
        />
        {fetched && (
          <div className="mt-normal">
            <ProForm onFinish={onSubmit} initialValues={sitemapSetting} formRef={formRef}>
              <Card size="small" title={intl.formatMessage({ id: 'menu.plugin.sitemap' })} bordered={false}>
                <ProFormRadio.Group
                  name="type"
                  label={intl.formatMessage({ id: 'plugin.sitemap.type' })}
                  options={[
                    { value: 'txt', label: 'txt' },
                    { value: 'xml', label: 'xml' },
                  ]}
                />
                <ProFormRadio.Group
                  name="auto_build"
                  label={intl.formatMessage({ id: 'plugin.sitemap.auto-build' })}
                  options={[
                    { value: 0, label: intl.formatMessage({ id: 'plugin.sitemap.auto-build.manual' }) },
                    { value: 1, label: intl.formatMessage({ id: 'plugin.sitemap.auto-build.auto' }) },
                  ]}
                />
                <ProFormRadio.Group
                  name="exclude_tag"
                  label={intl.formatMessage({ id: 'plugin.sitemap.exclude-tag' })}
                  options={[
                    { value: false, label: intl.formatMessage({ id: 'plugin.sitemap.exclude-tag.no' }) },
                    { value: true, label: intl.formatMessage({ id: 'plugin.sitemap.exclude-tag.yes' }) },
                  ]}
                />
                <ProFormSelect
                  name={'exclude_module_ids'}
                  label={intl.formatMessage({ id: 'plugin.sitemap.exculde-module' })}
                  mode="multiple"
                  request={async () => {
                    let res = await getModules({});
                    const tmpModules = (res.data || []).map((item: any) => ({
                      label: item.title,
                      value: item.id,
                    }));
                    return tmpModules;
                  }}
                  placeholder={intl.formatMessage({ id: 'plugin.sitemap.exculde-module.description' })}
                />
                <ProFormSelect
                  name={'exclude_category_ids'}
                  label={intl.formatMessage({ id: 'plugin.sitemap.exculde-category' })}
                  mode="multiple"
                  request={async () => {
                    let res = await getCategories({ type: 1 });
                    const tmpData = (res.data || []).map((item: any) => ({
                      label: item.spacer.replaceAll('&nbsp;', ' ') + item.title,
                      value: item.id,
                    }));
                    return tmpData;
                  }}
                  placeholder={intl.formatMessage({ id: 'plugin.sitemap.exculde-category.description' })}
                />
                <ProFormSelect
                  name={'exclude_page_ids'}
                  label={intl.formatMessage({ id: 'plugin.sitemap.exculde-page' })}
                  mode="multiple"
                  request={async () => {
                    let res = await getCategories({ type: 3 });
                    const tmpData = (res.data || []).map((item: any) => ({
                      label: item.spacer.replaceAll('&nbsp;', ' ') + item.title,
                      value: item.id,
                    }));
                    return tmpData;
                  }}
                  placeholder={intl.formatMessage({ id: 'plugin.sitemap.exculde-page.description' })}
                />
              </Card>
            </ProForm>
            <div className="mt-normal">
              <Card size="small" title={intl.formatMessage({ id: 'plugin.sitemap.action' })} bordered={false}>
                <div><FormattedMessage id="plugin.sitemap.action.tips" /></div>
                <ProFormText
                  readonly
                  label={intl.formatMessage({ id: 'plugin.sitemap.last-time' })}
                  fieldProps={{
                    value: dayjs(sitemapSetting.updated_time * 1000).format('YYYY-MM-DD HH:mm'),
                  }}
                />
                <Space size={20}>
                  <Button
                    type="primary"
                    onClick={() => {
                      rebuildSitemap();
                    }}
                  >
                    <FormattedMessage id="plugin.sitemap.build" />
                  </Button>
                  <Button
                    onClick={() => {
                      window.open(sitemapSetting.sitemap_url);
                    }}
                  >
                    <FormattedMessage id="plugin.sitemap.view" />
                  </Button>
                </Space>
              </Card>
            </div>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default PluginSitemap;
