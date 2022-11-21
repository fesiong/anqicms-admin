import React, { useState } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormDigit, ProFormRadio } from '@ant-design/pro-form';
import { pluginSaveOrderSetting, pluginGetOrderSetting } from '@/services';

const OrderSetting: React.FC = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleSaveSetting = async (values: any) => {
    const res = await pluginSaveOrderSetting(values);

    if (res.code === 0) {
      message.success(res.msg);
      setVisible(false);
    } else {
      message.error(res.msg);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      <ModalForm
        width={600}
        title={'订单设置'}
        visible={visible}
        // modalProps={{
        //   onCancel: () => {
        //     setVisible(false);
        //   },
        // }}
        onVisibleChange={(flag) => {
          setVisible(flag);
        }}
        request={async () => {
          const res = await pluginGetOrderSetting();
          return res.data;
        }}
        layout="horizontal"
        onFinish={async (values) => {
          handleSaveSetting(values);
        }}
      >
        <ProFormRadio.Group
          name="no_process"
          label="订单处理方式"
          options={[
            { label: '正常交易流程', value: false },
            { label: '交易直接完成', value: true },
          ]}
          extra="正常交易需要用户确认收货或到期完成订单，交易直接完成是用户支付后，订单即完成交易"
        />
        <ProFormDigit
          label="订单自动完成"
          name="auto_finish_day"
          extra="默认10天"
          fieldProps={{ precision: 0, addonAfter: '天' }}
        />
        <ProFormDigit
          label="订单超时关闭"
          name="auto_close_minute"
          extra="默认不自动关闭"
          fieldProps={{ precision: 0, addonAfter: '分钟' }}
        />
        <ProFormDigit
          label="商家销售收益"
          name="seller_percent"
          extra="商家销售收益百分比"
          fieldProps={{ precision: 0, addonAfter: '%' }}
        />
      </ModalForm>
    </>
  );
};

export default OrderSetting;
