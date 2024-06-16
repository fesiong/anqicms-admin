import {
  pluginDeleteGuestbook,
  pluginExportGuestbook,
  pluginGetGuestbooks,
  pluginGetGuestbookSetting,
} from '@/services/plugin/guestbook';
import { exportFile } from '@/utils';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
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
  const [setting, setSetting] = useState<any>({ fields: [] });
  const [columns, setColumns] = useState<ProColumns<any>[]>([]);

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await pluginGetGuestbookSetting();
    let setting = res.data || { fields: [] };
    setSetting(setting);
    initColumns(setting.fields || []);
  };

  const initColumns = (fields: any[]) => {
    let tmpColumns: ProColumns<any>[] = [
      {
        title: '时间',
        width: 160,
        dataIndex: 'created_time',
        render: (text, record) => dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
      },
    ];
    if (fields.length == 0) {
      tmpColumns.push(
        {
          title: '用户名',
          width: 100,
          dataIndex: 'user_name',
        },
        {
          title: '联系方式',
          width: 160,
          dataIndex: 'contact',
        },
        {
          title: '留言内容',
          dataIndex: 'content',
          render: (text, record) => (
            <div style={{ wordBreak: 'break-all', minWidth: 200 }}>{text}</div>
          ),
        },
      );
    } else {
      for (let i in fields) {
        tmpColumns.push({
          title: fields[i].name,
          dataIndex: fields[i].field_name,
          width: fields[i].field_name == 'content' ? 0 : 160,
          render: (text, record) => (
            <div
              style={{
                wordBreak: 'break-all',
                minWidth: fields[i].field_name == 'content' ? 200 : 50,
              }}
            >
              {record.extra_data[fields[i].name] || text}
            </div>
          ),
        });
      }
    }
    tmpColumns.push(
      {
        title: 'IP',
        dataIndex: 'ip',
        width: 100,
      },
      {
        title: '操作',
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
              查看
            </a>
            <a
              className="text-red"
              key="delete"
              onClick={() => {
                handleRemove([record.id]);
              }}
            >
              删除
            </a>
          </Space>
        ),
      },
    );

    setColumns(tmpColumns);
  };

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: '确定要删除选中的留言吗？',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await pluginDeleteGuestbook({
              id: item,
            });
          }
          hide();
          message.success('删除成功');
          setSelectedRowKeys([]);
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error('删除失败');
          return true;
        }
      },
    });
  };

  const handlePreview = async (record: any) => {
    setCurrentGuestbook(record);
    setEditVisible(true);
  };

  const handleExportGuestbook = async () => {
    let res = await pluginExportGuestbook();

    exportFile(res.data?.header, res.data?.content, 'xls');
  };

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="网站留言管理"
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
            导出留言
          </Button>,
          <GuestbookSetting>
            <Button
              key="setting"
              onClick={() => {
                //todo
              }}
            >
              网站留言设置
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
              批量删除
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              取消选择
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
