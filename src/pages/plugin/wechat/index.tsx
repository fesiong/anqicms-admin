import React, { useRef, useState } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Modal, message, Space, Button } from 'antd';
import { pluginDeleteWechatMessage, pluginGetWechatMessages } from '@/services';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import WechatSetting from './components/setting';
import WechatMenu from './components/menu';
import WechatReplyRule from './components/replyrule';
import moment from 'moment';

const PluginWechatMessage: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const [currentMessage, setCurrentMessage] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: '确定要删除该条数据吗？',
      onOk: () => {
        pluginDeleteWechatMessage(row).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleReply = (row: any) => {
    setCurrentMessage(row);
    setEditVisible(true);
  };

  const handleFinishedReply = async (values: any) => {
    if (values.reply && values.reply != currentMessage.reply) {
      pluginDeleteWechatMessage(values)
        .then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        })
        .catch(() => {
          message.info('提交出错');
        });
    } else {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '时间',
      dataIndex: 'created_time',
      width: 150,
      render: (_, entity) => {
        return moment(entity.created_time * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: 'openid',
      dataIndex: 'openid',
      width: 270,
    },
    {
      title: '留言内容',
      dataIndex: 'content',
    },
    {
      title: '回复内容',
      dataIndex: 'reply',
    },
    {
      title: '回复时间',
      dataIndex: 'reply_time',
      width: 150,
      render: (_, entity) => {
        return entity.reply_time > 0
          ? moment(entity.reply_time * 1000).format('YYYY-MM-DD HH:mm')
          : '-';
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => (
        <Space size={20} key="actions">
          <a
            onClick={() => {
              handleDelete(record);
            }}
          >
            删除
          </a>
          {record.created_time * 1000 > new Date().valueOf() && (
            <a
              onClick={() => {
                handleReply(record);
              }}
            >
              回复
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<any>
        headerTitle="微信公众号管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <WechatReplyRule key="rule">
            <Button>自动回复设置</Button>
          </WechatReplyRule>,
          <WechatMenu key="menu">
            <Button>菜单设置</Button>
          </WechatMenu>,
          <WechatSetting key="setting">
            <Button>公众号设置</Button>
          </WechatSetting>,
        ]}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetWechatMessages(params);
        }}
        search={false}
        columns={columns}
        rowSelection={false}
      />
      {editVisible && (
        <ModalForm
          visible={editVisible}
          initialValues={currentMessage}
          onValuesChange={(flag) => {
            setEditVisible(flag);
          }}
          onFinish={handleFinishedReply}
        >
          <ProFormText name="id" label="ID" width="lg" readonly />
          <ProFormText
            label="时间"
            width="lg"
            initialValue={moment(currentMessage.created_time * 1000).format('YYYY-MM-DD HH:mm')}
            readonly
          />
          <ProFormText name="openid" label="OPENID" width="lg" readonly />
          <ProFormText name="content" label="留言内容" width="lg" readonly />
          <ProFormText name="reply" label="回复内容" width="lg" extra="如果你想回复，在这里输入" />
        </ModalForm>
      )}
    </PageHeaderWrapper>
  );
};

export default PluginWechatMessage;
