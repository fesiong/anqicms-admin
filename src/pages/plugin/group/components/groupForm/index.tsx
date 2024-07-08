import { pluginSaveUserGroupInfo } from '@/services';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Divider, message } from 'antd';
import React from 'react';

export type UserGroupFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
  group: any;
};

const UserGroupForm: React.FC<UserGroupFormProps> = (props) => {
  const intl = useIntl();
  const onSubmit = async (values: any) => {
    const group = Object.assign(props.group, values);
    const res = await pluginSaveUserGroupInfo(group);
    message.info(res.msg);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={600}
      title={props.group?.id ? intl.formatMessage({ id: 'plugin.group.edit' }) : intl.formatMessage({ id: 'plugin.group.add' })}
      initialValues={props.group}
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
      <ProFormText name="title" label={intl.formatMessage({ id: 'plugin.group.name' })} />
      <ProFormText name="description" label={intl.formatMessage({ id: 'plugin.group.description' })} />
      <ProFormDigit
        name="level"
        label={intl.formatMessage({ id: 'plugin.group.level' })}
        width="sm"
        fieldProps={{ precision: 0, addonAfter: intl.formatMessage({ id: 'plugin.group.level.suffix' }) }}
        extra={intl.formatMessage({ id: 'plugin.group.level.description' })}
      />
      <ProFormDigit
        name="price"
        label={intl.formatMessage({ id: 'plugin.group.price' })}
        width="sm"
        fieldProps={{ precision: 0, addonAfter: intl.formatMessage({ id: 'plugin.group.price.suffix' }) }}
        extra={intl.formatMessage({ id: 'plugin.group.price.description'})}
      />
      <ProFormDigit
        name={['setting', 'expire_day']}
        label={intl.formatMessage({ id: 'plugin.group.expire_day' })}
        width="sm"
        fieldProps={{ precision: 0, addonAfter: intl.formatMessage({ id: 'plugin.group.expire_day.suffix' }) }}
        extra={intl.formatMessage({ id: 'plugin.group.expire_day.description'})}
      />
      <Divider><FormattedMessage id="plugin.group.permission" /></Divider>
      <ProFormDigit
        name={['setting', 'share_reward']}
        label={intl.formatMessage({ id: 'plugin.group.share_reward' })}
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '%' }}
        extra={
          intl.formatMessage({ id: 'plugin.group.share_reward.description'})
        }
      />
      <ProFormDigit
        name={['setting', 'parent_reward']}
        label={intl.formatMessage({ id: 'plugin.group.parent_reward' })}
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '%' }}
        extra={
          intl.formatMessage({ id: 'plugin.group.parent_reward.description'})
        }
      />
      <ProFormDigit
        name={['setting', 'discount']}
        label={intl.formatMessage({ id: 'plugin.group.discount' })}
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '%' }}
        extra={intl.formatMessage({ id: 'plugin.group.discount.description'})}
      />
    </ModalForm>
  );
};

export default UserGroupForm;
