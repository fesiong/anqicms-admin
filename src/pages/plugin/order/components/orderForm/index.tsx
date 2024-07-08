import { pluginGetOrderInfo } from '@/services';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Divider } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export type OrderFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
  order: any;
};

const OrderForm: React.FC<OrderFormProps> = (props) => {
  const [order, setOrder] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const intl = useIntl();

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
        text = intl.formatMessage({ id: 'plugin.order.status.wait' });
        break;
      case 1:
        text = intl.formatMessage({ id: 'plugin.order.status.paid' });
        break;
      case 2:
        text = intl.formatMessage({ id: 'plugin.order.status.delivery' });
        break;
      case 3:
        text = intl.formatMessage({ id: 'plugin.order.status.finished' });
        break;
      case 8:
        text = intl.formatMessage({ id: 'plugin.order.status.refunding' });
        break;
      case 9:
        text = intl.formatMessage({ id: 'plugin.order.status.refunded' });
        break;
      case -1:
        text = intl.formatMessage({ id: 'plugin.order.status.closed' });
        break;
    }

    return text;
  };

  return fetched ? (
    <ModalForm
      width={900}
      title={intl.formatMessage({ id: 'plugin.order.detail' })}
      open={props.open}
      layout="horizontal"
      onOpenChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      submitter={false}
    >
      <ProFormText
        name="type"
        label={intl.formatMessage({ id: 'plugin.order.type' })}
        readonly
        initialValue={order.type == 'vip' ? intl.formatMessage({id: 'plugin.order.type.vip'}) : intl.formatMessage({ id: 'plugin.order.type.goods' })}
      />
      <ProFormText name="order_id" label={intl.formatMessage({ id: 'plugin.order.order-id' })} readonly initialValue={order.order_id} />
      <ProFormText
        name="status"
        label={intl.formatMessage({ id: 'plugin.order.status' })}
        readonly
        initialValue={getStatusText(order.status)}
      />
      <ProFormText
        name="created_time"
        label={intl.formatMessage({ id: 'plugin.order.create-time' })}
        readonly
        initialValue={dayjs(order.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
      />
      <ProFormText
        name="created_time"
        label={intl.formatMessage({ id: 'plugin.order.pay-time' })}
        readonly
        initialValue={
          order.paid_time > 0 ? dayjs(order.paid_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
        }
      />
      <ProFormText
        name="created_time"
        label={intl.formatMessage({ id: 'plugin.order.deliver-time' })}
        readonly
        initialValue={
          order.deliver_time > 0
            ? dayjs(order.deliver_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }
      />
      <ProFormText
        name="created_time"
        label={intl.formatMessage({ id: 'plugin.order.finished-time' })}
        readonly
        initialValue={
          order.finished_time > 0
            ? dayjs(order.finished_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }
      />
      <ProFormText name="payment_id" label={intl.formatMessage({ id: 'plugin.order.payment-id' })} readonly initialValue={order.payment_id} />
      <ProFormText name="terrace_id" label={intl.formatMessage({ id: 'plugin.order.terrace-id' })} readonly initialValue={order.terrace_id} />
      <ProFormText name="amount" label={intl.formatMessage({ id: 'plugin.order.pay-amount' })} readonly initialValue={order.amount / 100} />
      <ProFormText
        name="amount"
        label={intl.formatMessage({ id: 'plugin.order.origin-amount' })}
        readonly
        initialValue={order.origin_amount / 100}
      />
      <ProFormText name="user" label={intl.formatMessage({ id: 'plugin.order.buy.user-name' })} readonly initialValue={order.user?.user_name} />
      {order.share_user_id > 0 && (
        <>
          <ProFormText
            name="user"
            label={intl.formatMessage({ id: 'plugin.order.share.user-name' })}
            readonly
            initialValue={order.share_user?.user_name}
          />
          <ProFormText
            name="user"
            label={intl.formatMessage({ id: 'plugin.order.share.amount' })}
            readonly
            initialValue={order.share_amount / 100}
          />
        </>
      )}
      {order.share_parent_user_id > 0 && (
        <>
          <ProFormText
            name="user"
            label={intl.formatMessage({ id: 'plugin.order.share.parent.user-name' })}
            readonly
            initialValue={order.parent_user?.user_name}
          />
          <ProFormText
            name="user"
            label={intl.formatMessage({ id: 'plugin.order.share.parent.amount' })}
            readonly
            initialValue={order.share_parent_amount / 100}
          />
        </>
      )}
      <ProFormText name="remark" label={intl.formatMessage({ id: 'plugin.order.remark' })} readonly initialValue={order.remark} />
      <Divider />
      {order.type == 'vip' ? (
        <div>
          <div><FormattedMessage id="plugin.order.vip" /></div>
          {order.details?.map((item: any, index: number) => (
            <div key={index}>
              <ProFormText name="title" label={intl.formatMessage({ id: 'plugin.order.detail.title' })} readonly initialValue={item.group?.title} />
              <ProFormText name="amount" label={intl.formatMessage({ id: 'plugin.order.detail.price' })} readonly initialValue={item.price / 100} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div><FormattedMessage id="plugin.order.goods" /></div>
          {order.details?.map((item: any, index: number) => (
            <div key={index}>
              <ProFormText name="title" label={intl.formatMessage({ id: 'plugin.order.detail.title' })} readonly initialValue={item.goods?.title} />
              <ProFormText name="amount" label={intl.formatMessage({ id: 'plugin.order.detail.price' })} readonly initialValue={order.price / 100} />
              <ProFormText name="amount" label={intl.formatMessage({ id: 'plugin.order.detail.quantity' })} readonly initialValue={item.quantity} />
              <ProFormText name="amount" label={intl.formatMessage({ id: 'plugin.order.detail.amount' })} readonly initialValue={item.amount / 100} />
            </div>
          ))}
        </div>
      )}
      <Divider />
      <ProFormText name="name" label={intl.formatMessage({ id: 'plugin.order.recipient.name' })} readonly initialValue={order.order_address?.name} />
      <ProFormText
        name="phone"
        label={intl.formatMessage({ id: 'plugin.order.recipient.contact' })}
        readonly
        initialValue={order.order_address?.phone}
      />
      <ProFormText
        name="address_info"
        label={intl.formatMessage({ id: 'plugin.order.recipient.address' })}
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
