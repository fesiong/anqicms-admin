import AttachmentSelect from '@/components/attachment';
import {
  pluginGetUserFieldsSetting,
  pluginGetUserGroups,
  pluginGetUserInfo,
  pluginSaveUserInfo,
} from '@/services';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Divider, Image, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

export type UserFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
  user: any;
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [userFields, setUserFields] = useState<any[]>([]);
  const [user, setUser] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    pluginGetUserFieldsSetting().then((res) => {
      setUserFields(res.data?.fields || []);
    });
    pluginGetUserInfo({ id: props.user.id }).then((res) => {
      let data = res.data || {};
      if (data.expire_time) {
        data.expire_time = dayjs(data.expire_time * 1000);
      }
      setUser(data);
      setFetched(true);
    });
  }, []);

  const onSubmit = async (values: any) => {
    const user = Object.assign(props.user, values);
    const res = await pluginSaveUserInfo(user);
    message.info(res.msg);

    props.onSubmit();
  };

  const handleCleanExtraField = (field: string) => {
    const extra: any = {};
    extra[field] = { value: '' };

    formRef?.current?.setFieldsValue({ extra });

    delete user.extra[field];
    setUser(user);
  };

  const handleUploadExtraField = (field: string, row: any) => {
    const extra: any = {};
    extra[field] = { value: row.logo };
    formRef?.current?.setFieldsValue({ extra });
    if (!user.extra[field]) {
      user.extra[field] = {};
    }
    user.extra[field].value = row.logo;

    setUser(user);
  };

  return fetched ? (
    <ModalForm
      width={600}
      title={props.user?.id ? '修改用户' : '添加用户'}
      open={props.open}
      layout="horizontal"
      onOpenChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      formRef={formRef}
      initialValues={user}
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
          return { [namePath]: dayjs(value).unix() };
        }}
      />
      <Divider>额外字段</Divider>
      {userFields.map((item: any, index: number) =>
        item.type === 'text' ? (
          <ProFormText
            name={['extra', item.field_name, 'value']}
            label={item.name}
            required={item.required ? true : false}
            placeholder={item.content && '默认值：' + item.content}
          />
        ) : item.type === 'number' ? (
          <ProFormDigit
            name={['extra', item.field_name, 'value']}
            label={item.name}
            required={item.required ? true : false}
            placeholder={item.content && '默认值：' + item.content}
          />
        ) : item.type === 'textarea' ? (
          <ProFormTextArea
            name={['extra', item.field_name, 'value']}
            label={item.name}
            required={item.required ? true : false}
            placeholder={item.content && '默认值：' + item.content}
          />
        ) : item.type === 'radio' ? (
          <ProFormRadio.Group
            name={['extra', item.field_name, 'value']}
            label={item.name}
            request={async () => {
              const tmpData = item.content.split('\n');
              const data = [];
              for (const item1 of tmpData) {
                data.push({ label: item1, value: item1 });
              }
              return data;
            }}
          />
        ) : item.type === 'checkbox' ? (
          <ProFormCheckbox.Group
            name={['extra', item.field_name, 'value']}
            label={item.name}
            request={async () => {
              const tmpData = item.content.split('\n');
              const data = [];
              for (const item1 of tmpData) {
                data.push({ label: item1, value: item1 });
              }
              return data;
            }}
          />
        ) : item.type === 'select' ? (
          <ProFormSelect
            name={['extra', item.field_name, 'value']}
            label={item.name}
            request={async () => {
              const tmpData = item.content.split('\n');
              const data = [];
              for (const item1 of tmpData) {
                data.push({ label: item1, value: item1 });
              }
              return data;
            }}
          />
        ) : item.type === 'image' ? (
          <ProFormText name={['extra', item.field_name, 'value']} label={item.name}>
            {user.extra[item.field_name]?.value ? (
              <div className="ant-upload-item">
                <Image
                  preview={{
                    src: user.extra[item.field_name]?.value,
                  }}
                  src={user.extra[item.field_name]?.value}
                />
                <span className="delete" onClick={() => handleCleanExtraField(item.field_name)}>
                  <DeleteOutlined />
                </span>
              </div>
            ) : (
              <AttachmentSelect
                onSelect={(row) => handleUploadExtraField(item.field_name, row)}
                open={false}
              >
                <div className="ant-upload-item">
                  <div className="add">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </div>
              </AttachmentSelect>
            )}
          </ProFormText>
        ) : item.type === 'file' ? (
          <ProFormText name={['extra', item.field_name, 'value']} label={item.name}>
            {user.extra[item.field_name]?.value ? (
              <div className="ant-upload-item ant-upload-file">
                <span>{user.extra[item.field_name]?.value}</span>
                <span className="delete" onClick={() => handleCleanExtraField(item.field_name)}>
                  <DeleteOutlined />
                </span>
              </div>
            ) : (
              <AttachmentSelect
                onSelect={(row) => handleUploadExtraField(item.field_name, row)}
                open={false}
              >
                <Button>上传</Button>
              </AttachmentSelect>
            )}
          </ProFormText>
        ) : (
          ''
        ),
      )}
    </ModalForm>
  ) : null;
};

export default UserForm;
