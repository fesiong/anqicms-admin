import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  pluginDeleteKeyword,
  pluginExportKeyword,
  pluginGetKeywords,
} from '@/services/plugin/keyword';
import { exportFile } from '@/utils';
import KeywordImport from './components/import';
import { collectCollectorArticle, digCollectorKeyword, collectAiGenerateArticle } from '@/services';
import KeywordForm from './components/keywordForm';
import KeywordSetting from './components/setting';
import { Link } from 'umi';

const PluginKeyword: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: '确定要删除选中的关键词吗？',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        if (!selectedRowKeys) return true;
        try {
          await pluginDeleteKeyword({
            ids: selectedRowKeys,
          });
          hide();
          message.success('删除成功');
          setSelectedRowKeys([]);
          if (actionRef.current) {
            actionRef.current.reloadAndRest?.();
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

  const handleEditKeyword = async (record: any) => {
    setCurrentKeyword(record);
    setEditVisible(true);
  };

  const handleExportKeyword = async () => {
    Modal.confirm({
      title: '确定要导出全部关键词吗？',
      onOk: async () => {
        let res = await pluginExportKeyword();
        exportFile(res.data?.header, res.data?.content, 'csv');
      },
    });
  };

  const handleDigKeyword = async () => {
    let res = await digCollectorKeyword();
    message.info(res.msg);
  };

  const handleCollectArticle = (keyword: any) => {
    Modal.confirm({
      title: '确定要对这个关键词执行采集操作吗？',
      onOk: async () => {
        const hide = message.loading('正在采集中', 0);
        collectCollectorArticle(keyword)
          .then((res) => {
            if (res.code !== 0) {
              message.error(res.msg);
            } else {
              if (actionRef.current) {
                actionRef.current.reload();
              }
              message.info(res.msg);
            }
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleAiGenerateArticle = (keyword: any) => {
    Modal.confirm({
      title: '确定要对这个关键词执行AI写作操作吗？',
      content: 'AI自动写作需要付费，请确保已绑定安企账号。',
      onOk: async () => {
        const hide = message.loading('正在生成中', 0);
        collectAiGenerateArticle(keyword)
          .then((res) => {
            if (res.code !== 0) {
              message.error(res.msg);
            } else {
              if (actionRef.current) {
                actionRef.current.reload();
              }
              message.info(res.msg);
            }
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const cleanupKeywords = () => {
    Modal.confirm({
      title: '确定要对这清空全部关键词吗？',
      content: '该操作会删除所有的关键词，并且不可恢复，请谨慎操作',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        await pluginDeleteKeyword({
          all: true,
        });
        hide();
        message.success('删除成功');
        actionRef.current?.reloadAndRest?.();
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      hideInSearch: true,
      dataIndex: 'id',
    },
    {
      title: '关键词',
      dataIndex: 'title',
    },
    {
      title: '层级',
      hideInSearch: true,
      dataIndex: 'level',
    },
    {
      title: '文章分类ID',
      hideInSearch: true,
      dataIndex: 'category_id',
    },
    {
      title: '已采集文章',
      hideInSearch: true,
      dataIndex: 'article_count',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          <a
            key="collect"
            onClick={() => {
              handleCollectArticle(record);
            }}
          >
            手动采集
          </a>
          <a
            key="collect"
            onClick={() => {
              handleAiGenerateArticle(record);
            }}
          >
            AI写作
          </a>
          <a
            key="edit"
            onClick={() => {
              handleEditKeyword(record);
            }}
          >
            编辑
          </a>
          <Link key="view" to={'/plugin/aigenerate?keyword=' + record.title}>
            查看AI文章
          </Link>
          <a
            className="text-red"
            key="delete"
            onClick={async () => {
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
        headerTitle="关键词库管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleEditKeyword({});
            }}
          >
            <PlusOutlined /> 添加关键词
          </Button>,
          <Button
            key="export"
            onClick={() => {
              handleExportKeyword();
            }}
          >
            导出关键词
          </Button>,
          <KeywordImport
            onCancel={() => {
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <Button
              key="import"
              onClick={() => {
                //todo
              }}
            >
              导入关键词
            </Button>
          </KeywordImport>,
          <Button
            key="update"
            onClick={() => {
              handleDigKeyword();
            }}
          >
            手动拓词
          </Button>,
          <KeywordSetting onCancel={() => {}} key="setting">
            <Button>拓词设置</Button>
          </KeywordSetting>,
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
            <Button size={'small'} onClick={cleanupKeywords}>
              清空关键词库
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              取消选择
            </Button>
          </Space>
        )}
        request={(params) => {
          return pluginGetKeywords(params);
        }}
        columnsState={{
          persistenceKey: 'plugin-keywords-table',
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
        <KeywordForm
          visible={editVisible}
          editingKeyword={currentKeyword}
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
    </PageContainer>
  );
};

export default PluginKeyword;
