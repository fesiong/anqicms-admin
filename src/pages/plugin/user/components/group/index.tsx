import React, { useRef, useState } from 'react';
import { Button, Input, message, Modal, Space } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { pluginDeleteUserGroup, pluginGetUserGroups, pluginSaveUserGroupInfo } from '@/services';

export type UserGroupProps = {
  onCancel: (flag?: boolean) => void;
};

const UserGroups: React.FC<UserGroupProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [editVisbile, setEditVisible] = useState<boolean>(false);
  const [editingGroup, setEditingGroup] = useState<any>({});
  const [editingInput, setEditingInput] = useState<string>('');

  const handleAddGroup = () => {
    setEditingGroup({});
    setEditingInput('');
    setEditVisible(true);
  };

  const handleEditGroup = (record: any) => {
    setEditingGroup(record);
    setEditingInput(record.title);
    setEditVisible(true);
  };

  const handleRemove = async (record: any) => {
    const res = await pluginDeleteUserGroup(record);

    message.info(res.msg);
    actionRef.current?.reloadAndRest?.();
  };

  const handleSaveGroup = () => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveUserGroupInfo({
      id: editingGroup.id,
      title: editingInput,
    })
      .then((res) => {
        if (res.code === 0) {
          setEditVisible(false);

          actionRef.current?.reloadAndRest?.();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '用户组ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
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
            className="text-red"
            key="delete"
            onClick={async () => {
              await handleRemove(record);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            删除
          </a>
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
        visible={visible}
        title={
          <Button
            type="primary"
            onClick={() => {
              handleAddGroup();
            }}
          >
            新增用户组
          </Button>
        }
        width={600}
        onCancel={() => {
          setVisible(false);
          props.onCancel();
        }}
        footer={false}
      >
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <ProTable<any>
            headerTitle="用户组管理"
            actionRef={actionRef}
            rowKey="id"
            search={false}
            pagination={false}
            toolBarRender={false}
            request={(params) => {
              return pluginGetUserGroups(params);
            }}
            columns={columns}
          />
        </div>
      </Modal>
      <Modal
        visible={editVisbile}
        title={editingGroup.id ? '重命名用户组：' + editingGroup.title : '新增用户组'}
        width={480}
        zIndex={2000}
        okText="确认"
        cancelText="取消"
        maskClosable={false}
        onOk={handleSaveGroup}
        onCancel={() => {
          setEditVisible(false);
        }}
      >
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <p>请填写用户组名称: </p>
          <Input
            size="large"
            value={editingInput}
            onChange={(e) => {
              setEditingInput(e.target.value);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserGroups;
