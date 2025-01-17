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
import { FormattedMessage, useIntl } from '@umijs/max';
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
  const intl = useIntl();

  useEffect(() => {
    pluginGetUserFieldsSetting().then((res) => {
      setUserFields(res.data?.fields || []);
    });
    pluginGetUserInfo({ id: props.user.id }).then((res) => {
      let data = res.data || {};
      if (data.expire_time) {
        data.expire_time = dayjs(data.expire_time * 1000);
      }
      if (data.avatar_url) {
        data.avatar_url = data.full_avatar_url;
      }
      setUser(data);
      setFetched(true);
    });
  }, []);

  const onSubmit = async (values: any) => {
    const data = Object.assign(user, values);

    const res = await pluginSaveUserInfo(data);
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

  const handleDeleteAvatarUrl = () => {
    user.avatar_url = '';
    setUser(Object.assign({}, user));
  };

  const handleUploadAvatarUrl = (row: any) => {
    user.avatar_url = row.logo;
    setUser(Object.assign({}, user));
  };

  return fetched ? (
    <ModalForm
      width={600}
      title={props.user?.id ? intl.formatMessage({ id: 'plugin.user.edit' }) : intl.formatMessage({ id: 'plugin.user.add' })}
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
      <ProFormText label={intl.formatMessage({ id: 'plugin.user.avatar_url' })}>
            {user.avatar_url ? (
              <div className="ant-upload-item">
                <Image
                  preview={{
                    src: user.avatar_url,
                  }}
                  src={user.avatar_url}
                />
                <span className="delete" onClick={() => handleDeleteAvatarUrl()}>
                  <DeleteOutlined />
                </span>
              </div>
            ) : (
              <AttachmentSelect
                onSelect={(row) => handleUploadAvatarUrl(row)}
                open={false}
              >
                <div className="ant-upload-item">
                  <div className="add">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}><FormattedMessage id="plugin.pay.upload" /></div>
                  </div>
                </div>
              </AttachmentSelect>
            )}
          </ProFormText>
      <ProFormText name="user_name" label={intl.formatMessage({ id: 'plugin.user.user-name' })} />
      <ProFormText name="real_name" label={intl.formatMessage({ id: 'plugin.user.real-name' })} />
      <ProFormText name="phone" label={intl.formatMessage({ id: 'plugin.user.phone' })} />
      <ProFormText name="email" label={intl.formatMessage({ id: 'plugin.user.email' })} />
      <ProFormText
        name="password"
        label={intl.formatMessage({ id: 'plugin.user.password' })}
        extra={intl.formatMessage({ id: 'plugin.user.password.description' })}
      />
      <ProFormTextArea
        name="introduce"
        label={intl.formatMessage({ id: 'plugin.user.introduce' })}
      />
      <ProFormRadio.Group
        name="is_retailer"
        label={intl.formatMessage({ id: 'plugin.user.is-retailer' })}
        options={[
          { label: intl.formatMessage({ id: 'plugin.user.is-retailer.no' }), value: 0 },
          { label: intl.formatMessage({ id: 'plugin.user.is-retailer.yes' }), value: 1 },
        ]}
      />
      <ProFormText name="invite_code" label={intl.formatMessage({ id: 'plugin.user.invite-code' })} extra={intl.formatMessage({ id: 'plugin.user.invite-code.description' })} />
      <ProFormDigit name="parent_id" label={intl.formatMessage({ id: 'plugin.user.parent.user-id' })} />
      <ProFormSelect
        label={intl.formatMessage({ id: 'plugin.user.group' })}
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
        label={intl.formatMessage({ id: 'plugin.user.expire' })}
        extra={intl.formatMessage({ id: 'plugin.user.expire.description' })}
        width="lg"
        transform={(value, namePath) => {
          return { [namePath]: dayjs(value).unix() };
        }}
      />
      <Divider><FormattedMessage id="plugin.user.extra-fields" /></Divider>
      {userFields.map((item: any) =>
        item.type === 'text' ? (
          <ProFormText
            key={item.field_name}
            name={['extra', item.field_name, 'value']}
            label={item.name}
            required={item.required ? true : false}
            placeholder={item.content && intl.formatMessage({ id: 'plugin.user.extra-fields.default' }) + item.content}
          />
        ) : item.type === 'number' ? (
          <ProFormDigit
            key={item.field_name}
            name={['extra', item.field_name, 'value']}
            label={item.name}
            required={item.required ? true : false}
            placeholder={item.content && intl.formatMessage({ id: 'plugin.user.extra-fields.default' }) + item.content}
          />
        ) : item.type === 'textarea' ? (
          <ProFormTextArea
            key={item.field_name}
            name={['extra', item.field_name, 'value']}
            label={item.name}
            required={item.required ? true : false}
            placeholder={item.content && intl.formatMessage({ id: 'plugin.user.extra-fields.default' }) + item.content}
          />
        ) : item.type === 'radio' ? (
          <ProFormRadio.Group
            key={item.field_name}
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
            key={item.field_name}
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
            key={item.field_name}
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
          <ProFormText key={item.field_name} name={['extra', item.field_name, 'value']} label={item.name}>
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
                    <div style={{ marginTop: 8 }}><FormattedMessage id="plugin.pay.upload" /></div>
                  </div>
                </div>
              </AttachmentSelect>
            )}
          </ProFormText>
        ) : item.type === 'file' ? (
          <ProFormText key={item.field_name} name={['extra', item.field_name, 'value']} label={item.name}>
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
                <Button><FormattedMessage id="plugin.pay.upload" /></Button>
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
