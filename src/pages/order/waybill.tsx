import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card } from 'antd';
import React, { useEffect } from 'react';
import './index.less';

const OrderWaybill: React.FC = () => {
  const intl = useIntl();

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card>
        <div>{intl.formatMessage({ id: 'OrderWaybill' })}</div>
      </Card>
    </PageContainer>
  );
};

export default OrderWaybill;
