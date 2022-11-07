import React from 'react';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';

import { Divider, message } from 'antd';
import { pluginSaveUserGroupInfo } from '@/services';

export type UserGroupFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  visible: boolean;
  group: any;
};

const UserGroupForm: React.FC<UserGroupFormProps> = (props) => {
  const onSubmit = async (values: any) => {
    const group = Object.assign(props.group, values);
    const res = await pluginSaveUserGroupInfo(group);
    message.info(res.msg);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={600}
      title={props.group?.id ? '修改用户组' : '添加用户组'}
      initialValues={props.group}
      visible={props.visible}
      layout="horizontal"
      onVisibleChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText name="title" label="名称" />
      <ProFormText name="description" label="介绍" />
      <ProFormDigit
        name="level"
        label="分组等级"
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '级' }}
        extra="比如普通会员为0级，中级会员为1级，高级会员为2级，核心会员为3级等，填数字"
      />
      <ProFormDigit
        name="price"
        label="用户组价格"
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '分' }}
        extra="购买该用户组VIP需要支付的价钱，注意，单位是分，比如1元，这里就要填100"
      />
      <ProFormDigit
        name={['setting', 'expire_day']}
        label="用户组有效期"
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '天' }}
        extra={'购买VIP后，多少天内有效，1年请填365，过期后，会返回到第一个用户组'}
      />
      <Divider>分销权限设置</Divider>
      <ProFormDigit
        name={['setting', 'share_reward']}
        label="分销佣金比例"
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '%' }}
        extra={
          '建议设置5%-20，不能设置小数点。佣金比例优先级: 商品设置的佣金比例>用户组佣金比例>默认佣金比例'
        }
      />
      <ProFormDigit
        name={['setting', 'parent_reward']}
        label="邀请奖励比例"
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '%' }}
        extra={
          '建议设置1%-5%，不能设置小数点。上级佣金比例。分销员a邀请b成为分销员，b就为a的下家，当b成功推广一笔订单时，b可以获得分销佣金，a只获得邀请奖励'
        }
      />
      <ProFormDigit
        name={['setting', 'discount']}
        label="用户折扣"
        width="sm"
        fieldProps={{ precision: 0, addonAfter: '%' }}
        extra={'建议设置90%-100%，用户通过分销员分享的链接来到页面后，下单可以享受的折扣价'}
      />
    </ModalForm>
  );
};

export default UserGroupForm;
