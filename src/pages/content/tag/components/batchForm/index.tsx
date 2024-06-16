import { saveTag } from '@/services/tag';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';

export type BatchFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
};

const BatchForm: React.FC<BatchFormProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useIntl();

  const onSubmit = async (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    let done = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
      title={intl.formatMessage({ id: 'content.tag.batch-add' })}
      open={props.open}
      layout="horizontal"
      modalProps={{
        okButtonProps: {
          loading: loading,
        },
      }}
      onOpenChange={(flag) => {
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
        label={intl.formatMessage({ id: 'content.tags.name' })}
        placeholder={intl.formatMessage({ id: 'content.tags.placeholder' })}
        fieldProps={{ rows: 15 }}
      />
    </ModalForm>
  );
};

export default BatchForm;
