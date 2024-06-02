import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import './index.less';
import { deleteTag, getTags } from '@/services/tag';
import TagForm from './components/tagForm';
import BatchForm from './components/batchForm';

const ArticleTag: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [currentTag, setCurrentTag] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [batchVisible, setBatchVisible] = useState<boolean>(false);

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: '确定要删除选中的文章标签吗？',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteTag({
              id: item,
            });
          }
          hide();
          message.success('删除成功');
          if (actionRef.current) {
            actionRef.current.reload();
          }
          return true;
        } catch (error) {
          hide();
          message.error('删除失败');
          return true;
        }
      },
    });
  };

  const handleEditTag = async (record: any) => {
    setCurrentTag(record);
    setEditVisible(true);
  };

  const handleAddTags = () => {
    setBatchVisible(true);
  };

  const columns: ProColumns<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'title',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a href={entity.link} target="_blank">
            {dom}
          </a>
        );
      },
    },
    {
      title: '索引',
      dataIndex: 'first_letter',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
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
              handleEditTag(record);
            }}
          >
            编辑
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={async () => {
              await handleRemove([record.id]);
              setSelectedRowKeys([]);
              actionRef.current?.reloadAndRest?.();
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
        headerTitle="文章标签列表"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="default"
            key="add2"
            onClick={() => {
              handleAddTags();
            }}
          >
            批量添加标签
          </Button>,
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEditTag({});
            }}
          >
            <PlusOutlined /> 添加标签
          </Button>,
        ]}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space>
            <Button
              size={'small'}
              onClick={async () => {
                await handleRemove(selectedRowKeys);
                setSelectedRowKeys([]);
                actionRef.current?.reloadAndRest?.();
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
          params.type = 1;
          return getTags(params);
        }}
        columnsState={{
          persistenceKey: 'archive-tag-table',
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
        }}
      />
      {editVisible && (
        <TagForm
          visible={editVisible}
          tag={currentTag}
          type={1}
          onCancel={() => {
            setEditVisible(false);
          }}
          onSubmit={async () => {
            setEditVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        />
      )}
      {batchVisible && (
        <BatchForm
          visible={batchVisible}
          onCancel={() => {
            setBatchVisible(false);
          }}
          onSubmit={async () => {
            setBatchVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        />
      )}
    </PageContainer>
  );
};

export default ArticleTag;
