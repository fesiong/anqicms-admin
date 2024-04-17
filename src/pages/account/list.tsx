import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { deleteAdminInfo, getAdminGroups, getAdminList, saveAdmin } from '@/services';
import { Button, message, Modal, Space } from 'antd';
import { useModel } from 'umi';
import { ModalForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const AdminList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<any>({});

  const { currentUser } = initialState;

  const handleEdit = (record: any) => {
    setEditInfo(record);
    setEditVisible(true);
  };

  const onSubmitEdit = async (values: any) => {
    if (currentUser.id == editInfo.id || editInfo.id == 1) {
      // 自己无法禁用自己
      values.status = 1;
    }
    values.status = Number(values.status);
    const postData = Object.assign(editInfo, values);
    saveAdmin(postData).then((res) => {
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
    if (currentUser.id == record.id || record.id == 1) {
      message.error('该管理员不能删除');
      return;
    }
    Modal.confirm({
      title: '确定要删除该管理员吗？',
      onOk: () => {
        deleteAdminInfo({
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
      title: '账号',
      dataIndex: 'user_name',
    },
    {
      title: '分组',
      dataIndex: 'group.title',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      render: (text, record) => moment(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '最近登录',
      dataIndex: 'login_time',
      render: (text, record) => moment(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
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
        headerTitle="管理员列表"
        rowKey="id"
        actionRef={actionRef}
        search={false}
        request={(params) => {
          return getAdminList(params);
        }}
        columnsState={{
          persistenceKey: 'account-table',
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
            <PlusOutlined /> 添加管理员
          </Button>,
        ]}
      />
      {editVisible && (
        <ModalForm
          width={480}
          title="调整管理员"
          visible={editVisible}
          initialValues={editInfo}
          onFinish={onSubmitEdit}
          onVisibleChange={(e) => setEditVisible(e)}
        >
          <ProFormText name="user_name" label="账号" width="lg" />
          <ProFormText.Password
            name="password"
            label="密码"
            width="lg"
            placeholder="不修改请留空"
          />
          <ProFormSelect
            name="group_id"
            label="分组"
            request={async () => {
              const res = await getAdminGroups({});
              return res.data || [];
            }}
            fieldProps={{
              fieldNames: {
                label: 'title',
                value: 'id',
              },
            }}
          />
          <ProFormRadio.Group
            label="账号状态"
            name="status"
            valueEnum={{
              0: '停用',
              1: '正常',
            }}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default AdminList;
