import React, { useRef, useState } from 'react';
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message, Modal, Space, Button } from 'antd';
import {
  pluginDeleteWechatReplyRule,
  pluginGetWechatReplyRules,
  pluginSaveWechatReplyRule,
} from '@/services';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';

const PluginWechatReplyRule: React.FC<any> = (props) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentRule, setCurrentRule] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: '确定要删除该条数据吗？',
      onOk: () => {
        pluginDeleteWechatReplyRule(row).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleEdit = (row: any) => {
    setCurrentRule(row);
    setEditVisible(true);
  };

  const handleFinishedEdit = async (values: any) => {
    const data = Object.assign(currentRule, values);
    pluginSaveWechatReplyRule(data)
      .then((res) => {
        message.info(res.msg);
        actionRef.current?.reload();
        setEditVisible(false);
      })
      .catch(() => {
        message.info('提交出错');
      });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '关键词',
      dataIndex: 'keyword',
    },
    {
      title: '回复内容',
      dataIndex: 'content',
    },
    {
      title: '默认回复',
      dataIndex: 'is_default',
      valueEnum: {
        1: {
          text: '是',
        },
        0: {
          text: '-',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20} key="actions">
          <a
            onClick={() => {
              handleEdit(record);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              handleDelete(record);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      <Modal
        width={1000}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        title="自动回复规则"
      >
        <ProTable<any>
          actionRef={actionRef}
          rowKey="id"
          toolBarRender={() => [
            <Button type="primary" key="add" onClick={() => handleEdit({})}>
              添加规则
            </Button>,
          ]}
          request={(params) => {
            return pluginGetWechatReplyRules(params);
          }}
          search={false}
          columns={columns}
          rowSelection={false}
          pagination={{
            showSizeChanger: true,
          }}
        />
      </Modal>
      {editVisible && (
        <ModalForm
          title="编辑规则"
          width={600}
          visible={editVisible}
          initialValues={currentRule}
          onVisibleChange={(flag) => {
            setEditVisible(flag);
          }}
          onFinish={handleFinishedEdit}
        >
          <ProFormText name="keyword" label="关键词" width="lg" extra="用户发送触发关键词" />
          <ProFormTextArea name="content" label="回复内容" width="lg" />
          <ProFormRadio.Group
            name="is_default"
            label="默认回复"
            width="lg"
            extra="选择为默认回复后，如果未匹配到关键词，则会回复这条内容"
            valueEnum={{
              0: '不是',
              1: '设为默认',
            }}
          />
        </ModalForm>
      )}
    </>
  );
};

export default PluginWechatReplyRule;
