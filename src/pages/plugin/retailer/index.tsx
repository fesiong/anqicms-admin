import { Button, message, Modal, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import moment from 'moment';
import RetailerSetting from './components/setting';
import { pluginGetRetailers, pluginSaveRetailer } from '@/services/plugin/retailer';

const PluginRetailer: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [realnameVisible, setRealnameVisible] = useState<boolean>(false);

  const handleSetRealname = (record: any) => {
    setCurrentUser(record);
    setRealnameVisible(true);
  };

  const setRealname = async (values: any) => {
    values.id = currentUser.id;
    pluginSaveRetailer(values).then(() => {
      actionRef.current?.reload();
    });
  };

  const setUserRetailer = async (values: any) => {
    if (!values.cancel) {
      values.is_retailer = 1;
    }
    values.id = Number(values.id);
    pluginSaveRetailer(values).then((res) => {
      setEditVisible(false);
      message.info(res.msg);
      actionRef.current?.reload();
    });
  };

  const handleCancelRetailer = (record: any) => {
    Modal.confirm({
      title: '确定要取消该用户的分销员资格吗？',
      content: '如果分销员门槛为自动成为分销员的话，则该取消无效',
      onOk: () => {
        setUserRetailer({
          id: record.id,
          is_retailer: 0,
          cancel: true,
        });
      },
    });
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
      hideInSearch: true,
    },
    {
      title: '用户余额',
      dataIndex: 'balance',
      hideInSearch: true,
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '累计收益',
      dataIndex: 'total_reward',
      hideInSearch: true,
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '加入时间',
      dataIndex: 'created_time',
      hideInSearch: true,
      render: (_, entity) => {
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
              handleSetRealname(record);
            }}
          >
            修改真实姓名
          </a>
          <a
            key="edit"
            onClick={() => {
              handleCancelRetailer(record);
            }}
          >
            取消
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="分销员管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setEditVisible(true);
            }}
          >
            添加分销员
          </Button>,
          <RetailerSetting onCancel={() => {}}>
            <Button type="primary" key="group">
              分销员功能设置
            </Button>
          </RetailerSetting>,
        ]}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetRetailers(params);
        }}
        columns={columns}
        rowSelection={false}
      />
      {editVisible && (
        <ModalForm
          title="填写用户ID，设置分销员"
          visible={editVisible}
          onVisibleChange={(flag) => {
            setEditVisible(flag);
          }}
          onFinish={setUserRetailer}
        >
          <ProFormText name="id" label="用户ID" />
        </ModalForm>
      )}
      {realnameVisible && (
        <ModalForm
          title="修改真实姓名"
          visible={realnameVisible}
          onVisibleChange={(flag) => {
            setRealnameVisible(flag);
          }}
          onFinish={setRealname}
        >
          <ProFormText name="user_name" label="用户名" readonly />
          <ProFormText name="real_name" label="新的真实姓名" />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default PluginRetailer;
