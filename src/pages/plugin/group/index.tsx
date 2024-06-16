import { pluginDeleteUserGroup, pluginGetUserGroups } from '@/services';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, message } from 'antd';
import React, { useRef, useState } from 'react';
import UserGroupForm from './components/groupForm';

const PluginUserGroup: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentGroup, setCurrentGroup] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);

  const handleEditGroup = async (record: any) => {
    setCurrentGroup(record);
    setEditVisible(true);
  };

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: '确定要删除该条数据吗？',
      onOk: () => {
        pluginDeleteUserGroup(row).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '介绍',
      dataIndex: 'description',
    },
    {
      title: 'Level',
      dataIndex: 'level',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          <a
            key="edit"
            onClick={() => {
              handleEditGroup(record);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              handleDelete(record);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="用户组VIP管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleEditGroup({})}>
            添加用户组
          </Button>,
        ]}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetUserGroups(params);
        }}
        columnsState={{
          persistenceKey: 'user-group-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={false}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {editVisible && (
        <UserGroupForm
          open={editVisible}
          group={currentGroup}
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

export default PluginUserGroup;
