import React, { useEffect, useState } from 'react';
import { ModalForm, ProFormRadio } from '@ant-design/pro-form';
import { message } from 'antd';
import { pluginGetRetailerConfig, pluginSaveRetailerConfig } from '@/services/plugin/retailer';

const RetailerSetting: React.FC<any> = (props) => {
  const [setting, setSetting] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

  const getSetting = async () => {
    const res = await pluginGetRetailerConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    values.goods_price = Number(values.goods_price);
    values.share_reward = Number(values.share_reward);
    values.parent_reward = Number(values.parent_reward);
    const hide = message.loading('正在提交中', 0);
    pluginSaveRetailerConfig(values)
      .then((res) => {
        message.success(res.msg);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
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
      {fetched && (
        <ModalForm
          title="分销配置"
          visible={visible}
          initialValues={setting}
          onVisibleChange={(flag) => {
            setVisible(flag);
          }}
          onFinish={onSubmit}
        >
          <ProFormRadio.Group
            name="allow_self"
            label="分销员自购分佣"
            options={[
              {
                value: 0,
                label: '关闭',
              },
              {
                value: 1,
                label: '开启',
              },
            ]}
            extra="如果开启自购分佣，则分销员自己购买分销商品，可以获得对应的佣金，如果关闭，则分销员自己购买分销商品，无法获得佣金。如果自动成为分销员的话，不要开启自购分佣"
          />
          <ProFormRadio.Group
            name="become_retailer"
            label="成为分销员方式"
            options={[
              {
                value: 0,
                label: '人工处理',
              },
              {
                value: 1,
                label: '自动成为',
              },
            ]}
            extra="选择人工处理的话，需要到用户管理中设置"
          />
        </ModalForm>
      )}
    </>
  );
};

export default RetailerSetting;
