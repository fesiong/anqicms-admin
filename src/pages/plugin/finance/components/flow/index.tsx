import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { pluginGetFinances } from '@/services/plugin/finance';

const PluginFinanceFlow: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '用户',
      dataIndex: 'user_name',
    },
    {
      title: '资金方向',
      dataIndex: 'direction',
      valueEnum: {
        1: {
          text: '进账',
        },
        2: {
          text: '出账',
        },
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '变化后金额',
      dataIndex: 'after_amount',
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '资金类型',
      dataIndex: 'action',
      valueEnum: {
        1: {
          text: '出售',
        },
        2: {
          text: '购买',
        },
        3: {
          text: '退款',
        },
        4: {
          text: '充值',
        },
        5: {
          text: '提现',
        },
        6: {
          text: '推广',
        },
        7: {
          text: '返现',
        },
        8: {
          text: '佣金',
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
      headerTitle="收支记录"
      actionRef={actionRef}
      rowKey="id"
      search={false}
      toolBarRender={false}
      tableAlertOptionRender={false}
      request={(params) => {
        return pluginGetFinances(params);
      }}
      columns={columns}
      rowSelection={false}
      pagination={{
        showSizeChanger: true,
      }}
    />
  );
};

export default PluginFinanceFlow;
