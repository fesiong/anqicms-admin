import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import PluginFinanceFlow from './components/flow';
import PluginFinanceCommission from './components/comission';
import PluginFinanceWithdraw from './components/withdraw';

const { TabPane } = Tabs;

const PluginFinance: React.FC<any> = () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Tabs tabPosition={'left'}>
          <TabPane tab="收支记录" key="1">
            <PluginFinanceFlow />
          </TabPane>
          <TabPane tab="佣金管理" key="2">
            <PluginFinanceCommission />
          </TabPane>
          <TabPane tab="提现管理" key="3">
            <PluginFinanceWithdraw />
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginFinance;
