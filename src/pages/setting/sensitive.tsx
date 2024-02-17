import React, { useEffect, useState } from 'react';
import ProForm, { ProFormInstance, ProFormTextArea } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, message, Space, Modal } from 'antd';
import {
  getSettingSensitiveWords,
  saveSettingSensitiveWords,
  syncSettingSensitiveWords,
} from '@/services/setting';

const SettingSensitiveFrom: React.FC<any> = (props) => {
  const formRef = React.createRef<ProFormInstance>();
  const [setting, setSetting] = useState<any>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await getSettingSensitiveWords();
    let setting = res.data || [];
    setSetting(setting);
    setFetched(true);
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    const text = values.words.split('\n');
    saveSettingSensitiveWords(text)
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

  const syncSensitive = () => {
    Modal.confirm({
      title: '确定要同步敏感词列表吗？该操作会从安企CMS官网同步最新的敏感词到本地，并替换',
      onOk: () => {
        syncSettingSensitiveWords({})
          .then(async (res) => {
            message.success(res.msg);
            const res2 = await getSettingSensitiveWords();
            let setting = res2.data || [];
            formRef.current?.setFieldsValue({ words: setting.join('\n') });
          })
          .catch((err) => {
            message.success(err.msg || '同步失败');
          });
      },
    });
  };

  return (
    <PageHeaderWrapper>
      <Card
        title="敏感词设置"
        extra={
          <Space size={20}>
            <Button onClick={syncSensitive}>同步敏感词</Button>
          </Space>
        }
      >
        {fetched && (
          <ProForm
            formRef={formRef}
            initialValues={{ words: setting.join('\n') }}
            onFinish={onSubmit}
          >
            <ProFormTextArea
              fieldProps={{ rows: 20 }}
              name="words"
              label="敏感词列表"
              placeholder={'注意，一行一个。'}
              extra="敏感词请一行填写一个。"
            />
          </ProForm>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default SettingSensitiveFrom;
