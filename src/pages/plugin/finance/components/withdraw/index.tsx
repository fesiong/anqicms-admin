import React, { useRef, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import {
  pluginGetWithdraws,
  pluginSetWithdrawApproval,
  pluginSetWithdrawFinished,
} from '@/services';
import { ModalForm, ProFormRadio } from '@ant-design/pro-form';
import { message, Modal, Space } from 'antd';

const PluginFinanceWithdraw: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentInfo, setCurrentInfo] = useState<boolean>(false);
  const [withdrawVisible, setWithdrawVisible] = useState<boolean>(false);

  const handleSetApproval = (record: any) => {
    setCurrentInfo(record);
    setWithdrawVisible(true);
  };

  const saveWithdrawApproval = async () => {
    pluginSetWithdrawApproval(currentInfo).then((res) => {
      message.info(res.msg);
      actionRef.current?.reload();
    });
  };

  const setWithdrawFinished = async (record: any) => {
    Modal.confirm({
      title: '确定要手动处理完成提现吗？',
      content: '如果你线下打款给用户了，可以在这里点击完成',
      onOk: () => {
        pluginSetWithdrawFinished(record).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '用户',
      dataIndex: 'user_name',
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '等待处理',
        },
        1: {
          text: '已同意',
        },
        2: {
          text: '已提现',
        },
      },
    },
    {
      title: '申请时间',
      dataIndex: 'created_time',
      render: (_, entity) => {
        return moment(entity.created_time * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '成功时间',
      dataIndex: 'success_time',
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
          {record.status == 0 && (
            <a
              key="edit"
              onClick={() => {
                handleSetApproval(record);
              }}
            >
              同意提现
            </a>
          )}
          {record.status == 1 && (
            <a
              key="finish"
              onClick={() => {
                setWithdrawFinished(record);
              }}
            >
              完成提现
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<any>
        headerTitle="提现管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={false}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetWithdraws(params);
        }}
        columnsState={{
          persistenceKey: 'withdraw-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={false}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {withdrawVisible && (
        <ModalForm
          title="提现申请处理"
          visible={withdrawVisible}
          onVisibleChange={(flag) => {
            setWithdrawVisible(flag);
          }}
          onFinish={saveWithdrawApproval}
        >
          <ProFormRadio.Group
            name="status"
            label="提现申请"
            options={[
              {
                value: 1,
                label: '同意',
              },
            ]}
          />
        </ModalForm>
      )}
    </>
  );
};

export default PluginFinanceWithdraw;
