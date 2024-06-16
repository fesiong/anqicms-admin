import {
  pluginDeleteWechatMenu,
  pluginGetWechatMenus,
  pluginSaveWechatMenu,
  pluginSyncWechatMenu,
} from '@/services';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Modal, Space, message } from 'antd';
import React, { useRef, useState } from 'react';

const PluginWechatMenu: React.FC<any> = (props) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentMenu, setCurrentMenu] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: '确定要删除该条菜单吗？',
      onOk: () => {
        pluginDeleteWechatMenu(row).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleEdit = (row: any) => {
    setCurrentMenu(row);
    setEditVisible(true);
  };

  const handleFinishedEdit = async (values: any) => {
    const data = Object.assign(currentMenu, values);
    pluginSaveWechatMenu(data)
      .then((res) => {
        message.info(res.msg);
        actionRef.current?.reload();
        setEditVisible(false);
      })
      .catch(() => {
        message.info('提交出错');
      });
  };

  const handleSyncMenu = () => {
    Modal.confirm({
      title: '确定要更新公众号菜单吗？',
      content: '该操作将会将新设置的菜单同步到微信服务器。',
      onOk: () => {
        pluginSyncWechatMenu({}).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        click: {
          text: '文本菜单',
        },
        view: {
          text: '链接菜单',
        },
      },
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20} key="actions">
          <a
            onClick={() => {
              handleDelete(record);
            }}
          >
            删除
          </a>
          <a
            onClick={() => {
              handleEdit(record);
            }}
          >
            编辑
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
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        title="微信菜单"
      >
        <ProTable<any>
          actionRef={actionRef}
          rowKey="id"
          headerTitle={<div>注意：一级菜单最多3个，每个一级菜单的二级菜单最多5个。</div>}
          toolBarRender={() => [
            <Button key="add" onClick={() => handleSyncMenu()}>
              更新公众号菜单
            </Button>,
            <Button type="primary" key="add" onClick={() => handleEdit({})}>
              添加菜单
            </Button>,
          ]}
          request={(params) => {
            return pluginGetWechatMenus(params);
          }}
          search={false}
          columnsState={{
            persistenceKey: 'wechat-menu-table',
            persistenceType: 'localStorage',
          }}
          columns={columns}
          rowSelection={false}
          pagination={{
            showSizeChanger: true,
          }}
        />
      </Modal>
      {editVisible && (
        <ModalForm
          title="编辑菜单"
          width={600}
          open={editVisible}
          initialValues={currentMenu}
          onOpenChange={(flag) => {
            setEditVisible(flag);
          }}
          onFinish={handleFinishedEdit}
        >
          <ProFormSelect
            name="parent_id"
            request={async () => {
              const res = await pluginGetWechatMenus({});
              return [{ name: '顶级菜单', id: 0 }].concat(res.data || []);
            }}
            fieldProps={{
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            }}
          />
          <ProFormSelect
            name="type"
            valueEnum={{
              click: {
                text: '文本菜单',
              },
              view: {
                text: '链接菜单',
              },
            }}
          />
          <ProFormText name="name" label="菜单名称" width="lg" />
          <ProFormText
            name="value"
            label="值"
            width="lg"
            extra="文本菜单请填写文字，链接菜单请填写url地址，不超过128字符"
          />
          <ProFormDigit name="sort" label="排序" width="lg" extra="数值越小，排序越靠前" />
        </ModalForm>
      )}
    </>
  );
};

export default PluginWechatMenu;
