import React, { useEffect, useState } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import moment from 'moment';
import { Divider } from 'antd';
import { pluginGetOrderInfo } from '@/services';

export type OrderFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  visible: boolean;
  order: any;
};

const OrderForm: React.FC<OrderFormProps> = (props) => {
  const [order, setOrder] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);

  const getOrderDetail = async () => {
    const res = await pluginGetOrderInfo({
      order_id: props.order.order_id,
    });
    setOrder(res.data || null);
    setFetched(true);
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getStatusText = (status: number) => {
    let text = '';
    switch (status) {
      case 0:
        text = '待付款';
        break;
      case 1:
        text = '待发货';
        break;
      case 2:
        text = '待收货';
        break;
      case 3:
        text = '已成功';
        break;
      case 8:
        text = '退款中';
        break;
      case 9:
        text = '已退款';
        break;
      case -1:
        text = '订单关闭';
        break;
    }

    return text;
  };

  return fetched ? (
    <ModalForm
      width={900}
      title={'订单信息'}
      visible={props.visible}
      layout="horizontal"
      onVisibleChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      submitter={false}
    >
      <ProFormText
        name="type"
        label="订单类型"
        readonly
        initialValue={order.type == 'vip' ? 'VIP' : '商品'}
      />
      <ProFormText name="order_id" label="订单ID" readonly initialValue={order.order_id} />
      <ProFormText
        name="status"
        label="订单状态"
        readonly
        initialValue={getStatusText(order.status)}
      />
      <ProFormText
        name="created_time"
        label="下单时间"
        readonly
        initialValue={moment(order.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
      />
      <ProFormText
        name="created_time"
        label="支付时间"
        readonly
        initialValue={
          order.paid_time > 0 ? moment(order.paid_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
        }
      />
      <ProFormText
        name="created_time"
        label="发货时间"
        readonly
        initialValue={
          order.deliver_time > 0
            ? moment(order.deliver_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }
      />
      <ProFormText
        name="created_time"
        label="完成时间"
        readonly
        initialValue={
          order.finished_time > 0
            ? moment(order.finished_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }
      />
      <ProFormText name="payment_id" label="交易号" readonly initialValue={order.payment_id} />
      <ProFormText name="payment_id" label="交易号" readonly initialValue={order.payment_id} />
      <ProFormText name="terrace_id" label="商户流水号" readonly initialValue={order.terrace_id} />
      <ProFormText name="amount" label="支付总价" readonly initialValue={order.amount / 100} />
      <ProFormText
        name="amount"
        label="原始总价"
        readonly
        initialValue={order.origin_amount / 100}
      />
      <ProFormText name="user" label="订购用户" readonly initialValue={order.user?.user_name} />
      {order.share_user_id > 0 && (
        <>
          <ProFormText
            name="user"
            label="分销用户"
            readonly
            initialValue={order.share_user?.user_name}
          />
          <ProFormText
            name="user"
            label="分销佣金"
            readonly
            initialValue={order.share_amount / 100}
          />
        </>
      )}
      {order.share_parent_user_id > 0 && (
        <>
          <ProFormText
            name="user"
            label="分销上级用户"
            readonly
            initialValue={order.parent_user?.user_name}
          />
          <ProFormText
            name="user"
            label="上级奖励佣金"
            readonly
            initialValue={order.share_parent_amount / 100}
          />
        </>
      )}
      <ProFormText name="remark" label="订单备注" readonly initialValue={order.remark} />
      <Divider />
      {order.type == 'vip' ? (
        <div>
          <div>购买VIP</div>
          {order.details?.map((item: any, index: number) => (
            <div key={index}>
              <ProFormText name="title" label="名称" readonly initialValue={item.group?.title} />
              <ProFormText name="amount" label="单价" readonly initialValue={item.price / 100} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>订购商品</div>
          {order.details?.map((item: any, index: number) => (
            <div key={index}>
              <ProFormText name="title" label="名称" readonly initialValue={item.goods?.title} />
              <ProFormText name="amount" label="单价" readonly initialValue={order.price / 100} />
              <ProFormText name="amount" label="订购数量" readonly initialValue={item.quantity} />
              <ProFormText name="amount" label="总价" readonly initialValue={item.amount / 100} />
            </div>
          ))}
        </div>
      )}
      <Divider />
      <ProFormText name="name" label="收件人" readonly initialValue={order.order_address?.name} />
      <ProFormText
        name="phone"
        label="收件电话"
        readonly
        initialValue={order.order_address?.phone}
      />
      <ProFormText
        name="address_info"
        label="收件地址"
        readonly
        initialValue={
          order.order_address?.province +
          order.order_address?.city +
          order.order_address?.country +
          order.order_address?.province
        }
      />
    </ModalForm>
  ) : (
    <div></div>
  );
};

export default OrderForm;
