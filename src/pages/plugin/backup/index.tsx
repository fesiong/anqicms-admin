import { Button, message, Modal, Radio, Space, Upload } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  pluginBackupCleanup,
  pluginBackupData,
  pluginBackupDelete,
  pluginBackupImport,
  pluginBackupRestore,
  pluginGetBackupList,
} from '@/services';
import moment from 'moment';
import { downloadFile, sizeFormat, sleep } from '@/utils';

var running = false;

const PluginUserGroup: React.FC = () => {
  const actionRef = useRef<ActionType>();
  let cleanUploads = false;

  const handleBackupData = async () => {
    if (running) {
      return;
    }
    Modal.confirm({
      title: '确定要执行数据库备份吗？',
      onOk: () => {
        running = true;
        const hide = message.loading('正在执行数据备份操作，请稍候。。', 0);
        pluginBackupData({})
          .then((res) => {
            message.info(res.msg);
            actionRef.current?.reload();
          })
          .finally(() => {
            hide();
            running = false;
          });
      },
    });
  };

  const handleBackupRestore = async (record: any) => {
    if (running) {
      return;
    }
    Modal.confirm({
      title: '确定要用当前备份执行恢复吗？',
      content: '恢复后，将会用当前的备份数据替换现有数据。请谨慎操作。',
      onOk: () => {
        running = true;
        const hide = message.loading('正在执行数据恢复操作，请稍候。。', 0);
        pluginBackupRestore(record)
          .then(async (res) => {
            await sleep(2000);
            message.info(res.msg);
            actionRef.current?.reload();
          })
          .finally(() => {
            hide();
            running = false;
          });
      },
    });
  };

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: '确定要删除该条数据吗？',
      onOk: () => {
        pluginBackupDelete(row).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleDownloadBackup = (record: any) => {
    Modal.confirm({
      title: '确定要下载到本地吗？',
      onOk: () => {
        downloadFile(
          '/plugin/backup/export',
          {
            name: record.name,
          },
          record.name,
        );
      },
    });
  };

  const handleUploadFile = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const hide = message.loading('正在提交中', 0);
    pluginBackupImport(formData)
      .then((res) => {
        message.success(res.msg);
        actionRef.current?.reload();
      })
      .finally(() => {
        hide();
      });
  };

  const onChangeData = (e: any) => {
    cleanUploads = e.target.value;
  };

  const handleCleanup = async () => {
    if (running) {
      return;
    }
    Modal.confirm({
      title: '确定要清空网站数据吗？',
      content: (
        <div>
          <p>该操作会删除全部文章。为了安全起见，请你务必先执行备份，以防不备之需。</p>
          <p>默认不清理Uploads文件夹，如需清理，请勾选。</p>
          <Radio.Group onChange={onChangeData}>
            <Radio value={false}>不清理图片</Radio>
            <Radio value={true}>清理上传的图片</Radio>
          </Radio.Group>
        </div>
      ),
      onOk: () => {
        running = true;
        const hide = message.loading('正在执行清理操作，请稍候。。', 0);
        pluginBackupCleanup({
          clean_uploads: cleanUploads,
        })
          .then((res) => {
            message.success(res.msg);
          })
          .finally(() => {
            hide();
            running = false;
          });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '备份时间',
      hideInSearch: true,
      dataIndex: 'last_mod',
      render: (item) => {
        if (`${item}` === '0') {
          return false;
        }
        return moment((item as number) * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '备份名称',
      dataIndex: 'name',
    },
    {
      title: '备份大小',
      dataIndex: 'size',
      render: (item) => {
        return sizeFormat(item as number);
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
              handleBackupRestore(record);
            }}
          >
            恢复
          </a>
          <a
            key="edit"
            onClick={() => {
              handleDownloadBackup(record);
            }}
          >
            下载
          </a>
          <a
            onClick={() => {
              handleDelete(record);
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
        headerTitle="数据备份管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleBackupData()}>
            新增备份
          </Button>,
          <Upload
            key="upload"
            name="file"
            className="logo-uploader"
            showUploadList={false}
            accept=".sql"
            customRequest={handleUploadFile}
          >
            <Button type="primary">导入本地备份</Button>
          </Upload>,
          <Button key="clean" onClick={() => handleCleanup()}>
            清空网站数据
          </Button>,
        ]}
        search={false}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetBackupList(params);
        }}
        columnsState={{
          persistenceKey: 'backup-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={false}
        pagination={{
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  );
};

export default PluginUserGroup;
