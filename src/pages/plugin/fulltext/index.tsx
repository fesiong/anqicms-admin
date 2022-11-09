import React from 'react';
import ProForm, { ProFormRadio } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message } from 'antd';
import { pluginGetFulltextConfig, pluginSaveFulltextConfig } from '@/services';

const PluginFulltext: React.FC<any> = () => {
  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
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
    <PageHeaderWrapper>
      <Card>
        <Alert
          style={{ marginBottom: 20 }}
          description="开启全文搜索后，可以搜索文档内容。但是全文搜索会占用大量的服务器内存，如果你的服务器内存较小，不建议开启全文搜索。"
        />
        <ProForm
          request={async () => {
            const res = await pluginGetFulltextConfig();
            return res.data || [];
          }}
          onFinish={onSubmit}
          title="全文搜索配置"
        >
          <ProFormRadio.Group
            name={'open'}
            label="是否开启全文搜索"
            options={[
              { label: '关闭', value: false },
              { label: '开启', value: true },
            ]}
          />
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginFulltext;
