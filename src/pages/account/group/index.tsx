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
import { Alert, Button, Checkbox, Collapse, Input, message, Space } from 'antd';
import { useModel } from 'umi';
import { ModalForm, ProFormCheckbox, ProFormRadio, ProFormText } from '@ant-design/pro-form';
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
      message.error('???????????????????????????');
      return;
    }

    deleteAdminGroupInfo({
      id: record.id,
    }).then((res) => {
      message.info(res.msg);
      actionRef.current?.reload();
    });
  };
  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '????????????',
      dataIndex: 'title',
    },
    {
      title: '??????',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '??????',
          status: 'Default',
        },
        1: {
          text: '??????',
          status: 'Success',
        },
      },
    },
    {
      title: '??????',
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
            ??????
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={async () => {
              await handleRemove([record.id]);
            }}
          >
            ??????
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="?????????????????????"
        rowKey="id"
        actionRef={actionRef}
        search={false}
        request={(params, sort) => {
          return getAdminGroups(params);
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
            <PlusOutlined /> ????????????
          </Button>,
        ]}
      />
      {editVisible && (
        <ModalForm
          width={1000}
          title="????????????"
          visible={editVisible}
          initialValues={editInfo}
          layout="horizontal"
          onFinish={onSubmitEdit}
          onVisibleChange={(e) => setEditVisible(e)}
        >
          <div className="mb-normal">
            <Alert message="???????????????????????????????????????????????????????????????" />
          </div>
          <ProFormText name="title" label="????????????" width="lg" />
          <ProFormText name="description" label="????????????" width="lg" />
          <ProFormRadio.Group
            label="????????????"
            name="status"
            valueEnum={{
              0: '??????',
              1: '??????',
            }}
          />
          <ProFormText label="????????????">
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
