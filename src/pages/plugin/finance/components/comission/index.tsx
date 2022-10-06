import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { pluginGetCommissions } from '@/services';

const PluginFinanceCommission: React.FC = () => {
  const actionRef = useRef<ActionType>();

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
      columns={columns}
      rowSelection={false}
    />
  );
};

export default PluginFinanceCommission;
