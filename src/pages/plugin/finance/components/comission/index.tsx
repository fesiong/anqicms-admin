import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { pluginGetCommissions, pluginSetWithdrawApply } from '@/services';
import { Modal, Space, message } from 'antd';

const PluginFinanceCommission: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleWithdraw = (record: any) => {
    Modal.confirm({
      title: '确定要手动处理提现吗？',
      content: '这里仅仅是相当于从用户侧申请提现。',
      onOk: () => {
        pluginSetWithdrawApply(record).then((res) => {
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
      title: '金额',
      dataIndex: 'amount',
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '归属订单',
      dataIndex: 'order_id',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '未提现',
        },
        1: {
          text: '已提现',
        },
      },
    },
    {
      title: '时间',
      dataIndex: 'created_time',
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
          {record.amount > 200 && record.status === 0 && (
            <a
              key="edit"
              onClick={() => {
                handleWithdraw(record);
              }}
            >
              手动提现
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ProTable<any>
      headerTitle="佣金管理"
      actionRef={actionRef}
      rowKey="id"
      search={false}
      toolBarRender={false}
      tableAlertOptionRender={false}
      request={(params) => {
        return pluginGetCommissions(params);
      }}
      columnsState={{
        persistenceKey: 'commission-table',
        persistenceType: 'localStorage',
      }}
      columns={columns}
      rowSelection={false}
      pagination={{
        showSizeChanger: true,
      }}
    />
  );
};

export default PluginFinanceCommission;
