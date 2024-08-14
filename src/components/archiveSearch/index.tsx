import { getArchives, getCategories } from '@/services';
import { ProColumns, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React, { useState } from 'react';

export type ArchiveSearchProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: string[]) => Promise<void>;
  open: boolean;
};

const ArchiveSearch: React.FC<ArchiveSearchProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const intl = useIntl();

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'content.title.name' }),
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <div style={{ maxWidth: 400 }}>
            <a href={entity.link} target="_blank" rel="noopener noreferrer">
              {dom}
            </a>
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'content.category.name' }),
      dataIndex: 'category_titles',
      render: (_: any, entity) => {
        return (
          <div>
            {entity.category_titles?.map((item: string) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        );
      },
      renderFormItem: (_, { fieldProps }) => {
        return (
          <ProFormSelect
            name="category_id"
            request={async () => {
              let res = await getCategories({ type: 1 });
              const categories = [
                {
                  spacer: '',
                  title: intl.formatMessage({ id: 'content.category.all' }),
                  id: 0,
                  status: 1,
                },
              ]
                .concat(res.data || [])
                .map((cat: any) => ({
                  spacer: cat.spacer,
                  label:
                    cat.title +
                    (cat.status === 1 ? '' : intl.formatMessage({ id: 'setting.nav.hide' })),
                  value: cat.id,
                }));
              return categories;
            }}
            fieldProps={{
              ...fieldProps,
              optionItemRender(item: any) {
                return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.label }}></div>;
              },
            }}
          />
        );
      },
    },
  ];

  return (
    <Modal
      width={1000}
      title={intl.formatMessage({ id: 'component.archive.select' })}
      open={props.open}
      onCancel={() => {
        props.onCancel();
      }}
      onOk={() => {
        props.onSubmit(selectedRows);
      }}
    >
      <ProTable<any>
        rowKey="id"
        search={{
          span: 8,
        }}
        toolBarRender={false}
        tableAlertRender={false}
        tableAlertOptionRender={false}
        request={(params) => {
          params.status = 'ok';
          return getArchives(params);
        }}
        columnsState={{
          persistenceKey: 'archive-search-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />
    </Modal>
  );
};

export default ArchiveSearch;
