import {
  pluginGetGuestbookSetting,
  pluginSaveGuestbookSetting,
} from '@/services/plugin/guestbook';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Col, Input, Modal, Row, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export type GuestbookSettingProps = {
  children?: React.ReactNode;
};

const GuestbookSetting: React.FC<GuestbookSettingProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<any>({});
  const [setting, setSetting] = useState<any>({ fields: [] });
  const [fetched, setFetched] = useState<boolean>(false);
  const intl = useIntl();

  const getSetting = async () => {
    const res = await pluginGetGuestbookSetting();
    let setting = res.data || { fields: [] };
    setSetting(setting);
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleRemoveItem = (index: number) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'plugin.guestbook.field.delete.confirm',
      }),
      content: intl.formatMessage({
        id: 'plugin.guestbook.field.delete.confirm.content',
      }),
      onOk: async () => {
        setting.fields.splice(index, 1);
        setting.fields = [].concat(setting.fields);
        setSetting(setting);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      },
    });
  };

  const handleSaveField = async (values: any) => {
    let exists = false;
    for (let i in setting.fields) {
      if (setting.fields[i].field_name === values.field_name) {
        exists = true;
        setting.fields[i] = Object.assign(setting.fields[i], values);
      }
    }
    if (!exists) {
      setting.fields.push(values);
    }
    setting.fields = [].concat(setting.fields);
    setSetting(setting);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    setEditVisible(false);
  };

  const handleChangeReturnMessage = (e: any) => {
    setting.return_message = e.target.value;
    setSetting(setting);
  };

  const handleSaveSetting = async () => {
    let res = await pluginSaveGuestbookSetting(setting);

    if (res.code === 0) {
      message.success(res.msg);
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      message.error(res.msg);
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'content.module.field.name' }),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({ id: 'content.module.field.field-name' }),
      dataIndex: 'field_name',
    },
    {
      title: intl.formatMessage({ id: 'content.module.field.type' }),
      dataIndex: 'type',
      render: (text: any, record) => (
        <div>
          <span>
            {record.is_system
              ? intl.formatMessage({ id: 'content.module.field.type.built-in' })
              : ''}
          </span>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'content.module.field.isrequired' }),
      dataIndex: 'required',

      valueEnum: {
        false: {
          text: intl.formatMessage({
            id: 'content.module.field.isrequired.no',
          }),
          status: 'Default',
        },
        true: {
          text: intl.formatMessage({
            id: 'content.module.field.isrequired.yes',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
      dataIndex: 'option',
      render: (text: any, record, index) => (
        <Space size={20}>
          <>
            <a
              onClick={() => {
                setCurrentField(record);
                setEditVisible(true);
              }}
            >
              <FormattedMessage id="setting.action.edit" />
            </a>
            {!record.is_system && (
              <a
                className="text-red"
                onClick={() => {
                  handleRemoveItem(index);
                }}
              >
                <FormattedMessage id="setting.system.delete" />
              </a>
            )}
          </>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      <Modal
        width={800}
        title={intl.formatMessage({ id: 'plugin.guestbook.setting' })}
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          handleSaveSetting();
        }}
      >
        {fetched && (
          <Row gutter={16}>
            <Col>
              <div style={{ lineHeight: '32px' }}>
                <FormattedMessage id="plugin.guestbook.return-message" />
              </div>
            </Col>
            <Col flex={1}>
              <Input
                name="return_message"
                defaultValue={setting.return_message}
                placeholder={intl.formatMessage({
                  id: 'plugin.guestbook.return-message.placeholder',
                })}
                onChange={handleChangeReturnMessage}
              />
              <div className="text-muted">
                <FormattedMessage id="plugin.guestbook.return-message.description" />
              </div>
            </Col>
          </Row>
        )}
        <ProTable<any>
          rowKey="name"
          search={false}
          actionRef={actionRef}
          toolBarRender={() => [
            <Button
              key="add"
              type="primary"
              onClick={() => {
                setCurrentField({ type: 'text', required: false });
                setEditVisible(true);
              }}
            >
              <FormattedMessage id="content.module.field.add" />
            </Button>,
          ]}
          tableAlertRender={false}
          tableAlertOptionRender={false}
          request={async () => {
            return {
              data: setting.fields || [],
              success: true,
            };
          }}
          columns={columns}
          pagination={false}
        />
      </Modal>
      {editVisible && (
        <ModalForm
          width={600}
          title={
            currentField.name
              ? currentField.name +
                intl.formatMessage({ id: 'content.module.field.edit' })
              : intl.formatMessage({ id: 'content.module.field.add' })
          }
          open={editVisible}
          modalProps={{
            onCancel: () => {
              setEditVisible(false);
            },
          }}
          initialValues={currentField}
          layout="horizontal"
          onFinish={async (values) => {
            handleSaveField(values);
          }}
        >
          <ProFormText
            name="name"
            required
            label={intl.formatMessage({ id: 'content.module.field.name' })}
            extra={intl.formatMessage({
              id: 'content.module.field.name.description',
            })}
          />
          <ProFormText
            name="field_name"
            label={intl.formatMessage({
              id: 'content.module.field.field-name',
            })}
            disabled={currentField.field_name ? true : false}
            extra={intl.formatMessage({
              id: 'content.module.field.field-name.description',
            })}
          />
          <ProFormRadio.Group
            name="type"
            label={intl.formatMessage({ id: 'content.module.field.type' })}
            disabled={currentField.field_name ? true : false}
            valueEnum={{
              text: intl.formatMessage({
                id: 'content.module.field.type.text',
              }),
              number: intl.formatMessage({
                id: 'content.module.field.type.number',
              }),
              textarea: intl.formatMessage({
                id: 'content.module.field.type.textarea',
              }),
              radio: intl.formatMessage({
                id: 'content.module.field.type.radio',
              }),
              checkbox: intl.formatMessage({
                id: 'content.module.field.type.checkbox',
              }),
              select: intl.formatMessage({
                id: 'content.module.field.type.select',
              }),
              image: intl.formatMessage({
                id: 'content.module.field.type.image',
              }),
              file: intl.formatMessage({
                id: 'content.module.field.type.file',
              }),
            }}
          />
          <ProFormRadio.Group
            name="required"
            label={intl.formatMessage({
              id: 'content.module.field.isrequired',
            })}
            options={[
              {
                label: intl.formatMessage({
                  id: 'content.module.field.isrequired.no',
                }),
                value: false,
              },
              {
                label: intl.formatMessage({
                  id: 'content.module.field.isrequired.yes',
                }),
                value: true,
              },
            ]}
          />
          <ProFormTextArea
            label={intl.formatMessage({ id: 'content.category.default' })}
            name="content"
            fieldProps={{
              rows: 4,
            }}
            extra={intl.formatMessage({
              id: 'content.module.field.default.description',
            })}
          />
        </ModalForm>
      )}
    </>
  );
};

export default GuestbookSetting;
