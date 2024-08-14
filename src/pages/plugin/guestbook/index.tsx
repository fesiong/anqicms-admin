import {
  pluginDeleteGuestbook,
  pluginExportGuestbook,
  pluginGetGuestbooks,
  pluginGetGuestbookSetting,
} from '@/services/plugin/guestbook';
import { exportFile } from '@/utils';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Modal, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import GuestbookForm from './components/guestbookForm';
import GuestbookSetting from './components/setting';

const PluginGuestbook: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [currentGuestbook, setCurrentGuestbook] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [columns, setColumns] = useState<ProColumns<any>[]>([]);
  const intl = useIntl();

  const handlePreview = async (record: any) => {
    setCurrentGuestbook(record);
    setEditVisible(true);
  };

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.guestbook.delete.confirm' }),
      onOk: async () => {
        const hide = message.loading(intl.formatMessage({ id: 'content.delete.deletting' }), 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await pluginDeleteGuestbook({
              id: item,
            });
          }
          hide();
          message.success(intl.formatMessage({ id: 'content.delete.success' }));
          setSelectedRowKeys([]);
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error(intl.formatMessage({ id: 'content.delete.failure' }));
          return true;
        }
      },
    });
  };

  const initColumns = (fields: any[]) => {
    let tmpColumns: ProColumns<any>[] = [
      {
        title: intl.formatMessage({ id: 'plugin.finance.time' }),
        width: 160,
        dataIndex: 'created_time',
        render: (text, record) => dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
      },
    ];
    if (fields.length === 0) {
      tmpColumns.push(
        {
          title: intl.formatMessage({ id: 'plugin.guestbook.user-name' }),
          width: 100,
          dataIndex: 'user_name',
        },
        {
          title: intl.formatMessage({ id: 'plugin.guestbook.contact' }),
          width: 160,
          dataIndex: 'contact',
        },
        {
          title: intl.formatMessage({ id: 'plugin.guestbook.content' }),
          dataIndex: 'content',
          render: (text) => (
            <div style={{ wordBreak: 'break-all', minWidth: 200 }}>{text}</div>
          ),
        },
      );
    } else {
      for (let i in fields) {
        if (fields.hasOwnProperty(i)) {
          tmpColumns.push({
            title: fields[i].name,
            dataIndex: fields[i].field_name,
            width: fields[i].field_name === 'content' ? 0 : 160,
            render: (text, record) => (
              <div
                style={{
                  wordBreak: 'break-all',
                  minWidth: fields[i].field_name === 'content' ? 200 : 50,
                }}
              >
                {record.extra_data[fields[i].name] || text}
              </div>
            ),
          });
        }
      }
    }
    tmpColumns.push(
      {
        title: 'IP',
        dataIndex: 'ip',
        width: 100,
      },
      {
        title: intl.formatMessage({ id: 'setting.action' }),
        width: 150,
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <Space size={20}>
            <a
              key="check"
              onClick={() => {
                handlePreview(record);
              }}
            >
              <FormattedMessage id="setting.action.view" />
            </a>
            <a
              className="text-red"
              key="delete"
              onClick={() => {
                handleRemove([record.id]);
              }}
            >
              <FormattedMessage id="setting.system.delete" />
            </a>
          </Space>
        ),
      },
    );

    setColumns(tmpColumns);
  };

  const getSetting = async () => {
    const res = await pluginGetGuestbookSetting();
    let setting = res.data || { fields: [] };
    initColumns(setting.fields || []);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleExportGuestbook = async () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.guestbook.export.confirm' }),
      onOk: async () => {
        const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);

        try {
          let res = await pluginExportGuestbook();

          exportFile(res.data?.header, res.data?.content, 'xls');
        } catch (err: any) {
          hide();
          message.error(err.message || 'error');
        }
        hide();
      },
    });
  };

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle={intl.formatMessage({ id: 'menu.plugin.guestbook' })}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            key="export"
            onClick={() => {
              handleExportGuestbook();
            }}
          >
            <FormattedMessage id="plugin.guestbook.export" />
          </Button>,
          <GuestbookSetting key="setting">
            <Button
              onClick={() => {
                //todo
              }}
            >
              <FormattedMessage id="plugin.guestbook.setting" />
            </Button>
          </GuestbookSetting>,
        ]}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space>
            <Button
              size={'small'}
              onClick={() => {
                handleRemove(selectedRowKeys);
              }}
            >
              <FormattedMessage id="content.option.batch-delete" />
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              <FormattedMessage id="content.option.cancel-select" />
            </Button>
          </Space>
        )}
        request={(params) => {
          return pluginGetGuestbooks(params);
        }}
        columnsState={{
          persistenceKey: 'guestbook-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={{
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {editVisible && (
        <GuestbookForm
          open={editVisible}
          editingGuestbook={currentGuestbook}
          onCancel={() => {
            setEditVisible(false);
          }}
          onSubmit={async () => {
            setEditVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        />
      )}
    </PageContainer>
  );
};

export default PluginGuestbook;
