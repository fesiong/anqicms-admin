import { Button, Card, message, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import CollectorSetting from './components/setting';
import { startCollectorArticle, getAiArticlePlans } from '@/services';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import moment from 'moment';

const PluginAiGenerate: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const startToCollect = () => {
    Modal.confirm({
      title: '确定要开始采集吗？',
      content: '这将马上开始执行一次采集任务操作',
      onOk: async () => {
        const hide = message.loading('正在提交中', 0);
        startCollectorArticle()
          .then((res) => {
            message.success(res.msg || '执行成功');
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        0: {
          text: '未定义',
        },
        1: {
          text: 'AI生成',
        },
        2: {
          text: '翻译',
        },
        3: {
          text: 'AI改写',
        },
        4: {
          text: '自媒体改写',
        },
      },
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未处理',
          status: 'Default',
        },
        1: {
          text: '进行中',
          status: 'Default',
        },
        2: {
          text: '已完成',
          status: 'Success',
        },
        4: {
          text: '出错',
          status: 'Default',
        },
      },
    },
    {
      title: '时间',
      hideInSearch: true,
      dataIndex: 'created_time',
      render: (item) => {
        if (`${item}` === '0') {
          return false;
        }
        return moment((item as number) * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div className="control">
          <Space className="space-wrap" size={20} style={{ width: '100%' }}>
            <CollectorSetting onCancel={() => {}} key="setting">
              <Button>AI自动写作设置</Button>
            </CollectorSetting>
            <Button
              key="keywords"
              onClick={() => {
                startToCollect();
              }}
            >
              手动开始AI写作
            </Button>
            <Button
              key="keywords"
              onClick={() => {
                history.push('/plugin/keyword');
              }}
            >
              关键词库管理
            </Button>
          </Space>
        </div>
        <div>
          <ProTable<any>
            actionRef={actionRef}
            rowKey="id"
            search={false}
            request={(params) => {
              return getAiArticlePlans(params);
            }}
            columnsState={{
              persistenceKey: 'ai-article-table',
              persistenceType: 'localStorage',
            }}
            columns={columns}
            pagination={{
              showSizeChanger: true,
            }}
          />
        </div>
        <div className="mt-normal">
          <p>AI自动写作，会调用AI写作接口写作，需要付费。</p>
          <p>
            AI自动写作会自动调用关键词库中的关键词来完成写作，每一个关键词写作一篇文章。请保证关键词库中的文章数量足够。
          </p>
          <p>AI自动写作和文章采集功能共用关键词库，关键词已采集过文章的话，不再用来AI写作。</p>
          <p>生成的文章会自动进入到内容管理里。</p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default PluginAiGenerate;
