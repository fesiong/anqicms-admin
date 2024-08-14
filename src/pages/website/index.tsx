import {
  deleteWebsiteInfo,
  getDesignList,
  getSiteInfo,
  getWebsiteInfo,
  getWebsiteList,
  saveWebsiteInfo,
} from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Button, Checkbox, Collapse, Modal, RadioChangeEvent, Space, Tag, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
const { Panel } = Collapse;

let submiting = false;
const WebsiteList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [userDefault, setUseDefault] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<any>({});
  const [siteInfo, setSiteInfo] = useState<any>({});
  const inputRef = useRef<any>();
  const intl = useIntl();

  const initSiteInfo = async () => {
    getSiteInfo({}).then((res) => {
      setSiteInfo(res?.data || {});
    });
  };

  useEffect(() => {
    initSiteInfo();
  }, []);

  const handleEdit = (record: any) => {
    if (record.id > 0) {
      getWebsiteInfo({ id: record.id }).then((res) => {
        setEditInfo(res.data);
        setUseDefault(res.data.mysql?.use_default);
        setEditVisible(true);
      });
    } else {
      setEditInfo(record);
      setUseDefault(record.mysql?.use_default);
      setEditVisible(true);
    }
  };

  const visitSystem = (record: any) => {
    if (record.base_url.lastIndexOf('/') > 7) {
      let link =
        record.base_url.substr(0, record.base_url.lastIndexOf('/')) +
        '/system/login?admin-login=true&site-id=' +
        record.id;
      window.open(link);
    } else {
      window.open(record.base_url + '/system/login');
    }
  };

  const onSubmitEdit = async (values: any) => {
    if (editInfo.id === 1) {
      // 自己无法禁用自己
      values.status = 1;
    }
    if (submiting) {
      return;
    }
    submiting = true;
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    values.status = Number(values.status);
    const postData = Object.assign(editInfo, values);
    saveWebsiteInfo(postData)
      .then((res) => {
        if (res.code !== 0) {
          message.error(res.msg);
        } else {
          message.info(res.msg);
          actionRef.current?.reload();
          setEditVisible(false);
        }
      })
      .finally(() => {
        submiting = false;
        hide();
      });
  };

  const handleRemove = (record: any) => {
    if (record.id === 1) {
      message.error(intl.formatMessage({ id: 'website.cannot-delete' }));
      return;
    }
    if (submiting) {
      return;
    }
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.system.confirm-delete' }),
      content: (
        <div>
          <div className="mb-normal">{intl.formatMessage({ id: 'website.delete.tips' })}</div>
          <div style={{ padding: '10px 0' }}>
            <div>
              <Checkbox ref={inputRef} value={true}>
                {intl.formatMessage({ id: 'website.delete.all' })}
              </Checkbox>
            </div>
          </div>
        </div>
      ),
      onOk: async () => {
        submiting = true;
        const hide = message.loading(intl.formatMessage({ id: 'website.delete.deleting' }), 0);
        const removeFile = inputRef.current?.input?.checked || false;
        deleteWebsiteInfo({
          id: record.id,
          remove_file: removeFile,
        })
          .then((res) => {
            message.info(res.msg);
            actionRef.current?.reload();
          })
          .finally(() => {
            submiting = false;
            hide();
          });
      },
    });
  };

  const handleChangeUse = (e: RadioChangeEvent) => {
    setUseDefault(e.target.value);
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'setting.system.site-name' }),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({ id: 'setting.system.base-url' }),
      dataIndex: 'base_url',
      render: (text) => (
        <a href={text as string} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'website.root-path' }),
      dataIndex: 'root_path',
    },
    {
      title: intl.formatMessage({ id: 'website.create-time' }),
      dataIndex: 'created_time',
      render: (text, record) => dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: intl.formatMessage({ id: 'website.status' }),
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: intl.formatMessage({ id: 'setting.content.notenable' }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({ id: 'setting.content.enable' }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          {record.id === siteInfo.id ? (
            <Tag>
              <FormattedMessage id="website.current" />
            </Tag>
          ) : (
            <a
              key="edit"
              onClick={() => {
                visitSystem(record);
              }}
            >
              <FormattedMessage id="website.visit-backend" />
            </a>
          )}
          {initialState?.currentUser?.site_id === 1 && (
            <>
              <a
                key="edit"
                onClick={() => {
                  handleEdit(record);
                }}
              >
                <FormattedMessage id="setting.action.edit" />
              </a>
              {record.id === 1 ? (
                <Tag>
                  <FormattedMessage id="website.default" />
                </Tag>
              ) : (
                <a
                  className="text-red"
                  key="delete"
                  onClick={async () => {
                    await handleRemove(record);
                  }}
                >
                  <FormattedMessage id="setting.system.delete" />
                </a>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle={intl.formatMessage({ id: 'website.list' })}
        rowKey="id"
        actionRef={actionRef}
        search={false}
        request={(params) => {
          return getWebsiteList(params);
        }}
        columnsState={{
          persistenceKey: 'website-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        toolBarRender={() => [
          initialState?.currentUser?.site_id === 1 && (
            <Button
              type="primary"
              key="add"
              onClick={() => {
                handleEdit({ mysql: { use_default: true }, initialed: false, status: 1 });
              }}
            >
              <PlusOutlined /> <FormattedMessage id="website.add" />
            </Button>
          ),
        ]}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {editVisible && (
        <ModalForm
          width={600}
          title={
            editInfo.id > 0
              ? intl.formatMessage({ id: 'website.edit' })
              : intl.formatMessage({ id: 'website.add' })
          }
          open={editVisible}
          layout="horizontal"
          modalProps={{
            maskClosable: false,
          }}
          initialValues={editInfo}
          onFinish={onSubmitEdit}
          onOpenChange={(e) => setEditVisible(e)}
        >
          {editInfo.id > 0 && (
            <ProFormDigit name="id" label={intl.formatMessage({ id: 'website.id' })} readonly />
          )}
          <ProFormText name="name" label={intl.formatMessage({ id: 'website.name' })} />
          <ProFormText
            name="root_path"
            label={intl.formatMessage({ id: 'website.root-path' })}
            disabled={editInfo.id === 1}
            placeholder={intl.formatMessage({ id: 'website.root-path.placeholder' })}
            extra={intl.formatMessage({ id: 'website.root-path.description' })}
          />
          <ProFormText
            name="base_url"
            label={intl.formatMessage({ id: 'setting.system.base-url' })}
            placeholder={intl.formatMessage({ id: 'website.base-url.placeholder' })}
            extra={intl.formatMessage({ id: 'website.base-url.description' })}
          />
          <ProFormText name="admin_user" label={intl.formatMessage({ id: 'website.admin-user' })} />
          <ProFormText.Password
            name="admin_password"
            label={intl.formatMessage({ id: 'website.admin-password' })}
            placeholder={intl.formatMessage({ id: 'website.admin-password.description' })}
          />
          {editInfo.id !== 1 && (
            <Collapse defaultActiveKey={editInfo.id > 0 ? [] : [1]} ghost>
              <Panel header={intl.formatMessage({ id: 'website.db.header' })} key="1">
                <ProFormText
                  name={['mysql', 'database']}
                  label={intl.formatMessage({ id: 'website.db.database' })}
                  placeholder={intl.formatMessage({ id: 'website.db.database.description' })}
                />
                <ProFormRadio.Group
                  label={intl.formatMessage({ id: 'website.db.use-default' })}
                  name={['mysql', 'use_default']}
                  options={[
                    {
                      label: intl.formatMessage({ id: 'website.db.use-default.new' }),
                      value: false,
                    },
                    {
                      label: intl.formatMessage({ id: 'website.db.use-default.default' }),
                      value: true,
                    },
                  ]}
                  fieldProps={{
                    onChange: handleChangeUse,
                  }}
                />
                {!userDefault && (
                  <>
                    <ProFormText
                      name={['mysql', 'host']}
                      label={intl.formatMessage({ id: 'website.db.host' })}
                      placeholder={intl.formatMessage({ id: 'website.db.host.description' })}
                    />
                    <ProFormDigit
                      name={['mysql', 'port']}
                      label={intl.formatMessage({ id: 'website.db.port' })}
                      placeholder={intl.formatMessage({ id: 'website.db.port.description' })}
                    />
                    <ProFormText
                      name={['mysql', 'user']}
                      label={intl.formatMessage({ id: 'website.db.user' })}
                    />
                    <ProFormText
                      name={['mysql', 'password']}
                      label={intl.formatMessage({ id: 'website.db.password' })}
                    />
                  </>
                )}
                {!editInfo.id && (
                  <>
                    <ProFormSelect
                      label={intl.formatMessage({ id: 'website.db.template' })}
                      showSearch
                      name="template"
                      request={async () => {
                        const res = await getDesignList({});
                        const data = res.data || [];
                        for (const i in data) {
                          if (data.hasOwnProperty(i)) {
                            data[i].label = data[i].name + '(' + data[i].package + ')';
                          }
                        }
                        return data;
                      }}
                      fieldProps={{
                        fieldNames: {
                          label: 'label',
                          value: 'package',
                        },
                      }}
                      extra={intl.formatMessage({ id: 'website.db.template.description' })}
                    />
                    <ProFormCheckbox
                      name="preview_data"
                      label={intl.formatMessage({ id: 'website.db.preview-data' })}
                      extra={intl.formatMessage({ id: 'website.db.preview-data.description' })}
                    />
                  </>
                )}
              </Panel>
            </Collapse>
          )}
          <ProFormRadio.Group
            label={intl.formatMessage({ id: 'website.status' })}
            name="status"
            options={[
              {
                label: intl.formatMessage({ id: 'setting.content.notenable' }),
                value: 0,
              },
              {
                label: intl.formatMessage({ id: 'setting.content.enable' }),
                value: 1,
              },
            ]}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default WebsiteList;
