import { Button, Space } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { pluginGetUserGroups, pluginGetUsers } from '@/services';
import { ProFormSelect } from '@ant-design/pro-form';
import moment from 'moment';
import UserForm from './components/userForm';
import UserGroups from './components/group';

const PluginUser: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [userGroups, setUserGroups] = useState<any[]>([]);

  const getUserGroups = () => {
    pluginGetUserGroups().then((res) => {
      setUserGroups(res.data || []);
    });
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  const handleEditUser = async (record: any) => {
    setCurrentUser(record);
    setEditVisible(true);
  };

  const onUserGroupClose = () => {
    getUserGroups();
  };

  const columns: ProColumns<any>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
    },
    {
      title: '真实姓名',
      dataIndex: 'real_name',
    },
    {
      title: '用户组',
      dataIndex: 'group_id',
      render: (dom: any, entity) => {
        return entity.group?.title;
      },
      renderFormItem: (_, { fieldProps }) => {
        return (
          <ProFormSelect
            name="group_id"
            request={async () => {
              return [{ title: '所有分组', id: 0 }].concat(userGroups || []);
            }}
            fieldProps={{
              fieldNames: {
                label: 'title',
                value: 'id',
              },
              ...fieldProps,
            }}
          />
        );
      },
    },
    {
      title: '加入时间',
      dataIndex: 'created_time',
      hideInSearch: true,
      render: (dom: any, entity) => {
        return moment(entity.created_time * 1000).format('YYYY-MM-DD HH:mm');
      },
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
              handleEditUser(record);
            }}
          >
            编辑
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <UserGroups key="group" onCancel={() => onUserGroupClose()}>
            <Button type="primary">用户组管理</Button>
          </UserGroups>,
        ]}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetUsers(params);
        }}
        columns={columns}
        rowSelection={false}
      />
      {editVisible && (
        <UserForm
          visible={editVisible}
          user={currentUser}
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

export default PluginUser;
