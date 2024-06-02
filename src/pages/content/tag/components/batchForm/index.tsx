import React, { useState } from 'react';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';

import { saveTag } from '@/services/tag';
import { message } from 'antd';

export type BatchFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  visible: boolean;
};

const BatchForm: React.FC<BatchFormProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    let done = message.loading('正在添加标签...', 0);
    let tags = values.tags.split('\n');
    for (let i in tags) {
      if (tags[i].length == 0) {
        continue;
      }
      let res = await saveTag({
        title: tags[i],
      });
    }
    setLoading(false);
    done();
    props.onSubmit();
  };

  return (
    <ModalForm
      width={600}
      title={'批量添加标签（一行一个）'}
      visible={props.visible}
      layout="horizontal"
      modalProps={{
        okButtonProps: {
          loading: loading,
        },
      }}
      onVisibleChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormTextArea
        name="tags"
        label="标签列表"
        placeholder="请按照一行一个标签来填写"
        fieldProps={{ rows: 15 }}
      />
    </ModalForm>
  );
};

export default BatchForm;
