import { getModules, pluginGetFulltextConfig, pluginSaveFulltextConfig } from '@/services';
import { PageContainer, ProForm, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { Alert, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';

const PluginFulltext: React.FC<any> = () => {
  const [modules, setModules] = useState<any[]>([]);

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
    <PageContainer>
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
          <ProFormRadio.Group
            name={'use_content'}
            label="索引内容"
            options={[
              { label: '仅标题和简介', value: false },
              { label: '包括文档内容', value: true },
            ]}
          />
          <ProFormCheckbox.Group name={'modules'} label="开启的模型" options={modules} />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default PluginFulltext;
