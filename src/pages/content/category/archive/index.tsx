import { deleteCategory, getCategories, getModules } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MultiCategory from '../components/multiCategory';
import '../index.less';

let lastParams: any = {};

const ArchiveCategory: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<any>({});
  const [modules, setModules] = useState<any[]>([]);
  const [multiVisible, setMultiVisible] = useState<boolean>(false);
  const intl = useIntl();

  useEffect(() => {
    getModules().then((res) => {
      setModules(res.data || []);
    });
  }, []);

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'content.category.delete.confirm' }),
      onOk: async () => {
        const hide = message.loading(intl.formatMessage({ id: 'content.delete.deletting' }), 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteCategory({
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

  const handleEditCategory = async (record: any) => {
    history.push(
      '/archive/category/detail?id=' + (record.id || 'new') + '&parent_id=' + record.parent_id,
    );
  };

  const handleAddMultiCategory = async (record: any) => {
    setCurrentCategory(record);
    setMultiVisible(true);
  };

  const handleShowArchives = (record: any) => {
    history.push('/archive/list?category_id=' + record.id);
  };

  const getModuleName = (moduleId: number) => {
    for (let item of modules) {
      if (moduleId == item.id) {
        return item.title;
      }
    }
    return null;
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'content.sort.name' }),
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'content.category.title' }),
      dataIndex: 'title',
      //hideInSearch: true,
      filters: true,
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
      title: intl.formatMessage({ id: 'content.module.name' }),
      dataIndex: 'module_id',
      hideInSearch: true,
      render: (dom, entity) => {
        return getModuleName(entity.module_id);
      },
    },
    {
      title: intl.formatMessage({ id: 'content.category.template' }),
      dataIndex: 'template',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'content.archive-template.name' }),
      dataIndex: 'detail_template',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'content.category.status' }),
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: intl.formatMessage({ id: 'content.category.status.hide' }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({ id: 'content.category.status.ok' }),
          status: 'Success',
        },
      },
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
              handleShowArchives(record);
            }}
          >
            <FormattedMessage id="menu.archive.list" />
          </a>
          <a
            key="edit"
            onClick={() => {
              handleEditCategory({ parent_id: record.id, module_id: record.module_id, status: 1 });
            }}
          >
            <FormattedMessage id="content.category.add-children" />
          </a>
          <a
            key="edit"
            onClick={() => {
              handleAddMultiCategory({
                parent_id: record.id,
                module_id: record.module_id,
                status: 1,
              });
            }}
          >
            <FormattedMessage id="content.category.batch-add-children" />
          </a>
          <a
            key="edit"
            onClick={() => {
              handleEditCategory(record);
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
        headerTitle={intl.formatMessage({ id: 'menu.archive.category' })}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            onClick={() => {
              handleAddMultiCategory({ parent_id: 0, module_id: null, status: 1 });
            }}
          >
            <FormattedMessage id="content.category.batch-add" />
          </Button>,
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEditCategory({ parent_id: 0, module_id: null, status: 1 });
            }}
          >
            <PlusOutlined /> <FormattedMessage id="content.category.batch-add-top" />
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
          params.show_type = 1;
          lastParams = params;
          return getCategories(params);
        }}
        columnsState={{
          persistenceKey: 'category-table',
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
      {multiVisible && (
        <MultiCategory
          open={multiVisible}
          category={currentCategory}
          modules={modules}
          type={1}
          onCancel={() => {
            setMultiVisible(false);
          }}
          onSubmit={async () => {
            setMultiVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        />
      )}
    </PageContainer>
  );
};

export default ArchiveCategory;
