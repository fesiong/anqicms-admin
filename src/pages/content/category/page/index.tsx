import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { deleteCategory, getCategories } from '@/services/category';
import '../index.less';
import { history } from 'umi';

let lastParams: any = {};

const PageCategory: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: '确定要删除选中的单页面吗？',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteCategory({
              id: item,
            });
          }
          hide();
          message.success('删除成功');
          setSelectedRowKeys([]);
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error('删除失败');
          return true;
        }
      },
    });
  };

  const handleEditCategory = async (record: any) => {
    history.push('/archive/page/detail?id=' + (record.id || 'new'));
  };

  const columns: ProColumns<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '页面名称',
      dataIndex: 'title',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <>
            <div className="spacer" dangerouslySetInnerHTML={{ __html: entity.spacer }}></div>
            <a href={entity.link} target="_blank">
              {dom}
            </a>
          </>
        );
      },
    },
    {
      title: '模板名称',
      dataIndex: 'template',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '隐藏',
          status: 'Default',
        },
        1: {
          text: '显示',
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
              handleEditCategory(record);
            }}
          >
            编辑
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={() => {
              handleRemove([record.id]);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="单页面列表"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEditCategory({ status: 1 });
            }}
          >
            <PlusOutlined /> 添加单页面
          </Button>,
        ]}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space>
            <Button
              size={'small'}
              onClick={() => {
                handleRemove(selectedRowKeys);
              }}
            >
              批量删除
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              取消选择
            </Button>
          </Space>
        )}
        request={(params) => {
          params.type = 3;
          lastParams = params;
          return getCategories(params);
        }}
        columnsState={{
          persistenceKey: 'page-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={{
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        pagination={{
          showSizeChanger: true,
          defaultCurrent: lastParams.current,
          defaultPageSize: lastParams.pageSize,
        }}
      />
    </PageContainer>
  );
};

export default PageCategory;
