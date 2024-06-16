import { saveTag } from '@/services/tag';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

export type TagFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  type: number;
  open: boolean;
  tag: any;
};

const TagForm: React.FC<TagFormProps> = (props) => {
  const intl = useIntl();

  const onSubmit = async (values: any) => {
    let tag = Object.assign(props.tag, values);
    tag.type = props.type;
    let res = await saveTag(tag);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={800}
      title={
        props.tag?.id
          ? intl.formatMessage({ id: 'content.tags.edit' })
          : intl.formatMessage({ id: 'content.tags.add' })
      }
      initialValues={props.tag}
      open={props.open}
      layout="horizontal"
      onOpenChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText name="title" label={intl.formatMessage({ id: 'content.tags.name' })} />
      <ProFormText
        name="first_letter"
        label={intl.formatMessage({ id: 'content.tags.first-letter.name' })}
        placeholder={intl.formatMessage({ id: 'content.url-token.placeholder' })}
        extra={intl.formatMessage({ id: 'content.tags.first-letter.description' })}
      />
      <ProFormText
        name="url_token"
        label={intl.formatMessage({ id: 'content.url-token.name' })}
        placeholder={intl.formatMessage({ id: 'content.url-token.placeholder' })}
        extra={intl.formatMessage({ id: 'content.url-token.tips' })}
      />
      <ProFormText
        name="seo_title"
        label={intl.formatMessage({ id: 'content.seo-title.name' })}
        placeholder={intl.formatMessage({ id: 'content.tags.seo-title.placeholder' })}
        extra={intl.formatMessage({ id: 'content.tags.seo-title.description' })}
      />
      <ProFormText
        name="keywords"
        label={intl.formatMessage({ id: 'content.keywords.name' })}
        extra={intl.formatMessage({ id: 'content.keywords.description' })}
      />
      <ProFormTextArea
        name="description"
        label={intl.formatMessage({ id: 'content.description.name' })}
      />
    </ModalForm>
  );
};

export default TagForm;
