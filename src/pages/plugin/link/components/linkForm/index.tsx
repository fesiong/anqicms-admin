import CollapseItem from '@/components/collaspeItem';
import { pluginSaveLink } from '@/services/plugin/link';
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

export type LinkFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
  editingLink: any;
};

const LinkForm: React.FC<LinkFormProps> = (props) => {
  const intl = useIntl();
  const onSubmit = async (values: any) => {
    let editingLink = Object.assign(props.editingLink, values);
    let res = await pluginSaveLink(editingLink);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={800}
      title={props.editingLink?.id ? intl.formatMessage({ id: 'plugin.link.edit' }) : intl.formatMessage({ id: 'plugin.link.add' })}
      initialValues={props.editingLink}
      open={props.open}
      //layout="horizontal"
      onOpenChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText name="title" label={intl.formatMessage({ id: 'plugin.link.field.other-title' })} />
      <ProFormText name="link" label={intl.formatMessage({ id: 'plugin.link.field.other-link' })} extra={intl.formatMessage({ id: 'plugin.link.field.other-link.description'})} />
      <ProFormRadio.Group
        name="nofollow"
        label="NOFOLLOW"
        options={[
          { value: 0, label: intl.formatMessage({ id: 'plugin.link.nofollow.no' }) },
          { value: 1, label: intl.formatMessage({ id: 'plugin.link.nofollow.yes' }) },
        ]}
        extra={intl.formatMessage({ id: 'plugin.link.nofollow.description' })}
      />
      <ProFormDigit name="sort" label={intl.formatMessage({ id: 'content.category.sort' })} extra={'content.category.sort.description'} />
      <CollapseItem header={intl.formatMessage({ id: 'plugin.link.more' })} showArrow key="1">
        <ProFormText name="back_link" label={intl.formatMessage({ id: 'plugin.link.field.back-link' })} extra={intl.formatMessage({ id: 'plugin.link.field.back-link.description' })} />
        <ProFormText name="my_title" label={intl.formatMessage({ id: 'plugin.link.field.self-title' })} extra={intl.formatMessage({ id: 'plugin.link.field.self-title.description' })} />
        <ProFormText name="my_link" label={intl.formatMessage({ id: 'plugin.link.field.self-link' })} extra={intl.formatMessage({ id: 'plugin.link.field.self-link.description' })} />
        <ProFormText
          name="contact"
          label={intl.formatMessage({ id: 'plugin.link.field.contact' })}
          extra={intl.formatMessage({ id: 'plugin.link.field.contact.description' })}
        />
        <ProFormTextArea name="remark" label={intl.formatMessage({ id: 'plugin.link.field.remark' })} />
      </CollapseItem>
    </ModalForm>
  );
};

export default LinkForm;
