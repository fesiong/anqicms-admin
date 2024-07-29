import { getStatisticInfo } from '@/services/statistic';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import dayjs from 'dayjs';
import React, { useRef } from 'react';

const StatisticDetail: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();

  const openLink = (text: string) => {
    window.open((initialState?.system?.base_url || '') + text);
  };

  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'account.time' }),
      dataIndex: 'created_time',
      width: 160,
      render: (text, record) => dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: intl.formatMessage({ id: 'statistic.host' }),
      dataIndex: 'host',
    },
    {
      title: intl.formatMessage({ id: 'statistic.url' }),
      dataIndex: 'url',
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <div className="link" onClick={() => openLink(record.url)}>
          {text}
        </div>
      ),
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      width: 160,
    },
    {
      title: intl.formatMessage({ id: 'statistic.device' }),
      dataIndex: 'device',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'statistic.spider-name' }),
      dataIndex: 'spider',
      width: 80,
    },
    {
      title: intl.formatMessage({ id: 'statistic.http-code' }),
      dataIndex: 'http_code',
      width: 80,
    },
    {
      title: intl.formatMessage({ id: 'statistic.user-agent' }),
      dataIndex: 'user_agent',
      ellipsis: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle={intl.formatMessage({ id: 'statistic.traffic.detail' })}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={(params) => {
          return getStatisticInfo(params);
        }}
        columnsState={{
          persistenceKey: 'statistic-detail-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        pagination={{
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  );
};

export default StatisticDetail;
