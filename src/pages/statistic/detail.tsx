import { getStatisticDates, getStatisticInfo } from '@/services/statistic';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

const StatisticDetail: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getStatisticDates().then((res) => {
      setDates(res.data || []);
    });
    setSelectedDate(dayjs().format('YYYYMMDD'));
  }, []);

  const openLink = (text: string) => {
    window.open((initialState?.system?.base_url || '') + text);
  };

  const handleSelectDate = (item: string) => {
    setSelectedDate(item);
    actionRef.current?.reloadAndRest?.();
  };

  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'account.time' }),
      dataIndex: 'created_time',
      width: 160,
      render: (text, record) =>
        dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
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
        tableExtraRender={() => (
          <div className="statistic-dates">
            <Space wrap size={16}>
              {dates.map((item) => (
                <Button
                  type={selectedDate === item ? 'primary' : 'default'}
                  key={item}
                  onClick={() => handleSelectDate(item)}
                >
                  {item}
                </Button>
              ))}
            </Space>
          </div>
        )}
        headerTitle={intl.formatMessage({ id: 'statistic.traffic.detail' })}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={(params) => {
          params.date = selectedDate;
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
