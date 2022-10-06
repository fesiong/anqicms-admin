import React from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import { message } from 'antd';
import { pluginSaveUserInfo } from '@/services';

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
      width={900}
      title={props.user?.id ? '修改用户' : '添加用户'}
      initialValues={props.user}
      visible={props.visible}
      layout="horizontal"
      onVisibleChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText name="user_name" label="用户名" />
      <ProFormText name="real_name" label="real_name" />
    </ModalForm>
  );
};

export default UserForm;
