import { Button, message, Modal, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { pluginDeleteUserGroup, pluginGetUserGroups } from '@/services';
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
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleEditGroup({})}>
            添加用户组
          </Button>,
        ]}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetUserGroups(params);
        }}
        columns={columns}
        rowSelection={false}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {editVisible && (
        <UserGroupForm
          visible={editVisible}
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
