import { pluginGetHtmlCachePushLogs, pluginHtmlCachePush } from '@/services';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

export type PushLogProps = {
  storageUrl: string;
  status: string;
  open: boolean;
  onCancel: () => void;
};

const HtmlPushLog: React.FC<PushLogProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [_, setSelectedRowKeys] = useState<any[]>([]);

  const handleRePush = async (keys: any[]) => {
    pluginHtmlCachePush({ paths: keys }).then((res) => {
      setSelectedRowKeys([]);
      actionRef.current?.reload?.();
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '时间',
      dataIndex: 'created_time',
      render: (item) => {
        return dayjs((item as number) * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '远程文件',
      dataIndex: 'remote_file',
      render: (_, record: any) => {
        return (
          <div className="word-wrap">
            <a href={props.storageUrl + '/' + record.remote_file} target="_blank">
              {record.remote_file}
            </a>
          </div>
        );
      },
    },
    {
      title: '本地文件',
      dataIndex: 'local_file',
      render: (_, record: any) => {
        return <div className="word-wrap">{record.local_file}</div>;
      },
    },
    {
      title: '推送状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return record.status == 1 ? (
          <span>成功</span>
        ) : (
          <Tooltip title={record.error_msg}>
            <span className="text-red">失败</span>
            {record.error_msg && <ExclamationCircleOutlined className="error-icon" />}
          </Tooltip>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          <span
            className={record.status == 0 ? 'text-red link' : 'link'}
            key="push"
            onClick={async () => {
              handleRePush([record.local_file]);
            }}
          >
            重新推送
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        width={1000}
        title={'推送记录'}
        open={props.open}
        onCancel={props.onCancel}
        footer={null}
      >
        <ProTable<any>
          actionRef={actionRef}
          rowKey="local_file"
          search={false}
          ghost
          toolBarRender={false}
          tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
            <Space>
              <Button
                size={'small'}
                onClick={async () => {
                  handleRePush(selectedRowKeys);
                }}
              >
                重新推送
              </Button>
              <Button type="link" size={'small'} onClick={onCleanSelected}>
                取消选择
              </Button>
            </Space>
          )}
          request={(params) => {
            params.status = props.status || '';
            return pluginGetHtmlCachePushLogs(params);
          }}
          columnsState={{
            persistenceKey: 'html-pushlog-table',
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
      </Modal>
    </>
  );
};

export default HtmlPushLog;
