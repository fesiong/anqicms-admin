import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  deleteAdminGroupInfo,
  getAdminGroups,
  getPermissionMenus,
  saveAdminGroupInfo,
} from '@/services';
import { Alert, Button, Checkbox, Collapse, message, Modal, Space } from 'antd';
import { useModel } from 'umi';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const AdminGroupList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<any>({});
  const [permissionGroups, setPermissionGroups] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);

  const { currentUser } = initialState;

  useEffect(() => {
    initPermissions();
  }, []);

  const initPermissions = () => {
    getPermissionMenus().then((res) => {
      setPermissionGroups(res.data || []);
    });
  };

  const onPermissionChange = (item: any, e: any) => {
    let checked = e.target.checked;
    if (checked) {
      permissions.push(item.path);
    } else {
      let index = permissions.indexOf(item.path);
      permissions.splice(index, 1);
    }
    setPermissions([].concat(...permissions));
  };

  const handleEdit = (record: any) => {
    setEditInfo(record);
    setPermissions(record.setting?.permissions || []);
    setEditVisible(true);
  };

  const onSubmitEdit = async (values: any) => {
    values = Object.assign(editInfo, values);
    if (typeof values.setting == 'undefined') {
      values.setting = {};
    }
    values.status = Number(values.status);
    values.setting.permissions = permissions;
    saveAdminGroupInfo(values).then((res) => {
      if (res.code !== 0) {
        message.error(res.msg);
      } else {
        message.info(res.msg);
        actionRef.current?.reload();
        setEditVisible(false);
      }
    });
  };

  const handleRemove = (record: any) => {
    if (currentUser.group_id == record.id || record.id == 1) {
      message.error('该管理分组不能删除');
      return;
    }
    Modal.confirm({
      title: '确定要删除该分组吗？',
      onOk: () => {
        deleteAdminGroupInfo({
          id: record.id,
        }).then((res) => {
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
      title: '分组名称',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '停用',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
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
              handleEdit(record);
            }}
          >
            修改
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={async () => {
              await handleRemove([record.id]);
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
        headerTitle="管理员分组列表"
        rowKey="id"
        actionRef={actionRef}
        search={false}
        request={(params) => {
          return getAdminGroups(params);
        }}
        columnsState={{
          persistenceKey: 'account-group-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEdit({});
            }}
          >
            <PlusOutlined /> 添加分组
          </Button>,
        ]}
      />
      {editVisible && (
        <ModalForm
          width={1000}
          title="调整分组"
          visible={editVisible}
          initialValues={editInfo}
          layout="horizontal"
          onFinish={onSubmitEdit}
          onVisibleChange={(e) => setEditVisible(e)}
        >
          <div className="mb-normal">
            <Alert message="超级管理员拥有所有权限，并不受权限分配影响" />
          </div>
          <ProFormText name="title" label="分组名称" width="lg" />
          <ProFormText name="description" label="备注信息" width="lg" />
          <ProFormRadio.Group
            label="账号状态"
            name="status"
            valueEnum={{
              0: '停用',
              1: '正常',
            }}
          />
          <ProFormText label="分组权限">
            <Collapse defaultActiveKey={'0'}>
              {permissionGroups.map((group: any, index: number) => (
                <Panel header={group.name} key={index}>
                  {group.menus.map((item: any, i: number) => (
                    <Checkbox
                      key={i}
                      onChange={(e: any) => {
                        onPermissionChange(item, e);
                      }}
                      checked={permissions.indexOf(item.path) !== -1}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </Panel>
              ))}
            </Collapse>
          </ProFormText>
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default AdminGroupList;
