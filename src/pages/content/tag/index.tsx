import { deleteTag, getTags } from '@/services/tag';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
import React, { useRef, useState } from 'react';
import BatchForm from './components/batchForm';
import TagForm from './components/tagForm';
import './index.less';

const ArticleTag: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [currentTag, setCurrentTag] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [batchVisible, setBatchVisible] = useState<boolean>(false);
  const intl = useIntl();

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'content.tags.delete.confirm' }),
      onOk: async () => {
        const hide = message.loading(intl.formatMessage({ id: 'content.delete.deletting' }), 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteTag({
              id: item,
            });
          }
          hide();
          message.success(intl.formatMessage({ id: 'content.delete.success' }));
          setSelectedRowKeys([]);
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error(intl.formatMessage({ id: 'content.delete.failure' }));
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
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'content.tags.name' }),
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <a href={entity.link} target="_blank">
            {dom}
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'content.tags.first-letter.name' }),
      dataIndex: 'first_letter',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'content.description.name' }),
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
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
            <FormattedMessage id="setting.action.edit" />
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={() => {
              handleRemove([record.id]);
            }}
          >
            <FormattedMessage id="setting.system.delete" />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle={intl.formatMessage({ id: 'menu.archive.tag' })}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="default"
            key="add2"
            onClick={() => {
              handleAddTags();
            }}
          >
            <FormattedMessage id="content.tags.batch-add" />
          </Button>,
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEditTag({});
            }}
          >
            <PlusOutlined /> <FormattedMessage id="content.tags.add" />
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
              <FormattedMessage id="content.option.batch-delete" />
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              <FormattedMessage id="content.option.cancel-select" />
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
          open={editVisible}
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
          open={batchVisible}
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
