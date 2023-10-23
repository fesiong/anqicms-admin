import React, { useEffect, useState } from 'react';
import ProForm, { ProFormRadio } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import { pluginGetInterferenceConfig, pluginSaveInterferenceConfig } from '@/services';
import './index.less';

const PluginInterference: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);

  const getSetting = async () => {
    const res = await pluginGetInterferenceConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
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
    <PageHeaderWrapper>
      <Card>
        {fetched && (
          <ProForm
            title="防采集干扰码配置"
            layout="vertical"
            initialValues={setting}
            onFinish={onSubmit}
          >
            <ProFormRadio.Group
              name="open"
              label="开启防采集干扰码"
              extra="只有开启了功能，下面的设置才有效。"
              options={[
                { value: false, label: '关闭' },
                { value: true, label: '开启' },
              ]}
            />
            <ProFormRadio.Group
              name="mode"
              label="防干扰模式"
              options={[
                { value: 0, label: '添加随机Class' },
                { value: 1, label: '添加随机隐藏文字' },
              ]}
            />
            <ProFormRadio.Group
              name="disable_selection"
              label="禁用文字选中"
              options={[
                { value: false, label: '不禁用' },
                { value: true, label: '禁用' },
              ]}
            />
            <ProFormRadio.Group
              name="disable_copy"
              label="禁用复制"
              options={[
                { value: false, label: '不禁用' },
                { value: true, label: '禁用' },
              ]}
            />
            <ProFormRadio.Group
              name="disable_right_click"
              label="禁用鼠标右键点击"
              options={[
                { value: false, label: '不禁用' },
                { value: true, label: '禁用' },
              ]}
            />
          </ProForm>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginInterference;
