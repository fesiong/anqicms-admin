import { AutoComplete, Button, message, Modal, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  pluginExportOrder,
  pluginGetOrders,
  pluginOrderApplyRefund,
  pluginSetOrderDelivery,
  pluginSetOrderFinished,
  pluginSetOrderRefund,
  pluginSetOrderPay,
} from '@/services';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import moment from 'moment';
import OrderForm from './components/orderForm';
import { exportFile } from '@/utils';
import OrderSetting from './setting';

const PluginOrder: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentOrder, setcurrentOrder] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [deliverVisible, setDeliverVisible] = useState<boolean>(false);
  const [refundVisible, setRefundVisible] = useState<boolean>(false);
  const [exportVisible, setExportVisible] = useState<boolean>(false);
  const [payVisible, setPayVisible] = useState<boolean>(false);

  const exportOrder = async (values: any) => {
    const hide = message.loading('正在加载', 0);
    if (values.start_date) {
      values.start_time = moment(values.start_date).unix();
    }
    if (values.start_date) {
      values.end_time = moment(values.end_date).unix() + 86400;
    }
    pluginExportOrder(values)
      .then((res) => {
        exportFile(res.data?.header, res.data?.content, 'xlsx');
      })
      .finally(() => {
        hide();
      });
  };

  const handleEditOrder = async (record: any) => {
    setcurrentOrder(record);
    setEditVisible(true);
  };

  const handleSetDelivery = (record: any) => {
    setcurrentOrder(record);
    setDeliverVisible(true);
  };

  const saveOrderDeliver = async (values: any) => {
    values.order_id = currentOrder.order_id;
    pluginSetOrderDelivery(values).then((res) => {
      message.info(res.msg);
      actionRef.current?.reload();
      setDeliverVisible(false);
    });
  };

  const saveOrderRefund = async (values: any) => {
    values.order_id = currentOrder.order_id;
    pluginSetOrderRefund(values).then((res) => {
      message.info(res.msg);
      actionRef.current?.reload();
      setDeliverVisible(false);
    });
  };

  const handleSetFinished = (record: any) => {
    Modal.confirm({
      title: '确定要手动完成订单吗？',
      content: '该操作不可逆。',
      onOk: () => {
        pluginSetOrderFinished(record).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleSetRefund = (record: any) => {
    setcurrentOrder(record);
    setRefundVisible(true);
  };

  const handleApplyRefund = (record: any) => {
    Modal.confirm({
      title: '确定要对这笔订单申请退款吗？',
      content: '退款后，资金会原路返回。',
      onOk: () => {
        pluginOrderApplyRefund(record).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleSetPay = (record: any) => {
    setcurrentOrder(record);
    setPayVisible(true);
  };

  const saveOrderPaid = async (values: any) => {
    values.order_id = currentOrder.order_id;
    pluginSetOrderPay(values).then((res) => {
      setPayVisible(false);
      message.info(res.msg);
      actionRef.current?.reload();
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '订单ID',
      dataIndex: 'order_id',
    },
    {
      title: '购买用户',
      dataIndex: 'user.user_name',
      key: 'user_name',
      render: (dom: any, entity) => {
        return entity.user?.user_name || '-';
      },
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      hideInSearch: true,
      render: (dom: any) => {
        return dom / 100;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      hideInSearch: true,
      render: (_, entity) => {
        return moment(entity.created_time * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '支付时间',
      dataIndex: 'paid_time',
      hideInSearch: true,
      render: (_, entity) => {
        return entity.paid_time > 0
          ? moment(entity.paid_time * 1000).format('YYYY-MM-DD HH:mm')
          : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '待支付',
        },
        1: {
          text: '待发货',
        },
        2: {
          text: '待收货',
        },
        3: {
          text: '已完成',
          status: 'Success',
        },
        8: {
          text: '退款中',
        },
        9: {
          text: '已退款',
        },
        '-1': {
          text: '订单关闭',
        },
      },
      renderFormItem: () => {
        return (
          <ProFormSelect
            name="status"
            request={async () => {
              return [
                { label: '全部', value: '' },
                { label: '待支付', value: 'waiting' },
                { label: '待发货', value: 'paid' },
                { label: '待收货', value: 'delivery' },
                { label: '已完成', value: 'finished' },
                { label: '退款中', value: 'refunding' },
              ];
            }}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          {record.status == 1 && (
            <a
              onClick={() => {
                handleSetDelivery(record);
              }}
            >
              发货
            </a>
          )}
          {record.status == 2 && (
            <a
              onClick={() => {
                handleSetFinished(record);
              }}
            >
              完成订单
            </a>
          )}
          {record.status == 8 && (
            <a
              onClick={() => {
                handleSetRefund(record);
              }}
            >
              处理退款
            </a>
          )}
          {(record.status == 1 || record.status == 2 || record.status == 3) && (
            <a
              onClick={() => {
                handleApplyRefund(record);
              }}
            >
              申请退款
            </a>
          )}
          {record.status === 0 && (
            <a
              onClick={() => {
                handleSetPay(record);
              }}
            >
              付款
            </a>
          )}
          <a
            onClick={() => {
              handleEditOrder(record);
            }}
          >
            查看
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="订单管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 },
        }}
        toolBarRender={() => [
          <Button
            key="export"
            onClick={() => {
              setExportVisible(true);
            }}
          >
            导出订单
          </Button>,
          <OrderSetting key="setting">
            <Button>订单设置</Button>
          </OrderSetting>,
        ]}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetOrders(params);
        }}
        columnsState={{
          persistenceKey: 'order-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={false}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {editVisible && (
        <OrderForm
          visible={editVisible}
          order={currentOrder}
          onCancel={() => {
            setEditVisible(false);
          }}
          onSubmit={async () => {
            setEditVisible(false);
          }}
        />
      )}
      {deliverVisible && (
        <ModalForm
          title="发货处理"
          width={480}
          visible={deliverVisible}
          onVisibleChange={(flag) => {
            setDeliverVisible(flag);
          }}
          onFinish={saveOrderDeliver}
        >
          <ProFormText name="express_company" label="快递公司">
            <AutoComplete
              options={[
                {
                  value: '',
                  label: '无',
                },
                {
                  value: '顺丰快递',
                  label: '顺丰快递',
                },
                {
                  value: '邮政快递',
                  label: '邮政快递',
                },
                {
                  value: '京东快递',
                  label: '京东快递',
                },
                {
                  value: '申通快递',
                  label: '申通快递',
                },
                {
                  value: '圆通快递',
                  label: '圆通快递',
                },
                {
                  value: '中通快递',
                  label: '中通快递',
                },
                {
                  value: '韵达快递',
                  label: '韵达快递',
                },
                {
                  value: '极兔快递',
                  label: '极兔快递',
                },
                {
                  value: '百世汇通',
                  label: '百世汇通',
                },
              ]}
            />
          </ProFormText>
          <ProFormText name="tracking_number" label="快递单号" />
        </ModalForm>
      )}
      {refundVisible && (
        <ModalForm
          title="退款处理"
          visible={refundVisible}
          onVisibleChange={(flag) => {
            setRefundVisible(flag);
          }}
          onFinish={saveOrderRefund}
        >
          <ProFormRadio.Group
            name="status"
            label="退款"
            options={[
              {
                value: 0,
                label: '不同意退款',
              },
              {
                value: 1,
                label: '同意退款',
              },
            ]}
          />
        </ModalForm>
      )}
      {exportVisible && (
        <ModalForm
          title="导出订单选项"
          width={480}
          visible={exportVisible}
          onVisibleChange={(flag) => {
            setExportVisible(flag);
          }}
          onFinish={exportOrder}
        >
          <ProFormSelect
            name="status"
            label="导出订单内容"
            initialValue={'paid'}
            request={async () => {
              return [
                { label: '全部', value: '' },
                { label: '待支付', value: 'waiting' },
                { label: '待发货', value: 'paid' },
                { label: '待收货', value: 'delivery' },
                { label: '已完成', value: 'finished' },
                { label: '退款中', value: 'refunding' },
              ];
            }}
          />
          <ProFormDatePicker name="start_date" label="开始日期" width={'lg'} />
          <ProFormDatePicker name="end_date" label="结束日期" width={'lg'} extra="默认今天" />
        </ModalForm>
      )}
      {payVisible && (
        <ModalForm
          title="付款处理"
          visible={payVisible}
          onVisibleChange={(flag) => {
            setPayVisible(flag);
          }}
          width={480}
          onFinish={saveOrderPaid}
        >
          <ProFormRadio.Group
            name="pay_way"
            label="付款方式"
            options={[
              {
                value: 'offline',
                label: '线下付款',
              },
            ]}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default PluginOrder;
