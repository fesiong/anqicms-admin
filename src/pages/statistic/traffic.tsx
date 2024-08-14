import { getStatisticTraffic } from '@/services/statistic';
import { Line } from '@ant-design/plots';
import { PageContainer, StatisticCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useEffect, useState } from 'react';

const StatisticTraffic: React.FC<any> = () => {
  const [data, setData] = useState<any[]>([]);
  const intl = useIntl();

  const asyncFetch = () => {
    getStatisticTraffic()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data: data,
    //padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'label',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <PageContainer>
      <StatisticCard
        title={intl.formatMessage({ id: 'statistic.traffic' })}
        tooltip={intl.formatMessage({ id: 'statistic.traffic.tips' })}
        chart={<Line {...config} />}
      />
    </PageContainer>
  );
};

export default StatisticTraffic;
