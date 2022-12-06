import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { deleteWebsiteInfo, getWebsiteInfo, getWebsiteList, saveWebsiteInfo } from '@/services';
import { Button, Divider, message, Modal, RadioChangeEvent, Space, Tag } from 'antd';
import { ModalForm, ProFormCheckbox, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

let submiting = false;
const WebsiteList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [userDefault, setUseDefault] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<any>({});

  const handleEdit = (record: any) => {
    if (record.id > 0) {
      getWebsiteInfo({ id: record.id }).then((res) => {
        setEditInfo(res.data);
        setUseDefault(res.data.mysql?.use_default);
        setEditVisible(true);
      });
    } else {
      setEditInfo(record);
      setUseDefault(record.mysql?.use_default);
      setEditVisible(true);
    }
  };

  const onSubmitEdit = async (values: any) => {
    if (editInfo.id == 1) {
      // 自己无法禁用自己
      values.status = 1;
    }
    if (submiting) {
      return;
    }
    submiting = true;
    const hide = message.loading('提交中', 0);
    values.status = Number(values.status);
    const postData = Object.assign(editInfo, values);
    saveWebsiteInfo(postData)
      .then((res) => {
        if (res.code !== 0) {
          message.error(res.msg);
        } else {
          message.info(res.msg);
          actionRef.current?.reload();
          setEditVisible(false);
        }
      })
      .finally(() => {
        submiting = false;
        hide();
      });
  };

  const handleRemove = (record: any) => {
    if (record.id == 1) {
      message.error('该站点不能删除');
      return;
    }
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async () => {
        deleteWebsiteInfo({
          id: record.id,
        }).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleChangeUse = (e: RadioChangeEvent) => {
    setUseDefault(e.target.value);
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '站点名称',
      dataIndex: 'name',
    },
    {
      title: '主域名',
      dataIndex: 'base_url',
      render: (text) => (
        <a href={text as string} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: '站点路径',
      dataIndex: 'root_path',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      render: (text, record) => moment(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          <a
            key="edit"
            onClick={() => {
              handleEdit(record);
            }}
          >
            修改
          </a>
          {record.id === 1 ? (
            <Tag>默认站点</Tag>
          ) : (
            <a
              className="text-red"
              key="delete"
              onClick={async () => {
                await handleRemove([record.id]);
              }}
            >
              删除
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="站点列表"
        rowKey="id"
        actionRef={actionRef}
        search={false}
        request={(params) => {
          return getWebsiteList(params);
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEdit({ mysql: { use_default: true }, initialed: false, status: 1 });
            }}
          >
            <PlusOutlined /> 添加新站点
          </Button>,
        ]}
      />
      {editVisible && (
        <ModalForm
          width={600}
          title={editInfo.id > 0 ? '修改站点信息' : '添加新站点'}
          visible={editVisible}
          layout="horizontal"
          initialValues={editInfo}
          onFinish={onSubmitEdit}
          onVisibleChange={(e) => setEditVisible(e)}
        >
          {editInfo.id > 0 && <ProFormText name="id" label="站点ID" readonly />}
          <ProFormText name="name" label="站点名称" />
          <ProFormText
            name="root_path"
            label="站点根目录"
            disabled={editInfo.id > 0}
            placeholder="服务器实际路径，如：/www/wwwroot/anqicms.com"
          />
          <ProFormText
            name="base_url"
            label="站点网址"
            placeholder="如：http://www.anqicms.com"
            extra="需要能正常访问，请在宝塔或Nnginx中添加对应站点"
          />
          <ProFormText name="admin_user" label="管理员账号" />
          <ProFormText.Password
            name="admin_password"
            label="管理员密码"
            placeholder="不修改请留空，新建站点必须填写6位以上"
          />
          <Divider></Divider>
          {!editInfo.initialed && (
            <>
              <ProFormText
                name={['mysql', 'database']}
                label="数据库名称"
                placeholder="新的数据名称，如：anqicms2"
              />
              <ProFormRadio.Group
                label="数据库信息复用"
                name={['mysql', 'use_default']}
                options={[
                  {
                    label: '新账号',
                    value: false,
                  },
                  {
                    label: '复用默认数据库账号信息',
                    value: true,
                  },
                ]}
                fieldProps={{
                  onChange: handleChangeUse,
                }}
              />
              {!userDefault && (
                <>
                  <ProFormText name={['mysql', 'host']} label="数据库地址" />
                  <ProFormText
                    name={['mysql', 'port']}
                    label="数据库端口"
                    placeholder="一般是3306"
                  />
                  <ProFormText name={['mysql', 'user']} label="数据库用户名" />
                  <ProFormText name={['mysql', 'password']} label="数据库密码" />
                </>
              )}
              <ProFormCheckbox
                name="preview_data"
                label="安装演示数据"
                extra="勾选后，将安装默认演示数据"
              />
            </>
          )}
          <ProFormRadio.Group
            label="站点状态"
            name="status"
            options={[
              {
                label: '关闭',
                value: 0,
              },
              {
                label: '正常',
                value: 1,
              },
            ]}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default WebsiteList;
