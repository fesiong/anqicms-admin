import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormCheckbox, ProFormRadio, ProFormSelect } from '@ant-design/pro-form';
import { getCategories } from '@/services/category';
import moment from 'moment';
import { history } from 'umi';
import ReplaceKeywords from '@/components/replaceKeywords';
import './index.less';
import {
  deleteArchive,
  getArchives,
  getModules,
  updateArchivesFlag,
  updateArchivesStatus,
} from '@/services';

const flagEnum = {
  h: '头条[h]',
  c: '推荐[c]',
  f: '幻灯[f]',
  a: '特荐[a]',
  s: '滚动[s]',
  b: '加粗[h]',
  p: '图片[p]',
  j: '跳转[j]',
};

const ArchiveList: React.FC = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [replaceVisible, setReplaceVisible] = useState<boolean>(false);
  const [flagVisible, setFlagVisible] = useState<boolean>(false);
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
  const [modules, setModules] = useState<any[]>([]);
  const [moduleId, setModuleId] = useState<Number>(0);

  useEffect(() => {
    setModuleId(Number(history.location.query?.module_id || 0));
    loadModules();
  }, []);

  const loadModules = async () => {
    let res = await getModules({});
    setModules([{ title: '所有文档', id: 0 }].concat(res.data || []));
  };

  const onSelectModule = (id: Number) => {
    setModuleId(id);
    history.replace('/archive/list?module_id=' + id);
    actionRef.current?.reload();
  };

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: '确定要删除选中的文档吗？',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteArchive({
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

  const handleSetFlag = async (values: any) => {
    const hide = message.loading('正在处理', 0);
    updateArchivesFlag({
      flag: values.flag.join(','),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setFlagVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleSetStatus = async (values: any) => {
    const hide = message.loading('正在处理', 0);
    updateArchivesStatus({
      status: Number(values.status),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setStatusVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleEditArchive = async (record: any) => {
    history.push('/archive/detail?id=' + record.id);
  };

  const handleCopyArchive = async (record: any) => {
    history.push('/archive/detail?copyid=' + record.id);
  };

  const parseFlag = (flag: string) => {
    let flags = flag.split(',');
    return (
      <span>
        {flags.map((f) => (
          <Tag key={f}>{flagEnum[f] || f}</Tag>
        ))}
      </span>
    );
  };

  const columns: ProColumns<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <div style={{ maxWidth: 400 }}>
            <a href={entity.link} target="_blank">
              {dom} {entity.flag && parseFlag(entity.flag)}
            </a>
          </div>
        );
      },
    },
    {
      title: 'thumb',
      dataIndex: 'thumb',
      hideInSearch: true,
      width: 70,
      render: (text, record) => {
        return text ? <img src={record.thumb} className="list-thumb" /> : null;
      },
    },
    {
      title: '内容模型',
      dataIndex: 'module_id',
      hideInSearch: true,
      render: (dom: any, entity) => {
        return entity.module_name;
      },
    },
    {
      title: '所属分类',
      dataIndex: 'category_id',
      render: (dom: any, entity) => {
        return entity.category?.title;
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        return (
          <ProFormSelect
            name="category_id"
            request={async () => {
              let res = await getCategories({ type: 1 });
              return [{ spacer: '', title: '所有分类', id: 0 }].concat(res.data || []);
            }}
            fieldProps={{
              fieldNames: {
                label: 'title',
                value: 'id',
              },
              ...fieldProps,
              optionItemRender(item) {
                return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.title }}></div>;
              },
            }}
          />
        );
      },
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '草稿',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
        2: {
          text: '待发布',
          status: 'Default',
        },
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        return (
          <ProFormSelect
            name="status"
            request={async () => {
              return [
                { label: '全部', value: '' },
                { label: '正常', value: 'ok' },
                { label: '草稿', value: 'draft' },
                { label: '待发布', value: 'plan' },
              ];
            }}
          />
        );
      },
    },
    {
      title: '发布时间',
      hideInSearch: true,
      dataIndex: 'created_time',
      render: (item) => {
        if (`${item}` === '0') {
          return false;
        }
        return moment((item as number) * 1000).format('YYYY-MM-DD HH:mm');
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
              handleEditArchive(record);
            }}
          >
            编辑
          </a>
          <a
            key="edit"
            onClick={() => {
              handleCopyArchive(record);
            }}
            title="复制文本新发一篇"
          >
            复制
          </a>
          <a key="preview" href={record.link} target="_blank">
            查看
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={async () => {
              await handleRemove([record.id]);
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
        headerTitle={
          <div className="module-tags">
            {modules.map((item: any) => (
              <div
                className={'module-tag ' + (item.id == moduleId ? 'active' : '')}
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        }
        actionRef={actionRef}
        rowKey="id"
        search={{
          span: 8,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button
            key="recycle"
            onClick={() => {
              history.push('/archive/recycle');
            }}
          >
            回收站
          </Button>,
          <Button
            key="replace"
            onClick={() => {
              setReplaceVisible(true);
            }}
          >
            批量替换关键词
          </Button>,
          <Button
            type="primary"
            key="add"
            onClick={() => {
              if (moduleId > 0) {
                history.push('/archive/detail?module_id=' + moduleId);
              } else {
                history.push('/archive/detail');
              }
            }}
          >
            <PlusOutlined /> 添加文档
          </Button>,
        ]}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space>
            <Button
              size={'small'}
              onClick={async () => {
                await setFlagVisible(true);
              }}
            >
              批量推荐
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setStatusVisible(true);
              }}
            >
              批量更新状态
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await handleRemove(selectedRowKeys);
              }}
            >
              批量删除
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              取消选择
            </Button>
          </Space>
        )}
        request={(params, sort) => {
          let categoryId = history.location.query?.category_id || 0;
          if (categoryId > 0) {
            params = Object.assign({ category_id: categoryId }, params);
          }
          if (moduleId > 0) {
            params = Object.assign({ module_id: moduleId }, params);
          }
          return getArchives(params);
        }}
        columns={columns}
        rowSelection={{
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
      <ReplaceKeywords
        visible={replaceVisible}
        onCancel={() => {
          setReplaceVisible(false);
        }}
      />
      {flagVisible && (
        <ModalForm
          width={480}
          title="请选择新的推荐属性"
          visible={flagVisible}
          onFinish={handleSetFlag}
          onVisibleChange={(e) => setFlagVisible(e)}
        >
          <ProFormCheckbox.Group
            name="flag"
            valueEnum={{
              h: '头条[h]',
              c: '推荐[c]',
              f: '幻灯[f]',
              a: '特荐[a]',
              s: '滚动[s]',
              b: '加粗[h]',
              p: '图片[p]',
              j: '跳转[j]',
            }}
          />
        </ModalForm>
      )}
      {statusVisible && (
        <ModalForm
          width={480}
          title="请选择新的状态"
          visible={statusVisible}
          onFinish={handleSetStatus}
          onVisibleChange={(e) => setStatusVisible(e)}
        >
          <ProFormRadio.Group
            name="status"
            valueEnum={{
              0: '草稿',
              1: '正常',
            }}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default ArchiveList;
