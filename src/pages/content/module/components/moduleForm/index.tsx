import { deleteModuleField, getModuleInfo, saveModule } from '@/services';
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
import { Button, Col, Input, Modal, Radio, Row, Space, Tag, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export type ModuleFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  type: number;
  open: boolean;
  module: any;
};

let submitting = false;

const ModuleForm: React.FC<ModuleFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<any>({});
  const [setting, setSetting] = useState<any>({ fields: [] });
  const [fetched, setFetched] = useState<boolean>(false);
  const intl = useIntl();

  const getSetting = async () => {
    if (props.module.id) {
      const res = await getModuleInfo({ id: props.module.id });
      let setting = res.data || { fields: [] };
      setSetting(setting);
    }
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleRemoveItem = (record: any, index: number) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'content.module.field.delete.confirm' }),
      content: intl.formatMessage({ id: 'content.module.field.delete.content' }),
      onOk: async () => {
        deleteModuleField({ id: props.module.id, field_name: record.field_name });
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
    let reg = /^[a-z][0-9a-z_]+$/;
    if (!values.field_name || !reg.test(values.field_name)) {
      message.error(intl.formatMessage({ id: 'content.module.field.error' }));
      return;
    }
    let exists = false;
    if (!setting.fields) {
      setting.fields = [];
    }
    for (let i in setting.fields) {
      if (setting.fields[i].field_name === values.field_name) {
        exists = true;
        setting.fields[i] = values;
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

  const handleChangeInput = (field: string, e: any) => {
    setting[field] = e.target.value;
    setSetting(setting);
  };

  const handleSaveSetting = async () => {
    if (submitting) {
      return;
    }
    submitting = true;
    let hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    saveModule(setting)
      .then((res) => {
        if (res.code === 0) {
          message.success(res.msg);
          setEditVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
          props.onSubmit();
        } else {
          message.error(res.msg);
        }
      })
      .finally(() => {
        submitting = false;
        hide();
      });
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
          text: intl.formatMessage({ id: 'content.module.field.isrequired.no' }),
          status: 'Default',
        },
        true: {
          text: intl.formatMessage({ id: 'content.module.field.isrequired.yes' }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
      dataIndex: 'option',
      render: (text: any, record, index) => (
        <Space size={20}>
          {!record.is_system && (
            <>
              <a
                onClick={() => {
                  setCurrentField(record);
                  setEditVisible(true);
                }}
              >
                <FormattedMessage id="setting.action.edit" />
              </a>
              <a
                className="text-red"
                onClick={() => {
                  handleRemoveItem(record, index);
                }}
              >
                <FormattedMessage id="setting.system.delete" />
              </a>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        width={800}
        title={intl.formatMessage({ id: 'content.module.setting' })}
        open={props.open}
        onCancel={() => {
          props.onCancel();
        }}
        onOk={() => {
          handleSaveSetting();
        }}
      >
        {fetched && (
          <div>
            <div>
              <Row gutter={16}>
                <Col>
                  <div style={{ lineHeight: '32px', width: '120px' }}>
                    <FormattedMessage id="content.module.title" />:
                  </div>
                </Col>
                <Col flex={1}>
                  <Input
                    name="title"
                    defaultValue={setting.title}
                    onChange={(e: any) => {
                      handleChangeInput('title', e);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-normal" gutter={16}>
                <Col>
                  <div style={{ lineHeight: '32px', width: '120px' }}>
                    <FormattedMessage id="content.module.field" />:
                  </div>
                </Col>
                <Col flex={1}>
                  <Input
                    name="table_name"
                    defaultValue={setting.table_name}
                    onChange={(e: any) => {
                      handleChangeInput('table_name', e);
                    }}
                  />
                  <div className="text-muted">
                    <FormattedMessage id="content.module.field.description" />
                  </div>
                </Col>
              </Row>
              <Row className="mt-normal" gutter={16}>
                <Col>
                  <div style={{ lineHeight: '32px', width: '120px' }}>
                    <FormattedMessage id="content.url-token.name" />:
                  </div>
                </Col>
                <Col flex={1}>
                  <Input
                    name="url_token"
                    defaultValue={setting.url_token}
                    onChange={(e: any) => {
                      handleChangeInput('url_token', e);
                    }}
                  />
                  <div className="text-muted">
                    <FormattedMessage id="content.module.url-token.tips.before" />{' '}
                    <Tag>{'{module}'}</Tag>
                    <FormattedMessage id="content.module.url-token.tips.after" />
                  </div>
                </Col>
              </Row>
              <Row className="mt-normal" gutter={16}>
                <Col>
                  <div style={{ lineHeight: '32px', width: '120px' }}>
                    <FormattedMessage id="content.module.title-name" />:
                  </div>
                </Col>
                <Col flex={1}>
                  <Input
                    name="title_name"
                    defaultValue={setting.title_name}
                    onChange={(e: any) => {
                      handleChangeInput('title_name', e);
                    }}
                  />
                  <div className="text-muted">
                    <FormattedMessage id="content.module.title-name.description" />
                  </div>
                </Col>
              </Row>
              <Row className="mt-normal" gutter={16}>
                <Col>
                  <div style={{ lineHeight: '32px', width: '120px' }}>
                    <FormattedMessage id="content.category.status" />:
                  </div>
                </Col>
                <Col flex={1}>
                  <Radio.Group
                    name="status"
                    defaultValue={setting.status}
                    onChange={(e: any) => {
                      handleChangeInput('status', e);
                    }}
                    options={[
                      {
                        value: 0,
                        label: intl.formatMessage({ id: 'content.category.status.hide' }),
                      },
                      {
                        value: 1,
                        label: intl.formatMessage({ id: 'content.category.status.ok' }),
                      },
                    ]}
                  />
                </Col>
              </Row>
            </div>
            <ProTable<any>
              rowKey="name"
              search={false}
              actionRef={actionRef}
              toolBarRender={() => [
                <Button
                  key="add"
                  type="primary"
                  onClick={() => {
                    setCurrentField({});
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
              columnsState={{
                persistenceKey: 'module-fields-table',
                persistenceType: 'localStorage',
              }}
              columns={columns}
              pagination={false}
            />
          </div>
        )}
      </Modal>
      {editVisible && (
        <ModalForm
          width={600}
          title={
            currentField.name
              ? currentField.name + intl.formatMessage({ id: 'content.module.field.edit' })
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
            extra={intl.formatMessage({ id: 'content.module.field.name.description' })}
          />
          <ProFormText
            name="field_name"
            label={intl.formatMessage({ id: 'content.module.field.field-name' })}
            disabled={currentField.field_name ? true : false}
            extra={intl.formatMessage({ id: 'content.module.field.field-name.description' })}
          />
          <ProFormRadio.Group
            name="type"
            label={intl.formatMessage({ id: 'content.module.field.type' })}
            disabled={currentField.field_name ? true : false}
            valueEnum={{
              text: intl.formatMessage({ id: 'content.module.field.type.text' }),
              number: intl.formatMessage({ id: 'content.module.field.type.number' }),
              textarea: intl.formatMessage({ id: 'content.module.field.type.textarea' }),
              editor: intl.formatMessage({ id: 'content.module.field.type.editor' }),
              radio: intl.formatMessage({ id: 'content.module.field.type.radio' }),
              checkbox: intl.formatMessage({ id: 'content.module.field.type.checkbox' }),
              select: intl.formatMessage({ id: 'content.module.field.type.select' }),
              image: intl.formatMessage({ id: 'content.module.field.type.image' }),
              file: intl.formatMessage({ id: 'content.module.field.type.file' }),
            }}
          />
          <ProFormRadio.Group
            name="required"
            label={intl.formatMessage({ id: 'content.module.field.isrequired' })}
            options={[
              {
                label: intl.formatMessage({ id: 'content.module.field.isrequired.no' }),
                value: false,
              },
              {
                label: intl.formatMessage({ id: 'content.module.field.isrequired.yes' }),
                value: true,
              },
            ]}
          />
          <ProFormRadio.Group
            name="follow_level"
            label={intl.formatMessage({ id: 'content.read-level.name' })}
            options={[
              {
                label: intl.formatMessage({ id: 'content.module.field.level.none' }),
                value: false,
              },
              {
                label: intl.formatMessage({ id: 'content.module.field.level.follow' }),
                value: true,
              },
            ]}
          />
          <ProFormRadio.Group
            name="is_filter"
            label={intl.formatMessage({ id: 'content.module.field.isfilter' })}
            options={[
              {
                label: intl.formatMessage({ id: 'content.module.field.isfilter.no' }),
                value: false,
              },
              {
                label: intl.formatMessage({ id: 'content.module.field.isfilter.yes' }),
                value: true,
              },
            ]}
            extra={intl.formatMessage({ id: 'content.module.field.isfilter.description' })}
          />
          <ProFormTextArea
            label={intl.formatMessage({ id: 'content.param.default' })}
            name="content"
            fieldProps={{
              rows: 4,
            }}
            extra={intl.formatMessage({ id: 'content.module.field.default.description' })}
          />
        </ModalForm>
      )}
    </>
  );
};

export default ModuleForm;
