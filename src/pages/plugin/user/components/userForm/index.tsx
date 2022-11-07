import React from 'react';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';

import { message } from 'antd';
import { pluginGetUserGroups, pluginSaveUserInfo } from '@/services';
import moment from 'moment';

export type UserFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  visible: boolean;
  user: any;
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const onSubmit = async (values: any) => {
    const user = Object.assign(props.user, values);
    const res = await pluginSaveUserInfo(user);
    message.info(res.msg);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={600}
      title={props.user?.id ? '修改用户' : '添加用户'}
      visible={props.visible}
      layout="horizontal"
      onVisibleChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      request={async () => {
        const data = props.user;
        data.expire_time = moment(data.expire_time * 1000);
        return data;
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText name="user_name" label="用户名" />
      <ProFormText name="real_name" label="真实姓名" />
      <ProFormText name="phone" label="手机号" />
      <ProFormText name="email" label="邮箱地址" />
      <ProFormText
        name="password"
        label="密码"
        extra="如果需要给该用户修改密码，请在这里填写，不少于6位"
      />
      <ProFormRadio.Group
        name="is_retailer"
        label="是否分销员"
        options={[
          { label: '不是', value: 0 },
          { label: '是', value: 1 },
        ]}
      />
      <ProFormText name="invite_code" label="邀请码" extra="请勿随意更改" />
      <ProFormDigit name="parent_id" label="上级用户ID" />
      <ProFormSelect
        label="用户组VIP"
        name="group_id"
        request={async () => {
          const res = await pluginGetUserGroups();
          return res.data || [];
        }}
        fieldProps={{
          fieldNames: {
            label: 'title',
            value: 'id',
          },
        }}
      />
      <ProFormDatePicker
        name="expire_time"
        label="用户组到期"
        extra="到期后，用户组会回滚到第一个分组"
        width="lg"
        transform={(value, namePath) => {
          return { [namePath]: moment(value).unix() };
        }}
      />
    </ModalForm>
  );
};

export default UserForm;
